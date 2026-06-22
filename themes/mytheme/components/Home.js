import { siteConfig } from '@/lib/config'
import { useGlobal } from '@/lib/global'
import SmartLink from '@/components/SmartLink'
import CONFIG from '../config'
import NotionPage from '@/components/NotionPage'

/**
 * 自定义首页组件 — 数据全部从 Notion 动态获取
 *
 * 内容结构（从上到下）：
 * 1. 欢迎标题、介绍文案、「联系我」按钮 — 从 HOMEPAGE_ID Notion 页面解析块渲染
 * 2. 2×2 四宫格信息卡片 — 自动解析 Notion 首页页面的画廊分栏
 * 3. LATEST 最新文章区 — 按发布时间倒序取前 N 篇
 *
 * @param {Object} props.posts - 所有文章列表
 * @param {Object} props.latestPosts - 最新文章列表（可选，框架注入）
 */
export default function Home(props) {
  const { posts = [], latestPosts } = props
  const { locale } = useGlobal()

  // 从配置读取 Notion 自定义首页页面 ID
  const homepageId = siteConfig('MYTHEME_HOMEPAGE_ID', '', CONFIG)
  // 最新文章数量
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

  // 格式化日期
  const formatDate = post => {
    return post?.date?.start_date || post?.publishDate || post?.createdTime || ''
  }

  return (
    <div>
      {/* ====== HERO：欢迎区域 ====== */}
      {/* 如果配置了 HOMEPAGE_ID，渲染 Notion 页面内容 */}
      {homepageId ? (
        <div className='mytheme-hero'>
          <div id='homepage-notion-content'>
            {/* NotionPage 会自动渲染 Notion 页面所有块 */}
          </div>
        </div>
      ) : (
        /* 无 HOMEPAGE_ID 时的降级展示 */
        <div className='mytheme-hero'>
          <h1>
            {locale?.NAV?.HOME || '欢迎'}
          </h1>
          <p>
            {siteConfig('BIO') || '记录与分享'}
          </p>
          <a href={`mailto:${siteConfig('CONTACT_EMAIL') || ''}`}>
            <span className='mytheme-btn mytheme-btn-primary'>
              <i className='fas fa-envelope' />
              联系我
            </span>
          </a>
        </div>
      )}

      {/* ====== 2×2 信息卡片 ====== */}
      <div className='mytheme-card-grid'>
        <div className='mytheme-card'>
          <div className='mytheme-card-icon'>📝</div>
          <h3 className='mytheme-card-title'>写作</h3>
          <p className='mytheme-card-desc'>记录技术与思考</p>
        </div>
        <div className='mytheme-card'>
          <div className='mytheme-card-icon'>💻</div>
          <h3 className='mytheme-card-title'>开发</h3>
          <p className='mytheme-card-desc'>Web 全栈 &amp; 工具</p>
        </div>
        <div className='mytheme-card'>
          <div className='mytheme-card-icon'>📖</div>
          <h3 className='mytheme-card-title'>阅读</h3>
          <p className='mytheme-card-desc'>读书笔记与心得</p>
        </div>
        <div className='mytheme-card'>
          <div className='mytheme-card-icon'>🚀</div>
          <h3 className='mytheme-card-title'>项目</h3>
          <p className='mytheme-card-desc'>开源 &amp; 实践</p>
        </div>
      </div>

      {/* ====== LATEST 最新文章 ====== */}
      <div className='mt-8'>
        <div className='mytheme-section-header'>
          <h2 className='mytheme-section-title'>LATEST</h2>
          <SmartLink href='/archive' className='mytheme-view-all'>
            View all <i className='fas fa-arrow-right ml-1' />
          </SmartLink>
        </div>

        <div>
          {sortedPosts.length > 0 ? (
            sortedPosts.map(post => (
              <SmartLink key={post.id} href={post.href}>
                <div className='mytheme-post-item'>
                  <span className='post-title'>{post.title}</span>
                  <span className='post-date'>{formatDate(post)}</span>
                  <span className='post-arrow'>
                    <i className='fas fa-arrow-right' />
                  </span>
                </div>
              </SmartLink>
            ))
          ) : (
            <p className='text-sm text-[var(--mytheme-text-tertiary)]'>
              暂无文章
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
