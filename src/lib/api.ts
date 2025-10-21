import { supabase } from './supabase/client';

const API_ROOT = 'https://cognitiveclassroombe.onrender.com';

export const authenticatedFetch = async (url: string, options: RequestInit = {}) => {
  const { data: { session } } = await supabase.auth.getSession();
  const token = session?.access_token;

  const headers = {
    ...options.headers,
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` }),
  };

  const fullUrl = `${API_ROOT}${url}`;
  console.log(`Fetching: ${fullUrl}`, { headers, token: token ? 'present' : 'missing' });

  const response = await fetch(fullUrl, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const errorBody = await response.text();
    const errorMessage = `API error: ${response.status} ${response.statusText} - ${errorBody}`;
    console.error(errorMessage);
    throw new Error(errorMessage);
  }

  return response.json();
};
