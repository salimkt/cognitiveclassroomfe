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
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-semibold text-foreground mb-2">Your Courses</h1>
          <p className="text-muted-foreground">Manage your created courses</p>
        </div>
        <Link to="/instructor/create-course" className="bg-primary hover:bg-primary text-primary-foreground font-medium py-2 px-6 rounded-lg transition-colors hover:opacity-90">
          Create Course
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.length > 0 ? (
          courses.map(course => (
            <CourseCard key={course.id} course={course} onDelete={handleDelete} />
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <p className="text-muted-foreground mb-4">You haven't created any courses yet.</p>
            <Link to="/instructor/create-course" className="inline-block bg-primary hover:bg-primary text-primary-foreground font-medium py-2 px-6 rounded-lg transition-colors hover:opacity-90">
              Create Your First Course
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
