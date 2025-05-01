import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { API_KEY } from '../config/config'

export const fetchCitiesWeather = createAsyncThunk(
  'weather/fetchCitiesWeather',
  async (_, { rejectWithValue }) => {
    try {
      const countriesArr = [
        'Ukraine',
        'Canada',
        'France',
        'Japan',
        'South Korea',
        'Iran',
      ]
      const countries: any = await Promise.all(
        countriesArr.map(async (country) => {
          const res = await fetch(
            `https://restcountries.com/v3.1/name/${country}`
          )
          return await res.json()
        })
      )
      const contractedCountries = countries.map((country: any) => {
        return { capital: country[0].capital, ccn3: country[0].ccn3 }
      })
      console.log(countries)

      const foundedCountries: any = await Promise.all(
        contractedCountries.map(async ({ capital, ccn3 }: any) => {
          const foundedRes = await fetch(
            `https://api.openweathermap.org/geo/1.0/direct?q=${capital},,${ccn3}&appid=${API_KEY}`
          )
          return await foundedRes.json()
        })
      )
      const citiesData: any = foundedCountries.flat()
      const citiesWeather = await Promise.all(
        citiesData.map(async ({ lon, lat }: any) => {
          const res = await fetch(
            `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}`
          )
          return await res.json()
        })
      )

      return { citiesData, citiesWeather }
    } catch (error: any) {
      return rejectWithValue(error.message)
    }
  }
)

const initialState: any = {
  citiesData: [],
  citiesWeather: [],
  data: null,
  loading: false,
  error: null,
  cache: {},
}
const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {},
  extraReducers: (builder): any => {
    builder
      .addCase(fetchCitiesWeather.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchCitiesWeather.fulfilled, (state, action): any => {
        state.loading = false
        state.citiesData = action.payload.citiesData
        state.citiesWeather = action.payload.citiesWeather
      })
      .addCase(fetchCitiesWeather.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})
export default weatherSlice.reducer
