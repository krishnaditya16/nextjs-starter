import { cn } from "@/lib/utils"

interface LogoProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "color" | "white"
  showText?: boolean
  icon?: React.ReactNode
  text?: string
  size?: "sm" | "md" | "lg" | number
}

export function Logo({
  variant = "color",
  showText = true,
  icon,
  text = "Acme Inc",
  size = "md",
  className,
  ...props
}: LogoProps) {
  const sizeMap = {
    sm: { container: "h-5 w-5", text: "text-sm" },
    md: { container: "h-6 w-6", text: "text-base" },
    lg: { container: "h-8 w-8", text: "text-xl" },
  }

  const isPresetSize = typeof size === "string" && size in sizeMap
  const currentSize = isPresetSize ? sizeMap[size as keyof typeof sizeMap] : null

  const defaultIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-full w-full"
    >
      <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
    </svg>
  )

  return (
    <div
      className={cn("flex items-center gap-2 font-medium tracking-tight", className)}
      {...props}
    >
      <div 
        className={cn(
          "flex items-center justify-center overflow-hidden shrink-0",
          currentSize?.container
        )}
        style={!isPresetSize ? { width: size, height: size } : undefined}
      >
        {icon || defaultIcon}
      </div>
      {showText && (
        <span 
          className={cn(
            variant === "color" ? "text-foreground" : "text-white",
            currentSize?.text
          )}
          style={!isPresetSize ? { fontSize: typeof size === 'number' ? size * 0.6 : undefined } : undefined}
        >
          {text}
        </span>
      )}
    </div>
  )
}
