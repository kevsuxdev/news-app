import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { SocialLoginType } from '@/interfaces/components'

const SocialLogin: React.FC<SocialLoginType> = ({ name, icon }) => {
  return (
    <TouchableOpacity className='flex-row gap-2 items-center justify-center border border-black/20 py-4 rounded-lg w-fit px-8'>
      {icon && (
        <Image
          source={icon.image}
          width={icon.width}
          height={icon.height}
          className={icon.style}
        />
      )}
      <Text className='font-nunito-semi-bold text-lg'>{name}</Text>
    </TouchableOpacity>
  )
}

export default SocialLogin
