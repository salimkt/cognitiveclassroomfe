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
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-primary to-indigo-600 bg-clip-text text-transparent">My Courses</h1>
        <p className="text-lg text-muted-foreground">Keep learning with your enrolled courses</p>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.length > 0 ? (
          courses.map((course, index) => (
            <div key={course.id} style={{ animationDelay: `${index * 50}ms` }}>
              <CourseCard course={course} onDelete={() => {}} />
            </div>
          ))
        ) : (
          <div className="col-span-full">
            <div className="text-center py-16 bg-gradient-to-br from-slate-50 to-blue-50 rounded-2xl border-2 border-dashed border-border">
              <p className="text-6xl mb-4">🔍</p>
              <p className="text-lg text-muted-foreground font-medium">No courses enrolled yet</p>
              <p className="text-sm text-muted-foreground mt-2">Explore and enroll in courses from the home page</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
