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
      {/* Header Section */}
      <div className="space-y-2">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-primary to-indigo-600 bg-clip-text text-transparent">Available Courses</h1>
        <p className="text-lg text-muted-foreground">Discover and enroll in amazing courses to enhance your skills</p>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.length > 0 ? (
          courses.map((course, index) => (
            <div
              key={course.id}
              className="group bg-card text-card-foreground rounded-2xl border border-border/50 overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 flex flex-col"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              {/* Course Header with gradient */}
              <div className="h-32 bg-gradient-to-br from-primary/20 via-indigo-600/20 to-blue-600/20 flex items-center justify-center text-5xl group-hover:scale-110 transition-transform duration-300">
                📖
              </div>

              {/* Course Content */}
              <div className="p-6 flex-1 flex flex-col">
                <h2 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-200">{course.title}</h2>
                <p className="text-muted-foreground text-sm mb-6 flex-1 leading-relaxed">{course.description}</p>

                {/* Instructor info */}
                <div className="flex items-center gap-2 mb-6 text-sm">
                  <span className="text-lg">👨‍🏫</span>
                  <span className="text-muted-foreground">
                    <span className="font-semibold text-foreground">{course.instructor}</span>
                  </span>
                </div>

                {/* Enroll Button */}
                <button
                  onClick={() => handleEnroll(course.id)}
                  className="w-full bg-gradient-to-r from-primary to-indigo-600 hover:from-primary/90 hover:to-indigo-600/90 text-primary-foreground font-semibold py-3 px-4 rounded-xl transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg group-hover:shadow-xl"
                >
                  Enroll Now
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full">
            <div className="text-center py-16 bg-gradient-to-br from-slate-50 to-blue-50 rounded-2xl border-2 border-dashed border-border">
              <p className="text-6xl mb-4">📭</p>
              <p className="text-lg text-muted-foreground font-medium">No courses available yet</p>
              <p className="text-sm text-muted-foreground mt-2">Check back soon for new courses!</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
