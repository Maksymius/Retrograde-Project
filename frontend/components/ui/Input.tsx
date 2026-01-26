import { InputHTMLAttributes, forwardRef } from 'react'
import { cn } from '@/lib/utils'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  variant?: 'terminal' | 'default'
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant = 'terminal', type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          // Base styles
          'flex w-full transition-colors duration-200',
          'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-retro-bg',
          'disabled:cursor-not-allowed disabled:opacity-50',
          
          // Variants
          {
            // Terminal style input
            'bg-retro-surface/50 border border-retro-accent text-retro-accent font-mono': 
              variant === 'terminal',
            'placeholder:text-retro-accent/60 focus:ring-retro-accent': 
              variant === 'terminal',
            'px-4 py-3 text-sm backdrop-blur-sm': 
              variant === 'terminal',
              
            // Default style
            'bg-retro-surface border border-retro-border text-retro-text': 
              variant === 'default',
            'placeholder:text-retro-text/60 focus:ring-retro-primary': 
              variant === 'default',
            'px-3 py-2 text-base': 
              variant === 'default',
          },
          
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)

Input.displayName = 'Input'

export { Input }