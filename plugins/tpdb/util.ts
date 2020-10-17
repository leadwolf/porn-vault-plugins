import { Context } from "../../types/plugin";
import { Api, SitesResult } from "./api";

/**
 * Retrieves the full site list, either by fetching it, or using
 * the stored file
 *
 * @param ctx - plugin context
 * @param api - tpdb api
 * @param sitesCachePath - the path to store/retrieve the full site list to/from
 * @param maxPages - how many pages to download, to prevent spam
 */
export async function retrieveSiteList(
  ctx: Context,
  api: Api,
  sitesCachePath: string,
  maxPages?: number
): Promise<SitesResult.Site[] | null> {
  const sitesFsPath = ctx.$path.resolve(sitesCachePath);

  if (ctx.$fs.existsSync(sitesFsPath)) {
    ctx.$log(`[TPDB]: Reading sites from file ${sitesFsPath}`);

    try {
      const sitesJSON = ctx.$fs.readFileSync(sitesFsPath, "utf-8");
      const sites = JSON.parse(sitesJSON);
      return sites as SitesResult.Site[];
    } catch (err) {
      ctx.$throw(`[TPDB]: Could not retrieve existing sites from file. ${err}`);
      return null;
    }
  }
  ctx.$log("[TPDB]: Fetching sites from TPDB");

  try {
    const sites = await api.getAllSites(maxPages);
    const sitesJSON = JSON.stringify(sites, null, 2);

    ctx.$fs.writeFileSync(sitesFsPath, sitesJSON, "utf-8");

    return sites;
  } catch (err) {
    ctx.$throw(`[TPDB]: Could not retrieve and store sites. ${err}`);
    return null;
  }
}
