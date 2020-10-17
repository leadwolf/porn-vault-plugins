import { Context, CustomFieldsOutput } from "./plugin";

export interface Movie {
  _id: string;
  name: string;
  description: string | null;
  addedOn: Date;
  releaseDate: number | null;
  frontCover: string | null;
  backCover: string | null;
  spineCover: string | null;
  favorite: boolean;
  bookmark: number | null;
  rating: number;
  scenes?: string[]; // backwards compatibility
  customFields: Record<string, boolean | string | number | string[] | null>;
  studio: string | null;
}
export interface FullMovieOutput extends CustomFieldsOutput {
  name: string;
  description: string;
  releaseDate: number;
  addedOn: number;
  rating: number;
  favorite: boolean;
  bookmark: number;
  frontCover: string;
  backCover: string;
  spineCover: string;
  studio: string;
}

export type MovieOutput = Partial<FullMovieOutput>

export interface MovieContext extends Context<MovieOutput> {
  movie: Movie;
  movieName: string;
}
