import { configureStore } from '@reduxjs/toolkit'
import appSlice from './slice/appSlice'
import boardSlice from './slice/boardSlice'
import usersSlice from './slice/usersSlice'

export const store = configureStore({
  reducer: {
      board: boardSlice,
      users: usersSlice,
      app: appSlice
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

