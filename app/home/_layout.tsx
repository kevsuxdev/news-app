import HeaderButton from '@/components/HeaderButton'
import HeadingLogo from '@/components/HeadingLogo'
import images from '@/constant/images'
import { useAuth } from '@/context/AuthContext'
import { supabase } from '@/lib/supabase'
import { router, Stack } from 'expo-router'
import { Alert, Image, Pressable, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function HomeLayout() {
  const { setAuth } = useAuth()

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut()

      if (error) return Alert.alert(error.message)
      setAuth(null)
      Alert.alert('Logout successful!')
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <SafeAreaView className='page-layout'>
      <View className='flex-row justify-between mb-3'>
        <HeadingLogo onPress={() => router.replace('/home')} />
        <Pressable onPress={handleLogout}>
          <Image
            source={images.getStartedImage}
            className='h-10 w-10 rounded-full'
            height={10}
            width={10}
            resizeMode='cover'
          />
        </Pressable>
      </View>
      <View className='flex-row items-start gap-x-2 mb-5'>
        <HeaderButton title='Trending' onPress={() => router.replace('/home/trending')} />
        <HeaderButton title='Favorite' onPress={() => router.replace('/home/favorites')} />
      </View>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name='index' options={{ headerShown: false }} />
        <Stack.Screen name='trending' options={{ headerShown: false }} />
        <Stack.Screen name='favorites' options={{ headerShown: false }} />
      </Stack>
    </SafeAreaView>
  )
}
