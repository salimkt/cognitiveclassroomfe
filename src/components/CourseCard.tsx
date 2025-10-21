import { Link } from "react-router-dom";

export default function CourseCard({ course, onDelete }: { course: any, onDelete: (id: string) => void }) {
  return (
    <div className="bg-card text-card-foreground rounded-lg border border-border shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col">
      <div className="p-6 flex-1 flex flex-col">
        <h2 className="text-xl font-semibold mb-2">{course.title}</h2>
        <p className="text-muted-foreground text-sm mb-4 flex-1">{course.description}</p>
        <p className="text-sm text-muted-foreground">Instructor: <span className="font-medium text-foreground">{course.instructor}</span></p>
      </div>
      <div className="px-6 pb-6 flex gap-3">
        <Link to={`/instructor/edit-course/${course.id}`} className="flex-1 bg-primary hover:bg-primary text-primary-foreground font-medium py-2 px-4 rounded-lg transition-colors hover:opacity-90 text-center">
          Edit
        </Link>
        <button
          onClick={() => onDelete(course.id)}
          className="flex-1 bg-destructive hover:bg-destructive text-destructive-foreground font-medium py-2 px-4 rounded-lg transition-colors hover:opacity-90"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
