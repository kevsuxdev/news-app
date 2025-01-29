import { Image, ScrollView, Text, View } from 'react-native'
import images from '@/constant/images'
import { SafeAreaView } from 'react-native-safe-area-context'
import CallToAction from '@/components/CallToAction'
import { router } from 'expo-router'
import { AuthProvider } from '@/context/AuthContext'

export default function Index() {
  return (
    <SafeAreaView className='flex-1'>
      <ScrollView contentContainerClassName='page-layout flex-col gap-5 justify-between'>
        <Image
          source={images.getStartedImage}
          resizeMode='cover'
          className='w-full rounded-lg h-[65%]'
        />
        <View className='items-center justify-center mt-5 gap-3'>
          <Text className='text-[2.5rem] font-nunito-black tracking-tight text-center'>
            Welcome to <Text className='text-main'>BalitaPH!</Text>
          </Text>
          <Text className='font-nunito-semi-bold text-xl text-center px-2'>
            Stay informed with the latest updates from around the Philippines,
            all at your fingertips.
          </Text>
        </View>
        <CallToAction
          title="Let's get started"
          onPress={() => router.push('/sign-in')}
        />
      </ScrollView>
    </SafeAreaView>
  )
}
