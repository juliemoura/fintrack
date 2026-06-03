import { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import type { Payload } from "recharts/types/component/DefaultLegendContent";

interface Entry {
  id: string;
  type: "receita" | "despesa";
  date: string;
  value: number;
  description?: string;
  category?: string;
}

interface LegendChartProps {
  receita: Entry[];
  despesa: Entry[];
}

interface TooltipData {
  name: string;
  receitas: number;
  despesas: number;
}

interface TooltipPayload {
  payload: TooltipData;
  value: number;
  dataKey: string;
}

const formatCurrency = (value: number) => `R$ ${(value / 1000).toFixed(1)}k`;

const CustomTooltip = ({
  active,
  payload,
}: {
  active?: boolean;
  payload?: TooltipPayload[];
}) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="rounded-lg p-3 bg-slate-900 border border-slate-700">
        <p className="text-slate-300 text-sm">Dia {data.name}</p>
        {data.receitas > 0 && (
          <p className="text-blue-400 font-semibold">
            Receitas: R${" "}
            {data.receitas.toLocaleString("pt-BR", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </p>
        )}
        {data.despesas > 0 && (
          <p className="text-green-400 font-semibold">
            Despesas: R${" "}
            {data.despesas.toLocaleString("pt-BR", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </p>
        )}
      </div>
    );
  }
  return null;
};

const LegendChart = ({ receita, despesa }: LegendChartProps) => {
  const state = useState<string | number | undefined>(undefined);
  const hoveringDataKey = state[0];
  const setHoveringDataKey = state[1];

  const processChartData = () => {
    const now = new Date();
    const dailyData: Record<string, { receitas: number; despesas: number }> =
      {};

    for (let i = 29; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      dailyData[date.getDate()] = { receitas: 0, despesas: 0 };
    }

    const parseLocalDate = (dateString: string) => {
      const [year, month, day] = dateString.split("-").map(Number);
      return new Date(year, month - 1, day);
    };

    const addEntry = (entries: Entry[], key: "receitas" | "despesas") => {
      entries.forEach((entry) => {
        const entryDate = parseLocalDate(entry.date);
        const nowCopy = new Date(now);
        entryDate.setHours(0, 0, 0, 0);
        nowCopy.setHours(0, 0, 0, 0);
        const daysDiff = Math.floor(
          (nowCopy.getTime() - entryDate.getTime()) / (1000 * 60 * 60 * 24),
        );
        if (daysDiff >= 0 && daysDiff < 30) {
          dailyData[entryDate.getDate()][key] += entry.value;
        }
      });
    };

    addEntry(receita, "receitas");
    addEntry(despesa, "despesas");

    return Object.entries(dailyData)
      .sort(([a], [b]) => parseInt(a) - parseInt(b))
      .map(([day, values]) => ({ name: day, ...values }));
  };

  const data = processChartData();

  const receitasOpacity = hoveringDataKey === "despesas" ? 0.3 : 1;
  const despesasOpacity = hoveringDataKey === "receitas" ? 0.3 : 1;

  const handleMouseEnter = (payload: Payload) => {
    if (typeof payload.dataKey === "string") {
      setHoveringDataKey(payload.dataKey);
    }
  };

  const handleMouseLeave = () => setHoveringDataKey(undefined);

  return (
    <div className="w-full bg-slate-800">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-white">
          Evolução das despesas x receitas
        </h2>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={data}
          margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#334155"
            vertical={false}
          />
          <XAxis
            dataKey="name"
            stroke="#64748b"
            style={{ fontSize: "12px" }}
            tick={{ fill: "#94a3b8" }}
          />
          <YAxis
            stroke="#64748b"
            tickFormatter={formatCurrency}
            style={{ fontSize: "12px" }}
            tick={{ fill: "#94a3b8" }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            wrapperStyle={{ paddingTop: "20px" }}
            iconType="line"
            formatter={(value) => {
              if (value === "receitas") return "Receitas";
              if (value === "despesas") return "Despesas";
              return value;
            }}
          />
          <Line
            type="monotone"
            dataKey="receitas"
            strokeOpacity={receitasOpacity}
            stroke="#6366f1"
            strokeWidth={2.5}
            dot={{ fill: "#6366f1", r: 4 }}
            activeDot={{ r: 6 }}
            isAnimationActive={true}
          />
          <Line
            type="monotone"
            dataKey="despesas"
            strokeOpacity={despesasOpacity}
            stroke="#10b981"
            strokeWidth={2.5}
            dot={{ fill: "#10b981", r: 4 }}
            activeDot={{ r: 6 }}
            isAnimationActive={true}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LegendChart;
