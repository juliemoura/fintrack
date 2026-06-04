import { KeyRound, Mail } from "lucide-react";
import { Button } from "@/components/ui/Button/Button";
import { Input } from "@/components/ui/Input";
import { zodResolver } from "@hookform/resolvers/zod";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { loginUser, clearError } from "@/store/authSlice";

import { loginSchema, type LoginSchema } from "./schema";
import { useForm } from "react-hook-form";
import { Toast } from "@/components/ui/Toast";
import { useState } from "react";

import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [toastError, setToastError] = useState<string | null>(null);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { status } = useAppSelector((state) => state.auth);
  const isSubmitting = status === "loading";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  async function onSubmit(data: LoginSchema) {
    dispatch(clearError());

    const result = await dispatch(loginUser(data));

    if (loginUser.fulfilled.match(result)) {
      navigate("/dashboard");
    }

    if (loginUser.rejected.match(result)) {
      setToastError(result.payload as string);
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full flex flex-col gap-5"
    >
      <Input
        label="E-mail"
        icon={<Mail size={18} />}
        placeholder="seu@email.com"
        {...register("email")}
        error={errors.email?.message}
      />

      <Input
        label="Senha"
        icon={<KeyRound size={18} />}
        placeholder="Sua senha"
        type="password"
        {...register("password")}
        error={errors.password?.message}
      />

      {toastError && (
        <Toast message={toastError} onClose={() => setToastError(null)} />
      )}

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-[#6366f1] text-white py-3 rounded-md font-semibold mt-4 hover:from-[#5558e3] hover:to-[#3d38d9] transition-all shadow-lg hover:scale-[1.02]"
      >
        {isSubmitting ? "Entrando..." : "Entrar"}
      </Button>
    </form>
  );
};

export default LoginForm;
