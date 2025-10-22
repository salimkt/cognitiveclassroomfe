import { Link } from "react-router-dom";

export default function CourseCard({ course, onDelete }: { course: any, onDelete: (id: string) => void }) {
  return (
    <div className="group bg-card text-card-foreground rounded-2xl border border-border/50 overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 flex flex-col">
      {/* Course Header with gradient */}
      <div className="h-28 bg-gradient-to-br from-primary/20 via-indigo-600/20 to-blue-600/20 flex items-center justify-center text-4xl group-hover:scale-110 transition-transform duration-300">
        📚
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
      </div>

      {/* Action Buttons */}
      <div className="px-6 pb-6 flex gap-3">
        <Link
          to={`/instructor/edit-course/${course.id}`}
          className="flex-1 bg-gradient-to-r from-primary to-indigo-600 hover:from-primary/90 hover:to-indigo-600/90 text-primary-foreground font-semibold py-2 px-4 rounded-lg transition-all duration-200 transform hover:scale-105 active:scale-95 text-center shadow-md"
        >
          Edit
        </Link>
        <button
          onClick={() => onDelete(course.id)}
          className="flex-1 bg-destructive/90 hover:bg-destructive text-destructive-foreground font-semibold py-2 px-4 rounded-lg transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-md"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
