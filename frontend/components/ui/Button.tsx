import { ButtonHTMLAttributes, forwardRef } from 'react'
import { cn } from '@/lib/utils'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger'
  size?: 'sm' | 'md' | 'lg'
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
    return (
      <button
        className={cn(
          // Base styles
          'inline-flex items-center justify-center font-mono font-medium transition-all duration-200',
          'border focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-retro-bg',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          
          // Variants
          {
            'bg-retro-primary text-retro-bg border-retro-primary hover:bg-retro-primary/90 focus:ring-retro-primary shadow-lg shadow-retro-primary/25': 
              variant === 'primary',
            'bg-transparent text-retro-accent border-retro-accent hover:bg-retro-accent/10 focus:ring-retro-accent': 
              variant === 'secondary',
            'bg-retro-error text-white border-retro-error hover:bg-retro-error/90 focus:ring-retro-error': 
              variant === 'danger',
          },
          
          // Sizes
          {
            'px-3 py-1.5 text-sm': size === 'sm',
            'px-4 py-2 text-base': size === 'md',
            'px-6 py-3 text-lg': size === 'lg',
          },
          
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)

Button.displayName = 'Button'

export { Button }