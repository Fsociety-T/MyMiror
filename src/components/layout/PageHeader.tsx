import { motion } from 'motion/react'

type Props = {
  title: string
  subtitle?: string
  /** Initials shown in the avatar — opens vision / streaks / settings / profile. */
  initials?: string
  onAvatar?: () => void
}

export function PageHeader({ title, subtitle, initials = 'T', onAvatar }: Props) {
  return (
    <header className="flex items-start justify-between pt-3 pb-5">
      <div>
        <h1 className="nums text-[26px] leading-tight">{title}</h1>
        {subtitle && <p className="mt-0.5 text-[13px] text-dim">{subtitle}</p>}
      </div>

      <motion.button
        onClick={onAvatar}
        aria-label="Profile and settings"
        whileTap={{ scale: 0.94 }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        className="mt-1 flex size-9 shrink-0 items-center justify-center rounded-full border border-line bg-surface text-[13px] font-semibold text-dim"
      >
        {initials}
      </motion.button>
    </header>
  )
}
