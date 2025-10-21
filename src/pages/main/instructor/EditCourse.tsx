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
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-primary to-indigo-600 bg-clip-text text-transparent">Edit Course</h1>
        <p className="text-lg text-muted-foreground">Update your course information and details</p>
      </div>

      {/* Form Card */}
      <div className="bg-card rounded-2xl border border-border/50 p-8 max-w-3xl shadow-md">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Title Field */}
          <div>
            <label htmlFor="title" className="block text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
              <span>📝</span>
              Course Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full bg-input border-2 border-border rounded-xl py-3 px-4 text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200 text-lg"
              placeholder="e.g., Advanced React Patterns"
            />
          </div>

          {/* Description Field */}
          <div>
            <label htmlFor="description" className="block text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
              <span>📖</span>
              Course Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              rows={8}
              className="w-full bg-input border-2 border-border rounded-xl py-3 px-4 text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200 resize-none text-base leading-relaxed"
              placeholder="Describe what students will learn, course structure, prerequisites..."
            ></textarea>
          </div>

          {/* Info Box */}
          <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl border border-yellow-200/50 p-6">
            <p className="text-sm text-muted-foreground leading-relaxed">
              <span className="font-semibold text-foreground">⚠️ Note:</span> Changes to your course will be saved immediately. Make sure all information is accurate before saving.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              className="flex-1 bg-gradient-to-r from-primary to-indigo-600 hover:from-primary/90 hover:to-indigo-600/90 text-primary-foreground font-semibold py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg"
            >
              Update Course
            </button>
            <button
              type="button"
              onClick={() => navigate('/instructor')}
              className="flex-1 bg-muted hover:bg-muted/80 text-muted-foreground font-semibold py-3 px-6 rounded-xl transition-all duration-200"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
