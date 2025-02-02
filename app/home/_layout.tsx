import HeaderButton from '@/components/HeaderButton'
import HeadingLogo from '@/components/HeadingLogo'
import images from '@/constant/images'
import { useAuth } from '@/context/AuthContext'
import { supabase } from '@/lib/supabase'
import { router, Stack } from 'expo-router'
import { useEffect, useState } from 'react'
import { Alert, Image, Pressable, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function HomeLayout() {
  const { setAuth, user } = useAuth()
  const [localUser, setLocalUser] = useState<any>(null)

  const fetchUser = async () => {
    const { data } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single()

    setLocalUser(data)
  }

  useEffect(() => {
    fetchUser()
  }, [fetchUser])

  return (
    <SafeAreaView className='page-layout'>
      <View className='flex-row justify-between mb-3'>
        <HeadingLogo onPress={() => router.replace('/home')} />
        <Pressable
          onPress={() => {
            if (!user)
              return Alert.alert('Please reload and relogin the application.')
            router.replace({
              pathname: '/home/profile/[id]',
              params: { id: user.id },
            })
          }}
        >
          <Image
            source={
              !localUser?.avatar
                ? images.getStartedImage
                : { uri: localUser?.avatar }
            }
            className='h-10 w-10 rounded-full'
            height={10}
            width={10}
            resizeMode='cover'
          />
        </Pressable>
      </View>
      <View className='flex-row items-start justify-end gap-x-2 mb-5'>
        <HeaderButton
          title='Saved Articles'
          onPress={() => router.replace('/home/save-article')}
        />
      </View>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name='index' options={{ headerShown: false }} />
        <Stack.Screen name='save-article' options={{ headerShown: false }} />
      </Stack>
    </SafeAreaView>
  )
}
