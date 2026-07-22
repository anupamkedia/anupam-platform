import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { cookies } from 'next/headers';

export function createServerSupabase() {
  const cookieStore = cookies();
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) { return cookieStore.get(name)?.value; },
        set(name: string, value: string, options: CookieOptions) {
          try { cookieStore.set({ name, value, ...options }); } catch (e) {}
        },
        remove(name: string, options: CookieOptions) {
          try { cookieStore.set({ name, value: '', ...options }); } catch (e) {}
        },
      },
    }
  );
}

export async function getSession() {
  const supabase = createServerSupabase();
  const { data: { session } } = await supabase.auth.getSession();
  return session;
}

export async function getUserProfile() {
  const session = await getSession();
  if (!session) return null;
  const supabase = createServerSupabase();
  const { data } = await supabase
    .from('profiles')
    .select('*, roles(name, permissions)')
    .eq('id', session.user.id)
    .single();
  return data;
}

export async function requireAuth(allowedRoles?: string[]) {
  const profile = await getUserProfile();
  if (!profile) return { redirect: '/login', profile: null };
  if (allowedRoles && !allowedRoles.includes(profile.roles?.name)) {
    return { redirect: '/', profile: null };
  }
  return { redirect: null, profile };
}
