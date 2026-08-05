import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { isSupabaseConfigured, supabase } from '@/lib/supabase'
import { useAuth } from '@/features/auth/useAuth'

export interface Profile {
  display_name: string | null
  avatar_url: string | null
  timezone: string | null
  onboarding_completed: boolean | null
}

export function useProfile() {
  const { user } = useAuth()

  return useQuery({
    queryKey: ['profile', user?.id],
    queryFn: async (): Promise<Profile | null> => {
      if (!user || !isSupabaseConfigured || !supabase) return null
      const { data, error } = await supabase
        .from('profiles')
        .select('display_name, avatar_url, timezone, onboarding_completed')
        .eq('id', user.id)
        .maybeSingle()
      if (error) throw error
      return (data as Profile | null) ?? null
    },
    enabled: Boolean(user && isSupabaseConfigured && supabase),
  })
}

export function useUpdateProfile() {
  const queryClient = useQueryClient()
  const { user } = useAuth()

  return useMutation({
    mutationFn: async (values: Partial<Pick<Profile, 'display_name' | 'timezone'>>) => {
      if (!user || !isSupabaseConfigured || !supabase) {
        throw new Error('Not signed in')
      }
      const { error } = await supabase.from('profiles').update(values).eq('id', user.id)
      if (error) throw error
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['profile'] })
    },
  })
}
