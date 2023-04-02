import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { client } from "services/client";
import { AppThunk } from "store";

type Post = {
  id: number;
  title: string;
  body: string;
};

const initialState = {
  isLoading: true,
  data: [] as Post[],
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    postsLoading(state) {
      state.isLoading = true;
    },
    postsLoaded(state, action: PayloadAction<Post[]>) {
      state.data = [...action.payload];
      state.isLoading = false;
    },
  },
});

export default postsSlice.reducer;

export const { postsLoaded, postsLoading } = postsSlice.actions;

export function fetchPosts(): AppThunk {
  return async (dispatch) => {
    dispatch(postsLoading());
    const response = await client.get(
      "https://jsonplaceholder.typicode.com/posts"
    );
    dispatch(postsLoaded(response.data as Post[]));
  };
}
