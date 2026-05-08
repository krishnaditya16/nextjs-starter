"use server"

import { prisma } from "@/lib/db"
import { auth } from "@/lib/auth"
import { revalidatePath } from "next/cache"

export const updateSettings = async (values: { isTwoFactorEnabled?: boolean }) => {
  const session = await auth()

  if (!session?.user) {
    return { error: "Unauthorized" }
  }

  const dbUser = await prisma.user.findUnique({
    where: { id: session.user.id }
  })

  if (!dbUser) {
    return { error: "User not found" }
  }

  await prisma.user.update({
    where: { id: dbUser.id },
    data: {
      ...values,
    }
  })

  revalidatePath("/dashboard/settings/2fa")
  
  return { success: "Settings updated!" }
}
