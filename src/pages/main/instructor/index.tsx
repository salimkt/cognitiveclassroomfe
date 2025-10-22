import { useState } from 'react';

export default function InstructorPage() {
  const [courseTitle, setCourseTitle] = useState('');

  const handleCreateCourse = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Logic to create a new course will be added here
    console.log('Creating course:', courseTitle);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-primary to-indigo-600 bg-clip-text text-transparent">Instructor Dashboard</h1>
        <p className="text-lg text-muted-foreground">Create and manage your courses efficiently</p>
      </div>

      {/* Quick Actions Card */}
      <div className="bg-card rounded-2xl border border-border/50 p-8 shadow-md">
        <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
          <span>⚡</span>
          Quick Actions
        </h2>
        <form onSubmit={handleCreateCourse} className="flex gap-3">
          <input
            type="text"
            placeholder="Quick course title..."
            value={courseTitle}
            onChange={(e) => setCourseTitle(e.target.value)}
            className="flex-1 bg-input border-2 border-border rounded-xl px-4 py-3 text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200"
          />
          <button
            type="submit"
            className="bg-gradient-to-r from-primary to-indigo-600 hover:from-primary/90 hover:to-indigo-600/90 text-primary-foreground font-semibold px-8 py-3 rounded-xl transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg"
          >
            Create
          </button>
        </form>
      </div>

      {/* Divider */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-3 bg-background text-muted-foreground">My Courses</span>
        </div>
      </div>

      {/* My Courses Section */}
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
          <span>📚</span>
          Course List
        </h2>
        <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-2xl border-2 border-dashed border-border p-12 text-center">
          <p className="text-6xl mb-4">🎓</p>
          <p className="text-lg font-medium text-muted-foreground mb-2">You have not created any courses yet.</p>
          <p className="text-sm text-muted-foreground mb-6">Get started by creating your first course using the quick action above or the dedicated course creation page.</p>
        </div>
      </div>
    </div>
  );
}
