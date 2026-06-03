import { Outlet, useLocation } from "react-router";
import { LayoutDashboard } from "lucide-react";
import Sidebar from "@/components/dashboard/Sidebar";
import { ProfileMenu } from "@/components/ui/ProfileMenu";
import { SidebarProvider, SidebarInset } from "@/components/ui/Sidebar";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchEntries } from "@/store/entrySlice";
import type { RootState } from "@/store/store";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { pageTitles } from "@/lib/types";

function Layout() {
  const { user } = useAppSelector((state) => state.auth);
  const location = useLocation();

  // aqui eu to pegando o dispatch para buscar as entradas do usuario
  // logado quando o componente for montado,
  const dispatch = useAppDispatch();

  const userId = useSelector((state: RootState) => state.auth.user?.id);

  const title = pageTitles[location.pathname] || "Página";

  useEffect(() => {
    if (userId) {
      dispatch(fetchEntries(userId));
    }
  }, [dispatch, userId]);

  return (
    <SidebarProvider>
      <Sidebar />

      <SidebarInset>
        <div className="flex flex-col w-full h-screen bg-slate-900">
          <div className="flex justify-between items-center px-6 py-4 border-b border-slate-700 bg-slate-800">
            <div className="flex items-center gap-4">
              <LayoutDashboard className="w-4 h-4" />
              <h1 className="text-2xl font-bold text-white">{title}</h1>
            </div>
            <ProfileMenu userName={user?.name} userEmail={user?.email} />
          </div>
          <div className="flex-1 overflow-auto p-6">
            <Outlet />
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

export default Layout;
