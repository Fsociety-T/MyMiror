import { supabase } from '@/lib/supabase'
import { dayKey } from '@/lib/date'
import type { Task, TaskPriority } from '@/types/database'

export async function addTask(input: {
  userId: string
  title: string
  priority: TaskPriority
  isMainMission: boolean
  projectId?: string | null
  dueDate?: string
}): Promise<void> {
  const { error } = await supabase.from('tasks').insert({
    user_id: input.userId,
    title: input.title,
    priority: input.priority,
    is_main_mission: input.isMainMission,
    project_id: input.projectId ?? null,
    due_date: input.dueDate ?? dayKey(),
  })
  if (error) throw error
}

export async function getTasks(userId: string, date = dayKey()): Promise<Task[]> {
  const { data, error } = await supabase
    .from('tasks')
    .select('*')
    .eq('user_id', userId)
    .eq('due_date', date)
    .order('is_main_mission', { ascending: false })
    .order('created_at', { ascending: true })

  if (error) throw error
  return data ?? []
}

export async function setTaskStatus(id: string, done: boolean): Promise<void> {
  const { error } = await supabase
    .from('tasks')
    .update({
      status: done ? 'done' : 'todo',
      completed_at: done ? new Date().toISOString() : null,
    })
    .eq('id', id)
  if (error) throw error
}
