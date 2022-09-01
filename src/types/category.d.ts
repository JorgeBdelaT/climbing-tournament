export enum CategoryName {
  AMATEUR = "AMATEUR",
  INTERMEDIUM = "INTERMEDIUM",
  ADVANCED = "ADVANCED",
  EXPERT = "EXPERT",
}

export interface CategoryInput {
  name?: CategoryName;
  gender?: Gender;
  roundsCount?: 1 | 2 | 3;
  bouldersCount?: number;
}
