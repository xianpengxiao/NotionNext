import { siteConfig } from '@/lib/config'
import SmartLink from '@/components/SmartLink'

/**
 * 文章条目 — 用于文章列表页
 * 展示标题 + 发布日期 + 跳转箭头
 */
export const BlogItem = props => {
  const { post } = props
  const dateStr = post?.date?.start_date || post?.publishDate || post?.createdTime || ''

  const formatDate = d => {
    if (!d) return ''
    const date = new Date(d)
    if (isNaN(date.getTime())) return d
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
  }

  return (
    <SmartLink href={post.href}>
      <div className='mytheme-blog-item'>
        <span className='blog-title'>{post.title}</span>
        <span className='blog-date'>{formatDate(dateStr)}</span>
        <span className='blog-arrow'>
          <i className='fas fa-arrow-right' />
        </span>
      </div>
    </SmartLink>
  )
}
