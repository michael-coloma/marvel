import { fireEvent, render, screen } from "@testing-library/react";
import Filter from "./Filter";

const onDataFilteredMock = jest.fn();
const mockData = [
  {
    id: "1",
    name: "Spiderman",
  },
  {
    id: "2",
    name: "Superman",
  },
];

describe("Filter component Test", () => {
  it("checks data is filtered by title 'Spiderman' correclty", () => {
    render(<Filter data={mockData} byFields={["name"]} onDataFiltered={onDataFilteredMock} />);

    const inputElement = screen.getByPlaceholderText("SEARCH A CHARACTER...");
    fireEvent.change(inputElement, { target: { value: "Spiderman" } });

    expect(inputElement).toBeInTheDocument();
    expect(onDataFilteredMock).toHaveBeenCalledWith([
      {
        id: "1",
        name: "Spiderman",
      },
    ]);
  });

  it("checks that filter is empty if there are not matches", () => {
    render(<Filter data={mockData} byFields={["name"]} onDataFiltered={onDataFilteredMock} />);

    const inputElement = screen.getByPlaceholderText("SEARCH A CHARACTER...");
    fireEvent.change(inputElement, { target: { value: "Batman" } });

    expect(inputElement).toBeInTheDocument();
    expect(onDataFilteredMock).toHaveBeenCalledWith([]);
  });
});
