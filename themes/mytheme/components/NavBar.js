import { siteConfig } from '@/lib/config'
import { useGlobal } from '@/lib/global'
import LazyImage from '@/components/LazyImage'
import SmartLink from '@/components/SmartLink'
import SocialButton from './SocialButton'
import { useRouter } from 'next/router'

/**
 * 侧边栏 — 所有数据均来自 Notion
 *
 * 从上到下：
 * 1. 头像 + 作者名 + BIO（Notion 配置文档）
 * 2. 搜索框（有 Algolia 弹窗 / 无则跳转搜索页）
 * 3. 分类列表（从 Notion 分类数据动态渲染）
 * 4. 标签云（从 Notion 标签数据动态渲染）
 * 5. 近期文章（从 Notion 文章数据库取前 N 篇）
 * 6. 归档链接
 * 7. 社交图标
 */
export default function NavBar(props) {
  const { siteInfo, locale } = useGlobal()
  const router = useRouter()
  const { searchModal, categoryOptions = [], tagOptions = [], posts = [], latestPosts } = props

  const avatar = siteConfig('AVATAR') || siteInfo?.icon || '/avatar.svg'
  const author = siteConfig('AUTHOR') || ''
  const bio = siteConfig('BIO') || ''

  // 近期文章数
  const recentCount = 5
  const recentPosts = (latestPosts && latestPosts.length ? latestPosts : posts)
    .slice(0, recentCount)

  /**
   * 搜索：有 Algolia 则弹窗，否则跳转到搜索页
   */
  const handleOpenSearch = () => {
    if (siteConfig('ALGOLIA_APP_ID') && searchModal?.current) {
      searchModal.current.openSearch?.()
    } else {
      router.push('/search')
    }
  }

  return (
    <div className='flex flex-col h-full'>
      <div className='flex flex-col gap-5 p-6 overflow-y-auto flex-1'>

        {/* ====== 头像 + 作者信息 ====== */}
        <div className='flex flex-col items-center text-center gap-3'>
          <SmartLink href='/'>
            <div className='mytheme-avatar-wrap'>
              <LazyImage src={avatar} alt={author} width={80} height={80} priority />
            </div>
          </SmartLink>
          <div>
            <SmartLink href='/'>
              <div className='mytheme-author-name'>{author}</div>
            </SmartLink>
            {bio && <div className='mytheme-bio'>{bio}</div>}
          </div>
        </div>

        {/* ====== 搜索框 ====== */}
        <div className='mytheme-search-box' onClick={handleOpenSearch} role='button' tabIndex={0}>
          <i className='fas fa-search' />
          <span>{locale?.SEARCH?.ARTICLES || 'Search'}</span>
        </div>

        {/* ====== 分类（Notion 数据） ====== */}
        {categoryOptions?.length > 0 && (
          <section>
            <h3 className='text-xs font-semibold text-[var(--mytheme-text-tertiary)] tracking-wider uppercase mb-2'>
              {locale?.COMMON?.CATEGORY || 'Categories'}
            </h3>
            <div className='flex flex-wrap gap-1.5'>
              {categoryOptions.map(cat => (
                <SmartLink key={cat.name} href={`/category/${cat.name}`}>
                  <span className='inline-block px-2.5 py-1 text-xs rounded-full border border-[var(--mytheme-border)] text-[var(--mytheme-text-secondary)] hover:border-[var(--mytheme-accent)] hover:text-[var(--mytheme-accent)] transition-colors'>
                    {cat.name}
                  </span>
                </SmartLink>
              ))}
            </div>
          </section>
        )}

        {/* ====== 标签云（Notion 数据） ====== */}
        {tagOptions?.length > 0 && (
          <section>
            <h3 className='text-xs font-semibold text-[var(--mytheme-text-tertiary)] tracking-wider uppercase mb-2'>
              {locale?.COMMON?.TAGS || 'Tags'}
            </h3>
            <div className='flex flex-wrap gap-1.5'>
              {tagOptions.slice(0, 20).map(tag => (
                <SmartLink key={tag.name} href={`/tag/${encodeURIComponent(tag.name)}`}>
                  <span className='inline-block px-2 py-0.5 text-xs rounded-full bg-[var(--mytheme-bg)] text-[var(--mytheme-text-tertiary)] hover:bg-[var(--mytheme-accent)] hover:text-white transition-colors'>
                    {tag.name}
                  </span>
                </SmartLink>
              ))}
            </div>
          </section>
        )}

        {/* ====== 近期文章（Notion 数据） ====== */}
        {recentPosts?.length > 0 && (
          <section>
            <h3 className='text-xs font-semibold text-[var(--mytheme-text-tertiary)] tracking-wider uppercase mb-2'>
              {locale?.COMMON?.LATEST_POSTS || 'Latest'}
            </h3>
            <div className='flex flex-col gap-1'>
              {recentPosts.map(post => (
                <SmartLink key={post.id} href={post.href}>
                  <span className='block text-sm text-[var(--mytheme-text-secondary)] hover:text-[var(--mytheme-accent)] transition-colors truncate py-0.5'>
                    {post.title}
                  </span>
                </SmartLink>
              ))}
            </div>
          </section>
        )}

        {/* ====== 归档链接 ====== */}
        <section>
          <SmartLink href='/archive'>
            <span className='inline-flex items-center gap-1.5 text-sm text-[var(--mytheme-text-secondary)] hover:text-[var(--mytheme-accent)] transition-colors'>
              <i className='fas fa-archive text-xs' />
              {locale?.NAV?.ARCHIVE || 'Archive'}
            </span>
          </SmartLink>
        </section>

      </div>

      {/* ====== 社交图标（底部固定） ====== */}
      <div className='px-6 pb-6'>
        <div className='mytheme-divider mb-4' />
        <SocialButton />
      </div>
    </div>
  )
}
