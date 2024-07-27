import React, { useLayoutEffect, useRef, useState } from "react";
import { Comics, DATE_TYPE_COMIC } from "src/marvel/core/domain/entities/comics";
import { REPLACE_SIZE_IMAGE } from "../../types/constants";
import { PORTRAIT_SIZE } from "../../types/enums";

import * as styles from "./ComicsList.module.css";

interface ComicListProps {
  data: Comics[];
}

const SPEED_FACTOR_SCROLL = 3;

const ComicList = ({ data: comics }: ComicListProps) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const listRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (listRef.current) {
      const maxScrollLeft = listRef.current.scrollWidth - listRef.current.clientWidth;
      const currentScroll = listRef.current.scrollLeft;
      setScrollPosition((currentScroll / maxScrollLeft) * 100);
    }
  };

  useLayoutEffect(() => {
    const slider = listRef.current;
    let isDown = false;
    let startX: number;
    let scrollLeft: number;

    const handleMouseDown = (e: MouseEvent) => {
      isDown = true;
      slider!.classList.add("active");
      startX = e.pageX - slider!.offsetLeft;
      scrollLeft = slider!.scrollLeft;
    };

    const handleMouseLeave = () => {
      isDown = false;
      slider!.classList.remove("active");
    };

    const handleMouseUp = () => {
      isDown = false;
      slider!.classList.remove("active");
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - slider!.offsetLeft;
      const walk = (x - startX) * SPEED_FACTOR_SCROLL;
      slider!.scrollLeft = scrollLeft - walk;
      handleScroll();
    };

    if (slider) {
      slider.addEventListener("mousedown", handleMouseDown);
      slider.addEventListener("mouseleave", handleMouseLeave);
      slider.addEventListener("mouseup", handleMouseUp);
      slider.addEventListener("mousemove", handleMouseMove);

      return () => {
        slider.removeEventListener("mousedown", handleMouseDown);
        slider.removeEventListener("mouseleave", handleMouseLeave);
        slider.removeEventListener("mouseup", handleMouseUp);
        slider.removeEventListener("mousemove", handleMouseMove);
      };
    }
  }, [listRef]);

  const handleImageMouseDown = (e: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
    e.stopPropagation();
  };

  return (
    <div className={styles.comicList}>
      <span className={styles["comicList___title-section"]}>COMICS</span>
      <div className={styles.comicList__container} ref={listRef} onScroll={handleScroll}>
        {comics.map((comic) => {
          const yearOnsale = comic.dates.find((date) => date.type === DATE_TYPE_COMIC.ONSALE_DATE);
          const year = yearOnsale ? new Date(yearOnsale.date).getFullYear() : "without year";

          return (
            <div key={comic.id} className={styles.comicList__card}>
              <img
                src={comic.imageUrl.replace(REPLACE_SIZE_IMAGE, PORTRAIT_SIZE.UNCANNY_300X450)}
                alt={comic.title}
                className={styles.comicList__image}
                onMouseDown={handleImageMouseDown}
              />
              <div className={styles.comicList__info}>
                <span className={styles.comicList__title}>{comic.title}</span>
                <span className={styles.comicList__year}>{year}</span>
              </div>
            </div>
          );
        })}
      </div>
      <div className={styles.comicList__scrollBar}>
        <div className={styles.comicList__scrollThumb} style={{ width: `${scrollPosition}%` }}></div>
      </div>
    </div>
  );
};

export default ComicList;