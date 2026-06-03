import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/Dialog";
import { Button } from "../ui/Button";
import { Pencil } from "lucide-react";
import EntryFormFields from "./EntryFormFields";
import { useAppDispatch } from "@/store/hooks";
import { useForm } from "react-hook-form";
import { editEntry, type Entry } from "@/store/entrySlice";
import { entrySchema, type EntrySchema } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { Toast } from "../ui/Toast";
import type { RootState } from "@/store/store";
import { useSelector } from "react-redux";

interface EntryEditFormProps {
  entry: Entry;
}

const EntryEditForm = ({ entry }: EntryEditFormProps) => {
  const dispatch = useAppDispatch(); // dispatch para enviar a nova entrada para o store
  const userId = useSelector((state: RootState) => state.auth.user?.id); // pegar o id do usuario logado

  const [open, setOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const {
    control,
    setValue,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EntrySchema>({
    resolver: zodResolver(entrySchema),
    defaultValues: {
      type: entry.type,
      category: entry.category,
      value: entry.value,
      date: entry.date,
      description: entry.description,
    },
  });

  useEffect(() => {
    reset({
      type: entry.type,
      category: entry.category,
      value: entry.value,
      date: entry.date,
      description: entry.description,
    });
  }, [entry, reset]);

  const onSubmit = (data: EntrySchema) => {
    dispatch(
      editEntry({
        userId: userId!,
        id: entry.id,
        type: (data.type ?? "receita") as "receita" | "despesa",
        category: (data.category ?? "outros") as
          | "poupanca"
          | "moradia"
          | "alimentacao"
          | "transporte"
          | "lazer"
          | "saude"
          | "outros",
        value: data.value ?? 0,
        date: data.date ?? "",
        description: data.description ?? "",
      }),
    );
    reset();
    setOpen(false);
    setToast("Entrada editada com sucesso!");
  };

  if (!entry) return null; // Se a entrada não existir, não renderiza o formulário

  return (
    <>
      {toast && <Toast message={toast} onClose={() => setToast(null)} />}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className="bg-green-700">
            <Pencil />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Formulário de Entrada</DialogTitle>
          </DialogHeader>
          <DialogDescription>
            Preencha os campos para editar a entrada.
          </DialogDescription>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full flex flex-col gap-2"
          >
            <EntryFormFields
              control={control}
              setValue={setValue}
              errors={errors}
            />

            <div className="flex gap-2 justify-end">
              <Button
                className="bg-red-700 w-max"
                type="button"
                onClick={() => setOpen(false)}
              >
                Cancelar
              </Button>
              <Button className="bg-green-700 w-max" type="submit">
                Editar
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default EntryEditForm;
