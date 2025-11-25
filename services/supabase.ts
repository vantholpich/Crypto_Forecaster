import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL || "https://nnocljipqgxjbrilrbvw.supabase.co";
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5ub2NsamlwcWd4amJyaWxyYnZ3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQwNTY4MDAsImV4cCI6MjA3OTYzMjgwMH0.azZJUYp6SsJ-lcn6K46hnEu28250Pl-cWbEOS-VpKdU";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
});
