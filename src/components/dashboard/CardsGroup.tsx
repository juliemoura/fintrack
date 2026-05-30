import { TrendingUp, TrendingDown } from "lucide-react";
import BalanceCard from "./BalanceCard";
import SummaryCard from "./SummaryCard";
import {
  selectAllExpenses,
  selectAllRevenues,
  selectAllSavings,
} from "@/store/entrySlice";
import { useAppSelector } from "@/store/store";

function CardsGroup() {
  const revenues = useAppSelector(selectAllRevenues);
  const expenses = useAppSelector(selectAllExpenses);
  const savings = useAppSelector(selectAllSavings);

  return (
    <div className="xl:grid xl:grid-cols-4 flex flex-col gap-2 w-full">
      <div className="col-span-2">
        <BalanceCard
          value={savings
            .reduce((acc, entry) => acc + entry.value, 0)
            .toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          percentage={32}
        />
      </div>
      <SummaryCard
        icon={<TrendingUp size={24} />}
        title="Receitas"
        value={revenues
          .reduce((acc, entry) => acc + entry.value, 0)
          .toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}
        percentage={8.2}
        type="success"
      />
      <SummaryCard
        icon={<TrendingDown size={24} />}
        title="Despesas"
        value={expenses
          .reduce((acc, entry) => acc + entry.value, 0)
          .toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}
        percentage={-8.2}
        type="error"
      />
    </div>
  );
}

export default CardsGroup;
