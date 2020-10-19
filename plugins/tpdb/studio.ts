import { StudioContext, StudioOutput } from "../../types/studio";
import { Api, SitesResult } from "./api";
import { retrieveSiteList } from "./util";

type DeepPartial<T> = {
  [P in keyof T]?: DeepPartial<T[P]>;
};

interface Args {
  dry: boolean;
  studios: {
    cacheStudiosPath: string;
    cacheDays: number;
  };
}

interface MyContext extends StudioContext {
  args?: DeepPartial<Args>;
  testArgs?: {
    maxPages?: number;
  };
}

const validateArgs = ({ args, $throw, studioName }: MyContext): void => {
  if (!args || typeof args !== "object") {
    return $throw(`Missing args, cannot run plugin`);
  }

  if (!studioName || typeof studioName !== "string") {
    return $throw(`Expected 'studioName', cannot run plugin`);
  }
  if (!args.studios || typeof args.studios !== "object") {
    return $throw(`Missing arg 'studios', cannot run plugin`);
  }

  if (!args.studios.cacheStudiosPath || typeof args.studios.cacheStudiosPath !== "string") {
    return $throw(`Missing arg 'studios.cacheStudiosPath', cannot run plugin`);
  }

  if (!args.studios.cacheDays || typeof args.studios.cacheDays !== "number") {
    args.studios.cacheDays = 7;
  }
};

export default async (ctx: MyContext): Promise<StudioOutput> => {
  const { args: initialArgs, $log, $throw, $createImage, studioName, testArgs } = ctx;

  try {
    validateArgs(ctx);
  } catch (err) {
    $throw(err);
    return {};
  }

  // Can assert all properties exist, since we just validated them above
  const args = initialArgs as Args;

  ctx.$log(`[TPDB]: Trying to match "${studioName}"`);

  const api = new Api(ctx);

  let sites: SitesResult.Site[] | null;

  try {
    sites = await retrieveSiteList(ctx, api, args.studios, testArgs?.maxPages);
  } catch (err) {
    ctx.$log(`[TPDB]: Could not retrieve site list. ${err}`);
    ctx.$throw(`[TPDB]: Could not retrieve site list. ${err}`);
    return {};
  }

  const matchedSite = sites?.find(
    (site) =>
      (site.name || "").toLocaleLowerCase() === studioName.toLocaleLowerCase() ||
      (site.short_name || "").toLocaleLowerCase() === studioName.toLocaleLowerCase()
  );
  if (!matchedSite) {
    $log(`[TPDB]: Could not find studio ${studioName} in TPDB`);
    return {};
  }

  $log("[TPDB]: found studio:");
  $log({ id: matchedSite.id, url: matchedSite.url });

  const aliases: string[] = [];

  if (matchedSite.short_name) {
    aliases.push(matchedSite.short_name);
  }

  let thumbnail: string | undefined;
  if (matchedSite.logo) {
    if (args.dry) {
      thumbnail = `_would_create_from_${matchedSite.logo}`;
    } else {
      thumbnail = await $createImage(matchedSite.logo, `${studioName} logo`, true);
    }
  }

  const result = {
    thumbnail,
    aliases,
    custom: {
      tpdb_id: matchedSite.id,
    },
  };

  if (args.dry) {
    $log("[TPDB]: Is 'dry' mode, would've returned:");
    $log(result);
    return {};
  }

  return result;
};
