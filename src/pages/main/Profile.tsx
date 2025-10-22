import { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
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
    <div>
      <h1 className="text-3xl font-bold mb-4">Your Profile</h1>
      <form onSubmit={handleUpdateProfile}>
        <div className="mb-4">
          <label htmlFor="username" className="block text-gray-700 font-bold mb-2">Username</label>
          <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        </div>
        <div className="mb-4">
          <label htmlFor="fullName" className="block text-gray-700 font-bold mb-2">Full Name</label>
          <input type="text" id="fullName" value={fullName} onChange={(e) => setFullName(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        </div>
        <div className="mb-4">
          <label htmlFor="website" className="block text-gray-700 font-bold mb-2">Website</label>
          <input type="text" id="website" value={website} onChange={(e) => setWebsite(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        </div>
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Update Profile
        </button>
      </form>
    </div>
  );
}
