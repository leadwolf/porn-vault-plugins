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

const validateArgs = ({ args, $throw, studioName }: MyContext): {} => {
  if (!args || typeof args !== "object") {
    $throw(`Missing args, cannot run plugin`);
    return {};
  }

  if (!studioName || typeof studioName !== "string") {
    $throw(`Expected 'studioName', cannot run plugin`);
    return {};
  }
  if (!args.studios || typeof args.studios !== "object") {
    $throw(`Missing args, cannot run plugin`);
    return {};
  }

  if (!args.studios.cacheStudiosPath || typeof args.studios.cacheStudiosPath !== "string") {
    $throw(`Missing arg 'cacheStudiosPath', cannot run plugin`);
    return {};
  }

  if (!args.studios.cacheDays || typeof args.studios.cacheDays !== "number") {
    $throw(`Missing arg 'cacheStudiosPath', cannot run plugin`);
    return {};
  }

  return {};
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

  let sites: SitesResult.Site[];

  try {
    sites = (await retrieveSiteList(ctx, api, args.studios, testArgs?.maxPages)) || [];
  } catch (err) {
    ctx.$log(`[TPDB]: Could not retrieve site list. ${err}`);
    ctx.$throw(`[TPDB]: Could not retrieve site list. ${err}`);
    return {};
  }

  const matchedSite = sites.find((site) => site.name === studioName);
  if (matchedSite) {
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
        tpdb: {
          id: matchedSite.id,
        },
      },
    };

    if (args.dry) {
      $log("[TPDB]: Is 'dry' mode, would've returned:");
      $log(result);
      return {};
    }

    return result;
  }

  $log("[TPDB]: Could not find site in TPDB");
  $throw("[TPDB]: Could not find site in TPDB");
  return {};
};
