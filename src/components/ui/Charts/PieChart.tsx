import {
  Pie,
  PieChart as RechartsPieChart,
  Cell,
  ResponsiveContainer,
} from "recharts";
import { categories } from "@/lib/utils";

interface Entry {
  id: string;
  type: "receita" | "despesa";
  date: string;
  value: number;
  description?: string;
  category?: string;
}

interface PieChartProps {
  despesa: Entry[];
}

interface ExpenseCategory {
  name: string;
  value: number;
  color: string;
}

const CATEGORY_COLORS: Record<string, string> = {
  poupanca: "#14b8a6",
  moradia: "#6366f1",
  alimentacao: "#10b981",
  transporte: "#f59e0b",
  lazer: "#ef4444",
  saude: "#3b82f6",
  outros: "#8b5cf6",
};

export default function PieChart({ despesa }: PieChartProps) {
  const processCategoryData = (): ExpenseCategory[] => {
    const categoryData: Record<string, number> = {};

    despesa.forEach((entry) => {
      const category = entry.category || "outros";
      if (!categoryData[category]) {
        categoryData[category] = 0;
      }
      categoryData[category] += entry.value;
    });

    return Object.entries(categoryData).map(([key, value]) => ({
      name: key,
      value,
      color: CATEGORY_COLORS[key] || "#8b5cf6",
    }));
  };

  const data = processCategoryData();
  const total = data.reduce((sum, item) => sum + item.value, 0);

  if (data.length === 0) {
    return (
      <div className="w-full">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-xl font-semibold text-white">Resumo do mês</h2>
        </div>
        <p className="text-slate-400 text-center py-8">
          Nenhuma despesa registrada
        </p>
      </div>
    );
  }
  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-xl font-semibold text-white">
          Resumo de despesas do mês
        </h2>
      </div>

      <div className="flex gap-8 items-center">
        <div className="flex-1">
          <ResponsiveContainer width="100%" height={280}>
            <RechartsPieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={70}
                outerRadius={110}
                paddingAngle={2}
                dataKey="value"
                isAnimationActive={true}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </RechartsPieChart>
          </ResponsiveContainer>
        </div>

        <div className="flex-1 space-y-4">
          {data.map((item) => {
            const percentage = ((item.value / total) * 100).toFixed(0);
            const categoryLabel =
              categories[item.name as keyof typeof categories]?.label ||
              item.name;
            return (
              <div
                key={item.name}
                className="flex items-center justify-between"
              >
                <div className="flex items-center gap-3 flex-1">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-slate-300 text-sm">
                    {categoryLabel}
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-white font-semibold text-sm w-24 text-right">
                    R$ {item.value.toLocaleString("pt-BR")}
                  </span>
                  <span className="text-slate-400 text-sm w-8 text-right">
                    {percentage}%
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
