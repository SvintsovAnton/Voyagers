export interface LoginUserData {
  email: string
  password: string
}

export interface UsersLoginSliceState {
  users: LoginUserData[]
}
