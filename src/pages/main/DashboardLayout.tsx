import { Link, Outlet, useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabase/client";

export default function DashboardLayout() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/auth/login");
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="bg-primary text-primary-foreground p-6 flex justify-between items-center border-b border-border shadow-sm">
        <h1 className="text-2xl font-semibold">Cognitive Classroom</h1>
        <button
          onClick={handleLogout}
          className="bg-destructive hover:bg-destructive text-destructive-foreground font-medium py-2 px-4 rounded-lg transition-colors hover:opacity-90"
        >
          Logout
        </button>
      </header>
      <div className="flex flex-1">
        <aside className="w-64 bg-sidebar text-sidebar-foreground border-r border-sidebar-border p-6">
          <nav className="space-y-2">
            <ul className="space-y-2">
              <li>
                <Link to="/" className="block px-4 py-2 rounded-lg text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground font-medium transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/my-courses" className="block px-4 py-2 rounded-lg text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground font-medium transition-colors">My Courses</Link>
              </li>
              <li>
                <Link to="/instructor" className="block px-4 py-2 rounded-lg text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground font-medium transition-colors">Instructor</Link>
              </li>
              <li>
                <Link to="/profile" className="block px-4 py-2 rounded-lg text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground font-medium transition-colors">Profile</Link>
              </li>
              <li>
                <Link to="/dashboard" className="block px-4 py-2 rounded-lg text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground font-medium transition-colors">Dashboard</Link>
              </li>
            </ul>
          </nav>
        </aside>
        <main className="flex-1 p-8 bg-background">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
