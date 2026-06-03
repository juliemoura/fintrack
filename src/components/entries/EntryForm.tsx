import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/Dialog";
import { Button } from "../ui/Button";
import { Plus } from "lucide-react";
import EntryFormFields from "./EntryFormFields";
import { useAppDispatch } from "@/store/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { type EntrySchema, entrySchema } from "./schema";
import { createEntry } from "@/store/entrySlice";
import { useState } from "react";
import { Toast } from "../ui/Toast";
import type { RootState } from "@/store/store";
import { useSelector } from "react-redux";

const EntryForm = () => {
  const dispatch = useAppDispatch(); // dispatch para enviar a nova entrada para o store
  const userId = useSelector((state: RootState) => state.auth.user?.id); // pegar o id do usuario logado

  const [open, setOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<EntrySchema>({
    resolver: zodResolver(entrySchema),
    defaultValues: {
      type: "",
      category: "",
      value: 0,
      date: "",
      description: "",
    },
  });

  const onSubmit = (data: EntrySchema) => {
    if (!userId) {
      setToast("Erro: usuário não identificado");
      return;
    }

    dispatch(
      createEntry({
        userId: userId as number, // userId já vem como número do auth
        type: data.type as "receita" | "despesa",
        category: data.category as
          | "poupanca"
          | "moradia"
          | "alimentacao"
          | "transporte"
          | "lazer"
          | "saude"
          | "outros",
        value: data.value || 0,
        date: data.date || "",
        description: data.description || "",
      }),
    )
      .then(() => {
        reset();
        setOpen(false);
        setToast("Entrada adicionada com sucesso!");
      })
      .catch(() => {
        setToast("Erro ao adicionar entrada");
      });
  };

  return (
    <>
      {toast && <Toast message={toast} onClose={() => setToast(null)} />}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className="bg-green-700">
            <Plus />
            Adicionar Entrada
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Formulário de Entrada</DialogTitle>
          </DialogHeader>
          <DialogDescription>
            Preencha os campos para adicionar uma nova entrada.
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
              <Button
                className="bg-green-700 w-max"
                type="submit"
                onClick={handleSubmit(onSubmit)}
              >
                Salvar
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default EntryForm;
