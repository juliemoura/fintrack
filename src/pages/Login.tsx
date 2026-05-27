import { Wallet } from "lucide-react";
import LoginForm from "../components/auth/LoginForm";
import heroIllustration from "../assets/fintrack_hero_illustration.svg";

function Login() {
  return (
    <div className="min-h-screen bg-background text-text w-full lg:grid lg:grid-cols-2">
      <div
        className="hidden lg:flex flex-col items-center justify-center p-10 bg-cover bg-center"
        style={{
          backgroundImage: `url(${heroIllustration})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      <div className="flex flex-col items-center justify-center p-6 sm:p-10">
        <div className="flex flex-col gap-2 items-center mb-12">
          <Wallet size={40} className="text-primary" />
          <h1 className="font-heading text-3xl">
            Fin<span className="text-primary-light">Track</span>
          </h1>
        </div>

        <div className="w-full max-w-md">
          <div className="mb-8 text-center">
            <h2 className="font-heading text-3xl font-semibold">
              Bem-vindo de volta!
            </h2>
            <h3 className="text-text-muted mt-2">
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
