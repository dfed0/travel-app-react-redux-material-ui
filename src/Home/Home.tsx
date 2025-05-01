import {
  Box,
  Button,
  Card,
  CircularProgress,
  Container,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Paper,
  Typography,
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import { API_KEY } from '../config/config'
import { fetchCitiesWeather } from '../features/weatherSlice'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../store/store'
import { createAction } from '@reduxjs/toolkit'
import CurrencyExchangeGroup from '../components/CurrencyExchangeGroup'
function KelvinToCelsius(k: any) {
  return (k - 273.15).toFixed(1)
}
function Home() {
  const dispatch: any = useDispatch()
  const { citiesData, citiesWeather, loading, error }: any = useSelector(
    (state: RootState) => state.weather
  )
  useEffect(() => {
    dispatch(fetchCitiesWeather())
  }, [dispatch])
  if (loading) {
    return (
      <Container
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <CircularProgress size="5rem" />
      </Container>
    )
  }

  if (error) {
    return (
      <Container
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <Typography variant="h4" color="error">
          Ошибка загрузки данных
        </Typography>
      </Container>
    )
  }
  return (
    <Container
      sx={{
        backgroundColor: 'colors.main',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        pt: '10rem',
        // alignItems: 'center',
      }}
    >
      <Typography
        variant="h2"
        sx={{
          textAlign: 'center',
          color: 'colors.secondary',
          backgroundColor: 'colors.main',
          mb: '10rem',
        }}
      >
        Travel around the world
      </Typography>
      <CurrencyExchangeGroup />
      <Typography
        variant="h1"
        sx={{
          textAlign: 'center',
          color: 'colors.secondary',
          backgroundColor: 'colors.main',
        }}
      >
      </Typography>

      {!citiesWeather && (
        <CircularProgress
          size="3rem"
          sx={{
            display: 'flex',
            alignItems: 'center',
          }}
        />
      )}
      <Card sx={{ backgroundColor: 'colors.main' }}>
        {citiesData.map((city: any, index: any) => {
          return (
            // <Box
            //   sx={{
            //     textAlign: 'center',
            //     color: 'primary.secondary',
            //   }}
            // >

            <ListItemButton
              key={city.name}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: 'colors.block',
                p: '0',
                my: '2rem',
              }}
            >
              <Box
                sx={{
                  // m: 3,
                  backgroundImage: `url('https://images.unsplash.com/photo-1653554541510-1e7fa569c712?q=80&w=2099&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
                  color: '#000',
                  objectFit: 'cover',
                  filter: 'brightness(0.6)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                  width: '100%',
                  height: '30rem',
                }}
              ></Box>
              <ListItemText
                sx={{
                  position: 'absolute',
                  top: '30%',
                  m: '0',
                  // fontSize: '12rem',
                  transform: 'scale(1.8)',
                  color: '#eee',
                }}
              >
                {citiesWeather &&
                  KelvinToCelsius(citiesWeather[index].list[0].main?.temp)}
                °C
              </ListItemText>
              <ListItemText
                sx={{
                  position: 'absolute',
                  bottom: '40%',
                  m: '0',
                  color: '#eee',
                }}
              >
                {city.name}
              </ListItemText>
              <Box
                sx={{
                  position: 'absolute',
                  left: '0',
                  right: '0',
                  bottom: '0',
                  top: '70%',
                  backgroundColor: 'colors.block',
                  display: 'flex',
                }}
              >
                {citiesWeather &&
                  citiesWeather[index].list.map(
                    (cityWeather: any, index: any) => {
                      return (
                        index < 7 && (
                          <Box
                            sx={{
                              width: '15%',
                              textAlign: 'center',
                              border: 1,
                              borderColor: `colors.main`,
                            }}
                            key={index}
                          >
                            <Typography
                              sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                height: '60%',
                                color: 'colors.secondary',
                              }}
                            >
                              {KelvinToCelsius(cityWeather.main?.temp)}°C
                            </Typography>
                            <Typography
                              sx={{
                                height: '40%',
                                color: 'colors.secondary',
                              }}
                            >
                              {cityWeather.dt_txt.match(
                                /\b(\d{2}:\d{2}:\d{2})\b/
                              ) &&
                                cityWeather.dt_txt.match(
                                  /\b(\d{2}:\d{2}:\d{2})\b/
                                )[1]}
                            </Typography>
                          </Box>
                        )
                      )
                    }
                  )}
              </Box>
              {/* <ListItemText
                sx={{
                  position: 'absolute',
                  bottom: '20%',
                  m: '0',
                  color: 'colors.main',
                }}
              >
                {city.name}
              </ListItemText> */}
            </ListItemButton>
            // </Box>
            // <Paper elevation={3}>
            //   <Box sx={{ m: 3 }}>{city}</Box>
            // </Paper>
          )
        })}
      </Card>
    </Container>
  )
}
export default Home
