import { View, Text, Image, Pressable, FlatList, Linking } from 'react-native'
import React, { FC } from 'react'
import { NewsArticleType } from '@/interfaces/news'
import Feather from '@expo/vector-icons/Feather'
import CallToAction from './CallToAction'
import { format } from 'date-fns'

const CustomNewsArticle: FC<NewsArticleType> = ({
  id,
  title,
  description,
  url,
  author,
  category,
  image,
  datePublished,
}) => {
  const isoDate = datePublished.replace(' ', 'T').replace(' +0000', '+00:00')

  const handleUrlVisit = () => {
    Linking.openURL(url).catch(err => console.log(`Failed to load URL: ${err}`))
  }

  return (
    <Pressable className='border border-black rounded-lg p-3 flex-1 gap-5'>
      <Image
        source={{ uri: image.startsWith('//') ? `https:${image}` : image }}
        style={{ width: '100%', height: 250, resizeMode: 'cover' }}
        className='rounded-lg'
      />

      <View className='justify-between flex-1 flex-row items-center'>
        <Text className='font-nunito-bold text-lg'>{author}</Text>
        <Text className='font-nunito-bold text-lg'>
          {format(new Date(isoDate), 'MMM dd, yyyy')}
        </Text>
      </View>
      <View className='gap-2'>
        <Text className='text-black font-nunito-black text-xl'>{title}</Text>
        <Text className='text-black font-nunito-medium text-lg'>
          {description.trim()}
        </Text>
      </View>
      <View className='flex-row gap-x-3 items-start'>
        <FlatList
          data={category}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item }) => (
            <Text className='text-sm font-nunito-bold tracking-wider capitalize text-main border-black/30 border p-2 px-5 rounded-full w-fit items-start'>
              {item}
            </Text>
          )}
        />
      </View>
      <View className='flex-row items-center justify-between gap-5'>
        <CallToAction buttonStyle='flex-1' title='View Article' onPress={handleUrlVisit} />
        <Feather name='bookmark' size={24} color='black' />
      </View>
    </Pressable>
  )
}

export default CustomNewsArticle
