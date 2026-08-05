import type { SupabaseClient } from '@supabase/supabase-js'
import { isSupabaseConfigured, supabase } from '@/lib/supabase'

function getSupabase(): SupabaseClient {
  if (!isSupabaseConfigured || !supabase) {
    throw new Error('Supabase is not configured. Add your environment variables first.')
  }
  return supabase
}

export async function signInWithPassword(email: string, password: string): Promise<void> {
  const client = getSupabase()
  const { error } = await client.auth.signInWithPassword({ email, password })
  if (error) throw error
}

export async function signUpWithEmail(email: string, password: string): Promise<void> {
  const client = getSupabase()
  const { error } = await client.auth.signUp({ email, password })
  if (error) throw error
}

export async function signOut(): Promise<void> {
  const client = getSupabase()
  const { error } = await client.auth.signOut()
  if (error) throw error
}

export async function sendPasswordReset(email: string): Promise<void> {
  const client = getSupabase()
  const { error } = await client.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/reset-password`,
  })
  if (error) throw error
}

export async function updatePassword(password: string): Promise<void> {
  const client = getSupabase()
  const { error } = await client.auth.updateUser({ password })
  if (error) throw error
}
