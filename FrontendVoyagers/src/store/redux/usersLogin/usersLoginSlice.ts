import { PayloadAction } from "@reduxjs/toolkit"
import { createAppSlice } from "store/createAppSlice"

import { UsersLoginSliceState, LoginUserData } from "./types"

const usersLoginSliceInitialState: UsersLoginSliceState = {
  users: [],
}

export const usersLoginSlice = createAppSlice({
  name: "USERSLOGIN",
  initialState: usersLoginSliceInitialState,
  reducers: create => ({
    authUser: create.reducer(
      (state: UsersLoginSliceState, action: PayloadAction<LoginUserData>) => {
        state.users = [...state.users, action.payload]
        fetch("/api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(action.payload),
        })
      },
    ),
  }),
  selectors: {
    users: (state: UsersLoginSliceState) => state.users,
  },
})

export const usersLoginSliceActions = usersLoginSlice.actions
export const usersLoginSliceSelectors = usersLoginSlice.selectors

// const getUser = async () => {
//   try {
//     let response = await fetch("http://localhost:8080/", {
//       method: "GET",

//     });

//     const result = await response.json();
//     const userData = result.results[0];

// if(!response.ok) {
//   throw Object.assign(new Error("Some request error"), {
//     response: result,
//   });
// }

//   } catch(error) {
//     console.log(error.response)
//   }
// }
