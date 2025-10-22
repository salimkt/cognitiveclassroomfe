import { useEffect, useState } from 'react';
import { authenticatedFetch } from '../../lib/api';
import CourseCard from '../../components/CourseCard';
import { useAuth } from '../../hooks/useAuth';

interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
}

interface Enrollment {
  course_id: string;
}

export default function Dashboard() {
  const { user } = useAuth();
  const [courses, setCourses] = useState<Course[]>([]);
  const [enrolledCourses, setEnrolledCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const allCoursesData = await authenticatedFetch('/courses/');
        setCourses(allCoursesData);

        if (user) {
          const enrollments = await authenticatedFetch(`/enrollments/user/${user.id}`);
          if (enrollments && enrollments.length > 0) {
            const courseIds = enrollments.map((enrollment: Enrollment) => enrollment.course_id);
            const coursePromises = courseIds.map((id: string) => authenticatedFetch(`/courses/${id}`));
            const enrolledCoursesData = await Promise.all(coursePromises);
            setEnrolledCourses(enrolledCoursesData);
          }
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [user]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>

      <h2 className="text-2xl font-bold mb-4 mt-8">My Courses</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {enrolledCourses.map((course) => (
          <CourseCard key={course.id} course={course} showActions={false} />
        ))}
      </div>

      <h2 className="text-2xl font-bold mb-4 mt-8">All Courses</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {courses.map((course) => (
          <CourseCard key={course.id} course={course} showActions={false} />
        ))}
      </div>
    </div>
  );
}
