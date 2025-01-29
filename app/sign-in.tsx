import { View, Text, SafeAreaView, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Link, router } from 'expo-router'
import CustomTextField from '@/components/CustomTextField'
import CustomPasswordField from '@/components/CustomPasswordField'
import CallToAction from '@/components/CallToAction'
import Separator from '@/components/Separator'
import SocialLogin from '@/components/SocialLogin'
import images from '@/constant/images'
import { LoginFormType } from '@/interfaces/forms'
import { supabase } from '@/lib/supabase'
import HeadingLogo from '@/components/HeadingLogo'
import { useAuth } from '@/context/AuthContext'

const SignIn = () => {
  const { setAuth } = useAuth()

  const [loginForm, setLoginForm] = useState<LoginFormType>({
    email: '',
    password: '',
  })

  const handleLoginWithEmail = async () => {
    const { error } = await supabase.auth.signInWithPassword({
      email: loginForm.email,
      password: loginForm.password,
    })

    if (error) return console.error(error)

    router.replace('/home')
  }

  useEffect(() => {
    supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        setAuth(session?.user)
        router.replace('/home')
      } else {
        setAuth(null)
      }
    })
  }, [])

  return (
    <SafeAreaView className='page-layout gap-5'>
      <View className='gap-2'>
        <Link href='/'>
          <HeadingLogo />
        </Link>
        <Text className='text-xl font-nunito-semi-bold'>
          Log in to access personalized news, save your favorite articles, and
          stay up-to-date with stories that matter to you.
        </Text>
      </View>

      <View className='mt-5 gap-5 items-start w-full'>
        <CustomTextField
          label='Email Address'
          placeholder='john.doe@example.com'
          onChangeText={(value) => setLoginForm({ ...loginForm, email: value })}
        />
        <CustomPasswordField
          label='Password'
          placeholder='***************'
          onChangeText={(value) =>
            setLoginForm({ ...loginForm, password: value })
          }
        />
        <Text className='text-lg font-nunito-semi-bold self-end'>
          Forgot Password
        </Text>
        <CallToAction title='Login' onPress={handleLoginWithEmail} />
        <Separator />
        <Text className='text-lg font-nunito-bold tracking-tight text-gray-500 self-center'>
          Or Continue With
        </Text>
        <View className='self-center flex-row gap-3'>
          <SocialLogin
            name='Facebook'
            icon={{
              image: images.facebook,
              height: 20,
              width: 20,
              style: 'h-6 w-6',
            }}
          />
          <SocialLogin
            name='Google'
            icon={{
              image: images.google,
              height: 20,
              width: 20,
              style: 'h-6 w-6',
            }}
          />
        </View>
        <Text className='self-center text-lg font-nunito-semi-bold'>
          Don't have an account yet?{' '}
          <Text className='text-main' onPress={() => router.push('/sign-up')}>
            Register Here.
          </Text>
        </Text>
      </View>
    </SafeAreaView>
  )
}

export default SignIn
