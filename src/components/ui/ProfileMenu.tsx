import { useState } from "react";
import { LogOut } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "./Avatar";
import { Popover, PopoverTrigger, PopoverContent } from "./Popover";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "@/store/hooks";
import { logout } from "@/store/authSlice";

interface ProfileMenuProps {
  userName?: string;
  userEmail?: string;
  avatarUrl?: string;
}

export function ProfileMenu({
  userName = "Usuário",
  userEmail = "user@example.com",
  avatarUrl,
}: ProfileMenuProps) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
    setOpen(false);
  };

  const initials = userName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button className="cursor-pointer hover:opacity-80 transition-opacity">
          <Avatar size="lg">
            {avatarUrl && <AvatarImage src={avatarUrl} alt={userName} />}
            <AvatarFallback className="bg-[#6366f1] text-white p-4 font-semibold">
              {initials}
            </AvatarFallback>
          </Avatar>
        </button>
      </PopoverTrigger>
      <PopoverContent className="bg-slate-900 border border-slate-700 text-white w-56 p-0">
        <div className="p-4 border-b border-slate-700">
          <p className="font-semibold text-white">{userName}</p>
          <p className="text-sm text-slate-400">{userEmail}</p>
        </div>

        <div className="p-2">
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 w-full px-3 py-2 rounded-lg hover:bg-slate-800 text-red-400 hover:text-red-300 transition-colors cursor-pointer"
          >
            <LogOut size={16} />
            <span>Sair</span>
          </button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
