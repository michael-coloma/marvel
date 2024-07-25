import React, { useCallback, useContext, useMemo } from "react";
import { useParams } from "react-router-dom";
import { useGetCharacterDetails } from "src/marvel/adapters/primary/ui/hooks/useGetCharacterDetails";
import IconNotLikes from "@assets/IconBigHearthNotLike.svg";
import IconLikes from "@assets/IconBigHearthLike.svg";
import Header from "@components/Header";
import { REPLACE_SIZE_IMAGE } from "src/marvel/adapters/primary/types/constants";
import { PORTRAIT_SIZE } from "src/marvel/adapters/primary/types/enums";
import { FavoriteCharactersContext } from "src/marvel/adapters/secondary/context/FavoriteCharactersContext";

import * as styles from "./CharacterDetails.module.css";

const CharacterDetails = () => {
  const { characterId } = useParams();
  const { characterDetails, isLoading, isError, error } = useGetCharacterDetails(characterId || "");
  // const navigate = useNavigate();
  const { favoriteCharacterIds, setFavoriteCharacterIds } = useContext(FavoriteCharactersContext);

  const image = useMemo(
    () => characterDetails?.character?.imageUrl?.replace(REPLACE_SIZE_IMAGE, PORTRAIT_SIZE.UNCANNY_300X450),
    [characterDetails?.character.imageUrl],
  );

  const isFavorite = useMemo(
    () => favoriteCharacterIds.includes(Number(characterId)),
    [characterId, favoriteCharacterIds],
  );

  const handleLike = useCallback(() => {
    if (isFavorite) {
      setFavoriteCharacterIds(favoriteCharacterIds.filter((favoriteId) => favoriteId !== Number(characterId)));
    } else {
      setFavoriteCharacterIds([...favoriteCharacterIds, Number(characterId)]);
    }
  }, [characterId, favoriteCharacterIds, isFavorite, setFavoriteCharacterIds]);

  return (
    <>
      <Header isLoading={isLoading} countFavorites={favoriteCharacterIds.length} changeBorderBottom={true} />
      {!isError && !isLoading && characterDetails && (
        <div className={styles.characterDetails}>
          <div className={styles["characterDetails__character-container"]}>
            <img className={styles["characterDetails__character-image"]} src={image} alt='IMAGE_HEROE' />
            <div className={styles["characterDetails__text-container"]}>
              <div className={styles["characterDetails__text-icon-container"]}>
                <span className={styles["characterDetails__text-name"]}>{characterDetails.character.name}</span>
                <div>
                  <img src={isFavorite ? IconLikes : IconNotLikes} alt='ICON_LIKE' onClick={handleLike} />
                </div>
              </div>
              <span className={styles["characterDetails__text-description"]}>
                {characterDetails.character.description || "texto de pruebafafa"}
              </span>
            </div>
          </div>
        </div>
      )}
      {isError && <>Error: {error instanceof Error ? error.message : "An error occurred"}</>}
    </>
  );
};

export default CharacterDetails;