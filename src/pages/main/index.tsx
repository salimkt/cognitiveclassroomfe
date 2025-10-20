import CourseCard from "../../components/CourseCard";
import { courses } from "../../data/courses";

export default function HomePage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Your Courses</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {courses.map(course => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  );
}
