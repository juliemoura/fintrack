import LegendChart from "@/components/ui/Charts/LegendChart";
import { Card } from "@/components/ui/Card";
import PieChart from "@/components/ui/Charts/PieChart";
import { selectAllExpenses, selectAllRevenues } from "@/store/entrySlice";
import { useAppSelector } from "@/store/hooks";

function ChartsGroup() {
  const receita = useAppSelector(selectAllRevenues);
  const despesa = useAppSelector(selectAllExpenses);

  return (
    <div className="xl:grid xl:grid-cols-2 flex flex-col gap-2 mt-2">
      <Card>
        <LegendChart receita={receita} despesa={despesa} />
      </Card>

      <Card>
        <PieChart despesa={despesa} />
      </Card>
    </div>
  );
}

export default ChartsGroup;
