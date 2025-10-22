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

  let data;
  try {
    data = await response.json();
  } catch (e) {
    const errorMessage = `API error: ${response.status} ${response.statusText}`;
    console.error(errorMessage, e);
    throw new Error(errorMessage);
  }

  if (!response.ok) {
    const errorMessage = `API error: ${response.status} ${response.statusText}`;
    console.error(errorMessage, data);
    throw new Error(errorMessage);
  }

  return data;
};
