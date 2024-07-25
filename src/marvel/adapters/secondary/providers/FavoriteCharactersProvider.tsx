import React, { useCallback, useEffect, useState } from "react";
import { FavoriteCharactersContext } from "src/marvel/adapters/secondary/context/FavoriteCharactersContext";

interface FavoriteCharactersProviderProps {
  children: JSX.Element;
}

export const FavoriteCharactersProvider = ({ children }: FavoriteCharactersProviderProps) => {
  const [favoriteCharacterIds, setFavoriteCharacterIds] = useState<number[]>(() => {
    const savedFavorites = localStorage.getItem("favoriteCharacterIds");
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });

  useEffect(() => {
    localStorage.setItem("favoriteCharacterIds", JSON.stringify(favoriteCharacterIds));
  }, [favoriteCharacterIds]);

  const setIds = useCallback((ids: number[]) => {
    setFavoriteCharacterIds(ids);
  }, []);

  return (
    <FavoriteCharactersContext.Provider value={{ favoriteCharacterIds, setFavoriteCharacterIds: setIds }}>
      {children}
    </FavoriteCharactersContext.Provider>
  );
};
