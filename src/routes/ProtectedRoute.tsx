import { Navigate } from "react-router";
import { useAppSelector } from "@/store/hooks";

type Props = {
  children: React.ReactNode;
};

function ProtectedRoute({ children }: Props) {
  const isAuthenticated = useAppSelector((state) => !!state.auth.token); // usando o token do redux para verificar a autenticação, e ai caso não tenha token, o usuário é redirecionado para a página de login

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedRoute;
