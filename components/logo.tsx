import { cn } from "@/lib/utils"

interface LogoProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "color" | "white"
  showText?: boolean
}

export function Logo({
  variant = "color",
  showText = true,
  className,
  ...props
}: LogoProps) {
  return (
    <div
      className={cn("flex items-center gap-2 font-medium tracking-tight", className)}
      {...props}
    >
      <div className="relative flex h-8 w-8 items-center justify-center overflow-hidden rounded-lg">
        {variant === "color" ? (
          <div className="absolute inset-0 bg-black" />
        ) : (
          <div className="absolute inset-0 bg-white" />
        )}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke={variant === "color" ? "white" : "black"}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="relative h-5 w-5"
        >
          <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
        </svg>
      </div>
      {showText && (
        <span className={cn(
          "text-xl",
          variant === "color" ? "text-foreground" : "text-white"
        )}>
          Acme Inc
        </span>
      )}
    </div>
  )
}
