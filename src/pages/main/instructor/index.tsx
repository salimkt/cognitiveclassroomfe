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
      <div>
        <h1 className="text-4xl font-semibold text-foreground mb-2">Instructor Dashboard</h1>
        <p className="text-muted-foreground">Create and manage your courses</p>
      </div>
      <div className="bg-card rounded-lg border border-border p-8">
        <h2 className="text-xl font-semibold text-foreground mb-4">Quick Actions</h2>
        <form onSubmit={handleCreateCourse} className="flex gap-4">
          <input
            type="text"
            placeholder="Enter course title..."
            value={courseTitle}
            onChange={(e) => setCourseTitle(e.target.value)}
            className="flex-1 bg-input border border-border rounded-lg px-4 py-2 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-colors"
          />
          <button type="submit" className="bg-primary hover:bg-primary text-primary-foreground font-medium px-6 py-2 rounded-lg transition-colors hover:opacity-90">
            Create
          </button>
        </form>
      </div>
      <div>
        <h2 className="text-2xl font-semibold text-foreground mb-4">My Courses</h2>
        <p className="text-muted-foreground">You have not created any courses yet.</p>
      </div>
    </div>
  );
}
