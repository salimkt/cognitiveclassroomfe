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
      <div>
        <h1 className="text-4xl font-semibold text-foreground mb-2">Your Profile</h1>
        <p className="text-muted-foreground">Manage your account information</p>
      </div>
      <div className="bg-card rounded-lg border border-border p-8 max-w-2xl">
        <form onSubmit={handleUpdateProfile} className="space-y-6">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-foreground mb-2">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-input border border-border rounded-lg py-2 px-3 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-colors"
              placeholder="Enter your username"
            />
          </div>
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-foreground mb-2">Full Name</label>
            <input
              type="text"
              id="fullName"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full bg-input border border-border rounded-lg py-2 px-3 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-colors"
              placeholder="Enter your full name"
            />
          </div>
          <div>
            <label htmlFor="website" className="block text-sm font-medium text-foreground mb-2">Website</label>
            <input
              type="text"
              id="website"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              className="w-full bg-input border border-border rounded-lg py-2 px-3 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-colors"
              placeholder="Enter your website URL"
            />
          </div>
          <button
            type="submit"
            className="bg-primary hover:bg-primary text-primary-foreground font-medium py-2 px-6 rounded-lg transition-colors hover:opacity-90"
          >
            Update Profile
          </button>
        </form>
      </div>
    </div>
  );
}
