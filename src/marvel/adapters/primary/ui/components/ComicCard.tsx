import React from "react";
import { PORTRAIT_SIZE_IMAGE } from "src/marvel/adapters/primary/types/enums";
import { useGetUrlImage } from "src/marvel/adapters/primary/ui/hooks/useGetUrlImage";

import * as styles from "./ComicCard.module.css";

interface ComicCardProps {
  id: number;
  imageUrl: string;
  title: string;
  year: string | number;
}

const ComicCard = ({ id, imageUrl, title, year }: ComicCardProps) => {
  const image = useGetUrlImage(imageUrl, PORTRAIT_SIZE_IMAGE.UNCANNY_300X450);

  const handleImageMouseDown = (e: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
    e.stopPropagation();
  };

  return (
    <div key={id} className={styles.comicCard}>
      <img src={image} alt={title} className={styles.comicCard__image} onMouseDown={handleImageMouseDown} />
      <div className={styles.comicCard__info}>
        <span className={styles.comicCard__title}>{title}</span>
        <span className={styles.comicCard__year}>{year}</span>
      </div>
    </div>
  );
};

export default ComicCard;
