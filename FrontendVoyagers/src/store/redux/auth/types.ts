export interface User {
  firstName: string
  lastName: string
  dateOfBirth: string
  email: string
  phone: string
  photo: string
  gender: string
}

export interface AuthState {
    user?: User
    isAuthorized: boolean
}

export interface Credentials {
    email: string
    password: string
  }