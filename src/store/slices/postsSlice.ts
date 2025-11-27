import { Post } from "@/api/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PostsState {
  posts: Post[];
  page: number;
  limit: number;
  total: number;
  search: string;
}

const initialState: PostsState = {
  posts: [],
  page: 1,
  limit: 9,
  total: 0,
  search: "",
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setPosts(state, action: PayloadAction<any[]>) {
      state.posts = action.payload;
    },
    setPage(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },
    setTotal(state, action: PayloadAction<number>) {
      state.total = action.payload;
    },
    setSearch(state, action: PayloadAction<string>) {
      state.search = action.payload;
      state.page = 1;
    },
  },
});

export const { setPosts, setPage, setTotal, setSearch } = postsSlice.actions;
export default postsSlice.reducer;
