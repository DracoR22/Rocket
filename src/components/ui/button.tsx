import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-xl text-base font-bold uppercase tracking-wide ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:bg-disabled disabled:text-disabled-foreground disabled:border-transparent',
  {
    variants: {
      variant: {
        locked: 'bg-neutral-200 text-primary-foreground hover:bg-neutral-200/90 border-neutral-400 border-b-4 active:border-b-0',
        default:
          'bg-card text-card-foreground border-2 border-b-4 hover:bg-border/50 active:border-b-2 dark:hover:bg-border/70',
        primary:
          'bg-primary text-primary-foreground border-b-4 border-primary-depth hover:bg-primary/90 active:border-b-0',
        primaryOutline: "bg-background text-sky-500 hover:bg-slate-100 dark:hover:bg-slate-900",
        secondary:
          'bg-secondary text-secondary-foreground border-b-4 border-secondary-depth hover:bg-secondary/90 active:border-b-0',
        danger:
          'bg-destructive text-destructive-foreground border-b-4 border-destructive-depth hover:bg-destructive/90 active:border-b-0',
        dangerOutline: "bg-background text-rose-500 hover:bg-slate-100 dark:hover:bg-slate-900",
        super:
          'bg-super text-super-foreground border-b-4 border-super-depth hover:bg-super/90 active:border-b-0',

        ghost: 'bg-card hover:bg-border/50 dark:hover:bg-border/70',
        active:
          'bg-secondary/15 text-secondary border-2 border-b-4 border-secondary/80 hover:bg-secondary/20',
        correct:
          'bg-green-500/15 text-green-500 border-2 border-b-4 border-green-500/80 hover:bg-green-500/20',
        incorrect:
          'bg-destructive/15 text-destructive border-2 border-b-4 border-destructive/80 hover:bg-destructive/20',
        sidebar: "bg-transparent text-slate-500 border-2 border-transparent hover:bg-slate-100 dark:hover:bg-slate-900  transition-none",
        sidebarOutline: "bg-sky-500/15 text-sky-500 border-sky-300 border-2 hover:bg-sky-500/20 transition-none"
      },
      size: {
        default: 'h-11 px-4 py-2',
        sm: 'h-9 px-3',
        lg: 'h-14 px-8',
        icon: 'h-11 w-11',
        rounded: 'rounded-full',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
    )
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants }