import { View, Text, TextInput } from 'react-native'
import React from 'react'
import { CustomTextFieldType } from '@/interfaces/components'
import Feather from '@expo/vector-icons/Feather'

const CustomTextField: React.FC<CustomTextFieldType> = ({
  label,
  labelStyle,
  fieldStyle,
  placeholder,
  keyboardType,
  containerStyle,
  onChangeText
}) => {
  return (
    <View className={`w-full gap-2 ${containerStyle}`}>
      <Text className={`text-xl font-nunito-bold ${labelStyle}`}>{label}</Text>
      <TextInput
        placeholder={placeholder || 'john.doe@example.com'}
        className={`text-black border border-black/50 px-3 rounded-lg font-nunito-medium ${fieldStyle}`}
        keyboardType={keyboardType || 'default'}
        onChangeText={onChangeText}
      />
    </View>
  )
}

export default CustomTextField
