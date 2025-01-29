import { View, Text } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'

const Profile = () => {
  const { id } = useLocalSearchParams()

  return (
    <View>
      <Text>User ID: {id}</Text>
    </View>
  )
}

export default Profile
