import { useState } from 'react'
import { Sheet } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { Chip } from '@/components/ui/chip'
import { useAddTask } from '@/features/tasks/hooks'
import type { TaskPriority } from '@/types/database'

const PRIORITIES: TaskPriority[] = ['low', 'medium', 'high', 'critical']

export function TaskSheet({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [title, setTitle] = useState('')
  const [priority, setPriority] = useState<TaskPriority>('medium')
  const [mainMission, setMainMission] = useState(false)
  const add = useAddTask()

  function submit() {
    add.mutate(
      { title: title.trim(), priority, isMainMission: mainMission },
      {
        onSuccess: () => {
          setTitle('')
          setMainMission(false)
          onClose()
        },
      },
    )
  }

  return (
    <Sheet open={open} onClose={onClose}>
      <div className="px-4 pt-2">
        <div className="label mb-3">New task</div>

        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="What needs doing?"
          className="h-12 w-full rounded-[14px] border border-line bg-surface-2 px-4 text-[15px] text-text outline-none placeholder:text-dim focus:border-accent"
        />

        <div className="mt-4 flex flex-wrap gap-2">
          {PRIORITIES.map((p) => (
            <Chip key={p} active={priority === p} onClick={() => setPriority(p)}>
              {p}
            </Chip>
          ))}
        </div>

        <div className="mt-3">
          <Chip active={mainMission} onClick={() => setMainMission((v) => !v)}>
            ★ Main mission
          </Chip>
        </div>

        {add.error && (
          <p className="mt-3 text-[13px] text-bad">
            {add.error instanceof Error ? add.error.message : 'Save failed.'}
          </p>
        )}

        <Button
          size="lg"
          className="mt-5"
          onClick={submit}
          disabled={!title.trim() || add.isPending}
        >
          {add.isPending ? 'Saving…' : 'Add task'}
        </Button>
      </div>
    </Sheet>
  )
}
