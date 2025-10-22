import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import CourseCard from "../../components/CourseCard";
import { authenticatedFetch } from "../../lib/api";

interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
}

interface Enrollment {
  course_id: string;
}

export default function MyCoursesPage() {
  const { user } = useAuth();
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    const fetchEnrolledCourses = async () => {
      if (!user) return;

      try {
        const enrollments = await authenticatedFetch(`/enrollments/user/${user.id}`);
        if (!enrollments || enrollments.length === 0) {
          return;
        }

        const courseIds = enrollments.map((enrollment: Enrollment) => enrollment.course_id);
        const coursePromises = courseIds.map((id: string) => authenticatedFetch(`/courses/${id}`));
        const courses = await Promise.all(coursePromises);
        setCourses(courses);
      } catch (error) {
        console.error('Error fetching enrolled courses:', error);
      }
    };

    fetchEnrolledCourses();
  }, [user]);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">My Courses</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {courses.map(course => (
          <CourseCard key={course.id} course={course} onDelete={() => {}} showActions={true} />
        ))}
      </div>
    </div>
  );
}
