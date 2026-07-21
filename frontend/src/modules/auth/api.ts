import { apiFetch } from '@/http/client'

export interface LoginInput {
  email: string
  password: string
}

export interface AuthUser {
  id: string
  email: string
  first_name: string
  last_name: string
}

export interface LoginResult {
  token: string
  user: AuthUser
}

// login exchanges an email/password pair for a JWT access token, matching
// POST /api/auth/login. There is no public registration: the only account
// created outside of an authenticated session is the administrator created
// by the setup wizard.
export function login(input: LoginInput): Promise<LoginResult> {
  return apiFetch<LoginResult>('/api/auth/login', {
    method: 'POST',
    payload: input,
  })
}