import { Gender } from "./common";
import { CategoryInput } from "./category";

export type CreateTournamentStep = 0 | 1 | 2;

export interface CreateFormInput {
  name?: string;
  startDate?: Date;
  endDate?: Date;
  logo?: string;
  location?: string;
  organization?: string;

  categoriesInput?: CategoryInput[];
}
