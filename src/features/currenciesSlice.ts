import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export const fetchCurrencies = createAsyncThunk(
  'currencies/fetchCurrencies',
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch('https://api.frankfurter.dev/v1/currencies')
      const data = await res.json()
      return data
    } catch (error: any) {
      return rejectWithValue(error.message)
    }
  }
)
export const fetchExchangeRate = createAsyncThunk(
  'currencies/fetchExchangeRate',
  async ({ from, to }: { from: string; to: string }, { rejectWithValue }) => {
    try {
      const res = await fetch(
        `https://api.frankfurter.dev/v1/latest?base=${from}&symbols=${to}`
      )
      const data = await res.json()
      const coefficientForDividing = Object.values(data.rates)[0]
      return coefficientForDividing
    } catch (error: any) {
      return rejectWithValue(error.message)
    }
  }
)
const initialState: any = {
  currencies: [],
  loading: false,
  error: null,
  exchangeRate: null,
  exchangeLoading: false,
  exchangeError: null,
}
const currenciesSlice = createSlice({
  name: 'currencies',
  initialState,
  reducers: {},
  extraReducers: (builder): any => {
    builder
      .addCase(fetchCurrencies.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchCurrencies.fulfilled, (state, action): any => {
        state.currencies = action.payload
        state.loading = false
      })
      .addCase(fetchCurrencies.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(fetchExchangeRate.pending, (state) => {
        state.exchangeLoading = true
        state.exchangeError = null
      })
      .addCase(fetchExchangeRate.fulfilled, (state, action) => {
        state.exchangeRate = action.payload
        state.exchangeLoading = false
      })
      .addCase(fetchExchangeRate.rejected, (state, action) => {
        state.exchangeLoading = false
        state.exchangeError = action.payload
      })
  },
})
export default currenciesSlice.reducer
