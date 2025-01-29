import { SplashScreen, Stack } from 'expo-router'
import './global.css'
import { useFonts } from 'expo-font'
import { useEffect } from 'react'
import { AuthProvider } from '@/context/AuthContext'

export default function RootLayout() {
  const [fondsLoaded] = useFonts({
    'Nunito-Regular': require('../assets/fonts/Nunito-Regular.ttf'),
    'Nunito-Medium': require('../assets/fonts/Nunito-Medium.ttf'),
    'Nunito-Bold': require('../assets/fonts/Nunito-Bold.ttf'),
    'Nunito-SemiBold': require('../assets/fonts/Nunito-SemiBold.ttf'),
    'Nunito-ExtraBold': require('../assets/fonts/Nunito-ExtraBold.ttf'),
    'Nunito-Black': require('../assets/fonts/Nunito-Black.ttf'),
  })

  useEffect(() => {
    if (fondsLoaded) {
      SplashScreen.hideAsync()
    }
  }, [fondsLoaded])

  if (!fondsLoaded) return null

  return (
    <AuthProvider>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name='index' options={{ headerShown: false }} />
        <Stack.Screen name='sign-in' options={{ headerShown: false }} />
        <Stack.Screen name='sign-up' options={{ headerShown: false }} />
      </Stack>
    </AuthProvider>
  )
}
