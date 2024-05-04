import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";

// Better put your these secret keys in .env file
export const supabase = createClient("https://azmmrxkndtbynkssgmja.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF6bW1yeGtuZHRieW5rc3NnbWphIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTI5NDc4NzEsImV4cCI6MjAyODUyMzg3MX0.KoRDbCsLtAfjXhh11qyre-lIJ9RlG9qNgRaUU6AWcK4", {
  localStorage: AsyncStorage as any,
  detectSessionInUrl: false // Prevents Supabase from evaluating window.location.href, breaking mobile
});
