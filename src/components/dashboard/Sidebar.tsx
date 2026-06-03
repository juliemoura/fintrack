import { useNavigate, useLocation } from "react-router";
import {
  Sidebar as S,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/Sidebar";
import {
  BarChart3,
  LayoutDashboard,
  History,
  ClipboardMinus,
} from "lucide-react";

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <S className="border-r border-slate-700 bg-[#0f172a]">
      <SidebarHeader className="border-b border-slate-700 bg-[#0f172a] p-4">
        <div className="flex items-center gap-2 pb-2 pt-1">
          <BarChart3 className="w-6 h-6 text-[#6366f1]" />
          <span className="text-xl font-bold text-white">FinTrack</span>
        </div>
      </SidebarHeader>
      <SidebarContent className="p-4 bg-[#0f172a]">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={() => navigate("/dashboard")}
              className={`cursor-pointer transition-colors ${
                isActive("/dashboard")
                  ? "bg-[#6366f1] text-white hover:bg-[#4f46e5]"
                  : "text-slate-300 hover:text-white hover:bg-slate-700"
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              Dashboard
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={() => navigate("/entries")}
              className={`cursor-pointer transition-colors ${
                isActive("/entries")
                  ? "bg-[#6366f1] text-white hover:bg-[#4f46e5]"
                  : "text-slate-300 hover:text-white hover:bg-slate-700"
              }`}
            >
              <History className="w-4 h-4" />
              Entradas
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={() => navigate("/relatory")}
              className={`cursor-pointer transition-colors ${
                isActive("/relatory")
                  ? "bg-[#6366f1] text-white hover:bg-[#4f46e5]"
                  : "text-slate-300 hover:text-white hover:bg-slate-700"
              }`}
            >
              <ClipboardMinus className="w-4 h-4" />
              Relatórios
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
    </S>
  );
}

export default Sidebar;
