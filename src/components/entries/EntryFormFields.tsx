import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/Select";
import {
  Controller,
  type Control,
  type FieldErrors,
  type UseFormSetValue,
} from "react-hook-form";
import { Label } from "../ui/Label";
import { Input } from "../ui/Input";
import { DatePicker } from "../ui/DatePicker";
import CurrencyInput from "react-currency-input-field";
import type { EntrySchema } from "./schema";

interface EntryFormFieldsProps {
  control: Control<EntrySchema>;
  setValue: UseFormSetValue<EntrySchema>;
  errors: FieldErrors<EntrySchema>;
}

const EntryFormFields = ({ control, errors }: EntryFormFieldsProps) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col">
        <Controller
          control={control}
          name="type"
          render={({ field }) => (
            <div className="space-y-2">
              <Label required>Tipo</Label>
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="receita">Receita</SelectItem>
                  <SelectItem value="despesa">Despesa</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
        />
        {errors.type && (
          <span className="text-red-500 text-sm">{errors.type.message}</span>
        )}
      </div>

      <div className="flex flex-col">
        <Controller
          control={control}
          name="category"
          render={({ field }) => (
            <div className="space-y-2">
              <Label required>Categoria</Label>
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione a categoria" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="poupanca">Poupança</SelectItem>
                  <SelectItem value="moradia">Moradia</SelectItem>
                  <SelectItem value="alimentacao">Alimentação</SelectItem>
                  <SelectItem value="transporte">Transporte</SelectItem>
                  <SelectItem value="lazer">Lazer</SelectItem>
                  <SelectItem value="saude">Saúde</SelectItem>
                  <SelectItem value="outros">Outros</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
        />
        {errors.category && (
          <span className="text-red-500 text-sm">
            {errors.category.message}
          </span>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <Label required>Valor</Label>
        <Controller
          control={control}
          name="value"
          render={({ field }) => (
            <CurrencyInput
              prefix="R$ "
              decimalSeparator=","
              groupSeparator="."
              decimalsLimit={2}
              placeholder="R$ 0,00"
              value={field.value}
              onValueChange={(value) =>
                field.onChange(Number(value?.replace(",", ".")) || 0)
              }
              className="w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-white"
            />
          )}
        />
        {errors.value && (
          <span className="text-red-500 text-sm">{errors.value.message}</span>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <Label required>Data</Label>
        <Controller
          control={control}
          name="date"
          render={({ field }) => (
            <DatePicker
              value={field.value}
              onChange={(date) => field.onChange(date)}
            />
          )}
        />
        {errors.date && (
          <span className="text-red-500 text-sm">{errors.date.message}</span>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <Label required>Descrição</Label>
        <Input
          type="string"
          placeholder="Digite aqui sua descrição..."
          {...control.register("description")}
        />
        {errors.description && (
          <span className="text-red-500 text-sm">
            {errors.description.message}
          </span>
        )}
      </div>
    </div>
  );
};

export default EntryFormFields;
