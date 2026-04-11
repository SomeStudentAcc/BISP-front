import { email, z } from 'zod'

export const loginAccountSchema = z.object({
	email: z.string().min(1),
	password: z.string().min(8),
})

export type TypeLoginAccountSchema = z.infer<typeof loginAccountSchema>
