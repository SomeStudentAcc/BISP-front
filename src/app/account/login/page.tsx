import { Metadata } from 'next'

import LoginForm from '@/components/features/auth/forms/LoginForm'

export async function generateMetadata(): Promise<Metadata> {
	return {
		title: 'Login'
	}
}

export default function LoginPage() {
	return <LoginForm />
}
