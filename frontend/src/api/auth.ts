import { apiClient } from './client'
import type { Token, User, UserCreate, UserLogin } from '../types'

export const authApi = {
  register(data: UserCreate) {
    return apiClient.post<User>('/auth/register', data)
  },

  login(data: UserLogin) {
    return apiClient.post<Token>('/auth/login', data)
  },

  me() {
    return apiClient.get<User>('/auth/me')
  },
}
