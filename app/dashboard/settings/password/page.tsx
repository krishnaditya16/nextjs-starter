"use client"

import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"

export default function SettingsPasswordPage() {
  function onSubmit(event: React.FormEvent) {
    event.preventDefault()
    toast.success("Password updated successfully")
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-foreground">Password</h3>
        <p className="text-sm text-muted-foreground">
          Update your password to keep your account secure.
        </p>
      </div>
      <Separator />
      
      <form onSubmit={onSubmit} className="space-y-8">
        <div className="space-y-2">
          <Label htmlFor="current">Current Password</Label>
          <Input id="current" type="password" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="new">New Password</Label>
          <Input id="new" type="password" />
          <p className="text-[0.8rem] text-muted-foreground">
            Must be at least 8 characters long.
          </p>
        </div>
        <div className="space-y-2">
          <Label htmlFor="confirm">Confirm New Password</Label>
          <Input id="confirm" type="password" />
        </div>
        <Button type="submit">Update password</Button>
      </form>
    </div>
  )
}
