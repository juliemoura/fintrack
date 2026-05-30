import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().min(1, "E-mail obrigatório").email("E-mail inválido"),
  password: z
    .string()
    .min(1, "Senha obrigatória")
    .min(6, "A senha precisa ter pelo menos 6 caracteres"),
});

export type LoginSchema = z.infer<typeof loginSchema>;
