import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import RelatoryList from ".";

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
    value: 50.5,
    date: "2024-01-16",
    description: "Mercado",
    userId: 1,
  },
];

const makeStore = (entries = mockEntries) =>
  configureStore({
    reducer: {
      entry: () => ({ entries }),
    },
  });

const renderComponent = (entries = mockEntries) =>
  render(
    <Provider store={makeStore(entries)}>
      <RelatoryList />
    </Provider>,
  );

describe("RelatoryList", () => {
  // Cabeçalho
  it("deve renderizar os cabeçalhos da tabela", () => {
    renderComponent();
    expect(screen.getByText("Data")).toBeInTheDocument();
    expect(screen.getByText("Descrição")).toBeInTheDocument();
    expect(screen.getByText("Categoria")).toBeInTheDocument();
    expect(screen.getByText("Tipo")).toBeInTheDocument();
    expect(screen.getByText("Valor")).toBeInTheDocument();
  });

  // Dados
  it("deve renderizar as descrições das entradas", () => {
    renderComponent();
    expect(screen.getByText("Salário")).toBeInTheDocument();
    expect(screen.getByText("Mercado")).toBeInTheDocument();
  });

  it("deve renderizar as datas formatadas em dd/MM/yyyy", () => {
    renderComponent();
    expect(screen.getByText("15/01/2024")).toBeInTheDocument();
    expect(screen.getByText("16/01/2024")).toBeInTheDocument();
  });

  it("deve renderizar o valor com sinal + para receita", () => {
    renderComponent();
    expect(screen.getByText("+R$ 1.500,00")).toBeInTheDocument();
  });

  it("deve renderizar o valor com sinal - para despesa", () => {
    renderComponent();
    expect(screen.getByText("-R$ 50,50")).toBeInTheDocument();
  });

  it("deve exibir badge Receita para entradas do tipo receita", () => {
    renderComponent();
    expect(screen.getByText("Receita")).toBeInTheDocument();
  });

  it("deve exibir badge Despesa para entradas do tipo despesa", () => {
    renderComponent();
    expect(screen.getByText("Despesa")).toBeInTheDocument();
  });

  // Lista vazia
  it("não deve renderizar linhas quando a lista estiver vazia", () => {
    renderComponent([]);
    expect(screen.queryByText("Salário")).not.toBeInTheDocument();
    expect(screen.queryByText("Mercado")).not.toBeInTheDocument();
  });

  // Categoria
  it("deve renderizar o label da categoria quando reconhecida", () => {
    renderComponent();
    // "alimentacao" tem label definido em categories
    expect(screen.getByText("Alimentação")).toBeInTheDocument();
  });

  it("deve renderizar o valor bruto da categoria quando não reconhecida", () => {
    const entriesComCategoriaDesconhecida = [
      { ...mockEntries[0], category: "categoria-inexistente" },
    ];
    renderComponent(entriesComCategoriaDesconhecida);
    expect(screen.getAllByText("categoria-inexistente")).toHaveLength(2); // ícone + label
  });
});