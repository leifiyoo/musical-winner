import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

test("shows profile hero content", () => {
  render(<App />);

  expect(screen.getByRole("heading", { name: /blatt/i })).toBeInTheDocument();
  expect(screen.getByText(/Alle wichtigen Links an einem Ort/i)).toBeInTheDocument();
});

test("renders important social links", () => {
  render(<App />);

  expect(screen.getByRole("link", { name: /Instagram @blatt/i })).toHaveAttribute(
    "href",
    "https://instagram.com/blatt"
  );
  expect(screen.getByRole("link", { name: /YouTube @blattmusic/i })).toBeInTheDocument();
  expect(screen.getByRole("link", { name: /Spotify Blatt/i })).toBeInTheDocument();
});

test("shows a footer link", () => {
  render(<App />);

  expect(screen.getByRole("link", { name: /github.com\/blatt/i })).toHaveAttribute(
    "href",
    "https://github.com/blatt"
  );
});
