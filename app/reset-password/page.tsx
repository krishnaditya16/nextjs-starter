"use client"

import { useState } from "react"
import Link from "next/link"
import { Loader2 } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import { toast } from "sonner"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Suspense } from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AuthLayout } from "@/components/auth-layout"
import { resetPassword } from "@/app/actions/auth/reset-password"

const resetPasswordSchema = z.object({
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string().min(6, "Confirm password must be at least 6 characters"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
})

type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>

function ResetPasswordForm() {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const token = searchParams.get("token")

  const form = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  })

  async function onSubmit(data: ResetPasswordFormValues) {
    if (!token) {
      toast.error("Missing reset token")
      return
    }

    setIsLoading(true)
    
    try {
      const result = await resetPassword({
        ...data,
        token,
      })

      if (result.error) {
        toast.error(result.error)
        setIsLoading(false)
        return
      }

      toast.success("Password reset successful! Please sign in.")
      router.push("/login")
    } catch {
      toast.error("Something went wrong. Please try again.")
      setIsLoading(false)
    }
  }

  if (!token) {
    return (
      <div className="flex flex-col items-center justify-center space-y-4">
        <p className="text-sm text-destructive font-medium">Invalid or missing reset token.</p>
        <Link href="/forgot-password" className="text-sm underline underline-offset-4 hover:text-primary">
          Request a new link
        </Link>
      </div>
    )
  }

  return (
    <div className="grid gap-6">
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="password" className={form.formState.errors.password ? "text-destructive" : ""}>
              New Password
            </Label>
            <Input
              id="password"
              placeholder="New Password"
              type="password"
              autoCapitalize="none"
              autoComplete="new-password"
              autoCorrect="off"
              disabled={isLoading}
              {...form.register("password")}
              className={form.formState.errors.password ? "border-destructive focus-visible:ring-destructive/20" : ""}
            />
            {form.formState.errors.password && (
              <p className="text-[0.8rem] font-medium text-destructive">
                {form.formState.errors.password.message}
              </p>
            )}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="confirmPassword" className={form.formState.errors.confirmPassword ? "text-destructive" : ""}>
              Confirm New Password
            </Label>
            <Input
              id="confirmPassword"
              placeholder="Confirm New Password"
              type="password"
              autoCapitalize="none"
              autoComplete="new-password"
              autoCorrect="off"
              disabled={isLoading}
              {...form.register("confirmPassword")}
              className={form.formState.errors.confirmPassword ? "border-destructive focus-visible:ring-destructive/20" : ""}
            />
            {form.formState.errors.confirmPassword && (
              <p className="text-[0.8rem] font-medium text-destructive">
                {form.formState.errors.confirmPassword.message}
              </p>
            )}
          </div>
          <Button type="submit" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Reset Password
          </Button>
        </div>
      </form>
    </div>
  )
}

export default function ResetPasswordPage() {
  return (
    <AuthLayout
      title="Reset Password"
      description="Enter your new password below"
      quote="Sometimes we need a fresh start. This process ensures you can regain control of your account with a secure new password."
      quoteAuthor="Seneca"
      alternateLink={{ text: "Sign In", href: "/login" }}
    >
      <Suspense fallback={<div className="flex justify-center p-8"><Loader2 className="animate-spin h-8 w-8 text-muted-foreground" /></div>}>
        <ResetPasswordForm />
      </Suspense>
    </AuthLayout>
  )
}
