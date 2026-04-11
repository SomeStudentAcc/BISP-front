import { string, z } from 'zod'

export const newPasswwordSchema = z.object({
	password: string().min(8),
	passwordRepeat: string().min(8)
}).refine(data=> data.password == data.passwordRepeat, {
    path: ['passwordRepeat']
})

export type TypeNewPasswordSchema = z.infer<typeof newPasswwordSchema>
