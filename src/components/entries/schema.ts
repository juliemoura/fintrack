import { z } from "zod";

export const entrySchema = z.object({
  type: z.string().optional().refine((val) => val && val.length > 0, "Tipo obrigatório"),
  category: z.string().optional().refine((val) => val && val.length > 0, "Categoria obrigatória"),
  value: z.number().optional().refine((val) => val && val > 0, "Valor deve ser maior que zero"),
  date: z.string().optional().refine((val) => val && val.length > 0, "Data obrigatória"),
  description: z.string().optional().refine((val) => val && val.length > 0, "Descrição obrigatória"),
});

export type EntrySchema = z.infer<typeof entrySchema>;
