import { useState } from 'react';
import { supabase } from '../../lib/supabase/client';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

export default function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });
    if (error) {
      console.error('Error signing up:', error.message);
    } else {
      navigate('/');
    }
  };

  return (
    <div className="w-full max-w-md">
      <div className="bg-card rounded-lg border border-border p-8 space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-semibold text-foreground">Cognitive Classroom</h1>
          <p className="mt-2 text-sm text-muted-foreground">Create your account to get started.</p>
        </div>
        <form onSubmit={handleSignup} className="space-y-6">
          <div>
            <label className="block mb-2 text-sm font-medium text-foreground" htmlFor="email">
              Email
            </label>
            <input
              className="w-full px-3 py-2 bg-input text-foreground border border-border rounded-lg placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-colors"
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-foreground" htmlFor="password">
              Password
            </label>
            <input
              className="w-full px-3 py-2 bg-input text-foreground border border-border rounded-lg placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-colors"
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            className="w-full py-2 font-medium text-primary-foreground bg-primary rounded-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-ring transition-colors"
            type="submit"
          >
            Sign Up
          </button>
        </form>
        <p className="text-sm text-center text-muted-foreground">
          Already have an account?{' '}
          <Link to="/auth/login" className="font-medium text-primary hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
