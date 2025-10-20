import { createClient } from '@supabase/supabase-js';

// TODO: Replace with your Supabase project details
const supabaseUrl = 'https://hkoiekytqocmosuqpffo.supabase.co';
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhrb2lla3l0cW9jbW9zdXFwZmZvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA0MzcxODMsImV4cCI6MjA3NjAxMzE4M30.BjIg3qjgRYSKNN9Hl779cD32SmnADOHOQYbuPxuL4Cs";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
