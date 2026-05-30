import { Wallet } from "lucide-react";
import LoginForm from "@/components/login/LoginForm";
import heroIllustration from "@/assets/fintrack_hero_illustration.svg";

function Login() {
  return (
    <div className="min-h-screen text-text w-full lg:grid lg:grid-cols-2">
      <div
        className="hidden lg:flex flex-col items-center justify-center p-10 bg-cover bg-center"
        style={{
          backgroundImage: `url(${heroIllustration})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      <div className="flex flex-col items-center justify-center p-6 sm:p-10">
        <div className="flex flex-col gap-2 items-center mb-16">
          <Wallet size={40} className="text-[#6366f1]" />
          <h1 className="font-heading text-4xl font-bold">
            Fin
            <span className="text-[#6366f1]">Track</span>
          </h1>
        </div>

        <div className="w-full max-w-md">
          <div className="mb-10 text-center">
            <h3 className="text-white text-2xl">Bem vindo de volta!</h3>
            <h3 className="text-slate-400 text-sm">
              Faça login para acessar sua conta.
            </h3>
          </div>
          <LoginForm />
        </div>
      </div>
    </div>
  );
}

export default Login;
