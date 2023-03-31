import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '..'
import CardsAPI from '../../api/cards.api'
import { BoardCard, BoardCardStatus } from '../../interfaces/board-card.interface'

export interface BoardState {
  cards: BoardCard[],
  isLoading: boolean
}

const initialState: BoardState = {
  cards: [],
  isLoading: true
}

export const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    setCardStatus(state: BoardState, action: PayloadAction<{card: BoardCard, status: BoardCardStatus}>) {
      const card = state.cards.find(c => c.id === action.payload.card.id)
      if (!card) return

      card.status = action.payload.status
    },
    setIsLoading(state: BoardState, action: PayloadAction<boolean>) {
      state.isLoading = action.payload
    },
    addCard(state: BoardState, action: PayloadAction<BoardCard>) {
      state.cards.push(action.payload)
    },
    updateCard(state: BoardState, action: PayloadAction<BoardCard>) {
      const card = state.cards.find(c => c.id === action.payload.id)
      if (!card) return

      card.title = action.payload.title
      card.description = action.payload.description
      card.status = action.payload.status
      card.username = action.payload.username
    },
    deleteCard(state: BoardState, action: PayloadAction<BoardCard>) {
      state.cards = state.cards.filter(c => c.id !== action.payload.id)
    }
  },
  extraReducers: (builder) => {
    builder.addCase(loadCardsState.fulfilled, (state, action: PayloadAction<BoardCard[]>) => {
      state.cards = action.payload
      state.isLoading = false
    })
  }
})

export const saveCardsState = createAsyncThunk(
  'board/saveCardsState',
  async (_, {getState}) => {
    const state: RootState = getState() as RootState;
    return await CardsAPI.saveCards(state.board.cards, state.users.users)
  }
)

export const loadCardsState = createAsyncThunk(
  'board/loadCardsState',
  async(_, {dispatch}) => {
    dispatch(setIsLoading(true))
    return await CardsAPI.loadCards() as BoardCard[]
  }
)

// Action creators are generated for each case reducer function
export const { setCardStatus, addCard, updateCard, deleteCard, setIsLoading } = boardSlice.actions

export default boardSlice.reducer

