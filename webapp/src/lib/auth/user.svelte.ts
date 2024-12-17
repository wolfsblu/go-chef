import {
    fetchProfile as apiFetchProfile,
    login as apiLogin,
    resetPassword as apiResetPassword
} from "../api/client";

let profile: User | null = $state(null)

export const createUser = () => {
    const login = async (credentials: Credentials) => {
        const response = await apiLogin(credentials)
        if (response.error) {
            throw response.error
        } else {
            profile = response.data
        }
    }

    const fetchProfile = async () => {
        const response = await apiFetchProfile()
        if (response.error) {
            throw response.error
        } else {
            profile = response.data
        }
    }

    const resetPassword = async (email: string) => {
        const response = await apiResetPassword(email)
        if (response.error) {
            throw response.error
        }
    }

    return {
        get profile() {
            return profile
        },
        fetchProfile,
        login,
        resetPassword,
    }
}