import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

import { IAuthStore } from './auth.types'

export const authStore = create(
	persist<IAuthStore>(
		set => ({
			isAuthenticated: false,
			setIsAuthentificated: (value: boolean) =>
				set({ isAuthenticated: value })
		}),
		{
			name: 'auth',
			storage: createJSONStorage(() => localStorage)
		}
	)
)
