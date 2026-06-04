import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useForm } from "react-hook-form";
import { describe, expect, it, vi } from "vitest";
import type { EntrySchema } from "../schema";
import type { ReactNode, ChangeEvent } from "react";
import EntryFormFields from ".";

// Mock do Select do Radix UI para evitar problemas com jsdom
vi.mock("../../ui/Select", () => ({
  Select: ({
    onValueChange,
    value,
    children,
  }: {
    onValueChange: (value: string) => void;
    value: string;
    children: ReactNode;
  }) => (
    <select
      data-testid="select"
      value={value}
      onChange={(e: ChangeEvent<HTMLSelectElement>) =>
        onValueChange(e.target.value)
      }
    >
      {children}
    </select>
  ),
  SelectTrigger: ({ children }: { children: ReactNode }) => <>{children}</>,
  SelectValue: ({ placeholder }: { placeholder: string }) => (
    <option value="">{placeholder}</option>
  ),
  SelectContent: ({ children }: { children: ReactNode }) => <>{children}</>,
  SelectItem: ({ value, children }: { value: string; children: ReactNode }) => (
    <option value={value}>{children}</option>
  ),
}));

const EntryFormFieldsWrapper = ({
  defaultValues,
}: {
  defaultValues?: Partial<EntrySchema>;
}) => {
  const {
    control,
    setValue,
    formState: { errors },
  } = useForm<EntrySchema>({ defaultValues });

  return (
    <EntryFormFields control={control} setValue={setValue} errors={errors} />
  );
};

