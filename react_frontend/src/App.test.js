import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders login screen", () => {
  render(<App />);
  const title = screen.getByText(/School Management System/i);
  expect(title).toBeInTheDocument();
});
