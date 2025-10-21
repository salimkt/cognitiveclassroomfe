import { Link } from "react-router-dom";
import CourseCard from "../../components/CourseCard";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthProvider";
import { authenticatedFetch } from "../../lib/api";

export default function InstructorPage() {
  const { user } = useAuth();
  const [courses, setCourses] = useState<any[]>([]);

  useEffect(() => {
    const fetchCourses = async () => {
      if (!user) return;
      try {
        const data = await authenticatedFetch(`/courses/?instructor_id=${user.id}`);
        setCourses(data);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchCourses();
  }, [user]);

  const handleDelete = async (id: string) => {
    try {
      await authenticatedFetch(`/courses/${id}`, { method: 'DELETE' });
      setCourses(courses.filter(course => course.id !== id));
    } catch (error) {
      console.error('Error deleting course:', error);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="space-y-2">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-primary to-indigo-600 bg-clip-text text-transparent">Your Courses</h1>
          <p className="text-lg text-muted-foreground">Manage and create amazing learning experiences</p>
        </div>
        <Link to="/instructor/create-course" className="bg-gradient-to-r from-primary to-indigo-600 hover:from-primary/90 hover:to-indigo-600/90 text-primary-foreground font-semibold py-3 px-8 rounded-xl transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg">
          + Create Course
        </Link>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.length > 0 ? (
          courses.map((course, index) => (
            <div key={course.id} style={{ animationDelay: `${index * 50}ms` }}>
              <CourseCard course={course} onDelete={handleDelete} />
            </div>
          ))
        ) : (
          <div className="col-span-full">
            <div className="text-center py-20 bg-gradient-to-br from-slate-50 to-blue-50 rounded-2xl border-2 border-dashed border-border">
              <p className="text-6xl mb-6">📚</p>
              <p className="text-2xl font-bold text-foreground mb-3">No courses yet</p>
              <p className="text-muted-foreground mb-8">Create your first course and start teaching today</p>
              <Link to="/instructor/create-course" className="inline-block bg-gradient-to-r from-primary to-indigo-600 hover:from-primary/90 hover:to-indigo-600/90 text-primary-foreground font-semibold py-3 px-8 rounded-xl transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg">
                Create Your First Course
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
