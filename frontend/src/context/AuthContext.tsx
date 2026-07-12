import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { authApi, getErrorMessage } from '../api'
import type { User, UserCreate, UserLogin } from '../types'
import { storage } from '../utils/storage'

interface AuthContextValue {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (credentials: UserLogin) => Promise<void>
  register: (data: UserCreate) => Promise<void>
  logout: () => void
  refreshUser: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const refreshUser = useCallback(async () => {
    const token = storage.getToken()

    if (!token) {
      setUser(null)
      return
    }

    const response = await authApi.me()
    setUser(response.data)
  }, [])

  const bootstrap = useCallback(async () => {
    try {
      await refreshUser()
    } catch {
      storage.removeToken()
      setUser(null)
    } finally {
      setIsLoading(false)
    }
  }, [refreshUser])

  useEffect(() => {
    void bootstrap()
  }, [bootstrap])

  useEffect(() => {
    const handleUnauthorized = () => {
      setUser(null)
    }

    window.addEventListener('medmind:unauthorized', handleUnauthorized)
    return () => window.removeEventListener('medmind:unauthorized', handleUnauthorized)
  }, [])

  const login = useCallback(async (credentials: UserLogin) => {
    const response = await authApi.login(credentials)
    storage.setToken(response.data.access_token)
    await refreshUser()
  }, [refreshUser])

  const register = useCallback(async (data: UserCreate) => {
    await authApi.register(data)
  }, [])

  const logout = useCallback(() => {
    storage.removeToken()
    setUser(null)
  }, [])

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      isLoading,
      login,
      register,
      logout,
      refreshUser,
    }),
    [user, isLoading, login, register, logout, refreshUser],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }

  return context
}

export { getErrorMessage }
