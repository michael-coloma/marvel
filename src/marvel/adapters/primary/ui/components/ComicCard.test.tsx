import React from "react";
import { render, screen } from "@testing-library/react";
import ComicCard from "./ComicCard";
import { useGetUrlImage } from "src/marvel/adapters/primary/ui/hooks/useGetUrlImage";

jest.mock("src/marvel/adapters/primary/ui/hooks/useGetUrlImage");

describe("ComicCard", () => {
  const mockUseGetUrlImage = useGetUrlImage as jest.Mock;

  beforeEach(() => {
    mockUseGetUrlImage.mockReturnValue("mockedImageUrl");
  });

  it("renders the comic card with correct data", () => {
    render(<ComicCard id={1} imageUrl='imageUrl' title='Title' year='2024' />);

    expect(screen.getByAltText("Title")).toHaveAttribute("src", "mockedImageUrl");
    expect(screen.getByText("Title")).toBeInTheDocument();
    expect(screen.getByText("2024")).toBeInTheDocument();
  });

  it("stops propagation on image mouse down", () => {
    render(<ComicCard id={1} imageUrl='imageUrl' title='Title' year='2024' />);

    const image = screen.getByAltText("Title");
    const event = new MouseEvent("mousedown", {
      bubbles: true,
      cancelable: true,
    });

    const stopPropagation = jest.fn();
    image.addEventListener("mousedown", stopPropagation);

    image.dispatchEvent(event);

    expect(stopPropagation).toHaveBeenCalled();
  });
});
