import { View, Text } from 'react-native'
import React from 'react'

interface HeadingLogoType {
  className?: string
  onPress?: () => void
}

const HeadingLogo: React.FC<HeadingLogoType> = ({ className, onPress }) => {
  return (
    <Text
      onPress={onPress}
      className={`text-4xl font-nunito-black text-main ${className}`}
    >
      BalitaPH
    </Text>
  )
}

export default HeadingLogo
