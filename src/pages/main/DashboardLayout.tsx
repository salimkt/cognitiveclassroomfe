import { Link, Outlet, useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabase/client";

export default function DashboardLayout() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/auth/login");
  };

  const navItems = [
    { path: "/", label: "Home", icon: "🏠" },
    { path: "/my-courses", label: "My Courses", icon: "📚" },
    { path: "/instructor", label: "Instructor", icon: "👨‍🏫" },
    { path: "/profile", label: "Profile", icon: "👤" },
    { path: "/dashboard", label: "Dashboard", icon: "📊" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-primary via-indigo-600 to-blue-600 text-primary-foreground p-6 flex justify-between items-center border-b border-primary/20 shadow-lg">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary-foreground/20 rounded-lg flex items-center justify-center text-lg">🎓</div>
          <h1 className="text-3xl font-bold">Cognitive Classroom</h1>
        </div>
        <button
          onClick={handleLogout}
          className="bg-destructive/90 hover:bg-destructive text-destructive-foreground font-medium py-2 px-6 rounded-lg transition-all duration-200 hover:shadow-lg transform hover:scale-105 active:scale-95"
        >
          Logout
        </button>
      </header>

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r border-border/50 p-6 shadow-sm">
          <nav className="space-y-3">
            <div className="mb-6">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Navigation</p>
            </div>
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-foreground hover:bg-gradient-to-r hover:from-primary/10 hover:to-indigo-600/10 hover:text-primary font-medium transition-all duration-200 group"
                  >
                    <span className="text-xl group-hover:scale-110 transition-transform duration-200">{item.icon}</span>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Sidebar footer */}
          <div className="mt-8 pt-6 border-t border-border/30">
            <div className="bg-gradient-to-br from-primary/5 to-indigo-600/5 rounded-xl p-4 text-center">
              <p className="text-xs text-muted-foreground mb-2">Learn something new today</p>
              <p className="text-sm font-semibold text-primary">🌟 Keep Growing</p>
            </div>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
