import { useSelector } from "react-redux";

import { useAppDispatch, type RootState } from "@/store/store";

import { removeEntry } from "@/store/entrySlice";

import { Card } from "../ui/Card";
import { Button } from "../ui/Button";

import { Trash } from "lucide-react";

import { format } from "date-fns";
import { parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";

import { categories, formatCurrency } from "@/lib/utils";

import EntryEditForm from "./EntryEditForm";

const EntryList = () => {
  const dispatch = useAppDispatch();

  // pega as entradas do store, que é um array de entradas
  const entries = useSelector((state: RootState) => state.entry.entries);

  // função para deletar uma entrada, recebe o id da entrada e dispatch a ação de remover a entrada do store
  const handleDelete = (id: string) => {
    dispatch(removeEntry(id));
  };

  return (
    <div className="grid gap-2 grid-cols-2">
      {entries.map((entry) => {
        const isReceita = entry.type === "receita";

        return (
          <Card key={entry.id} className="hover:scale-102 transition-transform">
            <div className="border-b-2 border-slate-700 pb-2 mb-4 flex justify-between items-center">
              <span className="text-text-muted">
                {format(parseISO(entry.date), "dd 'de' MMMM 'de' yyyy", {
                  locale: ptBR,
                })}
              </span>

              <h2
                className={`text-sm font-bold capitalize ${
                  isReceita ? "text-emerald-400" : "text-red-400"
                }`}
              >
                {entry.type}
              </h2>
            </div>

            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-slate-700 text-lg shrink-0">
                  {categories[entry.category ?? ""]?.icon ?? entry.category}
                </div>

                <div className="flex flex-col gap-1">
                  <h3 className="text-md font-bold capitalize">
                    {entry.description}
                  </h3>

                  <h3 className="text-sm text-text-muted capitalize">
                    {categories[entry.category ?? ""]?.label ?? entry.category}
                  </h3>
                </div>
              </div>

              <div className="flex flex-col gap-2 items-end">
                <h2
                  className={`text-sm font-bold ${
                    isReceita ? "text-emerald-400" : "text-red-400"
                  }`}
                >
                  {formatCurrency(entry.value)}
                </h2>

                <div className="flex gap-2">
                  <Button
                    onClick={() => handleDelete(entry.id)}
                    className="bg-red-800 w-max"
                  >
                    <Trash size={14} />
                  </Button>

                  <EntryEditForm entry={entry} />
                </div>
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
};

export default EntryList;
