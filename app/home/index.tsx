import {
  View,
  Text,
  Alert,
  ScrollView,
  ActivityIndicator,
  FlatList,
  Pressable,
  Touchable,
  TouchableOpacity,
} from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { useAuth } from '@/context/AuthContext'
import { supabase } from '@/lib/supabase'
import { router } from 'expo-router'
import { CURRENTS_API_KEY } from '@/constant/utils'
import CustomNewsArticle from '@/components/CustomNewsArticle'
import HeaderButton from '@/components/HeaderButton'

export default function HomePage() {
  const { setAuth, user } = useAuth()
  const [news, setNews] = useState<any[]>([])
  const [loading, setLoading] = useState<boolean>(false)

  const fetchFilteredNews = useCallback(async () => {
    const { data, error } = await supabase
      .from('saved_articles')
      .select('*')
      .eq('user_id', user.id)


    if (error) return Alert.alert('Error', 'Error fetching news')

    const latestNewsApi = await fetch(
      `https://api.currentsapi.services/v1/latest-news?language=en&apiKey=${CURRENTS_API_KEY}&country=ph`
    )

    const latestNewsData = await latestNewsApi.json()

    if (latestNewsApi.status === 200) {
      const latestArticles = data.map((article) => article.article_id)
      const notSavedArticles = latestNewsData.news.filter((article: any) => !latestArticles.includes(article.id))
      setNews(notSavedArticles)
    }

  }, [])

  useEffect(() => {
    supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        router.replace('/sign-in')
        setAuth(null)
      }
    })

    fetchFilteredNews()
  }, [fetchFilteredNews, news])

  return (
    <View className='bg-white h-full'>
      {loading ? (
        <ActivityIndicator
          size='large'
          color='#0000ff'
          style={{ marginTop: 20 }}
        />
      ) : (
        <FlatList
          data={news}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <CustomNewsArticle
              id={item.id}
              title={item.title}
              description={item.description}
              url={item.url}
              image={item.image}
              published={item.published}
              author={item.author}
              category={item.category}
            />
          )}
          contentContainerStyle={{ gap: 25 }}
          ListEmptyComponent={<Text>No news available</Text>}
        />
      )}
    </View>
  )
}