describe("EntryFormFields", () => {
  it("deve renderizar todos os campos do formulário", () => {
    render(<EntryFormFieldsWrapper />);

    expect(screen.getByText("Tipo")).toBeInTheDocument();
    expect(screen.getByText("Categoria")).toBeInTheDocument();
    expect(screen.getByText("Valor")).toBeInTheDocument();
    expect(screen.getByText("Data")).toBeInTheDocument();
    expect(screen.getByText("Descrição")).toBeInTheDocument();
  });

  it("deve renderizar o placeholder do campo Tipo", () => {
    render(<EntryFormFieldsWrapper />);

    expect(screen.getByText("Selecione o tipo")).toBeInTheDocument();
  });

  it("deve renderizar o placeholder do campo Categoria", () => {
    render(<EntryFormFieldsWrapper />);

    expect(screen.getByText("Selecione a categoria")).toBeInTheDocument();
  });

  it("deve renderizar o campo de valor com placeholder correto", () => {
    render(<EntryFormFieldsWrapper />);

    expect(screen.getByPlaceholderText("R$ 0,00")).toBeInTheDocument();
  });

  it("deve renderizar o campo de descrição com placeholder correto", () => {
    render(<EntryFormFieldsWrapper />);

    expect(
      screen.getByPlaceholderText("Digite aqui sua descrição..."),
    ).toBeInTheDocument();
  });

  it("deve permitir digitar no campo de descrição", async () => {
    render(<EntryFormFieldsWrapper />);

    const input = screen.getByPlaceholderText("Digite aqui sua descrição...");
    await userEvent.type(input, "Pagamento de aluguel");

    expect(input).toHaveValue("Pagamento de aluguel");
  });

  it("deve permitir digitar no campo de valor", async () => {
    render(<EntryFormFieldsWrapper />);

    const input = screen.getByPlaceholderText("R$ 0,00");
    await userEvent.type(input, "1500");

    expect(input).toHaveValue("R$ 1.500");
  });

  it("deve abrir as opções ao clicar no select de Tipo", async () => {
    render(<EntryFormFieldsWrapper />);

    // Agora é um <select> nativo — sem problema de pointer-events
    const tipoSelect = screen.getAllByRole("combobox")[0];

    await userEvent.selectOptions(tipoSelect, "receita");

    expect(tipoSelect).toHaveValue("receita");
  });

  it("deve selecionar a opção Receita no campo Tipo", async () => {
    render(<EntryFormFieldsWrapper />);

    await userEvent.click(screen.getByText("Selecione o tipo"));
    await userEvent.click(screen.getByText("Receita"));

    expect(screen.getByText("Receita")).toBeInTheDocument();
  });

  it("deve selecionar a opção Despesa no campo Tipo", async () => {
    render(<EntryFormFieldsWrapper />);

    await userEvent.click(screen.getByText("Selecione o tipo"));
    await userEvent.click(screen.getByText("Despesa"));

    expect(screen.getByText("Despesa")).toBeInTheDocument();
  });

  it("deve abrir as opções ao clicar no select de Categoria", async () => {
    render(<EntryFormFieldsWrapper />);

    await userEvent.click(screen.getByText("Selecione a categoria"));

    expect(screen.getByText("Poupança")).toBeInTheDocument();
    expect(screen.getByText("Moradia")).toBeInTheDocument();
    expect(screen.getByText("Alimentação")).toBeInTheDocument();
    expect(screen.getByText("Transporte")).toBeInTheDocument();
    expect(screen.getByText("Lazer")).toBeInTheDocument();
    expect(screen.getByText("Saúde")).toBeInTheDocument();
    expect(screen.getByText("Outros")).toBeInTheDocument();
  });

  it("deve selecionar uma categoria", async () => {
    render(<EntryFormFieldsWrapper />);

    await userEvent.click(screen.getByText("Selecione a categoria"));
    await userEvent.click(screen.getByText("Alimentação"));

    expect(screen.getByText("Alimentação")).toBeInTheDocument();
  });

  it("deve exibir mensagem de erro no campo Tipo quando fornecida", () => {
    const Wrapper = () => {
      const { control, setValue } = useForm<EntrySchema>();
      const errors = {
        type: { message: "Tipo é obrigatório", type: "required" },
      } as Parameters<typeof EntryFormFields>[0]["errors"];

      return (
        <EntryFormFields
          control={control}
          setValue={setValue}
          errors={errors}
        />
      );
    };

    render(<Wrapper />);

    expect(screen.getByText("Tipo é obrigatório")).toBeInTheDocument();
  });

  it("deve exibir mensagem de erro no campo Categoria quando fornecida", () => {
    const Wrapper = () => {
      const { control, setValue } = useForm<EntrySchema>();
      const errors = {
        category: { message: "Categoria é obrigatória", type: "required" },
      } as Parameters<typeof EntryFormFields>[0]["errors"];

      return (
        <EntryFormFields
          control={control}
          setValue={setValue}
          errors={errors}
        />
      );
    };

    render(<Wrapper />);

    expect(screen.getByText("Categoria é obrigatória")).toBeInTheDocument();
  });

  it("deve exibir mensagem de erro no campo Valor quando fornecida", () => {
    const Wrapper = () => {
      const { control, setValue } = useForm<EntrySchema>();
      const errors = {
        value: { message: "Valor é obrigatório", type: "required" },
      } as Parameters<typeof EntryFormFields>[0]["errors"];

      return (
        <EntryFormFields
          control={control}
          setValue={setValue}
          errors={errors}
        />
      );
    };

    render(<Wrapper />);

    expect(screen.getByText("Valor é obrigatório")).toBeInTheDocument();
  });

  it("deve exibir mensagem de erro no campo Descrição quando fornecida", () => {
    const Wrapper = () => {
      const { control, setValue } = useForm<EntrySchema>();
      const errors = {
        description: { message: "Descrição é obrigatória", type: "required" },
      } as Parameters<typeof EntryFormFields>[0]["errors"];

      return (
        <EntryFormFields
          control={control}
          setValue={setValue}
          errors={errors}
        />
      );
    };

    render(<Wrapper />);

    expect(screen.getByText("Descrição é obrigatória")).toBeInTheDocument();
  });

  it("deve exibir mensagem de erro no campo Data quando fornecida", () => {
    const Wrapper = () => {
      const { control, setValue } = useForm<EntrySchema>();
      const errors = {
        date: { message: "Data é obrigatória", type: "required" },
      } as Parameters<typeof EntryFormFields>[0]["errors"];

      return (
        <EntryFormFields
          control={control}
          setValue={setValue}
          errors={errors}
        />
      );
    };

    render(<Wrapper />);

    expect(screen.getByText("Data é obrigatória")).toBeInTheDocument();
  });

  it("deve renderizar os campos com valores padrão fornecidos", () => {
    render(
      <EntryFormFieldsWrapper
        defaultValues={{ description: "Conta de luz" }}
      />,
    );

    expect(screen.getByDisplayValue("Conta de luz")).toBeInTheDocument();
  });
});
