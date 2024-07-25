import { useCallback, useState } from "react";

import { ShowFavoriteCharactersContext } from "src/marvel/adapters/secondary/context/ShowFavoritesCharacterContext";

export const ShowFavoritesProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [showFavorites, setShowFavorites] = useState<boolean>(false);

  const setShow = useCallback((show: boolean) => {
    setShowFavorites(show);
  }, []);

  return (
    <ShowFavoriteCharactersContext.Provider value={{ showFavorites, setShowFavorites: setShow }}>
      {children}
    </ShowFavoriteCharactersContext.Provider>
  );
};
