import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { CallToActionType } from '@/interfaces/components'

const CallToAction: React.FC<CallToActionType> = ({
  title,
  buttonStyle,
  textStyle,
  onPress,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className={`bg-main w-full items-center justify-center p-3 rounded-lg ${buttonStyle}`}
    >
      <Text className={`text-white font-nunito-semi-bold text-lg tracking-wide ${textStyle}`}>{title}</Text>
    </TouchableOpacity>
  )
}

export default CallToAction
