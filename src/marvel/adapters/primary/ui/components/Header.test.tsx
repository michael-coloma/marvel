import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Header from "./Header";
import { ShowFavoriteCharactersContext } from "src/marvel/adapters/secondary/context/ShowFavoritesCharacterContext";

const renderHeader = (
  isLoading: boolean,
  countFavorites: number,
  showFavorites: boolean,
  setShowFavorites: jest.Mock,
  changeColorBorderBottom: boolean = false,
) => {
  return render(
    <ShowFavoriteCharactersContext.Provider value={{ showFavorites, setShowFavorites }}>
      <BrowserRouter>
        <Header isLoading={isLoading} countFavorites={countFavorites} changeBorderBottom={changeColorBorderBottom} />
      </BrowserRouter>
    </ShowFavoriteCharactersContext.Provider>,
  );
};

describe("Header component", () => {
  it("should render the Marvel logo", () => {
    const setShowFavorites = jest.fn();
    renderHeader(false, 0, false, setShowFavorites);
    const logo = screen.getByAltText("Marvel Logo");
    expect(logo).toBeInTheDocument();
  });

  it("should render the favorite icon and count", () => {
    const setShowFavorites = jest.fn();
    renderHeader(false, 5, false, setShowFavorites);

    const likesIcon = screen.getByAltText("Icon Heart");
    const likesCount = screen.getByText("5");

    expect(likesIcon).toBeInTheDocument();
    expect(likesCount).toBeInTheDocument();
  });

  it("should navigate and setShowFavorites to false when logo is clicked", () => {
    const setShowFavorites = jest.fn();
    renderHeader(false, 0, false, setShowFavorites);

    const logo = screen.getByAltText("Marvel Logo");
    fireEvent.click(logo);

    expect(setShowFavorites).toHaveBeenCalledWith(false);
  });

  it("should navigate and setShowFavorites to true when likes icon is clicked", () => {
    const setShowFavorites = jest.fn();
    renderHeader(false, 0, false, setShowFavorites);

    const likesIcon = screen.getByAltText("Icon Heart");
    fireEvent.click(likesIcon);

    expect(setShowFavorites).toHaveBeenCalledWith(true);
  });

  it("checks that style is added when header has property changeBorderBottom", () => {
    const setShowFavorites = jest.fn();
    renderHeader(false, 0, false, setShowFavorites, true);

    const headerDiv = screen.getByRole("roleHeader");
    expect(headerDiv).toHaveClass("header");

    expect(headerDiv).toHaveClass("header--border-color-bottom");
  });
});
