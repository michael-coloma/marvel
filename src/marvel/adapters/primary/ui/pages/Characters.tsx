import React, { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useGetTopCharacters } from "src/marvel/adapters/primary/ui/hooks/useGetTopCharacters";
import { Character } from "src/marvel/core/domain/entities/character";
import Filter from "@components/Filter";
import Header from "@components/Header";
import CharacterCard from "@components/CharacterCard";
import { FavoriteCharactersContext } from "src/marvel/adapters/secondary/context/FavoriteCharactersContext";
import { ShowFavoriteCharactersContext } from "src/marvel/adapters/secondary/context/ShowFavoritesCharacterContext";

import * as styles from "./Characters.module.css";

const Characters: React.FC = () => {
  const { characters, error, isLoading, isError } = useGetTopCharacters();
  const [charactersFiltered, setCharactersFiltered] = useState<Character[]>(characters);
  const { favoriteCharacterIds } = useContext(FavoriteCharactersContext);
  const { showFavorites } = useContext(ShowFavoriteCharactersContext);

  const allCharacters = useMemo(() => {
    const favorites = characters.filter((character) => favoriteCharacterIds.includes(character.id));
    return showFavorites ? favorites : characters;
  }, [characters, favoriteCharacterIds, showFavorites]);

  const handleDataFiltered = useCallback((filteredData: Character[]) => {
    setCharactersFiltered(filteredData);
  }, []);

  useEffect(() => {
    if (!isLoading && !isError) {
      handleDataFiltered(allCharacters);
    }
  }, [allCharacters, handleDataFiltered, isError, isLoading]);

  return (
    <>
      <Header isLoading={isLoading} countFavorites={favoriteCharacterIds.length} />
      {!isLoading && !isError && (
        <div className={styles.characters}>
          {showFavorites && <span className={styles.characters__titleFavorites}>Favorites</span>}
          {allCharacters.length > 0 && (
            <>
              <Filter
                data={allCharacters}
                byFields={["name"]}
                onDataFiltered={(charactersFiltered) => handleDataFiltered(charactersFiltered)}
              />

              <div className={styles.characters__list}>
                {charactersFiltered.map(({ id, name, imageUrl }) => (
                  <CharacterCard key={id} id={id} name={name} imageUrl={imageUrl} />
                ))}
              </div>
            </>
          )}
        </div>
      )}

      {isError && <>Error: {error instanceof Error ? error.message : "An error occurred"}</>}
    </>
  );
};

export default Characters;
