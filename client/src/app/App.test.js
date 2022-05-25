import { waitFor } from "@testing-library/react";
import React from "react";
import { render, fireEvent, screen } from "../test-utils";
import App from "./App";

describe("Login page", () => {
  test("render Login page", async () => {
    render(<App />);
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
      /ログイン/i
    );
    expect(screen.getByText(/email/i)).toBeInTheDocument();
    expect(screen.getByText(/パスワード/i)).toBeInTheDocument();
  });

  test("send wrong password", async () => {
    render(<App />);

    const button = screen.getByRole("button");
    fireEvent.submit(button, {
      target: {
        email: { value: "hanako@example.com" },
        password: { value: "a" },
      },
    });
    expect(
      await screen.findByText(/Emailまたはパスワードが間違っています。/i)
    ).toBeInTheDocument();
  });

  test("send correct email and password", async () => {
    render(<App />);

    const button = screen.getByRole("button");
    fireEvent.submit(button, {
      target: {
        email: { value: "hanako@example.com" },
        password: { value: "pass" },
      },
    });

    await waitFor(() => {
      expect(
        screen.queryByText(/Emailまたはパスワードが間違っています。/i)
      ).not.toBeInTheDocument();
    });
    expect(await screen.findByText(/タスクリスト/i)).toBeInTheDocument();
    expect(await screen.findByDisplayValue(/Take lunch./i)).toBeInTheDocument();
  });
});
