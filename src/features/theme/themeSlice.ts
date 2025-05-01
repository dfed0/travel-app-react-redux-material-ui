import { createSlice } from '@reduxjs/toolkit'
// import type { PayloadAction } from '@reduxjs/toolkit'

// export interface ThemeState {
//   value: string
// }
const initialState: any = {
  value: 'light',
}

export const themeSlice = createSlice({
  name: 'light',
  initialState,
  reducers: {
    toggle: (state: any) => {
      state.value = state.value === 'light' ? 'dark' : 'light'
    },
  },
})
export const { toggle } = themeSlice.actions
export default themeSlice.reducer
