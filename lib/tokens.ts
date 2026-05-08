import crypto from "node:crypto"
import { prisma } from "@/lib/db"

export const generateTwoFactorToken = async (email: string) => {
  const token = Math.floor(100000 + Math.random() * 900000).toString()
  const expires = new Date(new Date().getTime() + 3600 * 1000)

  const existingToken = await prisma.twoFactorToken.findFirst({
    where: { email },
  })

  if (existingToken) {
    await prisma.twoFactorToken.delete({
      where: { id: existingToken.id },
    })
  }

  const twoFactorToken = await prisma.twoFactorToken.create({
    data: {
      email,
      token,
      expires,
    },
  })

  return twoFactorToken
}

export const generatePasswordResetToken = async (email: string) => {
  const token = crypto.randomUUID()
  const expires = new Date(new Date().getTime() + 3600 * 1000)

  const existingToken = await prisma.passwordResetToken.findFirst({
    where: { email },
  })

  if (existingToken) {
    await prisma.passwordResetToken.delete({
      where: { id: existingToken.id },
    })
  }

  const passwordResetToken = await prisma.passwordResetToken.create({
    data: {
      email,
      token,
      expires,
    },
  })

  return passwordResetToken
}
