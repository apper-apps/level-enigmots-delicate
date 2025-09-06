import { forwardRef } from "react"
import { cn } from "@/utils/cn"

const Card = forwardRef(({ 
  className,
  children,
  ...props 
}, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "bg-paper/90 backdrop-blur-sm rounded-2xl shadow-lg border border-warmBrown/20 relative page-curl",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
})

Card.displayName = "Card"

export default Card