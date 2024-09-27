import {create} from 'zustand'

type UserType = 'student' | 'company' | null

interface AuthState {
    isLoggedIn: boolean
    userType: UserType
    setIsLoggedIn: (isLoggedIn: boolean) => void
    setUserType: (userType: UserType) => void
}

export const useAuthStore = create<AuthState>((set) => ({
    isLoggedIn: false,
    userType: null,
    setIsLoggedIn: (isLoggedIn) => set({ isLoggedIn }),
    setUserType: (userType) => set({ userType }),
}))