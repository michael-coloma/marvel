import React, { useCallback, useContext, useLayoutEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Character } from "src/marvel/core/domain/entities/character";
import { PORTRAIT_SIZE_IMAGE } from "src/marvel/adapters/primary/types/enums";
import { REPLACE_SIZE_IMAGE } from "src/marvel/adapters/primary/types/constants";
import { FavoriteCharactersContext } from "src/marvel/adapters/secondary/context/FavoriteCharactersContext";
import LazyLoad from "react-lazyload";

import * as styles from "./CharacterCard.module.css";

const CharacterCard = ({ id, imageUrl, name }: Character) => {
  const { favoriteCharacterIds, setFavoriteCharacterIds } = useContext(FavoriteCharactersContext);
  const navigate = useNavigate();

  const imageDefault = useMemo(
    () => imageUrl?.replace(REPLACE_SIZE_IMAGE, PORTRAIT_SIZE_IMAGE.MEDIUM_100X150),
    [imageUrl],
  );

  const [image, setImage] = useState<string>(imageDefault);
  useLayoutEffect(() => {
    const handleResizeImage = () => {
      const width = window.innerWidth;
      let newImage;
      if (width < 576) {
        newImage = imageUrl?.replace(REPLACE_SIZE_IMAGE, PORTRAIT_SIZE_IMAGE.XLARGE_150X225);
      } else if (width < 768) {
        newImage = imageDefault;
      } else if (width < 992) {
        newImage = imageUrl?.replace(REPLACE_SIZE_IMAGE, PORTRAIT_SIZE_IMAGE.XLARGE_150X225);
      } else if (width < 1200) {
        newImage = imageUrl?.replace(REPLACE_SIZE_IMAGE, PORTRAIT_SIZE_IMAGE.FANTASTIC_168X252);
      } else if (width < 1400) {
        newImage = imageUrl?.replace(REPLACE_SIZE_IMAGE, PORTRAIT_SIZE_IMAGE.INCREDIBLE_216X324);
      } else {
        newImage = imageUrl?.replace(REPLACE_SIZE_IMAGE, PORTRAIT_SIZE_IMAGE.UNCANNY_300X450);
      }

      setImage((prevImage) => (prevImage !== newImage ? newImage : prevImage));
    };

    handleResizeImage();

    window.addEventListener("resize", handleResizeImage);

    return () => window.removeEventListener("resize", handleResizeImage);
  }, [imageDefault, imageUrl]);

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
