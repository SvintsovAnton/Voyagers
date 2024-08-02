import { createAppSlice } from "store/createAppSlice"
import type { AuthState, Credentials } from "./types"
import * as api from "./api"
const initialState: AuthState = {
  isAuthorized: false,
  user: undefined,
}
export const authSlice = createAppSlice({
  name: "auth",
  initialState,
  reducers: create => ({
    login: create.asyncThunk(
      async (credentials: Credentials) => {
        return api.fetchLogin(credentials)
        // The value we return becomes the `fulfilled` action payload
      },
      {
        pending: state => {
          state.isAuthorized = false
        },
        fulfilled: (state, action) => {
          state.isAuthorized = true
        },
        rejected: state => {
          state.isAuthorized = false
          state.user = undefined
        },
      },
    ),
    logout: create.asyncThunk(
      async () => {
        return api.fetchLogout()
      },
      {
        pending: state => {
          // add logic for pending
        },
        fulfilled: (state, action) => {
          state.isAuthorized = false
          state.user = undefined
        },
        rejected: state => {
          state.isAuthorized = false
          state.user = undefined
        },
      },
    ),
    profile: create.asyncThunk(
      async () => {
        return api.fetchProfile()
      },
      {
        pending: state => {
          // add logic for pending
        },
        fulfilled: (state, action) => {
          state.user = action.payload
          state.isAuthorized = true
        },
        rejected: state => {
          state.user = undefined
          state.isAuthorized = false
        },
      },
    ),
    // register: create.asyncThunk(
    //   async (dto: UserRegistrationDto) => {
    //     return api.fetchRegister(dto)
    //     // The value we return becomes the `fulfilled` action payload
    //   },
    //   {
    //     pending: state => {
    //       state.isAuthenticated = false
    //     },
    //     fulfilled: (state, action) => {
    //       state.isAuthenticated = true
    //     },
    //     rejected: state => {
    //       state.isAuthenticated = false
    //       state.user = undefined
    //     },
    //   },
    // ),
  }),
  // You can define your selectors here. These selectors receive the slice
  // state as their first argument.
  selectors: {
    selectIsAuthenticated: state => state.isAuthorized,
    selectUser: state => state.user,
    // selectRoles: state => state.user?.roles,
  },
})
// // Action creators are generated for each case reducer function.
export const { login, logout, profile } = authSlice.actions
// Selectors returned by `slice.selectors` take the root state as their first argument.
export const { selectIsAuthenticated, selectUser } =
  authSlice.selectors
