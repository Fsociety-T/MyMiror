import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { dayKey } from '@/lib/date'
import { useUserId } from '@/features/today/hooks'
import type { TaskPriority } from '@/types/database'
import { addTask, getTasks, setTaskStatus } from './api'

export function useTasks(date = dayKey()) {
  const userId = useUserId()
  return useQuery({
    queryKey: ['tasks', userId, date],
    enabled: Boolean(userId),
    queryFn: () => getTasks(userId!, date),
  })
}

/** Tasks feed v_day.tasks_done/total, so the Life Score must refetch too. */
function useTaskInvalidation(date: string) {
  const userId = useUserId()
  const qc = useQueryClient()
  return () => {
    qc.invalidateQueries({ queryKey: ['tasks', userId, date] })
    qc.invalidateQueries({ queryKey: ['today', userId, date] })
  }
}

export function useAddTask(date = dayKey()) {
  const userId = useUserId()
  const invalidate = useTaskInvalidation(date)

  return useMutation({
    mutationFn: (input: {
      title: string
      priority: TaskPriority
      isMainMission: boolean
      projectId?: string | null
    }) => addTask({ userId: userId!, dueDate: date, ...input }),
    onSuccess: invalidate,
  })
}

export function useSetTaskStatus(date = dayKey()) {
  const invalidate = useTaskInvalidation(date)
  return useMutation({
    mutationFn: (v: { id: string; done: boolean }) => setTaskStatus(v.id, v.done),
    onSuccess: invalidate,
  })
}
