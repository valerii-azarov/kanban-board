import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface AppState {
  isAuthorized: boolean
  username: string
}

const initialState: AppState = {
  isAuthorized: false,
  username: ''
}

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    authorize(state, action: PayloadAction<Partial<AppState>>) {
      state.isAuthorized = Boolean(action.payload.isAuthorized)
      state.username = action.payload.username || ''
    }
  },
})

// Action creators are generated for each case reducer function
export const { authorize } = appSlice.actions

export default appSlice.reducer

