import { View, Text, TextInput } from 'react-native'
import React, { useState } from 'react'
import { CustomPasswordFieldType } from '@/interfaces/components'
import Feather from '@expo/vector-icons/Feather'

const CustomPasswordField: React.FC<CustomPasswordFieldType> = ({
  label,
  labelStyle,
  placeholder,
  fieldStyle,
  keyboardType,
  onChangeText,
}) => {
  const [showPassword, setShowPassword] = useState<boolean>(true)
  return (
    <View className='w-full gap-2 relative'>
      <Text className={`text-xl font-nunito-bold ${labelStyle}`}>{label}</Text>
      <TextInput
        placeholder={placeholder || 'john.doe@example.com'}
        className={`text-black border border-black/50 px-3 rounded-lg font-nunito-medium ${fieldStyle}`}
        keyboardType={keyboardType || 'default'}
        secureTextEntry={showPassword}
        onChangeText={onChangeText}
      />
      <Feather
        name='eye'
        size={20}
        color='black'
        className='absolute right-5 bottom-[0.6rem]'
        onPress={() => setShowPassword(!showPassword)}
      />
    </View>
  )
}

export default CustomPasswordField
