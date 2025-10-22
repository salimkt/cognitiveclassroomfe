import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthProvider';
import { authenticatedFetch } from '../../lib/api';

export default function ProfilePage() {
  const { user } = useAuth();
  const [username, setUsername] = useState('');
  const [fullName, setFullName] = useState('');
  const [website, setWebsite] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) return;

      try {
        const data = await authenticatedFetch(`/users/${user.id}`);
        setUsername(data.username);
        setFullName(data.full_name);
        setWebsite(data.website);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    fetchProfile();
  }, [user]);

  const handleUpdateProfile = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) return;

    const updates = {
      username,
      full_name: fullName,
      website,
    };

    try {
      await authenticatedFetch(`/users/${user.id}`, {
        method: 'PUT',
        body: JSON.stringify(updates),
      });
      console.log('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-primary to-indigo-600 bg-clip-text text-transparent">Your Profile</h1>
        <p className="text-lg text-muted-foreground">Manage your account information and preferences</p>
      </div>

      {/* Profile Card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Picture Section */}
        <div className="bg-card rounded-2xl border border-border/50 p-8 shadow-md">
          <div className="text-center">
            <div className="w-24 h-24 bg-gradient-to-br from-primary/20 to-indigo-600/20 rounded-full flex items-center justify-center mx-auto mb-4 text-5xl">
              👤
            </div>
            <p className="text-sm text-muted-foreground mb-4">Profile Avatar</p>
            <button className="w-full py-2 px-4 bg-gradient-to-r from-primary to-indigo-600 hover:from-primary/90 hover:to-indigo-600/90 text-primary-foreground font-medium rounded-lg transition-all duration-200">
              Upload Photo
            </button>
          </div>
        </div>

        {/* Form Section */}
        <div className="lg:col-span-2 bg-card rounded-2xl border border-border/50 p-8 shadow-md">
          <form onSubmit={handleUpdateProfile} className="space-y-6">
            <div>
              <label htmlFor="username" className="block text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                <span>👤</span>
                Username
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-input border-2 border-border rounded-xl py-3 px-4 text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200"
                placeholder="Enter your username"
              />
            </div>
            <div>
              <label htmlFor="fullName" className="block text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                <span>📝</span>
                Full Name
              </label>
              <input
                type="text"
                id="fullName"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full bg-input border-2 border-border rounded-xl py-3 px-4 text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200"
                placeholder="Enter your full name"
              />
            </div>
            <div>
              <label htmlFor="website" className="block text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                <span>🌐</span>
                Website
              </label>
              <input
                type="text"
                id="website"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                className="w-full bg-input border-2 border-border rounded-xl py-3 px-4 text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200"
                placeholder="https://yourwebsite.com"
              />
            </div>
            <div className="flex gap-3 pt-4">
              <button
                type="submit"
                className="flex-1 bg-gradient-to-r from-primary to-indigo-600 hover:from-primary/90 hover:to-indigo-600/90 text-primary-foreground font-semibold py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg"
              >
                Save Changes
              </button>
              <button
                type="button"
                className="flex-1 bg-muted hover:bg-muted text-muted-foreground font-semibold py-3 px-6 rounded-xl transition-all duration-200"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Additional Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-card rounded-2xl border border-border/50 p-6 shadow-md">
          <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
            <span>📊</span>
            Learning Statistics
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <p className="text-muted-foreground">Courses Enrolled</p>
              <p className="font-semibold text-primary">0</p>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-muted-foreground">Courses Completed</p>
              <p className="font-semibold text-primary">0</p>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-muted-foreground">Total Learning Hours</p>
              <p className="font-semibold text-primary">0h</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-primary/5 to-indigo-600/5 rounded-2xl border border-border/50 p-6 shadow-md">
          <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
            <span>⚙️</span>
            Preferences
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-foreground">Email Notifications</p>
              <input type="checkbox" className="w-5 h-5 accent-primary rounded" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <p className="text-foreground">Course Updates</p>
              <input type="checkbox" className="w-5 h-5 accent-primary rounded" defaultChecked />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
