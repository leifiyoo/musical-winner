import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import App from "./App";

test("shows login UI by default", () => {
  render(<App />);

  expect(screen.getByText(/Sign in/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
});

test("shows an error for wrong password", () => {
  render(<App />);

  fireEvent.change(screen.getByLabelText(/Password/i), {
    target: { value: "wrong-password" },
  });
  fireEvent.click(screen.getByRole("button", { name: /Unlock website/i }));

  expect(screen.getByText(/Invalid password/i)).toBeInTheDocument();
});

test("grants access for the correct password", () => {
  render(<App />);

  fireEvent.change(screen.getByLabelText(/Password/i), {
    target: { value: "admin1234" },
  });
  fireEvent.click(screen.getByRole("button", { name: /Unlock website/i }));

  expect(screen.getByText(/Access granted/i)).toBeInTheDocument();
  expect(screen.getByText(/Welcome to the website/i)).toBeInTheDocument();
});
