import type { JSX } from 'react'

export interface PlatformEntry {
  label: string
  Icon: () => JSX.Element
  href: (value: string) => string
  display: (value: string) => string
  external: boolean
}
