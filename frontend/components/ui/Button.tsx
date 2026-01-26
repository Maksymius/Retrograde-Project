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
          'border focus:outline-none focus:ring-2 focus:ring-offset-2',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          
          // Variants
          {
            'bg-amber-500 text-black border-amber-500 hover:bg-amber-400 focus:ring-amber-500 shadow-lg shadow-amber-500/25': 
              variant === 'primary',
            'bg-transparent text-green-400 border-green-400 hover:bg-green-400/10 focus:ring-green-400': 
              variant === 'secondary',
            'bg-red-500 text-white border-red-500 hover:bg-red-400 focus:ring-red-500': 
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