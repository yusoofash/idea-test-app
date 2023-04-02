import { configureStore } from "@reduxjs/toolkit";
import { ThunkAction } from "redux-thunk";

import postsReducer from "./reducers/posts.reducers";

export const store = configureStore({
  reducer: {
    posts: postsReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  any
>;
