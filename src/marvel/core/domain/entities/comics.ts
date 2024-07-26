export enum DATE_TYPE_COMIC {
  ONSALE_DATE = "onsaleDate",
  FOC_DATE = "focDate",
  UNLIMITED_DATE = "unlimitedDate",
  DIGITAL_PURCHASE_DATE = "digitalPurchaseDate",
}

export interface DatesComics {
  type: DATE_TYPE_COMIC;
  date: string;
}
export interface Comics {
  id: number;
  imageUrl: string;
  title: string;
  dates: DatesComics[];
}
