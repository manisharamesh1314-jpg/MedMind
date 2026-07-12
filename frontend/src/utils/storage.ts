const TOKEN_KEY = 'medmind_access_token'
const THEME_KEY = 'medmind_theme'

export type ThemeMode = 'light' | 'dark'

export const storage = {
  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY)
  },

  setToken(token: string): void {
    localStorage.setItem(TOKEN_KEY, token)
  },

  removeToken(): void {
    localStorage.removeItem(TOKEN_KEY)
  },

  getTheme(): ThemeMode | null {
    const value = localStorage.getItem(THEME_KEY)
    return value === 'light' || value === 'dark' ? value : null
  },

  setTheme(theme: ThemeMode): void {
    localStorage.setItem(THEME_KEY, theme)
  },
}
