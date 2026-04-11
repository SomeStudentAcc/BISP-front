import { z } from 'zod'

export const resetpasswwordSchema = z.object({
	email: z.string()
})

export type TypeResetPasswordSchema = z.infer<typeof resetpasswwordSchema>
