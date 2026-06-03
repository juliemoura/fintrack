import React from "react";
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
import type { LegendPayload } from "recharts";

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

const formatCurrency = (value: number) => {
  return `R$ ${(value / 1000).toFixed(1)}k`;
};

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
  const [hoveringDataKey, setHoveringDataKey] = React.useState<
    string | number | undefined
  >(undefined);

  const processChartData = () => {
    const now = new Date();
    const dailyData: Record<string, { receitas: number; despesas: number }> =
      {};

    // Cria dados para os últimos 30 dias
    for (let i = 29; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const day = date.getDate();
      dailyData[day] = { receitas: 0, despesas: 0 };
    }

    // Helper para parsear data local corretamente (evita timezone issues)
    const parseLocalDate = (dateString: string) => {
      const [year, month, day] = dateString.split("-").map(Number);
      return new Date(year, month - 1, day);
    };

    receita.forEach((entry) => {
      const entryDate = parseLocalDate(entry.date);
      const nowCopy = new Date(now);

      // Compara só a data, sem hora
      entryDate.setHours(0, 0, 0, 0);
      nowCopy.setHours(0, 0, 0, 0);

      const daysDiff = Math.floor(
        (nowCopy.getTime() - entryDate.getTime()) / (1000 * 60 * 60 * 24),
      );

      // Apenas inclui entradas dos últimos 30 dias
      if (daysDiff >= 0 && daysDiff < 30) {
        const day = entryDate.getDate();
        dailyData[day].receitas += entry.value;
      }
    });

    despesa.forEach((entry) => {
      const entryDate = parseLocalDate(entry.date);
      const nowCopy = new Date(now);

      // Compara só a data, sem hora
      entryDate.setHours(0, 0, 0, 0);
      nowCopy.setHours(0, 0, 0, 0);

      const daysDiff = Math.floor(
        (nowCopy.getTime() - entryDate.getTime()) / (1000 * 60 * 60 * 24),
      );

      // Apenas inclui entradas dos últimos 30 dias
      if (daysDiff >= 0 && daysDiff < 30) {
        const day = entryDate.getDate();
        dailyData[day].despesas += entry.value;
      }
    });

    return Object.entries(dailyData)
      .sort(([dayA], [dayB]) => parseInt(dayA) - parseInt(dayB))
      .map(([day, values]) => ({
        name: day,
        receitas: values.receitas,
        despesas: values.despesas,
      }));
  };

  const data = processChartData();

  let receitasOpacity = 1;
  let despesasOpacity = 1;

  if (hoveringDataKey === "receitas") {
    despesasOpacity = 0.3;
  }

  if (hoveringDataKey === "despesas") {
    receitasOpacity = 0.3;
  }

  const handleMouseEnter = (payload: LegendPayload) => {
    if (typeof payload.dataKey === "string") {
      setHoveringDataKey(payload.dataKey);
    }
  };

  const handleMouseLeave = () => {
    setHoveringDataKey(undefined);
  };

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
          margin={{
            top: 5,
            right: 30,
            left: 0,
            bottom: 5,
          }}
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
            wrapperStyle={{
              paddingTop: "20px",
            }}
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
