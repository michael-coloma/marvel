import React, { useCallback, useContext } from "react";
import LogoMarvel from "@assets/LogoMarvel.svg";
import { useNavigate } from "react-router-dom";
import IconLikes from "@assets/IconBigHearthLike.svg";
import { ShowFavoriteCharactersContext } from "src/marvel/adapters/secondary/context/ShowFavoritesCharacterContext";
import Loader from "./Loader";
import { ROUTES_PATH } from "src/marvel/config/routes/routes";

import * as style from "./Header.module.css";

interface HeaderProps {
  isLoading: boolean;
  countFavorites: number;
  changeBorderBottom?: boolean;
}

const Header = ({ isLoading, countFavorites, changeBorderBottom = false }: HeaderProps) => {
  const navigate = useNavigate();
  const { setShowFavorites } = useContext(ShowFavoriteCharactersContext);

  const handleLogoClick = useCallback(() => {
    setShowFavorites(false);
    navigate(ROUTES_PATH.CHARACTERS);
  }, [setShowFavorites, navigate]);

  const handleLikesClick = useCallback(() => {
    setShowFavorites(true);
    navigate(ROUTES_PATH.CHARACTERS);
  }, [setShowFavorites, navigate]);

  return (
    <>
      <div
        role='roleHeader'
        className={`${style.header} ${changeBorderBottom && style["header--border-color-bottom"]}`}
      >
        <img src={LogoMarvel} alt='Marvel Logo' onClick={() => handleLogoClick()} />
        <div className={style["header__likes-container"]}>
          <img
            className={style["header__likes-icon"]}
            alt='Icon Heart'
            src={IconLikes}
            onClick={() => handleLikesClick()}
          />
          <span className={style["header__likes-number"]}>{countFavorites}</span>
        </div>
      </div>
      <Loader isLoading={isLoading} />
    </>
  );
};

export default React.memo(Header);
