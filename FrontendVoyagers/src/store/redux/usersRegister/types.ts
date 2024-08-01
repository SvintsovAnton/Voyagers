export interface RegisterUserData {
  firstName: string
  lastName: string
  dateOfBirth: string
  email: string
  password: string
  phone: string
  photo: string
  gender: GenderData
}

export interface GenderData {
  id: string
}

export interface UsersRegisterSliceState {
  users: RegisterUserData[]
}
