import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { authenticatedFetch } from "../../lib/api";

interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
}

export default function HomePage() {
  const { user } = useAuth();
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await authenticatedFetch('/courses/');
        setCourses(data);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchCourses();
  }, []);

  const handleEnroll = async (courseId: string) => {
    if (!user) {
      console.error('User not logged in');
      return;
    }

    try {
      await authenticatedFetch('/enrollments/', {
        method: 'POST',
        body: JSON.stringify({ course_id: courseId, student_id: user.id }),
      });
      console.log('Enrolled in course successfully');
      // Maybe show a success message to the user
    } catch (error) {
      console.error('Error enrolling in course:', error);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Available Courses</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {courses.map(course => (
          <div key={course.id} className="bg-white shadow-md rounded-lg p-4 m-4">
            <h2 className="text-xl font-bold mb-2">{course.title}</h2>
            <p className="text-gray-700 mb-2">{course.description}</p>
            <p className="text-gray-500">Instructor: {course.instructor}</p>
            <button onClick={() => handleEnroll(course.id)} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4">
              Enroll
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}