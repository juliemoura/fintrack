import {
  Pie,
  PieChart as RechartsPieChart,
  Cell,
  ResponsiveContainer,
} from "recharts";

interface ExpenseCategory {
  name: string;
  value: number;
  color: string;
}

const data: ExpenseCategory[] = [
  { name: "Moradia", value: 1650, color: "#6366f1" },
  { name: "Alimentação", value: 980, color: "#10b981" },
  { name: "Transporte", value: 560, color: "#f59e0b" },
  { name: "Lazer", value: 450, color: "#ef4444" },
  { name: "Saúde", value: 320, color: "#3b82f6" },
  { name: "Outros", value: 240, color: "#8b5cf6" },
];

const total = data.reduce((sum, item) => sum + item.value, 0);

export default function PieChart() {
  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-xl font-semibold text-white">Resumo do mês</h2>
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
                  <span className="text-slate-300 text-sm">{item.name}</span>
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
