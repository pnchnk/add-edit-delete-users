import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import productsApi from "../api/users";
// import { ProductsSlice } from "../type";
// import { Product } from "../../types";
import { User, UserSlice } from "../../types";

const initialState: UserSlice = {
  users: [],
  isLoading: false,
  error: null,
};

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    //for static
    editUser: (state, { payload }: PayloadAction<any>) => {
      state.users.forEach((el: User, index: any) => {
        if (el.id === payload.id) {
          state.users[index] = { ...payload, isEdited: true };
        }
      });
    },
    removeUser: (state, { payload }: PayloadAction<any>) => {
      state.users = state.users?.filter((item: User) => item.id !== payload.id);
    },
  },
  extraReducers: (builder) => {
    //get all users
    builder.addMatcher(
      productsApi.endpoints.getAllUsers.matchFulfilled,
      (state, { payload }: PayloadAction<any>) => {
        state.users = payload;
        state.isLoading = false;
        state.error = null;
      }
    );
    builder.addMatcher(
      productsApi.endpoints.getAllUsers.matchPending,
      (state) => {
        state.isLoading = true;
        state.error = null;
      }
    );
    builder.addMatcher(
      productsApi.endpoints.getAllUsers.matchRejected,
      (state, { payload }) => {
        state.isLoading = false;
        state.error = payload?.status;
      }
    );

    //create user
    builder.addMatcher(
      productsApi.endpoints.createUser.matchFulfilled,
      (state, { payload }: PayloadAction<any>) => {
        state.users = [...state.users, { ...payload, id: Math.random() }];
      }
    );

    //update user
    builder.addMatcher(
      productsApi.endpoints.updateUser.matchFulfilled,
      (state, { payload }: PayloadAction<any>) => {
        state.users.forEach((el: User, index: any) => {
          if (el.id === payload.id) {
            state.users[index] = { ...payload, isEdited: true };
          }
        });
      }
    );

    //delete user
    builder.addMatcher(
      productsApi.endpoints.deleteUser.matchFulfilled,
      (state, { payload }: PayloadAction<any>) => {
        state.users = state.users?.filter((item: any) => item.id !== payload.id);
      }
    );
  },
});

export const { editUser, removeUser } = usersSlice.actions;
export default usersSlice.reducer;
