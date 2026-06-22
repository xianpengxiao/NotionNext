import replaceSearchResult from '@/components/Mark'
import NotionPage from '@/components/NotionPage'
import { siteConfig } from '@/lib/config'
import { useGlobal } from '@/lib/global'
import { isBrowser } from '@/lib/utils'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { useEffect, useRef } from 'react'
import CONFIG from './config'
import { Style } from './style'
import Home from './components/Home'
import NavBar from './components/NavBar'
import BlogListPage from './components/BlogListPage'

const AlgoliaSearchModal = dynamic(
  () => import('@/components/AlgoliaSearchModal'),
  { ssr: false }
)

const Comment = dynamic(() => import('@/components/Comment'), { ssr: false })
const ArticleLock = dynamic(() => import('./components/ArticleLock'), { ssr: false })
const ArticleInfo = dynamic(() => import('./components/ArticleInfo'), { ssr: false })
const ArticleAround = dynamic(() => import('./components/ArticleAround'), { ssr: false })
const RecommendPosts = dynamic(() => import('./components/RecommendPosts'), { ssr: false })
const BlogPostBar = dynamic(() => import('./components/BlogPostBar'), { ssr: false })
const BlogArchiveItem = dynamic(() => import('./components/BlogArchiveItem'), { ssr: false })
const JumpToTopButton = dynamic(() => import('./components/JumpToTopButton'), { ssr: false })
const Footer = dynamic(() => import('./components/Footer'), { ssr: false })
const WWAds = dynamic(() => import('@/components/WWAds'), { ssr: false })

/**
 * 基础布局 — 左侧 fixed 侧边栏 + 右侧主内容
 * 桌面端侧边栏固定不滚动，内容区独立滚动
 * 移动端侧边栏置于顶部
 */
const LayoutBase = props => {
  const { children, post } = props
  const { onLoading } = useGlobal()
  const router = useRouter()
  const searchModal = useRef(null)

  return (
    <div id='theme-mytheme' className={`${siteConfig('FONT_STYLE')} min-h-screen`}>
      <Style />

      {/* ====== LEFT SIDEBAR — fixed 固定不跟随滚动 ====== */}
      <div className='mytheme-sidebar'>
        <NavBar {...props} searchModal={searchModal} />
      </div>

      {/* ====== RIGHT MAIN CONTENT ====== */}
      <div className='mytheme-main flex justify-center'>
        <div className='w-full max-w-3xl xl:max-w-4xl px-6 md:px-10 py-8 min-h-screen'>
          {onLoading ? (
            <div className='flex items-center justify-center min-h-[500px] w-full'>
              <div className='animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[var(--mytheme-text-tertiary)]' />
            </div>
          ) : (
            <>{children}</>
          )}

          {/* 页脚 */}
          <div className='mt-16'>
            <Footer />
          </div>
        </div>
      </div>

      <div className='fixed right-4 bottom-4 z-20'>
        <JumpToTopButton />
      </div>

      <AlgoliaSearchModal cRef={searchModal} {...props} />
    </div>
  )
}

/**
 * 首页 — 自定义 Home 组件
 */
const LayoutIndex = props => {
  return <Home {...props} />
}

/**
 * 文章列表页
 */
const LayoutPostList = props => {
  return (
    <>
      <BlogPostBar {...props} />
      <BlogListPage {...props} />
    </>
  )
}

/**
 * 搜索页
 */
const LayoutSearch = props => {
  const { keyword } = props

  useEffect(() => {
    if (isBrowser) {
      replaceSearchResult({
        doms: document.getElementById('posts-wrapper'),
        search: keyword,
        target: {
          element: 'span',
          className: 'text-red-500 border-b border-dashed'
        }
      })
    }
  }, [keyword])

  return <LayoutPostList {...props} />
}

function groupArticlesByYearArray(articles) {
  const grouped = {}
  for (const article of articles) {
    const year = new Date(article.publishDate).getFullYear().toString()
    if (!grouped[year]) grouped[year] = []
    grouped[year].push(article)
  }
  for (const year in grouped) {
    grouped[year].sort((a, b) => b.publishDate - a.publishDate)
  }
  return Object.entries(grouped)
    .sort(([a], [b]) => b - a)
    .map(([year, posts]) => ({ year, posts }))
}

/**
 * 归档页
 */
const LayoutArchive = props => {
  const { posts } = props
  const sortPosts = groupArticlesByYearArray(posts)
  return (
    <div className='mb-10 pb-20 md:pb-12 min-h-screen w-full'>
      {sortPosts.map(p => (
        <BlogArchiveItem
          key={p.year}
          archiveTitle={p.year}
          archivePosts={p.posts}
        />
      ))}
    </div>
  )
}

/**
 * 文章详情
 */
const LayoutSlug = props => {
  const { post, lock, validPassword, prev, next, recommendPosts } = props

  return (
    <>
      {lock && <ArticleLock validPassword={validPassword} />}

      {!lock && post && (
        <div className='w-full'>
          <ArticleInfo post={post} />
          <WWAds orientation='horizontal' className='w-full' />
          <div id='article-wrapper'>
            {!lock && <NotionPage post={post} />}
          </div>
          {post?.type === 'Post' && (
            <>
              <ArticleAround prev={prev} next={next} />
              <RecommendPosts recommendPosts={recommendPosts} />
            </>
          )}
          <Comment frontMatter={post} />
        </div>
      )}
    </>
  )
}

/**
 * 404
 */
const Layout404 = props => {
  const { post } = props
  const router = useRouter()
  const waiting404 = siteConfig('POST_WAITING_TIME_FOR_404') * 1000

  useEffect(() => {
    if (!post) {
      const timer = setTimeout(() => {
        if (isBrowser) {
          const article = document.querySelector('#article-wrapper #notion-article')
          if (!article) {
            router.push('/404').then(() => {
              console.warn('找不到页面', router.asPath)
            })
          }
        }
      }, waiting404)
      return () => clearTimeout(timer)
    }
    return undefined
  }, [post, router, waiting404])

  return <>404 Not found.</>
}

/**
 * 分类列表
 */
const LayoutCategoryIndex = props => {
  const { categoryOptions } = props
  return (
    <div id='category-list' className='duration-200 flex flex-wrap gap-2'>
      {categoryOptions?.map(category => {
        return (
          <a key={category.name} href={`/category/${category.name}`}>
            <span className='mytheme-nav-item'>
              <i className='mr-2 fas fa-folder text-xs' />
              {category.name}({category.count})
            </span>
          </a>
        )
      })}
    </div>
  )
}

/**
 * 标签列表
 */
const LayoutTagIndex = props => {
  const { tagOptions } = props
  return (
    <div id='tags-list' className='duration-200 flex flex-wrap gap-2'>
      {tagOptions.map(tag => {
        return (
          <a key={tag.name} href={`/tag/${encodeURIComponent(tag.name)}`}>
            <span className='mytheme-nav-item text-sm'>
              <i className='mr-1 fas fa-tag text-xs' />
              {tag.name + (tag.count ? `(${tag.count})` : '')}
            </span>
          </a>
        )
      })}
    </div>
  )
}

export {
  Layout404,
  LayoutArchive,
  LayoutBase,
  LayoutCategoryIndex,
  LayoutIndex,
  LayoutPostList,
  LayoutSearch,
  LayoutSlug,
  LayoutTagIndex,
  CONFIG as THEME_CONFIG
}
