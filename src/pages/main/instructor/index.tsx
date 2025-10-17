import { useState } from 'react';

export default function InstructorPage() {
  const [courseTitle, setCourseTitle] = useState('');

  const handleCreateCourse = (e) => {
    e.preventDefault();
    // Logic to create a new course will be added here
    console.log('Creating course:', courseTitle);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Instructor Dashboard</h1>
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Create a New Course</h2>
        <form onSubmit={handleCreateCourse}>
          <div className="flex gap-4">
            <input
              type="text"
              placeholder="Course Title"
              value={courseTitle}
              onChange={(e) => setCourseTitle(e.target.value)}
              className="border rounded px-4 py-2 flex-1"
            />
            <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-md">
              Create Course
            </button>
          </div>
        </form>
      </div>
      <div>
        <h2 className="text-xl font-semibold mb-2">My Courses</h2>
        {/* List of courses will be displayed here */}
        <p>You have not created any courses yet.</p>
      </div>
    </div>
  );
}
