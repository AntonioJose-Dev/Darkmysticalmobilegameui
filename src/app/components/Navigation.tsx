import { NavLink } from "react-router";
import { Home, Map, Sword, User, Package } from "lucide-react";

export function Navigation() {
  const navItems = [
    { to: "/", icon: Home, label: "Home" },
    { to: "/map", icon: Map, label: "Map" },
    { to: "/combat/1", icon: Sword, label: "Combat" },
    { to: "/profile", icon: User, label: "Profile" },
    { to: "/inventory", icon: Package, label: "Inventory" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border">
      <div className="flex justify-around items-center h-16 max-w-md mx-auto">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center gap-1 px-4 py-2 transition-colors ${
                isActive ? "text-primary" : "text-muted-foreground"
              }`
            }
          >
            <item.icon className="w-5 h-5" />
            <span className="text-xs">{item.label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
