import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthProvider";
import CourseCard from "../../components/CourseCard";
import { authenticatedFetch } from "../../lib/api";

export default function MyCoursesPage() {
  const { user } = useAuth();
  const [courses, setCourses] = useState<any[]>([]);

  useEffect(() => {
    const fetchEnrolledCourses = async () => {
      if (!user) return;

      try {
        const enrollments = await authenticatedFetch(`/enrollments?student_id=${user.id}`);
        if (!enrollments || enrollments.length === 0) {
          return;
        }

        const courseIds = enrollments.map((enrollment: any) => enrollment.course_id);
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
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-semibold text-foreground mb-2">My Courses</h1>
        <p className="text-muted-foreground">View courses you are enrolled in</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.length > 0 ? (
          courses.map(course => (
            <CourseCard key={course.id} course={course} onDelete={() => {}} />
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <p className="text-muted-foreground">You are not enrolled in any courses yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}
