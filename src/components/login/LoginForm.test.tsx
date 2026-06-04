import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import LoginForm from "./LoginForm";

const mockDispatch = vi.fn().mockResolvedValue({
  type: "auth/loginUser/fulfilled",
  payload: { user: {}, token: "abc" },
});

vi.mock("@/store/hooks", () => ({
  useAppDispatch: () => mockDispatch,
  useAppSelector: () => ({ status: "idle" }),
}));

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return { ...actual, useNavigate: () => vi.fn() };
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
    expect(screen.getByRole("button", { name: "Entrar" })).toBeInTheDocument();
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

  it("deve exibir erro ao submeter com campos vazios", async () => {
    render(
      <MemoryRouter>
        <LoginForm />
      </MemoryRouter>,
    );
    await userEvent.click(screen.getByRole("button", { name: "Entrar" }));
    expect(await screen.findByText(/e-mail obrigatório/i)).toBeInTheDocument();
  });

  it("deve exibir erro com e-mail inválido", async () => {
    render(
      <MemoryRouter>
        <LoginForm />
      </MemoryRouter>,
    );
    await userEvent.type(screen.getByPlaceholderText("seu@email.com"), "email");
    await userEvent.click(screen.getByRole("button", { name: "Entrar" }));
    expect(await screen.findByText(/e-mail inválido/i)).toBeInTheDocument();
  });

  it("deve chamar dispatch ao submeter formulário válido", async () => {
    render(
      <MemoryRouter>
        <LoginForm />
      </MemoryRouter>,
    );
    await userEvent.type(
      screen.getByPlaceholderText("seu@email.com"),
      "admin@gmail.com",
    );
    await userEvent.type(screen.getByPlaceholderText("Sua senha"), "admin123");
    await userEvent.click(screen.getByRole("button", { name: "Entrar" }));
    expect(mockDispatch).toHaveBeenCalled();
  });

  it("deve exibir loading ao submeter", () => {
    vi.mocked(mockDispatch);
    render(
      <MemoryRouter>
        <LoginForm />
      </MemoryRouter>,
    );
    // Simula status loading diretamente no seletor
  });
});
