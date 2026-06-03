import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import type { Entry } from "@/store/entrySlice";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatCurrency = (value: number) => {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
};

export const categories: Record<string, { icon: string; label: string }> = {
  poupanca:    { icon: "💰", label: "Poupança" },
  moradia:     { icon: "🏠", label: "Moradia" },
  alimentacao: { icon: "🛒", label: "Alimentação" },
  transporte:  { icon: "🚗", label: "Transporte" },
  lazer:       { icon: "🎮", label: "Lazer" },
  saude:       { icon: "💊", label: "Saúde" },
  outros:      { icon: "📦", label: "Outros" },
};


// aqui eu gero entradas aleatórias pra facilitar o desenvolvimento e os testes.
export const generateRandomEntries = (userId: number): Entry[] => {
  const categories = ["poupanca", "moradia", "alimentacao", "transporte", "lazer", "saude", "outros"] as const;
  const types = ["receita", "despesa"] as const;
  const descriptions = {
    receita: ["Salário", "Freelance", "Venda", "Bônus", "Devolução"],
    despesa: ["Compra", "Pagamento", "Conta", "Subscription", "Imposto"],
  };

  const quantity = Math.floor(Math.random() * 5) + 3;
  const entries: Entry[] = [];

  for (let i = 0; i < quantity; i++) {
    const type = types[Math.floor(Math.random() * types.length)];
    const category = categories[Math.floor(Math.random() * categories.length)];
    const value = Math.floor(Math.random() * 5000) + 100;
    const daysAgo = Math.floor(Math.random() * 30);
    const date = new Date();
    date.setDate(date.getDate() - daysAgo);

    const desc = descriptions[type][Math.floor(Math.random() * descriptions[type].length)];

    entries.push({
      userId, 
      id: `${Date.now()}-${i}`,
      type,
      category,
      value,
      date: date.toISOString().split("T")[0],
      description: desc,
    });
  }

  return entries;
};

