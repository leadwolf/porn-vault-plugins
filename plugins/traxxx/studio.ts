import { StudioOutput } from "../../types/studio";
import { Api, buildImageUrls, EntityResult } from "./api";
import { MyStudioContext, MyValidatedStudioContext } from "./types";
import {
  getEntityPreferenceFromName,
  normalizeStudioName,
  EntityPreference,
  slugify,
  suppressProp,
  validateArgs,
} from "./util";

export class ChannelExtractor {
  ctx: MyValidatedStudioContext;
  channel?: EntityResult.Entity;
  network?: EntityResult.Entity;
  entityPreference: EntityPreference;

  /**
   * @param ctx - plugin context
   * @param input - extractor input
   * @param input.channel - the matched channel
   * @param input.network - the matched network
   * @param input.entityPreference - if should return channel/network, or default: according
   * to user args (when conflict), or whatever is found (no conflict).
   */
  constructor(
    ctx: MyValidatedStudioContext,
    {
      channel,
      network,
      entityPreference,
    }: {
      channel?: EntityResult.Entity;
      network?: EntityResult.Entity;
      entityPreference: EntityPreference;
    }
  ) {
    this.ctx = ctx;
    this.channel = channel;
    this.network = network;
    this.entityPreference = entityPreference;
  }

  getPreferredEntity(): EntityResult.Entity | undefined {
    if (this.entityPreference === "channel") {
      return this.channel;
    }
    if (this.entityPreference === "network") {
      return this.network;
    }
    if (this.channel && this.network) {
      return this.ctx.args.studios.channelPriority ? this.channel : this.network;
    }

    return this.channel || this.network;
  }

  private _getName(): Partial<{ name: string }> {
    const baseName = this.getPreferredEntity()?.name;
    if (!baseName) {
      return {};
    }

    const ignoreNameConflicts =
      this.channel?.name !== this.network?.name || !this.ctx.args.studios.uniqueNames;
    if (ignoreNameConflicts) {
      return { name: baseName };
    }

    let suffix: string = "";
    if (this.entityPreference === "channel") {
      suffix = this.ctx.args.studios.channelSuffix;
    } else if (this.entityPreference === "network") {
      suffix = this.ctx.args.studios.networkSuffix;
    } else if (this.channel && this.network) {
      suffix = this.ctx.args.studios.channelPriority
        ? this.ctx.args.studios.channelSuffix
        : this.ctx.args.studios.networkSuffix;
    }

    return { name: `${baseName}${suffix}` };
  }

  public getName(): Partial<{ name: string }> {
    if (suppressProp(this.ctx, "name")) {
      return {};
    }

    return this._getName();
  }

  getDescription(): Partial<{ description: string }> {
    if (suppressProp(this.ctx, "description")) {
      return {};
    }

    const description = this.getPreferredEntity()?.description;
    if (!description) {
      return {};
    }

    return { description };
  }

  async getThumbnail(): Promise<Partial<{ thumbnail: string }>> {
    if (suppressProp(this.ctx, "thumbnail")) {
      return {};
    }

    const entity = this.getPreferredEntity();
    if (!entity) {
      return {};
    }

    const imageUrls = buildImageUrls(entity);

    if (!imageUrls.thumbnail) {
      return {};
    }

    const thumbnail = this.ctx.args.dry
      ? `_would_have_created_${imageUrls.thumbnail}`
      : await this.ctx.$createImage(
          imageUrls.thumbnail,
          this._getName().name || this.ctx.studioName,
          true
        );

    return {
      thumbnail,
    };
  }

  getAliases(): Partial<{ aliases: string[] }> {
    if (suppressProp(this.ctx, "aliases")) {
      return {};
    }

    const ourAliases = this.getPreferredEntity()?.aliases || [];
    if (!ourAliases.length) {
      return {};
    }

    const previousAliases = this.ctx.data.aliases;
    if (previousAliases?.length && this.ctx.args.studios.mergeAliases) {
      return {
        aliases: [...previousAliases, ...ourAliases],
      };
    }

    return {
      aliases: ourAliases,
    };
  }

