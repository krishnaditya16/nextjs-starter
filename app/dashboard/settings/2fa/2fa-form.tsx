"use client"

import { useState } from "react"
import { toast } from "sonner"
import { Loader2 } from "lucide-react"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { updateSettings } from "@/app/actions/auth/settings"

interface TwoFactorFormProps {
  isTwoFactorEnabled: boolean
}

export function TwoFactorForm({ isTwoFactorEnabled }: TwoFactorFormProps) {
  const [isEnabled, setIsEnabled] = useState(isTwoFactorEnabled)
  const [isLoading, setIsLoading] = useState(false)

  const onToggle = async (checked: boolean) => {
    setIsLoading(true)
    
    try {
      const result = await updateSettings({ isTwoFactorEnabled: checked })

      if (result.error) {
        toast.error(result.error)
        return
      }

      setIsEnabled(checked)
      toast.success(checked ? "2FA Enabled" : "2FA Disabled")
    } catch {
      toast.error("Something went wrong")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="rounded-lg border p-4">
      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <Label className="text-base">Two-Factor Authentication</Label>
          <p className="text-sm text-muted-foreground">
            Enable two-factor authentication to secure your account with email codes.
          </p>
        </div>
        <div className="flex items-center gap-2">
          {isLoading && <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />}
          <Switch
            checked={isEnabled}
            onCheckedChange={onToggle}
            disabled={isLoading}
          />
        </div>
      </div>
    </div>
  )
}
