import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Link, router } from 'expo-router'
import CustomTextField from '@/components/CustomTextField'
import CustomPasswordField from '@/components/CustomPasswordField'
import CallToAction from '@/components/CallToAction'
import { RegistrationFormType } from '@/interfaces/forms'
import { supabase } from '@/lib/supabase'
import { Alert } from 'react-native'

const SignUp = () => {
  const [signUpForm, setSignUpForm] = useState<RegistrationFormType>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  })

  const createAccount = async () => {
    if (signUpForm.password !== signUpForm.confirmPassword) {
      Alert.alert('Passwords do not match!')
      return
    }

    if (signUpForm.password.length < 6) {
      return Alert.alert('Password must be at least 6 characters long.')
    }

    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email: signUpForm.email,
      password: signUpForm.password,
      options: {
        data: {
          first_name: signUpForm.firstName,
          last_name: signUpForm.lastName,
        },
      },
    })

    console.log(error)
    console.log(signUpForm)
    if (error) return Alert.alert(error.message)

    if (!session) {
      return Alert.alert('Please check your inbox for email verification!')
    }

    Alert.alert(
      'You created account successfully. Please login your credentials.'
    )
    router.push('/sign-in')
  }

  return (
    <SafeAreaView className='page-layout gap-5'>
      <View className='gap-2'>
        <Text className='text-4xl font-nunito-black text-main'>
          Join BalitaPH Today!
        </Text>
        <Text className='text-xl font-nunito-semi-bold'>
          Sign up to personalize your news, follow topics you love, and save
          articles for later.
        </Text>
      </View>

      <View className='mt-5 gap-5 items-start w-full'>
        <View className='w-full flex-row gap-5'>
          <CustomTextField
            label='First Name'
            placeholder='John'
            containerStyle='flex-1'
            onChangeText={(value) =>
              setSignUpForm({ ...signUpForm, firstName: value })
            }
          />
          <CustomTextField
            label='Last Name'
            placeholder='Doe'
            containerStyle='flex-1'
            onChangeText={(value) =>
              setSignUpForm({ ...signUpForm, lastName: value })
            }
          />
        </View>

        <CustomTextField
          label='Email Address'
          placeholder='john.doe@example.com'
          keyboardType='email-address'
          onChangeText={(value) =>
            setSignUpForm({ ...signUpForm, email: value })
          }
        />
        <CustomPasswordField
          label='Password'
          placeholder='***************'
          onChangeText={(value) =>
            setSignUpForm({ ...signUpForm, password: value })
          }
        />
        <CustomPasswordField
          label='Confirm Password'
          placeholder='***************'
          onChangeText={(value) =>
            setSignUpForm({ ...signUpForm, confirmPassword: value })
          }
        />
        <CallToAction title='Create an account' onPress={createAccount} />
        <Text className='self-center text-lg font-nunito-semi-bold'>
          Already have an account?{' '}
          <Text className='text-main' onPress={() => router.push('/sign-in')}>
            Login Here.
          </Text>
        </Text>
      </View>
    </SafeAreaView>
  )
}

export default SignUp