  getParent(): Partial<{ parent: string }> {
    if (suppressProp(this.ctx, "parent")) {
      return {};
    }

    const parentName = this.getPreferredEntity()?.parent?.name;
    if (!parentName) {
      return {};
    }

    if (this.getPreferredEntity()?.name === parentName) {
      if (this.ctx.args.studios.uniqueNames) {
        return { parent: `${parentName}${this.ctx.args.studios.networkSuffix}` };
      }
      this.ctx.$log(`[TRAXXX] MSG: Cannot return parent name, would conflict with current name`);
      return {};
    }

    return { parent: parentName };
  }

  getCustom(): Partial<{ "Traxxx Id": number; "Traxxx Type": string; Homepage: string }> {
    return {
      ["Traxxx Id"]: this.getPreferredEntity()?.id,
      ["Traxxx Type"]: this.getPreferredEntity()?.type,
      Homepage: this.getPreferredEntity()?.url,
    };
  }
}

export default async (initialContext: MyStudioContext): Promise<StudioOutput> => {
  const { $log, $throw, studioName } = initialContext;

  async function main() {
    try {
      const validatedArgs = validateArgs(initialContext);
      if (validatedArgs) {
        initialContext.args = validatedArgs;
      }
    } catch (err) {
      $throw(err);
      return {};
    }

    // Can assert all properties exist, since we just validated them above
    const ctx = initialContext as MyValidatedStudioContext;
    const args = ctx.args;

    const api = new Api(ctx);

    const entityPreference = getEntityPreferenceFromName(ctx, studioName);
    const slugifiedName = slugify(normalizeStudioName(ctx, studioName));

    ctx.$log(`[TRAXXX] MSG: Trying to match "${studioName}" as "${slugifiedName}"`);
    if (entityPreference !== "none") {
      ctx.$log(`[TRAXXX] MSG: Identified as ${entityPreference} from current name`);
    }

    const searchPromises: Promise<EntityResult.Entity | undefined>[] = [];

    // We still need to search for both channels & networks, even if
    // we know the type, so that we can tell if there would be name conflicts
    searchPromises.push(
      api
        .getChannel(slugifiedName)
        .then((res) => res.data.entity)
        .catch((err) => {
          $log(`[TRAXXX] WARN: ${err.message}`);
          $log(`[TRAXXX] WARN: Could not find/fetch channel "${studioName}"`);
          return undefined;
        })
    );
    searchPromises.push(
      api
        .getNetwork(slugifiedName)
        .then((res) => res.data.entity)
        .catch((err) => {
          $log(`[TRAXXX] WARN: ${err.message}`);
          $log(`[TRAXXX] WARN: Could not find/fetch network "${studioName}"`);
          return undefined;
        })
    );

    const [channel, network] = await Promise.all(searchPromises);

    if (!channel && !network) {
      $log(`[TRAXXX] WARN: Could not find channel or network "${studioName}" in TRAXXX`);
      return {};
    }

    const channelExtractor = new ChannelExtractor(ctx, {
      channel,
      network,
      entityPreference,
    });

    const result: StudioOutput = {
      ...channelExtractor.getName(),
      ...channelExtractor.getDescription(),
      ...(await channelExtractor.getThumbnail()),
      ...channelExtractor.getAliases(),
      ...channelExtractor.getParent(),
      custom: channelExtractor.getCustom(),
    };

    if (args.dry) {
      $log("[TRAXXX] MSG: Is 'dry' mode, would've returned:");
      $log(result);
      return {};
    }

    return result;
  }

  try {
    return main();
  } catch (err) {
    $log(err);
    $log(`[TRAXXX] ERR: Plugin failed`);
    $throw(err);
    return {};
  }
};
