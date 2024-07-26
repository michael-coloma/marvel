export interface DatesComics {
  type: "onsaleDate" | "focDate" | "unlimitedDate" | "digitalPurchaseDate";
  date: string;
  dateDate?: Date;
}
export interface Comics {
  id: number;
  imageUrl: string;
  title: string;
  dates: DatesComics[];
}
