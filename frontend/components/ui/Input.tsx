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
          'focus:outline-none focus:ring-2 focus:ring-offset-2',
          'disabled:cursor-not-allowed disabled:opacity-50',
          
          // Variants
          {
            // Terminal style input
            'bg-gray-900/50 border border-green-400 text-green-400 font-mono': 
              variant === 'terminal',
            'placeholder:text-green-400/60 focus:ring-green-400': 
              variant === 'terminal',
            'px-4 py-3 text-sm backdrop-blur-sm': 
              variant === 'terminal',
              
            // Default style
            'bg-gray-800 border border-gray-600 text-gray-200': 
              variant === 'default',
            'placeholder:text-gray-400 focus:ring-amber-500': 
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