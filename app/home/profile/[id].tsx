import { View, Text, Alert, ActivityIndicator, Image } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { useLocalSearchParams } from 'expo-router'
import { useAuth } from '@/context/AuthContext'
import images from '@/constant/images'
import CallToAction from '@/components/CallToAction'
import * as ImagePicker from 'expo-image-picker'
import * as FileSystem from 'expo-file-system'
import CustomTextField from '@/components/CustomTextField'
import { supabase } from '@/lib/supabase'
import { decode } from 'base64-arraybuffer'

const Profile = () => {
  const { id } = useLocalSearchParams()
  const [loading, setLoading] = useState<boolean>(false)
  const [localUser, setLocalUser] = useState<any>(null)
  const { user, setAuth } = useAuth()

  const onSelectImage = async () => {
    console.log('Opening gallery...')
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
      })

      if (!result.canceled) {
        setLoading(true)

        const img = result.assets[0]
        const base64 = await FileSystem.readAsStringAsync(img.uri, {
          encoding: FileSystem.EncodingType.Base64,
        })

        const filePath = `${id}/${new Date().getTime()}.${
          img.type === 'image' ? 'png' : 'mp4'
        }`

        const contentType = img.type === 'image' ? 'image/png' : 'video/mp4'

        const { data: urlData } = supabase.storage
          .from('avatars')
          .getPublicUrl(filePath)

        await supabase.storage
          .from('avatars')
          .upload(filePath, decode(base64), { contentType })

        const { error: upsertError } = await supabase
          .from('profiles')
          .upsert({ id: id, avatar: urlData.publicUrl })

        if (upsertError) {
          throw upsertError
        }
        fetchUser()
        Alert.alert('Success', 'Avatar updated successfully.')
      }

      setLoading(false)
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  const handleLogout = async () => {
    setLoading(true)
    try {
      const { error } = await supabase.auth.signOut()
      if (error) return Alert.alert(error.message)
      setAuth(null)
      Alert.alert('Logout successful!')
      setLoading(false)
    } catch (error) {
      console.error(error)
      setLoading(false)
    }
  }

  const fetchUser = useCallback(async () => {
    setLoading(true)

    const { data } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', id)
      .single()

    setLocalUser(data)
    setLoading(false)
    console.log(localUser)
  }, [])

  useEffect(() => {
    fetchUser()
  }, [id])

  if (loading) {
    return (
      <View className='page-layout !px-0 !py-0'>
        <ActivityIndicator size='large' color={'#120edd'} />
      </View>
    )
  }

  return (
    <View className='page-layout !px-0 !py-0'>
      <View className='flex-col items-center justify-center h-[50%] gap-5'>
        <Image
          source={
            !localUser?.avatar
              ? images.getStartedImage
              : { uri: localUser?.avatar }
          }
          resizeMode='cover'
          className='w-40 h-40 rounded-full'
        />
        <Text className='font-nunito-black text-2xl'>
          {localUser?.first_name} {localUser?.last_name}
        </Text>
        <CallToAction
          title='Change Avatar'
          buttonStyle='!w-64'
          onPress={onSelectImage}
        />
      </View>

      <View className='gap-5 flex-1 items-start justify-start'>
        <View className='flex-row gap-5'>
          <CustomTextField
            containerStyle='flex-1'
            label='First Name'
            placeholder='First Name'
            defaultValue={localUser?.first_name}
            readOnly
          />
          <CustomTextField
            containerStyle='flex-1'
            label='Last Name'
            placeholder='Last Name'
            defaultValue={localUser?.last_name}
            readOnly
          />
        </View>
        <CustomTextField
          label='Email Address'
          placeholder='Email Address'
          defaultValue={user?.email}
          readOnly
        />
        <CallToAction title='Edit Profile' buttonStyle='w-48 ' />
        <CallToAction
          title='Logout'
          buttonStyle='w-48 bg-red-700'
          onPress={handleLogout}
        />
      </View>
    </View>
  )
}

export default Profile
