import React, { useCallback, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Character } from "src/marvel/core/domain/entities/character";
import { PORTRAIT_SIZE_IMAGE } from "src/marvel/adapters/primary/types/enums";
import { FavoriteCharactersContext } from "src/marvel/adapters/secondary/context/FavoriteCharactersContext";
import LazyLoad from "react-lazyload";
import { useGetUrlImage } from "../hooks/useGetUrlImage";

import * as styles from "./CharacterCard.module.css";

const CharacterCard = ({ id, imageUrl, name }: Character) => {
  const { favoriteCharacterIds, setFavoriteCharacterIds } = useContext(FavoriteCharactersContext);
  const navigate = useNavigate();

  const image = useGetUrlImage(imageUrl, PORTRAIT_SIZE_IMAGE.XLARGE_150X225);

  const isFavorite = useMemo(() => favoriteCharacterIds.includes(id), [favoriteCharacterIds, id]);

  const handleCharacterCardClick = useCallback(() => {
    navigate(`/character/${id.toString()}`);
  }, [id, navigate]);

  const handleLike = useCallback(
    (event: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
      event.stopPropagation();
      if (isFavorite) {
        setFavoriteCharacterIds(favoriteCharacterIds.filter((favoriteId) => favoriteId !== id));
      } else {
        setFavoriteCharacterIds([...favoriteCharacterIds, id]);
      }
    },
    [favoriteCharacterIds, id, isFavorite, setFavoriteCharacterIds],
  );

  return (
    <div key={id} className={styles.card} onClick={handleCharacterCardClick}>
      <LazyLoad className={styles["card__image-lazy"]}>
        <img src={image} alt={name || "IMAGE_NOT_FOUND"} className={styles.card__image} />
      </LazyLoad>

      <div className={styles.card__details}>
        <span className={styles.card__name}>{name?.toUpperCase()}</span>
        <img
          onClick={handleLike}
          className={`${styles["card__like"]} ${isFavorite ? styles["card__like--selected"] : styles["card__like--deselected"]}`}
          alt='ICON_LIKE'
        />
      </div>
    </div>
  );
};

export default CharacterCard;
