import { Link } from "react-router-dom";
import CourseCard from "../../components/CourseCard";
import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { authenticatedFetch } from "../../lib/api";

interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
}

export default function InstructorPage() {
  const { user } = useAuth();
  const [courses, setCourses] = useState<Course[]>([]);

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
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">Your Courses</h1>
        <Link to="/instructor/create-course" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Create Course
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {courses.map(course => (
          <CourseCard key={course.id} course={course} onDelete={handleDelete} showActions={true} />
        ))}
      </div>
    </div>
  );
}
