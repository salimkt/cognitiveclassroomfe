import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { authenticatedFetch } from '../../../lib/api';

export default function EditCoursePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const data = await authenticatedFetch(`/courses/${id}`);
        setTitle(data.title);
        setDescription(data.description);
      } catch (error) {
        console.error('Error fetching course:', error);
      }
    };

    fetchCourse();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await authenticatedFetch(`/courses/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ title, description }),
      });
      navigate('/instructor');
    } catch (error) {
      console.error('Error updating course:', error);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-semibold text-foreground mb-2">Edit Course</h1>
        <p className="text-muted-foreground">Update course information</p>
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
              Update Course
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
