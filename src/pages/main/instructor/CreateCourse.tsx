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
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-primary to-indigo-600 bg-clip-text text-transparent">Create New Course</h1>
        <p className="text-lg text-muted-foreground">Share your knowledge and create an amazing learning experience</p>
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
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-200/50 p-6">
            <p className="text-sm text-muted-foreground leading-relaxed">
              <span className="font-semibold text-foreground">💡 Tip:</span> Write a clear and engaging description to help students understand what your course offers. Include learning outcomes and target audience.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              className="flex-1 bg-gradient-to-r from-primary to-indigo-600 hover:from-primary/90 hover:to-indigo-600/90 text-primary-foreground font-semibold py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg"
            >
              Create Course
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
