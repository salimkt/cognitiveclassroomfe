import { useState } from 'react';
import { supabase } from '../../lib/supabase/client';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      console.error('Error logging in:', error.message);
    } else {
      navigate('/');
    }
  };

  return (
    <div className="w-full max-w-md">
      <div className="bg-card backdrop-blur-sm rounded-2xl border border-border/50 p-8 space-y-8 shadow-2xl hover:shadow-3xl transition-shadow duration-300">
        {/* Header with icon area */}
        <div className="text-center space-y-3">
          <div className="flex justify-center">
            <div className="w-16 h-16 bg-gradient-to-br from-primary to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
              <span className="text-2xl text-primary-foreground">🎓</span>
            </div>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-indigo-600 bg-clip-text text-transparent">Cognitive Classroom</h1>
          <p className="text-muted-foreground text-base leading-relaxed">Welcome back! Continue your learning journey</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          {/* Email field */}
          <div className="space-y-2.5">
            <label className="block text-sm font-semibold text-foreground flex items-center gap-2" htmlFor="email">
              <span>✉️</span>
              Email Address
            </label>
            <input
              className="w-full px-4 py-3 bg-input text-foreground border-2 border-border rounded-xl placeholder-muted-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200"
              id="email"
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password field */}
          <div className="space-y-2.5">
            <label className="block text-sm font-semibold text-foreground flex items-center gap-2" htmlFor="password">
              <span>🔐</span>
              Password
            </label>
            <input
              className="w-full px-4 py-3 bg-input text-foreground border-2 border-border rounded-xl placeholder-muted-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200"
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Sign In button */}
          <button
            className="w-full py-3 font-semibold text-primary-foreground bg-gradient-to-r from-primary to-indigo-600 rounded-xl hover:from-primary/90 hover:to-indigo-600/90 focus:outline-none focus:ring-4 focus:ring-primary/30 transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg text-base"
            type="submit"
          >
            Sign In
          </button>
        </form>

        {/* Divider */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-3 bg-card text-muted-foreground">New to Cognitive Classroom?</span>
          </div>
        </div>

        {/* Sign up prompt */}
        <p className="text-center">
          <Link to="/auth/signup" className="inline-flex items-center gap-2 font-semibold text-primary hover:text-indigo-600 transition-colors duration-200 text-base group">
            Create an account
            <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
          </Link>
        </p>

        {/* Footer info */}
        <div className="pt-4 border-t border-border/30">
          <p className="text-xs text-muted-foreground text-center leading-relaxed">
            By signing in, you agree to our terms and conditions
          </p>
        </div>
      </div>
    </div>
  );
}
