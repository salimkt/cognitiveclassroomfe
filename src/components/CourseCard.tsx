import { Link } from "react-router-dom";

export default function CourseCard({ course, onDelete }: { course: any, onDelete: (id: string) => void }) {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 m-4">
      <h2 className="text-xl font-bold mb-2">{course.title}</h2>
      <p className="text-gray-700 mb-2">{course.description}</p>
      <p className="text-gray-500">Instructor: {course.instructor}</p>
      <div className="flex justify-end mt-4">
        <Link to={`/instructor/edit-course/${course.id}`} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">
          Edit
        </Link>
        <button onClick={() => onDelete(course.id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
          Delete
        </button>
      </div>
    </div>
  );
}
