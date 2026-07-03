import { NavLink, Navigate, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, Package, Users, Calendar, LogOut } from "lucide-react";

const CrmLayout = () => {
  const { user, loading, isStaff, signOut } = useAuth();
  const navigate = useNavigate();

  if (loading) return <div className="min-h-screen flex items-center justify-center text-muted-foreground">Nalaganje…</div>;
  if (!user) return <Navigate to="/crm/login" replace />;

  const nav = [
    { to: "/crm", end: true, icon: LayoutDashboard, label: "Pregled" },
    { to: "/crm/items", icon: Package, label: "Artikli" },
    { to: "/crm/artists", icon: Users, label: "Avtorji" },
  ];

  return (
    <div className="min-h-screen flex bg-muted/30">
      <aside className="w-60 bg-card border-r flex flex-col">
        <div className="p-5 border-b">
          <div className="font-serif text-xl">Atelje CRM</div>
          <div className="text-xs text-muted-foreground mt-1 truncate">{user.email}</div>
          {!isStaff && (
            <div className="mt-2 text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded p-2">
              Še nimate pravic. Skrbnik vam mora dodeliti vlogo.
            </div>
          )}
        </div>
        <nav className="flex-1 p-3 space-y-1">
          {nav.map((n) => (
            <NavLink
              key={n.to}
              to={n.to}
              end={n.end as any}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors ${
                  isActive ? "bg-primary text-primary-foreground" : "hover:bg-accent"
                }`
              }
            >
              <n.icon className="w-4 h-4" /> {n.label}
            </NavLink>
          ))}
        </nav>
        <div className="p-3 border-t space-y-2">
          <Button variant="outline" size="sm" className="w-full" onClick={() => navigate("/")}>← Spletna stran</Button>
          <Button variant="ghost" size="sm" className="w-full" onClick={async () => { await signOut(); navigate("/crm/login"); }}>
            <LogOut className="w-4 h-4 mr-2" /> Odjava
          </Button>
        </div>
      </aside>
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default CrmLayout;
