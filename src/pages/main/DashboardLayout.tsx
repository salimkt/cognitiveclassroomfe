import { Link, Outlet, useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabase/client";

export default function DashboardLayout() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/auth/login");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
        <h1 className="text-xl">Cognitive Classroom</h1>
        <button 
          onClick={handleLogout} 
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          Logout
        </button>
      </header>
      <div className="flex flex-1">
        <aside className="w-64 bg-gray-200 p-4">
          <nav>
            <ul>
              <li className="mb-2">
                <Link to="/" className="text-gray-700 hover:text-gray-900 font-bold">Home</Link>
              </li>
              <li className="mb-2">
                <Link to="/my-courses" className="text-gray-700 hover:text-gray-900 font-bold">My Courses</Link>
              </li>
              <li className="mb-2">
                <Link to="/instructor" className="text-gray-700 hover:text-gray-900 font-bold">Instructor</Link>
              </li>
              <li className="mb-2">
                <Link to="/profile" className="text-gray-700 hover:text-gray-900 font-bold">Profile</Link>
              </li>
              <li className="mb-2">
                <Link to="/dashboard" className="text-gray-700 hover:text-gray-900 font-bold">Dashboard</Link>
              </li>
            </ul>
          </nav>
        </aside>
        <main className="flex-1 p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
