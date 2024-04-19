'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState, type HTMLProps } from 'react'
import { Around, type ToggleProps } from '@theme-toggles/react'


type ThemeToggleProps = {
  className?: HTMLProps<HTMLElement>['className']
}

export function ThemeToggle(props: ToggleProps) {
  const [mounted, setMounted] = useState(false)
  const { resolvedTheme, setTheme } = useTheme()

  const THEME_LIGHT = 'light'
 const THEME_DARK = 'dark'

  const isDark = resolvedTheme === THEME_DARK

  useEffect(() => {
    setMounted(true)
  }, [])

  // TODO: fix layout shift from hydration
  if (!mounted) return null

  return (
    <Around
      // duration={500}
      placeholder={isDark ? '🌙' : '☀️'}
      toggled={isDark}
      toggle={() => setTheme(isDark ? THEME_LIGHT : THEME_DARK)}
      // className={className}
      forceMotion
      // fixes typescript error
      onPointerEnterCapture={undefined}
      onPointerLeaveCapture={undefined}
      {...props}
    />
  )
}