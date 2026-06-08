import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import EntryList from ".";

// Componentes já testados separadamente
vi.mock("./EntryEditForm", () => ({
  default: () => <div data-testid="entry-edit-form" />,
}));

// Declarar ANTES dos vi.mock usando vi.hoisted
const { mockDispatch } = vi.hoisted(() => ({
  mockDispatch: vi.fn(),
}));

vi.mock("@/store/store", () => ({
  useAppDispatch: () => mockDispatch,
}));

vi.mock("@/store/entrySlice", async () => {
  const actual = await vi.importActual("@/store/entrySlice");
  return {
    ...actual,
    removeEntry: vi.fn((id) => ({ type: "entry/removeEntry", payload: id })),
  };
});

const mockEntries = [
  {
    id: "1",
    type: "receita",
    category: "outros",
    value: 1500,
    date: "2024-01-15",
    description: "Salário",
    userId: 1,
  },
  {
    id: "2",
    type: "despesa",
    category: "alimentacao",
    value: 50,
    date: "2024-01-16",
    description: "Mercado",
    userId: 1,
  },
];

const makeStore = (entries = mockEntries) =>
  configureStore({
    reducer: {
      auth: () => ({ user: { id: 1 } }),
      entry: () => ({ entries }),
    },
  });

const renderComponent = (entries = mockEntries) =>
  render(
    <Provider store={makeStore(entries)}>
      <EntryList />
    </Provider>,
  );

describe("EntryList", () => {
  it("deve renderizar as entradas da lista", () => {
    renderComponent();
    expect(screen.getByText("Salário")).toBeInTheDocument();
    expect(screen.getByText("Mercado")).toBeInTheDocument();
  });

  it("deve renderizar o tipo da entrada com capitalização", () => {
    renderComponent();
    expect(screen.getByText("receita")).toBeInTheDocument();
    expect(screen.getByText("despesa")).toBeInTheDocument();
  });

  it("deve renderizar a data formatada em português", () => {
    renderComponent();
    expect(screen.getByText("15 de janeiro de 2024")).toBeInTheDocument();
    expect(screen.getByText("16 de janeiro de 2024")).toBeInTheDocument();
  });

  it("deve renderizar o valor formatado como moeda", () => {
    renderComponent();
    expect(screen.getByText("R$ 1.500,00")).toBeInTheDocument();
    expect(screen.getByText("R$ 50,00")).toBeInTheDocument();
  });

  it("deve renderizar o botão de deletar para cada entrada", () => {
    renderComponent();
    const deleteButtons = screen.getAllByRole("button");
    // cada entrada tem 1 botão de delete (o edit é mockado sem button)
    expect(deleteButtons).toHaveLength(mockEntries.length);
  });

    it("deve chamar dispatch com removeEntry ao clicar em deletar", async () => {
    const { removeEntry } = await import("@/store/entrySlice");

    renderComponent();
    const deleteButtons = screen.getAllByRole("button");
    await userEvent.click(deleteButtons[0]);

    expect(mockDispatch).toHaveBeenCalledWith(
        removeEntry(mockEntries[0].id), // compara com o retorno mockado
    );
    });

  it("deve renderizar o EntryEditForm para cada entrada", () => {
    renderComponent();
    const editForms = screen.getAllByTestId("entry-edit-form");
    expect(editForms).toHaveLength(mockEntries.length);
  });

  it("não deve renderizar nenhum card quando a lista estiver vazia", () => {
    renderComponent([]);
    expect(screen.queryByText("Salário")).not.toBeInTheDocument();
    expect(screen.queryByText("Mercado")).not.toBeInTheDocument();
  });
});