import { ActorContext } from "../../types/actor";
import { MovieContext } from "../../types/movie";
import { DeepPartial } from "../../types/plugin";
import { SceneContext } from "../../types/scene";
import { StudioContext } from "../../types/studio";

// WARNING: these interfaces should always match the schema used by validateArgs

interface BaseScrapeDefinition {
  path: string;
  searchTerms?: string[];
  blacklistTerms?: string[];
  max?: number;
  mustMatchInFilename?: boolean;
}

export type ActorScrapeDefinition = BaseScrapeDefinition & {
  prop: "thumbnail" | "altThumbnail" | "avatar" | "hero" | "extra";
};

export type SceneScrapeDefinition = BaseScrapeDefinition & {
  prop: "thumbnail" | "extra";
};

export type MovieScrapeDefinition = BaseScrapeDefinition & {
  prop: "backCover" | "frontCover" | "spineCover" | "extra";
};

export type StudioScrapeDefinition = BaseScrapeDefinition & {
  prop: "thumbnail" | "extra";
};

export type ScrapeDefinition =
  | ActorScrapeDefinition
  | SceneScrapeDefinition
  | MovieScrapeDefinition
  | StudioScrapeDefinition;

export type MyContext = (ActorContext | SceneContext | MovieContext | StudioContext) & {
  args: DeepPartial<{
    dry: boolean;
    actors: ActorScrapeDefinition[];
    scenes: SceneScrapeDefinition[];
    movies: MovieScrapeDefinition[];
    studios: StudioScrapeDefinition[];
  }>;
};
