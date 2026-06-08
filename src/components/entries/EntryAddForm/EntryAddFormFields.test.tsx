import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import EntryAddForm from ".";

// Caminho relativo ao componente, não ao arquivo de teste
vi.mock("../EntryFormFields", () => ({
  default: () => <div data-testid="entry-form-fields" />,
}));

// Mock do useForm para forçar o submit sem validação
vi.mock("react-hook-form", async () => {
  const actual = await vi.importActual("react-hook-form");
  return {
    ...actual,
    useForm: () => ({
      control: {},
      setValue: vi.fn(),
      reset: vi.fn(),
      handleSubmit: (fn: (data: object) => void) => () =>
        fn({
          type: "receita",
          category: "outros",
          value: 100,
          date: "2024-01-01",
          description: "Teste",
        }),
      formState: { errors: {} },
    }),
  };
});

// dispatch precisa retornar uma Promise pois o componente faz .then()/.catch()
const mockDispatch = vi.fn().mockResolvedValue({});
vi.mock("@/store/hooks", () => ({
  useAppDispatch: () => mockDispatch,
}));

const mockStore = configureStore({
  reducer: {
    auth: () => ({ user: { id: 1 } }), // userId é 1 number
    entry: () => ({ entries: [] }),
  },
});

const renderComponent = () =>
  render(
    <Provider store={mockStore}>
      <EntryAddForm /> {/* sem props */}
    </Provider>,
  );

describe("EntryAddForm", () => {
  it("deve renderizar o botão de abrir o dialog", () => {
    renderComponent();
    expect(
      screen.getByRole("button", { name: /adicionar entrada/i }),
    ).toBeInTheDocument();
  });

  it("deve abrir o dialog ao clicar no botão", async () => {
    renderComponent();
    await userEvent.click(
      screen.getByRole("button", { name: /adicionar entrada/i }),
    );
    expect(screen.getByText("Formulário de Entrada")).toBeInTheDocument();
  });

  it("deve renderizar os botões de Cancelar e Salvar dentro do dialog", async () => {
    renderComponent();
    await userEvent.click(
      screen.getByRole("button", { name: /adicionar entrada/i }),
    );
    expect(
      screen.getByRole("button", { name: /cancelar/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /salvar/i }), // botão é "Salvar", não "Adicionar"
    ).toBeInTheDocument();
  });

  it("deve fechar o dialog ao clicar em Cancelar", async () => {
    renderComponent();
    await userEvent.click(
      screen.getByRole("button", { name: /adicionar entrada/i }),
    );
    await userEvent.click(screen.getByRole("button", { name: /cancelar/i }));
    expect(screen.queryByText("Formulário de Entrada")).not.toBeInTheDocument();
  });

  it("deve chamar dispatch ao submeter o formulário", async () => {
    renderComponent();
    await userEvent.click(
      screen.getByRole("button", { name: /adicionar entrada/i }),
    );
    await userEvent.click(screen.getByRole("button", { name: /salvar/i }));
    expect(mockDispatch).toHaveBeenCalled();
  });

  it("deve exibir toast de sucesso após adicionar", async () => {
    renderComponent();
    await userEvent.click(
      screen.getByRole("button", { name: /adicionar entrada/i }),
    );
    await userEvent.click(screen.getByRole("button", { name: /salvar/i }));
    expect(
      await screen.findByText("Entrada adicionada com sucesso!"),
    ).toBeInTheDocument();
  });

  it("deve exibir toast de erro se usuário não estiver logado", async () => {
    // Store sem usuário logado
    const storeWithoutUser = configureStore({
      reducer: {
        auth: () => ({ user: null }),
        entry: () => ({ entries: [] }),
      },
    });

    render(
      <Provider store={storeWithoutUser}>
        <EntryAddForm />
      </Provider>,
    );

    await userEvent.click(
      screen.getByRole("button", { name: /adicionar entrada/i }),
    );
    await userEvent.click(screen.getByRole("button", { name: /salvar/i }));
    expect(
      await screen.findByText("Erro: usuário não identificado"),
    ).toBeInTheDocument();
  });
});
