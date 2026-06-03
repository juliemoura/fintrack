import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";
import { categories } from "./utils";

// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────

interface Entry {
  id: string;
  date: string;
  description?: string;
  category?: string;
  type: "receita" | "despesa";
  value: number;
}

// ─────────────────────────────────────────────
// Shared helpers
// ─────────────────────────────────────────────

const today = () => format(new Date(), "dd-MM-yyyy", { locale: ptBR });

const formatEntryDate = (iso: string) =>
  format(parseISO(iso), "dd/MM/yyyy", { locale: ptBR });

const resolveCategory = (entry: Entry) =>
  categories[entry.category ?? ""]?.label ?? entry.category ?? "-";

const resolveType = (type: Entry["type"]) =>
  type === "receita" ? "Receita" : "Despesa";

const calcTotals = (entries: Entry[]) =>
  entries.reduce(
    (acc, e) => {
      if (e.type === "receita") acc.receitas += e.value;
      else acc.despesas += e.value;
      return acc;
    },
    { receitas: 0, despesas: 0 }
  );

// ─────────────────────────────────────────────
// XLS Export
// ─────────────────────────────────────────────

const XLS_PALETTE: Record<string, string> = {
  headerBg: "0F172A",
  headerText: "F8FAFC",
  receita: "16A34A",
  despesa: "DC2626",
  rowEven: "F1F5F9",
  rowOdd: "FFFFFF",
  border: "CBD5E1",
  summaryBg: "1E293B",
  summaryText: "94A3B8",
  summaryValue: "38BDF8",
  balancePos: "22C55E",
  balanceNeg: "EF4444",
};

const makeBorder = (color: string = XLS_PALETTE.border) => ({
  left: { style: "thin", color: { rgb: color } },
  right: { style: "thin", color: { rgb: color } },
  top: { style: "thin", color: { rgb: color } },
  bottom: { style: "thin", color: { rgb: color } },
});

export const exportToXLS = async (entries: Entry[]) => {
  const XLSX = await import("xlsx-js-style");

  const { receitas, despesas } = calcTotals(entries);
  const saldo = receitas - despesas;

  // ── Main data rows ──
  const data = entries.map((e) => ({
    Data: formatEntryDate(e.date),
    Descrição: e.description || "-",
    Categoria: resolveCategory(e),
    Tipo: resolveType(e.type),
    Valor: e.value,
  }));

  const worksheet = XLSX.utils.json_to_sheet(data);

  // ── Column widths ──
  worksheet["!cols"] = [
    { wch: 14 }, // Data
    { wch: 30 }, // Descrição
    { wch: 20 }, // Categoria
    { wch: 12 }, // Tipo
    { wch: 18 }, // Valor
  ];

  const range = XLSX.utils.decode_range(worksheet["!ref"] || "A1");

  // ── Header row styling ──
  for (let C = range.s.c; C <= range.e.c; C++) {
    const addr = XLSX.utils.encode_col(C) + "1";
    if (!worksheet[addr]) continue;
    worksheet[addr].s = {
      font: { bold: true, color: { rgb: XLS_PALETTE.headerText }, sz: 11 },
      fill: { patternType: "solid", fgColor: { rgb: XLS_PALETTE.headerBg } },
      alignment: { horizontal: "center", vertical: "center", wrapText: true },
      border: makeBorder(XLS_PALETTE.headerBg),
    };
  }

  // ── Data row styling ──
  for (let R = range.s.r + 1; R <= range.e.r; R++) {
    const isEven = R % 2 === 0;
    const rowBg = isEven ? XLS_PALETTE.rowEven : XLS_PALETTE.rowOdd;

    for (let C = range.s.c; C <= range.e.c; C++) {
      const addr = XLSX.utils.encode_cell({ r: R, c: C });
      if (!worksheet[addr]) continue;

      const isValueCol = C === 4;
      const isTypeCol = C === 3;
      const cellVal = worksheet[addr].v;

      worksheet[addr].s = {
        font: (() => {
          if (isTypeCol && cellVal === "Receita")
            return { color: { rgb: XLS_PALETTE.receita }, bold: true };
          if (isTypeCol && cellVal === "Despesa")
            return { color: { rgb: XLS_PALETTE.despesa }, bold: true };
          return { color: { rgb: "334155" } };
        })(),
        fill: { patternType: "solid", fgColor: { rgb: rowBg } },
        alignment: {
          horizontal: isValueCol ? "right" : isTypeCol ? "center" : "left",
          vertical: "center",
        },
        border: makeBorder(),
      };

      if (isValueCol) {
        worksheet[addr].z = 'R$ #,##0.00';
      }
    }
  }

  // ── Summary rows ──
  const summaryStartRow = range.e.r + 2;

  const summaryRows = [
    { label: "Total Receitas", value: receitas, color: XLS_PALETTE.receita },
    { label: "Total Despesas", value: despesas, color: XLS_PALETTE.despesa },
    {
      label: "Saldo",
      value: saldo,
      color: saldo >= 0 ? XLS_PALETTE.balancePos : XLS_PALETTE.balanceNeg,
    },
  ];

  summaryRows.forEach(({ label, value, color }, i) => {
    const row = summaryStartRow + i;

    // Label (col C = index 2)
    const labelAddr = XLSX.utils.encode_cell({ r: row, c: 2 });
    worksheet[labelAddr] = {
      v: label,
      t: "s",
      s: {
        font: { bold: true, color: { rgb: XLS_PALETTE.summaryText }, sz: 10 },
        fill: {
          patternType: "solid",
          fgColor: { rgb: XLS_PALETTE.summaryBg },
        },
        alignment: { horizontal: "right", vertical: "center" },
        border: makeBorder(XLS_PALETTE.summaryBg),
      },
    };

    // Value (col E = index 4)
    const valueAddr = XLSX.utils.encode_cell({ r: row, c: 4 });
    worksheet[valueAddr] = {
      v: value,
      t: "n",
      z: 'R$ #,##0.00',
      s: {
        font: { bold: true, color: { rgb: color }, sz: 11 },
        fill: {
          patternType: "solid",
          fgColor: { rgb: XLS_PALETTE.summaryBg },
        },
        alignment: { horizontal: "right", vertical: "center" },
        border: makeBorder(XLS_PALETTE.summaryBg),
      },
    };
  });

  // Update worksheet ref to include summary rows
  worksheet["!ref"] = XLSX.utils.encode_range({
    s: { r: 0, c: 0 },
    e: { r: summaryStartRow + summaryRows.length - 1, c: range.e.c },
  });

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Relatório");
  XLSX.writeFile(workbook, `relatorio_${today()}.xlsx`);
};