import { Navigate } from "react-router";

type Props = {
  children: React.ReactNode;
};

function ProtectedRoute({ children }: Props) {
  const isAuthenticated = true;

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedRoute;