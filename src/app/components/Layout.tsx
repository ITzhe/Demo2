import { Outlet, NavLink } from "react-router";
import { Home, Map as MapIcon, PlusSquare, Users, User } from "lucide-react";

export function Layout() {
  const navItems = [
    { to: "/", icon: Home, label: "首页" },
    { to: "/map", icon: MapIcon, label: "探索" },
    { to: "/publish", icon: PlusSquare, label: "发布", special: true },
    { to: "/team", icon: Users, label: "组队" },
    { to: "/profile", icon: User, label: "我的" },
  ];

  return (
    <div className="flex flex-col h-full w-full bg-slate-50 relative">
      <div className="flex-1 overflow-y-auto overflow-x-hidden relative pb-[80px]">
        <Outlet />
      </div>

      <nav className="absolute bottom-0 left-0 right-0 h-[80px] bg-white border-t border-slate-100 flex items-center justify-around px-2 pb-safe shadow-[0_-4px_20px_rgba(0,0,0,0.03)] z-50">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === "/"}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center w-16 gap-1 ${
                isActive ? "text-emerald-600" : "text-slate-400 hover:text-slate-600"
              }`
            }
          >
            {item.special ? (
              <div className="bg-emerald-600 text-white p-3 rounded-2xl shadow-lg shadow-emerald-600/30 -mt-6">
                <item.icon size={24} strokeWidth={2.5} />
              </div>
            ) : (
              <>
                <item.icon size={24} strokeWidth={2} />
                <span className="text-[10px] font-medium">{item.label}</span>
              </>
            )}
          </NavLink>
        ))}
      </nav>
    </div>
  );
}
