import { useState } from 'react';
import { useAuth } from '../../../context/AuthProvider';
import { useNavigate } from 'react-router-dom';
import { authenticatedFetch } from '../../../lib/api';

export default function CreateCoursePage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) {
      console.error('User not logged in');
      return;
    }

    try {
      const course = await authenticatedFetch('/courses/', {
        method: 'POST',
        body: JSON.stringify({ title, description, instructor_id: user.id }),
      });
      console.log('Course created successfully:', course);
      navigate('/instructor');
    } catch (error) {
      console.error('Error creating course:', error);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-semibold text-foreground mb-2">Create Course</h1>
        <p className="text-muted-foreground">Add a new course to share with students</p>
      </div>
      <div className="bg-card rounded-lg border border-border p-8 max-w-2xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-foreground mb-2">Course Title</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full bg-input border border-border rounded-lg py-2 px-3 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-colors"
              placeholder="Enter course title"
            />
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-foreground mb-2">Description</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              rows={6}
              className="w-full bg-input border border-border rounded-lg py-2 px-3 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-colors resize-none"
              placeholder="Enter course description"
            ></textarea>
          </div>
          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              className="bg-primary hover:bg-primary text-primary-foreground font-medium py-2 px-6 rounded-lg transition-colors hover:opacity-90"
            >
              Create Course
            </button>
            <button
              type="button"
              onClick={() => navigate('/instructor')}
              className="bg-muted hover:bg-muted text-muted-foreground font-medium py-2 px-6 rounded-lg transition-colors hover:opacity-90"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
