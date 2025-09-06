import { forwardRef } from "react"
import { cn } from "@/utils/cn"

const Button = forwardRef(({ 
  className, 
  variant = "default", 
  size = "default", 
  children,
  disabled = false,
  ...props 
}, ref) => {
  const baseStyles = "inline-flex items-center justify-center rounded-xl font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transform active:scale-95"
  
  const variants = {
    default: "bg-gradient-to-r from-coral to-red-500 text-white shadow-lg hover:shadow-xl hover:scale-105 focus:ring-coral/50",
    secondary: "bg-gradient-to-r from-warmBrown to-amber-700 text-white shadow-md hover:shadow-lg hover:scale-105 focus:ring-warmBrown/50",
    outline: "border-2 border-midnight bg-transparent text-midnight hover:bg-midnight hover:text-white focus:ring-midnight/50",
    ghost: "bg-transparent text-midnight hover:bg-midnight/10 focus:ring-midnight/50",
  }
  
  const sizes = {
    sm: "h-10 px-4 py-2 text-sm font-crimson",
    default: "h-12 px-6 py-3 text-base font-crimson",
    lg: "h-14 px-8 py-4 text-lg font-crimson",
  }
  
  return (
    <button
      className={cn(
        baseStyles,
        variants[variant],
        sizes[size],
        className
      )}
      ref={ref}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  )
})

Button.displayName = "Button"

export default Button