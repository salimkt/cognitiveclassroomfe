import { useNavigate, Link } from "react-router-dom";
import { supabase } from "../../../lib/supabase/client";

export default function CreateCoursePage() {
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
                <Link to="/" className="text-gray-700 hover:text-gray-900 font-bold">Dashboard</Link>
              </li>
              <li>
                <Link to="/instructor" className="text-gray-700 hover:text-gray-900 font-bold">Instructor</Link>
              </li>
            </ul>
          </nav>
        </aside>
        <main className="flex-1 p-4">
          <h1 className="text-3xl font-bold mb-4">Create Course</h1>
          <form>
            <div className="mb-4">
              <label htmlFor="title" className="block text-gray-700 font-bold mb-2">Title</label>
              <input type="text" id="title" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
            </div>
            <div className="mb-4">
              <label htmlFor="description" className="block text-gray-700 font-bold mb-2">Description</label>
              <textarea id="description" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"></textarea>
            </div>
            <div className="mb-4">
              <label htmlFor="instructor" className="block text-gray-700 font-bold mb-2">Instructor</label>
              <input type="text" id="instructor" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
            </div>
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Create Course
            </button>
          </form>
        </main>
      </div>
    </div>
  );
}
