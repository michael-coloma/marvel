import { createContext } from "react";

interface FavoriteCharactersContextType {
  favoriteCharacterIds: number[];
  setFavoriteCharacterIds: (ids: number[]) => void;
}
export const FavoriteCharactersContext = createContext<FavoriteCharactersContextType>({
  favoriteCharacterIds: [],
  setFavoriteCharacterIds: (_favoriteCharactersIds: number[]) => {},
});
