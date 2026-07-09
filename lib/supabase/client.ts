"use client";

import { createBrowserClient } from "@supabase/auth-helpers-nextjs";

const supabaseUrl = (process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL) as string;
const supabaseAnonKey = (process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_PUBLISHABLE_KEY || process.env.SUPABASE_SECRET_KEY) as string;

export const supabaseBrowser = createBrowserClient(supabaseUrl, supabaseAnonKey);

export default supabaseBrowser;
