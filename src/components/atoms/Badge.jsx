import { forwardRef } from "react"
import { cn } from "@/utils/cn"

const Badge = forwardRef(({ 
  className,
  variant = "default",
  children,
  ...props 
}, ref) => {
  const variants = {
    default: "bg-gradient-to-r from-midnight to-slate-700 text-white",
    success: "bg-gradient-to-r from-success to-green-600 text-white",
    warning: "bg-gradient-to-r from-warning to-orange-500 text-white",
    error: "bg-gradient-to-r from-error to-red-600 text-white",
    outline: "border-2 border-midnight text-midnight bg-transparent",
  }
  
  return (
    <span
      ref={ref}
      className={cn(
        "inline-flex items-center px-3 py-1 rounded-full text-sm font-medium font-crimson shadow-sm",
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  )
})

Badge.displayName = "Badge"

export default Badge