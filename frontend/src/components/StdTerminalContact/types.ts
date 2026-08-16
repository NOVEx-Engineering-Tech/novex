import type { JSX } from 'react'

export interface ContactChannel {
  key: string
  label: string
  Icon: () => JSX.Element
  value: string
  display: string
  href: string
  external: boolean
}
