import { AxiosResponse, AxiosInstance } from "axios";
import { Context } from "../../types/plugin";

export namespace EntityResult {
  export interface Entity {
    id: number;
    name: string;
    url: string;
    description: string | null;
    slug: string;
    type: string;
    independent: boolean;
    aliases: string[] | null;
    logo: string;
    thumbnail: string;
    favicon: string;
    parent: Entity | null;
    children: Entity[] | null;
    tags: string[] | null;
  }

  export interface Result {
    // Entity always exists for successful http requests
    // ex: null when 404
    entity: Entity;
  }
}

export class Api {
  ctx: Context;
  axios: AxiosInstance;

  constructor(ctx: Context) {
    this.ctx = ctx;
    this.axios = ctx.$axios.create({
      baseURL: "https://traxxx.me/api",
    });
  }

  /**
   * @param idOrSlug - the id or slug of the channel
   */
  public async getChannel(idOrSlug: string | number): Promise<AxiosResponse<EntityResult.Result>> {
    return this.axios.get<EntityResult.Result>(`/channels/${idOrSlug}`);
  }

  /**
   * @param idOrSlug - the id or slug of the network
   */
  public async getNetwork(idOrSlug: string | number): Promise<AxiosResponse<EntityResult.Result>> {
    return this.axios.get<EntityResult.Result>(`/networks/${idOrSlug}`);
  }
}

export const buildImageUrls = (
  entity: EntityResult.Entity
): {
  logo: string | undefined;
  thumbnail: string | undefined;
  favicon: string | undefined;
} => {
  const baseUrl = "https://traxxx.me/img/logos/";

  return {
    logo: entity.logo ? `${baseUrl}${entity.logo}` : undefined,
    thumbnail: entity.thumbnail ? `${baseUrl}${entity.thumbnail}` : undefined,
    favicon: entity.favicon ? `${baseUrl}${entity.favicon}` : undefined,
  };
};
