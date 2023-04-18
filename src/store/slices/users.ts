import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import productsApi from "../api/users";
import { useGetAllUsersQuery, useCreateUserMutation } from "../api/users";
// import { ProductsSlice } from "../type";
// import { Product } from "../../types";

const initialState: any = {
  users: [],
  isLoading: false,
  error: null,
};

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    editUser: (state, { payload }: PayloadAction<any>) => {
      state.users.forEach((el: any, index: any) => {
        if(el.id === payload.id){
          state.users[index] = {...payload, isEdited: true};
        }
      });
    },
    removeUser: (state, { payload }: PayloadAction<any>) => {
      state.users = state.users?.filter((item: any) => item.id !== payload.id);
    },
  },
  extraReducers: (builder) => {
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
      (state, {payload}) => {
        state.isLoading = false;
        state.error = payload?.status;
      }
    );
    builder.addMatcher(
      productsApi.endpoints.createUser.matchFulfilled,
      (state, { payload }: PayloadAction<any>) => {
        state.users = [...state.users, {...payload, id: Math.random()}];
      }
    );
    builder.addMatcher(
      productsApi.endpoints.updateUser.matchFulfilled,
      (state, { payload }: PayloadAction<any>) => {
        state.users.forEach((el: any, index: any) => {
          if(el.id === payload.id){
            state.users[index] = {...payload, isEdited: true};
          }
        });
      }
    );
    builder.addMatcher(
      productsApi.endpoints.deleteUser.matchFulfilled,
      (state, { payload }: PayloadAction<any>) => {
        state.user = state.user?.filter((item: any) => item.id !== payload.id)
      }
    );
  },
});

export const {editUser, removeUser} = usersSlice.actions;
export default usersSlice.reducer;