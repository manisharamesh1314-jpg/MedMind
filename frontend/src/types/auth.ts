export interface UserCreate {
  full_name: string
  email: string
  password: string
}

export interface UserLogin {
  email: string
  password: string
}

export interface User {
  id: number
  full_name: string
  email: string
}

export interface Token {
  access_token: string
  token_type: string
}
