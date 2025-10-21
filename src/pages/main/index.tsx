import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthProvider";
import { authenticatedFetch } from "../../lib/api";

export default function HomePage() {
  const { user } = useAuth();
  const [courses, setCourses] = useState<any[]>([]);

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
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-semibold text-foreground mb-2">Available Courses</h1>
        <p className="text-muted-foreground">Browse and enroll in courses to start learning</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.length > 0 ? (
          courses.map(course => (
            <div key={course.id} className="bg-card text-card-foreground rounded-lg border border-border shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col">
              <div className="p-6 flex-1 flex flex-col">
                <h2 className="text-xl font-semibold mb-2">{course.title}</h2>
                <p className="text-muted-foreground text-sm mb-4 flex-1">{course.description}</p>
                <p className="text-sm text-muted-foreground mb-6">Instructor: <span className="font-medium text-foreground">{course.instructor}</span></p>
              </div>
              <div className="px-6 pb-6">
                <button
                  onClick={() => handleEnroll(course.id)}
                  className="w-full bg-primary hover:bg-primary text-primary-foreground font-medium py-2 px-4 rounded-lg transition-colors hover:opacity-90"
                >
                  Enroll
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <p className="text-muted-foreground">No courses available yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}
