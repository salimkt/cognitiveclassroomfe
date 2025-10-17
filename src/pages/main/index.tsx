import { useNavigate, Link } from "react-router-dom";
import { supabase } from "../../lib/supabase/client";
import CourseCard from "../../components/CourseCard";
import { courses } from "../../data/courses";

export default function HomePage() {
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
          <h1 className="text-3xl font-bold mb-4">Your Courses</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {courses.map(course => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
