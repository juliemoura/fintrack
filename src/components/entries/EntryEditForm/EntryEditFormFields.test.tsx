import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import type { Entry } from "@/store/entrySlice";
import EntryEditForm from ".";

// Mock do EntryFormFields — já testado, não precisa testar de novo aqui
vi.mock("./EntryFormFields", () => ({
  default: () => <div data-testid="entry-form-fields" />,
}));

const mockDispatch = vi.fn();
vi.mock("@/store/hooks", () => ({
  useAppDispatch: () => mockDispatch,
}));

const mockEntry: Entry = {
  id: "1",
  type: "receita",
  category: "outros",
  value: 100,
  date: "2024-01-01",
  description: "Teste",
  userId: 0,
};

const mockStore = configureStore({
  reducer: {
    auth: () => ({ user: { id: "user-1" } }),
    entry: () => ({ entries: [] }),
  },
});

const renderComponent = () =>
  render(
    <Provider store={mockStore}>
      <EntryEditForm entry={mockEntry} />
    </Provider>,
  );

describe("EntryEditForm", () => {
  it("deve renderizar o botão de abrir o dialog", () => {
    renderComponent();
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("deve abrir o dialog ao clicar no botão", async () => {
    renderComponent();
    await userEvent.click(screen.getByRole("button"));
    expect(screen.getByText("Formulário de Entrada")).toBeInTheDocument();
  });

  it("deve renderizar os botões de Cancelar e Editar dentro do dialog", async () => {
    renderComponent();
    await userEvent.click(screen.getByRole("button"));
    expect(
      screen.getByRole("button", { name: /cancelar/i }),
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /editar/i })).toBeInTheDocument();
  });

  it("deve fechar o dialog ao clicar em Cancelar", async () => {
    renderComponent();
    await userEvent.click(screen.getByRole("button"));
    await userEvent.click(screen.getByRole("button", { name: /cancelar/i }));
    expect(screen.queryByText("Formulário de Entrada")).not.toBeInTheDocument();
  });

  it("deve chamar dispatch ao submeter o formulário", async () => {
    renderComponent();
    await userEvent.click(screen.getByRole("button"));
    await userEvent.click(screen.getByRole("button", { name: /editar/i }));
    expect(mockDispatch).toHaveBeenCalled();
  });

  it("deve exibir toast de sucesso após editar", async () => {
    renderComponent();
    await userEvent.click(screen.getByRole("button"));
    await userEvent.click(screen.getByRole("button", { name: /editar/i }));
    expect(
      await screen.findByText("Entrada editada com sucesso!"),
    ).toBeInTheDocument();
  });
});
