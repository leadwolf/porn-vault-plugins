import { Context } from "../../types/plugin";
import { Api, SitesResult } from "./api";

/**
 *
 * @param dateA - first date
 * @param dateB - second date
 * @returns the difference in days
 */
const diffDays = (dateA: Date, dateB: Date): number => {
  const diffTime = Math.abs(dateA.valueOf() - dateB.valueOf());
  const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24)); // 1 day in ms
  return diffDays;
};

/**
 * @param ctx - plugin context
 * @param studiosFsPath - resolved path to the cached studios
 * @param cacheDays - how long the cache is valid for. If surpassed, will abandon retrieval
 */
const retrieveStudiosFromFile = (
  ctx: Context,
  studiosFsPath: string,
  cacheDays: number
): SitesResult.Site[] | null => {
  if (!ctx.$fs.existsSync(studiosFsPath)) {
    ctx.$throw(`[TPDB]: 'cacheStudiosPath' did not exist: ${studiosFsPath}`);
    return null;
  }

  if (diffDays(ctx.$fs.statSync(studiosFsPath).mtime, new Date()) >= cacheDays) {
    ctx.$throw(`[TPDB]: cached studios are older than ${cacheDays}, will not use`);
    return null;
  }

  try {
    const sitesJSON = ctx.$fs.readFileSync(studiosFsPath, "utf-8");
    const sites = JSON.parse(sitesJSON);
    return sites as SitesResult.Site[];
  } catch (err) {
    ctx.$throw(`[TPDB]: Could not retrieve existing sites from file. ${err}`);
    return null;
  }
};

/**
 * @param ctx - plugin context
 * @param api - TPDB api
 * @param studiosFsPath - resolved path to where to cache the studios
 * @param maxPages - how many pages max to retrieve
 */
async function fetchSitesAndCache(
  ctx: Context,
  api: Api,
  studiosFsPath: string,
  maxPages?: number
) {
  try {
    const studios = await api.getAllSites(maxPages);
    const studiosJSON = JSON.stringify(studios, null, 2);

    ctx.$fs.writeFileSync(ctx.$path.resolve(studiosFsPath), studiosJSON, "utf-8");

    return studios;
  } catch (err) {
    ctx.$throw(`[TPDB]: Could not retrieve and store studios. ${err}`);
    return null;
  }
}

/**
 * Retrieves the full site list, either by cache or api
 *
 * @param ctx - plugin context
 * @param api - tpdb api
 * @param opts - cache options
 * @param opts.cacheStudiosPath - the path to store/retrieve the full site list to/from
 * @param opts.cacheDays - how long the cached studios are valid for
 * @param maxPages - how many pages to download, to prevent spam
 */
export async function retrieveSiteList(
  ctx: Context,
  api: Api,
  {
    cacheStudiosPath,
    cacheDays,
  }: {
    cacheStudiosPath: string;
    cacheDays: number;
  },
  maxPages?: number
): Promise<SitesResult.Site[] | null> {
  const studiosFsPath = ctx.$path.resolve(cacheStudiosPath);

  try {
    ctx.$log(`[TPDB]: Reading sites from file ${studiosFsPath}`);
    const studios = retrieveStudiosFromFile(ctx, studiosFsPath, cacheDays);
    if (Array.isArray(studios)) {
      return studios;
    }
  } catch (err) {
    ctx.$log(err.message);
  }

  // Fallback to api retrieval
  ctx.$log("[TPDB]: Fetching sites from TPDB");
  return fetchSitesAndCache(ctx, api, studiosFsPath, maxPages);
}
