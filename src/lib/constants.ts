export const APP_NAME = 'My Mirror'
export const APP_TAGLINE = 'Your private space to reflect, plan, and take action.'

export const MOBILE_MAX_WIDTH = 430
export const DESKTOP_MAX_WIDTH = 430

export const NAV_ITEMS = [
  { id: 'home', label: 'Home', to: '/' },
  { id: 'plan', label: 'Plan', to: '/plan' },
  { id: 'focus', label: 'Focus', to: '/focus' },
  { id: 'review', label: 'Review', to: '/review' },
  { id: 'vault', label: 'Vault', to: '/vault' },
] as const

export type NavItemId = (typeof NAV_ITEMS)[number]['id']

export const QUICK_ADD_OPTIONS = [
  { id: 'task', label: 'Add task' },
  { id: 'goal', label: 'Add goal' },
  { id: 'project', label: 'Add project' },
  { id: 'note', label: 'Add note' },
  { id: 'focus', label: 'Start focus' },
  { id: 'capture', label: 'Open Smart Capture' },
] as const
