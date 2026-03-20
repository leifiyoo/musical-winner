import React, { useState } from "react";
import "./App.css";

const ACCESS_PASSWORD = "admin1234";

export default function App() {
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    if (password === ACCESS_PASSWORD) {
      setIsAuthenticated(true);
      setError("");
      return;
    }

    setError("Invalid password. Please try again.");
  };

  if (isAuthenticated) {
    return (
      <main className="app-root">
        <section className="auth-card auth-card--wide">
          <p className="auth-kicker">Access granted</p>
          <h1 className="auth-title">Welcome to the website</h1>
          <p className="auth-text">
            You are now logged in and can access protected content.
          </p>
        </section>
      </main>
    );
  }

  return (
    <main className="app-root">
      <section className="auth-card">
        <p className="auth-kicker">Protected website</p>
        <h1 className="auth-title">Sign in</h1>
        <p className="auth-text">
          Enter your password to access the website.
        </p>

        <form className="auth-form" onSubmit={handleSubmit}>
          <input
            className="sr-only"
            type="text"
            name="username"
            autoComplete="username"
            tabIndex="-1"
            readOnly
          />
          <label className="auth-label" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="auth-input"
            placeholder="Enter password"
            autoComplete="current-password"
          />
          {error && <p className="auth-error">{error}</p>}
          <button type="submit" className="auth-button">
            Unlock website
          </button>
        </form>
      </section>
    </main>
  );
}
