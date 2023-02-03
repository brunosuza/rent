import React from 'react';
import { ThemeProvider } from 'styled-components';
import * as SplashScreen from 'expo-splash-screen';
import { 
  useFonts,
  //Inter_400Regular,
  Inter_500Medium
} from '@expo-google-fonts/inter';

import { AppProvider } from './src/hooks'; 

import { 
  Archivo_400Regular,
  Archivo_500Medium,
  Archivo_600SemiBold
} from '@expo-google-fonts/archivo';

import { Home } from './src/screens/Home';
import { CarDetails } from './src/screens/CarDetails';
import { Scheduling } from './src/screens/Scheduling';
import { SchedulingDetails } from './src/screens/SchedulingDetails';
import { SchedulingComplete } from './src/screens/Confirmation';
import { useState } from 'react';
import AppLoading from 'expo-app-loading';
import theme from './src/styles/theme';

import { Routes } from './src/routes';

export default function App() {
  async function test() {
    if (!fontsLoaded) {
      return await SplashScreen.hideAsync();
    }
  }
  const [fontsLoaded] = useFonts({
  //  Inter_400Regular,
    //Inter_500Medium,
    Archivo_400Regular,
    Archivo_500Medium
   // Archivo_600SemiBold
  });

  test();

  return (
    <ThemeProvider theme={theme}>
      <AppProvider>
        <Routes />
      </AppProvider>
    </ThemeProvider>
  );
}
