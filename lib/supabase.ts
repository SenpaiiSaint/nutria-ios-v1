import { createClient } from '@supabase/supabase-js';
import * as SecureStore from 'expo-secure-store';
import 'react-native-url-polyfill/auto'; // fetch & URL polyfills

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL 
const supabaseKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY 

// Only create client if we have valid environment variables
export const supabase = supabaseUrl && supabaseKey !== 'placeholder-key' 
  ? createClient(
      supabaseUrl,
      supabaseKey,
      {
        auth: {
          storage: {
            async getItem(key) {
              return SecureStore.getItemAsync(key)
            },
            async setItem(key, value) {
              await SecureStore.setItemAsync(key, value)
            },
            async removeItem(key) {
              await SecureStore.deleteItemAsync(key)
            },
          },
          autoRefreshToken: false,
          persistSession: true,
          detectSessionInUrl: false,
        },
      }
    )
  : null
