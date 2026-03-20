import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import App from "./App";

test("shows login UI by default", () => {
  render(<App />);

  expect(screen.getByText(/Sign in/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
});

test("shows loading state and then an error for wrong password", async () => {
  render(<App />);

  fireEvent.change(screen.getByLabelText(/Password/i), {
    target: { value: "wrong-password" },
  });
  fireEvent.click(screen.getByRole("button", { name: /Unlock website/i }));

  expect(screen.getByRole("button", { name: /Checking password/i })).toBeDisabled();
  expect(screen.getByLabelText(/Password/i)).toBeDisabled();

  await waitFor(() => {
    expect(screen.getByText(/Invalid password/i)).toBeInTheDocument();
  });
});

test("shows loading state and grants access for the correct password", async () => {
  render(<App />);

  fireEvent.change(screen.getByLabelText(/Password/i), {
    target: { value: "admin1234" },
  });
  fireEvent.click(screen.getByRole("button", { name: /Unlock website/i }));

  expect(screen.getByRole("button", { name: /Checking password/i })).toBeDisabled();

  await waitFor(() => {
    expect(screen.getByText(/Access granted/i)).toBeInTheDocument();
  });
  expect(screen.getByText(/Welcome to the website/i)).toBeInTheDocument();
});
