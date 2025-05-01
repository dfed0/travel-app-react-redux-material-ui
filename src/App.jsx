import { Box, createTheme, ThemeProvider } from '@mui/material'
import './App.css'
import Home from './Home/Home'
import { Header } from './features/theme/Header'
import { useSelector } from 'react-redux'
function App() {
  // const theme = createTheme({
  //   palette: {
  //     colors: {
  //       main: '#eee',
  //       secondary: '#151515',
  //       back: '#afa2ea',
  //     },
  //   },

  // })
  const light = createTheme({
    palette: {
      primary: {
        main: '#151515',
      },
      secondary: {
        main: '#505A5A',
      },
      colors: {
        main: '#eee',
        secondary: '#151515',
        block: '#afa2ea',
        background: '#ccc',
      },
      text: {
        secondary: '#151515',
      },
    },
  })
  const dark = createTheme({
    palette: {
      primary: {
        main: '#aaa',
      },
      secondary: {
        main: '#505A5A',
      },
      colors: {
        main: '#151515',
        secondary: '#eee',
        block: '#555',
        background: '#000',
      },
      text: {
        secondary: '#ccc',
      },
    },
    components: {
      MuiTextField: {
        styleOverrides: {
          root: {
            backgroundColor: '#505A5A',
          },
        },
      },
    },
  })
  const theme = useSelector((state) => state.theme.value)
  return (
    <>
      <ThemeProvider theme={theme === 'light' ? light : dark}>
        <Box sx={{ backgroundColor: 'colors.background' }}>
          <Header />
          <Home />
        </Box>
      </ThemeProvider>
    </>
  )
}

export default App
