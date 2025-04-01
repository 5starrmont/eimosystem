
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = "https://iryabjsypmaozcfuaona.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlyeWFianN5cG1hb3pjZnVhb25hIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI1NjA5MjIsImV4cCI6MjA1ODEzNjkyMn0.e44vo3D8Nm9JUwu6e0rjIVnzw0jo7y5rtygBMCBUO90";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: true,
    storage: localStorage,
    autoRefreshToken: true
  }
});
