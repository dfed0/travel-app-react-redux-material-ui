import { useEffect, useState } from 'react'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import ListSubheader from '@mui/material/ListSubheader'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import {
  Box,
  Button,
  Divider,
  Input,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  TextField,
  Typography,
} from '@mui/material'
import { SwapHoriz } from '@mui/icons-material'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../store/store'
import { fetchCurrencies, fetchExchangeRate } from '../features/currenciesSlice'

export default function CurrencyExchangeGroup() {
  const [swapPosition, setSwapPosition] = useState(false)
  const [firstValue, setFirstValue] = useState({
    val: '',
    currencies: '',
    enteredValue: false,
    dbValue: '',
    // firstPosition: true
  })
  const [secondValue, setSecondValue] = useState({
    val: '',
    currencies: '',
    enteredValue: false,
    dbValue: '',
    // firstPosition: false
  })
  const { currencies, exchangeRate } = useSelector(
    (state: RootState) => state.currencies
  )
  const [amount, setAmount] = useState('0')
  const [result, setResult] = useState('0')
  function inputChange(e: any) {
    console.log(e.target.id)
    if (e.target.id.includes('first-input')) {
      Object.values(currencies).includes(e.target.value)
        ? setFirstValue((prevValue) => ({
            val: e.target.value,
            currencies: prevValue.currencies,
            enteredValue: true,
            dbValue:
              Object.keys(currencies)[
                Object.values(currencies).indexOf(e.target.value)
              ],
            // firstPosition: prevValue.firstPosition
          }))
        : setFirstValue((prevValue) => ({
            val: e.target.value,
            currencies: prevValue.currencies,
            enteredValue: false,
            dbValue: prevValue.dbValue,
            // firstPosition: prevValue.firstPosition
          }))
    }
    if (e.target.id.includes('second-input')) {
      Object.values(currencies).includes(e.target.value)
        ? setSecondValue((prevValue) => ({
            val: e.target.value,
            currencies: prevValue.currencies,
            enteredValue: true,
            dbValue: prevValue.dbValue,
            // firstPosition: prevValue.firstPosition
          }))
        : setSecondValue((prevValue) => ({
            val: e.target.value,
            currencies: prevValue.currencies,
            enteredValue: false,
            dbValue: prevValue.dbValue,
            // firstPosition: prevValue.firstPosition
          }))
    }
    console.log(currencies)
    console.log(e.target.id.includes('first-input'))
    return
  }
  function calcResult(e?: any) {
    if (e && exchangeRate) {
      setAmount(e.target.value)
      setResult((Number(e.target.value) / exchangeRate).toFixed(1).toString())
    } else if (e) {
      setAmount(e.target.value)
    } else if (exchangeRate) {
      setResult((Number(amount) / exchangeRate).toFixed(1).toString())
    } else if (exchangeRate) {
      setResult((Number(amount) / exchangeRate).toFixed(1).toString())
    } else {
      setResult('0')
    }
    console.log('CALCRESULT', exchangeRate)
  }
  const dispatch: any = useDispatch()
  useEffect(() => {
    dispatch(fetchCurrencies())
  }, [])
  useEffect(() => {
    swapPosition
      ? firstValue.enteredValue === true &&
        secondValue.enteredValue === true &&
        dispatch(
          fetchExchangeRate({
            from: secondValue.dbValue,
            to: firstValue.dbValue,
          })
        )
      : firstValue.enteredValue === true &&
        secondValue.enteredValue === true &&
        dispatch(
          fetchExchangeRate({
            from: firstValue.dbValue,
            to: secondValue.dbValue,
          })
        )
    calcResult()
  }, [firstValue, secondValue, swapPosition, dispatch, exchangeRate])
  return (
    <>
      <Box
        sx={{
          m: 1,
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Box
          component="form"
          sx={{
            '& > :not(style)': { m: 1, width: '10rem' },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="filled-basic"
            label="Amount"
            variant="filled"
            type="number"
            onChange={(e) => calcResult(e)}
          />
        </Box>
        <Typography variant="h3" sx={{ color: 'colors.secondary' }}>
          {result}
        </Typography>
      </Box>
      <Box
        sx={{
          borderRadius: 1,
          // bgcolor: 'colors.background',
          // border: 'dashed #ccc',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'start',
          gap: '5rem',
          m: 1,
        }}
      >
        {swapPosition ? (
          <>
            <FormControl variant="standard">
              <InputLabel htmlFor="component-simple">Currency</InputLabel>
              <Input
                id="component-simple first-input"
                value={firstValue.val}
                onChange={(e) => inputChange(e)}
                autoComplete="off"
                sx={{
                  '&:before': {
                    borderBottomColor: 'colors.secondary',
                    color: 'colors.background',
                  },
                  '&:hover:not(.Mui-disabled):before': {
                    borderBottomColor: 'colors.secondary', // при наведении
                  },
                }}
              />
              <Box
                sx={{
                  maxWidth: 360,
                  bgcolor: 'background.paper',
                  mt: '1rem',
                }}
              >
                <List
                  component="nav"
                  aria-label="main mailbox folders"
                  sx={{
                    padding: '0px',
                  }}
                >
                  {Object.values(currencies).map((currency: any, index) => {
                    return (
                      currency.includes(firstValue.val) &&
                      currency !== firstValue.val &&
                      firstValue.val !== '' && (
                        <ListItemButton
                          key={currency}
                          onClick={() =>
                            setFirstValue((prevValue): any => ({
                              val: currency,
                              currencies: prevValue.currencies,
                              enteredValue: true,
                              dbValue: Object.keys(currencies)[index],
                              // firstPosition: prevValue.firstPosition
                            }))
                          }
                        >
                          <ListItemIcon></ListItemIcon>
                          <ListItemText>{currency}</ListItemText>
                        </ListItemButton>
                      )
                    )
                  })}
                </List>
              </Box>
            </FormControl>
            <Button onClick={() => setSwapPosition((prevValue) => !prevValue)}>
              <SwapHoriz />
            </Button>
            <FormControl variant="standard">
              <InputLabel htmlFor="component-simple">Currency</InputLabel>
              <Input
                id="component-simple second-input"
                value={secondValue.val}
                onChange={(e) => inputChange(e)}
                autoComplete="off"
                sx={{
                  '&:before': {
                    borderBottomColor: 'colors.secondary',
                    color: 'colors.secondary',
                  },
                  '&:hover:not(.Mui-disabled):before': {
                    borderBottomColor: '#fff', // при наведении
                  },
                }}
              />
              <Box
                sx={{
                  width: '100%',
                  maxWidth: 360,
                  bgcolor: 'background.paper',
                  mt: '1rem',
                }}
              >
                <List
                  component="nav"
                  aria-label="main mailbox folders"
                  sx={{ p: '0' }}
                >
                  {Object.values(currencies).map((currency: any, index) => {
                    return (
                      currency.includes(secondValue.val) &&
                      currency !== secondValue.val &&
                      secondValue.val !== '' && (
                        <ListItemButton
                          key={currency}
                          onClick={() =>
                            setSecondValue((prevValue): any => ({
                              val: currency,
                              currencies: prevValue.currencies,
                              enteredValue: true,
                              dbValue: Object.keys(currencies)[index],
                              // firstPosition: prevValue.firstPosition
                            }))
                          }
                        >
                          <ListItemIcon></ListItemIcon>
                          <ListItemText>{currency}</ListItemText>
                        </ListItemButton>
                      )
                    )
                  })}
                </List>
              </Box>
            </FormControl>
          </>
        ) : (
          <>
            <FormControl variant="standard">
              <InputLabel htmlFor="component-simple">Currency</InputLabel>
              <Input
                id="component-simple second-input"
                value={secondValue.val}
                onChange={(e) => inputChange(e)}
                autoComplete="off"
                sx={{
                  '&:before': {
                    borderBottomColor: 'colors.secondary',
                    color: 'colors.secondary',
                  },
                  '&:hover:not(.Mui-disabled):before': {
                    borderBottomColor: '#fff', // при наведении
                  },
                }}
              />
              <Box
                sx={{
                  width: '100%',
                  maxWidth: 360,
                  bgcolor: 'background.paper',
                  mt: '1rem',
                }}
              >
                <List
                  component="nav"
                  aria-label="main mailbox folders"
                  sx={{ p: '0' }}
                >
                  {Object.values(currencies).map((currency: any, index) => {
                    return (
                      currency.includes(secondValue.val) &&
                      currency !== secondValue.val &&
                      secondValue.val !== '' && (
                        <ListItemButton
                          key={currency}
                          onClick={() =>
                            setSecondValue((prevValue): any => ({
                              val: currency,
                              currencies: prevValue.currencies,
                              enteredValue: true,
                              dbValue: Object.keys(currencies)[index],

                              // firstPosition: prevValue.firstPosition
                            }))
                          }
                        >
                          <ListItemIcon></ListItemIcon>
                          <ListItemText>{currency}</ListItemText>
                        </ListItemButton>
                      )
                    )
                  })}
                </List>
              </Box>
            </FormControl>
            <Button
              onClick={() => {
                setSwapPosition((prevValue) => !prevValue)
              }}
            >
              <SwapHoriz />
            </Button>
            <FormControl variant="standard">
              <InputLabel htmlFor="component-simple">Currency</InputLabel>
              <Input
                id="component-simple first-input"
                value={firstValue.val}
                onChange={(e) => inputChange(e)}
                autoComplete="off"
                sx={{
                  '&:before': {
                    borderBottomColor: 'colors.secondary',
                    color: 'colors.secondary',
                  },
                  '&:hover:not(.Mui-disabled):before': {
                    borderBottomColor: '#fff', // при наведении
                  },
                }}
              />
              <Box
                sx={{
                  width: '100%',
                  maxWidth: 360,
                  bgcolor: 'background.paper',
                  mt: '1rem',
                }}
              >
                {/* firstValue */}
                <List
                  component="nav"
                  aria-label="main mailbox folders"
                  sx={{ p: '0' }}
                >
                  {Object.values(currencies).map((currency: any, index) => {
                    return (
                      currency.includes(firstValue.val) &&
                      currency !== firstValue.val &&
                      firstValue.val !== '' && (
                        <ListItemButton
                          key={currency}
                          onClick={() =>
                            setFirstValue((prevValue): any => ({
                              val: currency,
                              currencies: prevValue.currencies,
                              enteredValue: true,
                              dbValue: Object.keys(currencies)[index],
                              // firstPosition: prevValue.firstPosition
                            }))
                          }
                        >
                          <ListItemIcon></ListItemIcon>
                          <ListItemText>{currency}</ListItemText>
                        </ListItemButton>
                      )
                    )
                  })}
                </List>
              </Box>
            </FormControl>
          </>
        )}
      </Box>
    </>
  )
}
