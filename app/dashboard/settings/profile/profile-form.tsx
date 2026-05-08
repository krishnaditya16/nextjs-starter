"use client"

import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

export function ProfileForm() {
  function onProfileSubmit(event: React.FormEvent) {
    event.preventDefault()
    toast.success("Profile updated successfully")
  }

  function onDelete() {
    toast.error("Account scheduled for deletion.")
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-foreground">Profile</h3>
        <p className="text-sm text-muted-foreground">
          This is how others will see you on the site.
        </p>
      </div>
      <Separator />
      
      <form onSubmit={onProfileSubmit} className="space-y-8">
        <div className="space-y-2">
          <Label htmlFor="username">Username</Label>
          <Input id="username" placeholder="shadcn" defaultValue="shadcn" />
          <p className="text-[0.8rem] text-muted-foreground">
            This is your public display name. It can be your real name or a pseudonym.
          </p>
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input 
            id="email" 
            type="email" 
            placeholder="m@example.com" 
            defaultValue="m@example.com" 
          />
          <p className="text-[0.8rem] text-muted-foreground">
            Your primary email address used for notifications and login.
          </p>
        </div>
        <Button type="submit">Update profile</Button>
      </form>
      
      <div className="pt-8">
        <div className="mb-4">
          <h3 className="text-lg font-medium text-destructive">Danger Zone</h3>
          <p className="text-sm text-muted-foreground">
            Irreversible and destructive actions for your account.
          </p>
        </div>
        <Separator className="mb-6" />
        
        <div className="space-y-4 rounded-lg border border-destructive/20 bg-destructive/5 p-4">
          <div className="space-y-1">
            <h4 className="text-sm font-medium text-destructive">Delete Account</h4>
            <p className="text-sm text-muted-foreground">
              Permanently remove your account and all of its contents from our platform. This action is not reversible.
            </p>
          </div>
          <AlertDialog>
            <AlertDialogTrigger 
              render={<Button variant="destructive" size="sm">Delete Account</Button>}
            />
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete your account
                  and remove your data from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction 
                  onClick={onDelete}
                  className="bg-destructive text-white hover:bg-destructive/90"
                >
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </div>
  )
}
