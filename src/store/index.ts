import {
    configureStore,
    ThunkAction,
    Action,
    combineReducers,
  } from "@reduxjs/toolkit";
  import usersSlice from "./slices/users";
  import usersApi from "./api/users";
  
  const rootReducer = combineReducers({
    [usersApi.reducerPath]: usersApi.reducer,
    users: usersSlice,
  });
  
  export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(usersApi.middleware),
  });
  
  export type AppDispatch = typeof store.dispatch;
  export type RootState = ReturnType<typeof store.getState>;
  export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
  >;
  