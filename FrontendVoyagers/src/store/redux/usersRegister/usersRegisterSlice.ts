import { PayloadAction } from "@reduxjs/toolkit"
import { createAppSlice } from "store/createAppSlice"

import { UsersRegisterSliceState, RegisterUserData } from "./types"

const usersRegisterSliceInitialState: UsersRegisterSliceState = {
  users: [],
}

export const usersRegisterSlice = createAppSlice({
  name: "USERSREGISTER",
  initialState: usersRegisterSliceInitialState,
  reducers: create => ({
    addUser: create.reducer(
      (
        state: UsersRegisterSliceState,
        action: PayloadAction<RegisterUserData>,
      ) => {
        state.users = [...state.users, action.payload]
        fetch("/api/users/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(action.payload),
        })
      },
    ),
  }),
  selectors: {
    users: (state: UsersRegisterSliceState) => state.users,
  },
})

export const usersRegisterSliceActions = usersRegisterSlice.actions
export const usersRegisterSliceSelectors = usersRegisterSlice.selectors

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
