import { createContext } from "react";

interface ShowFavoritesContextType {
  showFavorites: boolean;
  setShowFavorites: (show: boolean) => void;
}

export const ShowFavoriteCharactersContext = createContext<ShowFavoritesContextType>({
  showFavorites: false,
  setShowFavorites: () => {},
});
