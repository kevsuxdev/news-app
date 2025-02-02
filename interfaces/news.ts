export interface NewsArticleType {
  id: string
  title: string
  description: string
  url: string
  author: string
  category: string[]
  published: string
  image: string
  isSave?: boolean
}
