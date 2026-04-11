import { authStore } from '@/store/auth/auth.store'

export function useAuth() {
	const isAuthenticated = authStore(state => state.isAuthenticated)
	const setIsAuthentificated = authStore(state => state.setIsAuthentificated)

	const auth = () => setIsAuthentificated(true)
	const exit = () => setIsAuthentificated(false)

	return {
		isAuthenticated,
		auth,
		exit
	}
}
