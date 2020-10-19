import { AxiosResponse } from "axios";
import { Context } from "../../types/plugin";

export namespace SitesResult {
  export interface Site {
    id: number;
    name?: string;
    short_name?: string;
    url?: string;
    logo?: string | null;
    favicon?: string;
  }

  export interface Links {
    first: string;
    last: string;
    prev?: any;
    next: string;
  }

  export interface Link {
    url: string;
    label: any;
    active: boolean;
  }

  export interface Meta {
    current_page: number;
    from: number;
    last_page: number;
    links: Link[];
    path: string;
    per_page: number;
    to: number;
    total: number;
  }

  export interface RootObject {
    data: Site[];
    links: Links;
    meta: Meta;
  }
}

export class Api {
  ctx: Context;

  constructor(ctx: Context) {
    this.ctx = ctx;
  }

  /**
   * Fetches a single page of sites
   *
   * @param params - params to send with the request
   */
  private async getSites(params: object): Promise<AxiosResponse<SitesResult.RootObject>> {
    return this.ctx.$axios.get<SitesResult.RootObject>("https://api.metadataapi.net/sites", {
      params: {
        ...params,
        per_page: 250,
      },
    });
  }

  /**
   * Fetches all sites from TPDB
   *
   * @param maxPages - the max amount of pages to retrieve
   */
  public async getAllSites(maxPages?: number): Promise<SitesResult.Site[]> {
    const sites: SitesResult.Site[] = [];
    this.ctx.$log(`[TPDB]: API: Downloading ${maxPages ?? "all"} page(s) of sites`);

    try {
      let lastPage: number;
      let currentPage = 1;

      do {
        const apiRes = await this.getSites({ page: currentPage });

        sites.push(...apiRes.data.data);

        lastPage = apiRes.data.meta.last_page;
        currentPage++;
      } while (currentPage <= lastPage && (maxPages === undefined || currentPage <= maxPages));
    } catch (err) {
      this.ctx.$throw(`[TPDB]: API: error retrieving sites ${err}`);
      return [];
    }

    return sites;
  }
}
