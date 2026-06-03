import * as React from "react"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "secondary" | "outline" | "ghost" | "link"
  size?: "default" | "sm" | "lg" | "icon"
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", variant = "default", size = "default", ...props }, ref) => {
    let variantStyles = ""
    if (variant === "default") variantStyles = "bg-primary text-primary-foreground hover:bg-primary/90"
    if (variant === "secondary") variantStyles = "bg-surface text-foreground hover:bg-surface/90"
    if (variant === "outline") variantStyles = "border border-border bg-transparent hover:bg-muted"
    if (variant === "ghost") variantStyles = "hover:bg-muted hover:text-foreground"
    if (variant === "link") variantStyles = "text-primary underline-offset-4 hover:underline"

    let sizeStyles = ""
    if (size === "default") sizeStyles = "h-10 px-4 py-2"
    if (size === "sm") sizeStyles = "h-9 rounded-md px-3"
    if (size === "lg") sizeStyles = "h-11 rounded-md px-8"
    if (size === "icon") sizeStyles = "h-10 w-10"

    const baseStyles = "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
    
    return (
      <button
        className={`${baseStyles} ${variantStyles} ${sizeStyles} ${className}`}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button }
