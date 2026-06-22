import { siteConfig } from '@/lib/config'
import { useGlobal } from '@/lib/global'
import SmartLink from '@/components/SmartLink'
import CONFIG from '../config'

/**
 * 自定义首页组件 — 所有数据全部来自 Notion 数据库/配置
 *
 * 内容结构（从上到下）：
 * 1. Hero：作者名 + BIO（来自 blog.config.js / Notion 配置文档）
 * 2. 2×2 统计卡片（文章数/分类数/标签数/最新更新，均从 Notion 数据动态计算）
 * 3. LATEST 最新文章区（从 Notion 文章数据库按发布时间倒序）
 *
 * @param {Object} props
 * @param {Array}  props.posts       - 所有已发布文章
 * @param {Array}  props.latestPosts - 最新文章列表（框架注入）
 * @param {Array}  props.categoryOptions - 分类列表
 * @param {Array}  props.tagOptions      - 标签列表
 */
export default function Home(props) {
  const { posts = [], latestPosts, categoryOptions, tagOptions } = props
  const { locale } = useGlobal()

  const author = siteConfig('AUTHOR') || ''
  const bio = siteConfig('BIO') || ''
  const email = siteConfig('CONTACT_EMAIL') || ''
  const latestCount = siteConfig('MYTHEME_LATEST_POST_COUNT', 4, CONFIG)

  // 取最新文章（按日期排序）
  const sortedPosts = latestPosts && latestPosts.length
    ? latestPosts
    : [...posts]
        .sort((a, b) => {
          const dateA = a?.date?.start_date || a?.publishDate || a?.createdTime || 0
          const dateB = b?.date?.start_date || b?.publishDate || b?.createdTime || 0
          return new Date(dateB) - new Date(dateA)
        })
        .slice(0, latestCount)

  // 计算统计值
  const postCount = posts?.length || 0
  const categoryCount = categoryOptions?.length || 0
  const tagCount = tagOptions?.length || 0
  // 最近更新时间
  const latestUpdate = (() => {
    if (!posts?.length) return ''
    const dates = posts
      .map(p => p?.date?.start_date || p?.publishDate || p?.createdTime)
      .filter(Boolean)
      .sort()
      .reverse()
    return dates[0] || ''
  })()

  const formatDate = d => {
    if (!d) return ''
    const date = new Date(d)
    if (isNaN(date.getTime())) return d
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
  }

  return (
    <div>
      {/* ====== HERO ====== */}
      <div className='mytheme-hero'>
        <h1>{author}</h1>
        {bio && <p>{bio}</p>}
        {email && (
          <a href={`mailto:${email}`}>
            <span className='mytheme-btn mytheme-btn-primary'>
              <i className='fas fa-envelope' />
              {locale?.NAV?.CONTACT || 'Contact'}
            </span>
          </a>
        )}
      </div>

      {/* ====== 2×2 统计卡片（数据全部从 Notion 动态计算） ====== */}
      <div className='mytheme-card-grid'>
        <div className='mytheme-card'>
          <div className='mytheme-card-icon'>📄</div>
          <h3 className='mytheme-card-title'>{locale?.COMMON?.POSTS || 'Posts'}</h3>
          <p className='mytheme-card-desc'>{postCount} {locale?.COMMON?.ARTICLE_COUNT || 'articles'}</p>
        </div>
        <div className='mytheme-card'>
          <div className='mytheme-card-icon'>📂</div>
          <h3 className='mytheme-card-title'>{locale?.COMMON?.CATEGORY || 'Categories'}</h3>
          <p className='mytheme-card-desc'>{categoryCount} {locale?.COMMON?.CATEGORY || 'categories'}</p>
        </div>
        <div className='mytheme-card'>
          <div className='mytheme-card-icon'>🏷️</div>
          <h3 className='mytheme-card-title'>{locale?.COMMON?.TAGS || 'Tags'}</h3>
          <p className='mytheme-card-desc'>{tagCount} {locale?.COMMON?.TAGS || 'tags'}</p>
        </div>
        <div className='mytheme-card'>
          <div className='mytheme-card-icon'>🕐</div>
          <h3 className='mytheme-card-title'>{locale?.POST?.POST_TIME || 'Updated'}</h3>
          <p className='mytheme-card-desc'>{latestUpdate ? formatDate(latestUpdate) : '-'}</p>
        </div>
      </div>

      {/* ====== LATEST ====== */}
      {sortedPosts.length > 0 && (
        <div className='mt-8'>
          <div className='mytheme-section-header'>
            <h2 className='mytheme-section-title'>{locale?.NAV?.LATEST_POSTS || 'Latest'}</h2>
            <SmartLink href='/archive' className='mytheme-view-all'>
              {locale?.NAV?.MORE || 'View all'} <i className='fas fa-arrow-right ml-1' />
            </SmartLink>
          </div>

          <div>
            {sortedPosts.map(post => (
              <SmartLink key={post.id} href={post.href}>
                <div className='mytheme-post-item'>
                  <span className='post-title'>{post.title}</span>
                  <span className='post-date'>{formatDate(post?.date?.start_date || post?.publishDate || post?.createdTime)}</span>
                  <span className='post-arrow'>
                    <i className='fas fa-arrow-right' />
                  </span>
                </div>
              </SmartLink>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
