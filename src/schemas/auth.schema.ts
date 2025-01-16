import { z } from "zod";

export const LoginSchema = z.object({
  email: z
    .string()
    .min(1, "El correo es necesario")
    .email("Formato de email inválido"),
  password: z.string().min(1, "La contraseña en necesaria"),
});

export const SignupSchema = z.object({
  name: z.string().min(2, "Ingrese un nombre válido"),
  email: z.string().min(1, "El correo es necesario").email("Invalid email"),
  password: z.string().min(5, "La contraseña debe tener al menos 5 caracteres"),
});
