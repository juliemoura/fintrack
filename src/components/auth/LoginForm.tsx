import { KeyRound, Mail } from "lucide-react";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";

const LoginForm = () => (
  <div className="w-full flex flex-col gap-2">
    <Input
      icon={<Mail size={16} />}
      label="E-mail"
      placeholder="seuemail@gmail.com"
      type="email"
      className="mb-4 w-full"
    />
    <Input
      icon={<KeyRound size={16} />}
      label="Senha"
      placeholder="senha123"
      type="password"
      className="mb-4 w-full"
    />
    <Button type="submit" className="w-full bg-primary text-text py-2 rounded">
      Entrar
    </Button>
  </div>
);

export default LoginForm;
