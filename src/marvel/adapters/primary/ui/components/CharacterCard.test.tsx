import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import CharacterCard from "./CharacterCard";
import { FavoriteCharactersContext } from "src/marvel/adapters/secondary/context/FavoriteCharactersContext";

// Mock LazyLoad
jest.mock("react-lazyLoad", () => {
  const MockLazyLoad: React.FC<{ children: React.ReactNode }> = ({ children }) => <>{children}</>;
  MockLazyLoad.displayName = "LazyLoad";
  return MockLazyLoad;
});

// Mock data
const character = {
  id: 1,
  imageUrl: "http://example.com/image.jpg",
  name: "Spiderman",
};

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

const renderCharacterCard = (favoriteCharacterIds: number[], setFavoriteCharacterIds: jest.Mock) => {
  return render(
    <FavoriteCharactersContext.Provider value={{ favoriteCharacterIds, setFavoriteCharacterIds }}>
      <BrowserRouter>
        <CharacterCard {...character} />
      </BrowserRouter>
    </FavoriteCharactersContext.Provider>,
  );
};

describe("CharacterCard component", () => {
  it("should render the character image and name", () => {
    const setFavoriteCharacterIds = jest.fn();
    renderCharacterCard([], setFavoriteCharacterIds);

    const image = screen.getByAltText(character.name);
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", "http://example.com/image.jpg");

    const name = screen.getByText(character.name.toUpperCase());
    expect(name).toBeInTheDocument();
  });

  it("should handle like button click", () => {
    const setFavoriteCharacterIds = jest.fn();
    renderCharacterCard([], setFavoriteCharacterIds);

    const likeButton = screen.getByRole("img", { name: /ICON_LIKE/i });
    fireEvent.click(likeButton);

    expect(setFavoriteCharacterIds).toHaveBeenCalledWith([character.id]);
  });

  it("should navigate to character page on card click", async () => {
    const setFavoriteCharacterIds = jest.fn();
    renderCharacterCard([], setFavoriteCharacterIds);

    const card = screen.getByText(character.name.toUpperCase()).closest("div");

    fireEvent.click(card!);

    expect(mockNavigate).toHaveBeenCalledWith(`/character/${character.id}`);
  });
});
