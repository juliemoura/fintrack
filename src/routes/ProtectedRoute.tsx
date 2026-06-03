import { Navigate } from "react-router";
import { useAppSelector } from "@/store/hooks";

type Props = {
  children: React.ReactNode;
};

function ProtectedRoute({ children }: Props) {
  const auth = useAppSelector((state) => state.auth);

  if (!auth.token) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedRoute;
