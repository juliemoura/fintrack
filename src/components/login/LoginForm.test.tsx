import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { MemoryRouter } from "react-router-dom";

import { describe, expect, it, vi } from "vitest";

import LoginForm from "./LoginForm";

vi.mock("@/store/hooks", () => ({
  useAppDispatch: () => vi.fn(),
  useAppSelector: () => ({
    status: "idle",
  }),
}));

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");

  return {
    ...actual,
    useNavigate: () => vi.fn(),
  };
});

describe("LoginForm", () => {
  it("deve renderizar formulário", () => {
    render(
      <MemoryRouter>
        <LoginForm />
      </MemoryRouter>,
    );

    expect(screen.getByPlaceholderText("seu@email.com")).toBeInTheDocument();

    expect(screen.getByPlaceholderText("Sua senha")).toBeInTheDocument();

    expect(
      screen.getByRole("button", {
        name: "Entrar",
      }),
    ).toBeInTheDocument();
  });

  it("deve permitir digitar email", async () => {
    render(
      <MemoryRouter>
        <LoginForm />
      </MemoryRouter>,
    );

    const input = screen.getByPlaceholderText("seu@email.com");

    await userEvent.type(input, "julie@email.com");

    expect(input).toHaveValue("julie@email.com");
  });
});
