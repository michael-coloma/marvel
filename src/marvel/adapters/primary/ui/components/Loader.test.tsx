import React from "react";
import { render } from "@testing-library/react";
import Loader from "./Loader";

const renderLoader = (isLoading: boolean) => {
  return render(<Loader isLoading={isLoading} />);
};

describe("Header component", () => {
  it("should render loading", () => {
    const { getByTestId } = renderLoader(true);
    const loader = getByTestId("loader");
    expect(loader).toBeInTheDocument();
  });

  it("should render the favorite icon and count", () => {
    const { container } = renderLoader(false);

    expect(container.firstChild).toBeNull();
  });
});
