import React from "react";
// import { rest } from "msw";
// import { setupServer } from "msw/node";
import { render, fireEvent, screen } from "../../test-utils";
import Login from "./login";

test("render Login page", async () => {
  render(<Login />);
  expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(/Login/i);
  expect(screen.getByText(/email/i)).toBeInTheDocument();
  expect(screen.getByText(/password/i)).toBeInTheDocument();
});
