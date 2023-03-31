import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import UsersAPI from '../../api/users.api'
import { AppUser } from '../../interfaces/app-user.interface'

export interface UsersState {
  users: AppUser[]
}

const initialState: UsersState = {
  users: [],
}

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(loadUsersState.fulfilled, (state: UsersState, action: PayloadAction<AppUser[]>) => {
      state.users = action.payload
    }) 
  }
})

export const loadUsersState = createAsyncThunk(
  'board/loadUsersState',
  async(_) => {
    return await UsersAPI.loadUsers() as AppUser[]
  }
)

// Action creators are generated for each case reducer function
export const {  } = usersSlice.actions

export default usersSlice.reducer

