import { configureStore } from "@reduxjs/toolkit";
import boardSlice from "./slices/boardSlice";
import taskSlice from "./slices/taskSlice";

export const store = configureStore({
  reducer: {
    board: boardSlice,
    task: taskSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
