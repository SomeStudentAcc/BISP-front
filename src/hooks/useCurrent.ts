import { useAuth } from "./useAuth";
import { useEffect } from "react";

export function useCurrent() {
  const { isAuthenticated, exit } = useAuth();

  /* useEffect(() => {
		const handleAuthError = async () => {
			if (error && isAuthenticated) {
				console.log('Auth error detected, clearing session')
				try {
					await clear()
				} catch (clearError) {
					console.error('Failed to clear session:', clearError)
				} finally {
					exit()
				}
			}
		}

		handleAuthError()
	}, [error, isAuthenticated]) */

  return {
    user: {
      username: "abdulloh",
    },
    isLoadingProfile: false,
  };
}
