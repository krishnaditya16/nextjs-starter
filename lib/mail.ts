import nodemailer from "nodemailer"
import { render } from "@react-email/render"
import { ResetPasswordEmail } from "@/emails/reset-password"
import { TwoFactorEmail } from "@/emails/two-factor"

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: parseInt(process.env.MAIL_PORT || "587"),
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASSWORD,
  },
})

export async function sendPasswordResetEmail(email: string, token: string) {
  const resetLink = `${process.env.NEXT_PUBLIC_APP_URL}/reset-password?token=${token}`
  const appName = process.env.NEXT_PUBLIC_APP_NAME || "Acme Inc"
  const fromName = process.env.MAIL_FROM_NAME || appName
  
  const emailHtml = await render(ResetPasswordEmail({ resetLink }))

  await transporter.sendMail({
    from: `"${fromName}" <${process.env.MAIL_FROM_ADDRESS}>`,
    to: email,
    subject: `[${appName}] Reset your password`,
    html: emailHtml,
  })
}

export async function sendTwoFactorTokenEmail(email: string, token: string) {
  const appName = process.env.NEXT_PUBLIC_APP_NAME || "Acme Inc"
  const fromName = process.env.MAIL_FROM_NAME || appName

  const emailHtml = await render(TwoFactorEmail({ token }))

  await transporter.sendMail({
    from: `"${fromName}" <${process.env.MAIL_FROM_ADDRESS}>`,
    to: email,
    subject: `[${appName}] 2FA Verification Code`,
    html: emailHtml,
  })
}
