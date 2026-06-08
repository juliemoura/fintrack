import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/Table";
import { format } from "date-fns";
import { parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";
import { categories, formatCurrency } from "@/lib/utils";
import { type RootState } from "@/store/store";
import { useSelector } from "react-redux";

const RelatoryList = () => {
  // pega as entradas do store, que é um array de entradas
  const entries = useSelector((state: RootState) => state.entry.entries);

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Data</TableHead>
          <TableHead>Descrição</TableHead>
          <TableHead>Categoria</TableHead>
          <TableHead>Tipo</TableHead>
          <TableHead className="text-right">Valor</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {entries.map((entry) => {
          const isReceita = entry.type === "receita";
          const categoryInfo = categories[entry.category ?? ""];

          return (
            <TableRow key={entry.id}>
              <TableCell>
                {format(parseISO(entry.date), "dd/MM/yyyy", {
                  locale: ptBR,
                })}
              </TableCell>
              <TableCell>{entry.description}</TableCell>
              <TableCell className="flex items-center gap-2">
                <span className="text-lg">
                  {categoryInfo?.icon ?? entry.category}
                </span>
                {categoryInfo?.label ?? entry.category}
              </TableCell>
              <TableCell>
                <span
                  className={`px-2 py-1 rounded text-xs font-semibold ${
                    isReceita
                      ? "bg-green-500/20 text-green-400"
                      : "bg-red-500/20 text-red-400"
                  }`}
                >
                  {entry.type === "receita" ? "Receita" : "Despesa"}
                </span>
              </TableCell>
              <TableCell
                className={`text-right font-semibold ${
                  isReceita ? "text-green-400" : "text-red-400"
                }`}
              >
                {isReceita ? "+" : "-"}
                {formatCurrency(entry.value)}
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default RelatoryList;
