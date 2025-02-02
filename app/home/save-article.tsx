import { View, Text, Alert, FlatList, ActivityIndicator } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/context/AuthContext'
import { NewsArticleType } from '@/interfaces/news'
import { CURRENTS_API_KEY } from '@/constant/utils'
import CustomNewsArticle from '@/components/CustomNewsArticle'

const SaveArticles = () => {
  const { user } = useAuth()
  const [articles, setArticles] = useState<NewsArticleType[]>([])
  const [loading, setLoading] = useState<boolean>(false)

  const fetchArticle = useCallback(async () => {
    const { data, error } = await supabase
      .from('saved_articles')
      .select('*')
      .eq('user_id', user.id)

    if (error) {
      return Alert.alert(
        'Error',
        `Error fetching your saved articles. Please relogin your account: ${error.message}`
      )
    }

    const latestNewsApi = await fetch(
      `https://api.currentsapi.services/v1/latest-news?language=en&apiKey=${CURRENTS_API_KEY}&country=ph`
    )

    const latestNewsData = await latestNewsApi.json()

    if (latestNewsApi.status === 200) {
      const savedArticleIds = data.map(
        (savedArticle) => savedArticle.article_id
      )

      const matchedArticles = latestNewsData.news.filter((article: any) =>
        savedArticleIds.includes(article.id)
      )

      setArticles(matchedArticles)
    }
  }, [])

  useEffect(() => {
    fetchArticle()
  }, [articles])

  if (loading)
    return (
      <View className='page-layout !px-0 !py-0'>
        <ActivityIndicator size='large' color={'blue'} />
      </View>
    )

  return (
    <View className='page-layout !px-0 !py-0'>
      <FlatList
        data={articles}
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
            isSave
          />
        )}
        contentContainerStyle={{ gap: 25 }}
        ListEmptyComponent={<Text>No News saved</Text>}
      />
    </View>
  )
}

export default SaveArticles
