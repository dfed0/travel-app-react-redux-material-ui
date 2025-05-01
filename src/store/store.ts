import { configureStore } from '@reduxjs/toolkit'
import themeReducer from '../features/theme/themeSlice'
import weatherReducer from '../features/weatherSlice'
import currenciesReducer from '../features/currenciesSlice'

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    weather: weatherReducer,
    currencies: currenciesReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
