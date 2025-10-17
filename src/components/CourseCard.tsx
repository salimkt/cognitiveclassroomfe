export default function CourseCard({ course }: { course: any }) {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 m-4">
      <h2 className="text-xl font-bold mb-2">{course.title}</h2>
      <p className="text-gray-700 mb-2">{course.description}</p>
      <p className="text-gray-500">Instructor: {course.instructor}</p>
    </div>
  );
}
