import { siteConfig } from '@/lib/config'
import { useGlobal } from '@/lib/global'
import SmartLink from '@/components/SmartLink'
import CONFIG from '../config'

/**
 * 文章列表页 — 按年份分组展示
 *
 * 1. 页面标题「文章」、简介、文章总数（从 Notion 数据库统计）
 * 2. 自动按年份分组：读取每篇 Notion 文章的 Date 字段
 * 3. 每条文章：标题、发布日期、右侧箭头
 */
export default function BlogListPage(props) {
  const { posts = [], postCount } = props
  const { locale } = useGlobal()
  const blogTitle = siteConfig('MYTHEME_BLOG_TITLE', '文章', CONFIG)
  const blogDesc = siteConfig('MYTHEME_BLOG_DESC', '记录与分享', CONFIG)

  // 按年份分组
  const groupedByYear = {}
  for (const post of posts) {
    const dateStr = post?.date?.start_date || post?.publishDate || post?.createdTime
    if (!dateStr) {
      if (!groupedByYear['_unknown']) groupedByYear['_unknown'] = []
      groupedByYear['_unknown'].push(post)
      continue
    }
    const year = new Date(dateStr).getFullYear()
    if (!groupedByYear[year]) groupedByYear[year] = []
    groupedByYear[year].push(post)
  }

  // 年份降序排列
  const years = Object.keys(groupedByYear)
    .filter(y => y !== '_unknown')
    .sort((a, b) => Number(b) - Number(a))
  if (groupedByYear['_unknown']) {
    years.push('_unknown')
  }

  // 格式化日期为可读格式
  const formatDate = dateStr => {
    if (!dateStr) return ''
    const d = new Date(dateStr)
    if (isNaN(d.getTime())) return dateStr
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
  }

  return (
    <div>
      {/* 页面标题 & 简介 */}
      <div className='mb-8'>
        <h1 className='text-2xl font-bold text-[var(--mytheme-text-primary)] mb-1'>
          {blogTitle}
        </h1>
        <p className='text-sm text-[var(--mytheme-text-secondary)]'>
          {blogDesc}
          {postCount !== undefined && (
            <span className='ml-2 text-[var(--mytheme-text-tertiary)]'>
              · 共 {postCount} 篇
            </span>
          )}
        </p>
      </div>

      {/* 按年份分组文章列表 */}
      {years.length > 0 ? (
        years.map(year => {
          const yearPosts = groupedByYear[year]
          const displayYear = year === '_unknown' ? '其他' : year
          return (
            <div key={year}>
              <h2 className='mytheme-year-header'>{displayYear}</h2>
              {yearPosts.map((post, index) => {
                const dateStr = post?.date?.start_date || post?.publishDate || post?.createdTime
                return (
                  <SmartLink key={post.id || index} href={post.href}>
                    <div className='mytheme-blog-item'>
                      <span className='blog-title'>{post.title}</span>
                      <span className='blog-date'>{formatDate(dateStr)}</span>
                      <span className='blog-arrow'>
                        <i className='fas fa-arrow-right' />
                      </span>
                    </div>
                  </SmartLink>
                )
              })}
            </div>
          )
        })
      ) : (
        <p className='text-sm text-[var(--mytheme-text-tertiary)] py-8 text-center'>
          暂无文章
        </p>
      )}
    </div>
  )
}
