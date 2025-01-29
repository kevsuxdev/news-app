import { NEWS_API_KEY } from '@/constant/utils'
import NewsAPI from 'newsapi'

export const newsApi = new NewsAPI(NEWS_API_KEY)
