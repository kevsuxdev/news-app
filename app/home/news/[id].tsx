import { View, Text } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'

export default function News() {
  const { id } = useLocalSearchParams()

  return (
    <View>
      <Text>News</Text>
    </View>
  )
}
