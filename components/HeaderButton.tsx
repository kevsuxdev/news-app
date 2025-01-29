import { Text, TouchableOpacity } from 'react-native'
import React, { FC } from 'react'

interface HeaderButtonType {
  title: string
  onPress?: () => void
}

const HeaderButton: FC<HeaderButtonType> = ({ title, onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className='border-main border p-2 px-4 rounded-lg'
    >
      <Text className='text-lg font-nunito-black tracking-wide text-center text-black'>
        {title || 'Text here...'}
      </Text>
    </TouchableOpacity>
  )
}

export default HeaderButton
