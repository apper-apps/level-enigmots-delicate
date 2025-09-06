import { forwardRef } from "react"
import { cn } from "@/utils/cn"

const Input = forwardRef(({ 
  className, 
  type = "text",
  placeholder,
  ...props 
}, ref) => {
  return (
    <input
      type={type}
      className={cn(
        "handwritten-input w-full text-center",
        className
      )}
      placeholder={placeholder}
      ref={ref}
      {...props}
    />
  )
})

Input.displayName = "Input"

export default Input