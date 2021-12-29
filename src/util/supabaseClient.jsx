import { createClient } from '@supabase/supabase-js';

// const supabaseUrl = process.env.REACT_APP_SUPABASE_URL
// const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY

const supabaseUrl = "https://viguzjltcicaxknbgvte.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYzMTM5NDIxMSwiZXhwIjoxOTQ2OTcwMjExfQ.fn8uFbR5qFqBpzmzd-9mQZHXD7KwDdNQQ-CKSqouJaw";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);