'use client'

import replaceSearchResult from '@/components/Mark'
import NotionPage from '@/components/NotionPage'
import ShareBar from '@/components/ShareBar'
import SmartLink from '@/components/SmartLink'
import { siteConfig } from '@/lib/config'
import { isBrowser } from '@/lib/utils'
import { generateLocaleDict } from '@/lib/utils/lang'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { useEffect, useRef } from 'react'
import ArchiveList from './components/ArchiveList'
import ArticleAdjacent from './components/ArticleAdjacent'
import ArticleCopyright from './components/ArticleCopyright'
import ArticleHeader from './components/ArticleHeader'
import ArticleLock from './components/ArticleLock'
import Footer from './components/Footer'
import Header from './components/Header'
import ArticleHeroCover from './components/ArticleHeroCover'
import HeroBanner from './components/HeroBanner'
import Pagination from './components/Pagination'
import PostList from './components/PostList'
import RightFloatArea from './components/RightFloatArea'
import SidePanel from './components/SidePanel'
import CONFIG from './config'
import { Style } from './style'
import { isCommentServiceConfigured } from './utils/commentEnabled'

const Comment = dynamic(() => import('@/components/Comment'), { ssr: false })

const SearchModal = dynamic(
  () => import('./components/SearchModal'),
  { ssr: false }
)
const Lenis = dynamic(() => import('@/components/Lenis'), { ssr: false })
const CursorDot = dynamic(() => import('@/components/CursorDot'), { ssr: false })
const getLocale = () => generateLocaleDict(siteConfig('LANG', 'zh-CN'))

const LayoutBase = props => {
  const { children } = props
  const locale = getLocale()
  const searchModal = useRef(null)
  const router = useRouter()
  const showHomeHero =
    !props.post &&
    (router.pathname === '/' || router.pathname === '/page/[page]') &&
    siteConfig('FUWARI_HERO_ENABLE', true, CONFIG)

  return (
    <div
      id='theme-fuwari'
      className={`${siteConfig('FONT_STYLE')} fuwari-bg min-h-screen text-[var(--fuwari-text)]`}>
      <Style />
      <Header
        locale={locale}
        customNav={props.customNav}
        customMenu={props.customMenu}
        searchModal={searchModal}
      />
      <SearchModal cRef={searchModal} posts={props.posts || props.allPosts || []} />

      {showHomeHero && <HeroBanner siteInfo={props.siteInfo} />}

      <main
        className={`max-w-6xl mx-auto px-3 md:px-4 pb-12 min-w-0 w-full ${showHomeHero ? 'fuwari-main-overlap' : ''}`}>
        <div className='grid grid-cols-1 lg:grid-cols-[280px_minmax(0,1fr)] gap-4 lg:gap-6 items-start min-w-0'>
          <div className='hidden lg:block sticky top-4'>
            <SidePanel {...props} />
          </div>
          <section className='min-w-0 w-full max-w-full'>
            {children}
            <div className='lg:hidden mt-4'>
              <SidePanel {...props} />
            </div>
          </section>
        </div>
      </main>
      <Footer />
      <RightFloatArea post={props.post} />
      {siteConfig('FUWARI_EFFECT_LENIS', false, CONFIG) && <Lenis />}
      {siteConfig('FUWARI_EFFECT_CURSOR_DOT', false, CONFIG) && <CursorDot />}
    </div>
  )
}

const LayoutIndex = props => {
  const locale = getLocale()
  const author = siteConfig('AUTHOR') || ''
  const greeting = siteConfig('FUWARI_HERO_GREETING', "👋 你好，我是", CONFIG)
  const bio = siteConfig('FUWARI_HERO_BIO', '', CONFIG)
  const contactLink = siteConfig('FUWARI_HERO_CONTACT_LINK', '/contact', CONFIG)
  const contactText = siteConfig('FUWARI_HERO_CONTACT_TEXT', '联系我', CONFIG)
  const latestPosts = (props.latestPosts || props.posts || []).slice(0, 5)

  const infoCards = [
    {
      icon: siteConfig('FUWARI_CARD_1_ICON', 'fas fa-robot', CONFIG),
      title: siteConfig('FUWARI_CARD_1_TITLE', '身份', CONFIG),
      desc: siteConfig('FUWARI_CARD_1_DESC', 'AI 效率极客', CONFIG)
    },
    {
      icon: siteConfig('FUWARI_CARD_2_ICON', 'fas fa-user', CONFIG),
      title: siteConfig('FUWARI_CARD_2_TITLE', '模式', CONFIG),
      desc: siteConfig('FUWARI_CARD_2_DESC', '一人公司', CONFIG)
    },
    {
      icon: siteConfig('FUWARI_CARD_3_ICON', 'fas fa-cogs', CONFIG),
      title: siteConfig('FUWARI_CARD_3_TITLE', '引擎', CONFIG),
      desc: siteConfig('FUWARI_CARD_3_DESC', '全栈自动化引擎', CONFIG)
    },
    {
      icon: siteConfig('FUWARI_CARD_4_ICON', 'fas fa-check-circle', CONFIG),
      title: siteConfig('FUWARI_CARD_4_TITLE', '状态', CONFIG),
      desc: siteConfig('FUWARI_CARD_4_DESC', '做更少，赚更多', CONFIG)
    }
  ]

  const formatDate = d => {
    if (!d) return ''
    const s = String(d)
    const m = s.match(/^(\d{4})[-/.](\d{1,2})[-/.](\d{1,2})/)
    return m ? `${m[1]}.${m[2].padStart(2, '0')}.${m[3].padStart(2, '0')}` : s
  }

  return (
    <section className='space-y-5'>
      {/* ====== Hero ====== */}
      <div className='fuwari-card p-6'>
        <h1 className='text-2xl font-bold text-[var(--fuwari-text)]'>
          {greeting}{author}
        </h1>
        {bio && (
          <p
            className='mt-2 text-sm leading-7 text-[var(--fuwari-muted)]'
            dangerouslySetInnerHTML={{ __html: bio }}
          />
        )}
        <a
          href={contactLink}
          className='mt-4 inline-flex items-center gap-1.5 px-5 py-2 rounded-full text-sm font-medium
            text-[var(--fuwari-primary)] border border-[var(--fuwari-primary)]
            hover:bg-[var(--fuwari-primary)] hover:text-white transition-all duration-200'>
          <i className='far fa-paper-plane' />
          {contactText}
        </a>
      </div>

      {/* ====== 四宫格 ====== */}
      <div className='grid grid-cols-2 gap-3'>
        {infoCards.map(card => (
          <div key={card.title} className='fuwari-card p-4'>
            <div className='flex items-center gap-3'>
              <i className={`${card.icon} text-lg text-[var(--fuwari-primary)] w-5 text-center`} />
              <div>
                <div className='text-[11px] uppercase tracking-wider text-[var(--fuwari-muted)]'>
                  {card.title}
                </div>
                <div className='text-sm font-medium text-[var(--fuwari-text)]'>
                  {card.desc}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ====== 最新文章 ====== */}
      <div className='fuwari-card p-5'>
        <div className='flex items-center justify-between mb-3'>
          <span className='text-xs uppercase tracking-widest text-[var(--fuwari-muted)] font-semibold'>
            LATEST
          </span>
          <a href='/archive' className='text-xs text-[var(--fuwari-primary)] hover:underline'>
            View all &rarr;
          </a>
        </div>
        <div className='grid gap-3'>
          {latestPosts.map((post, idx) => (
            <a
              key={post.id}
              href={post.href || `/${post.slug}`}
              className='flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-[var(--fuwari-border)] pb-3 gap-2 last:border-b-0 last:pb-0'>
              <span className='text-sm sm:text-base font-medium text-[var(--fuwari-text)] hover:text-[var(--fuwari-primary)] transition-colors'>
                {post.title}
              </span>
              <span className='text-sm text-[var(--fuwari-muted)]'>
                {formatDate(post.publishDay || post.date?.start_date || post.createdTime)}
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

const LayoutPostList = props => {
  const locale = getLocale()
  const { category, tag } = props
  return (
    <>
      {(category || tag) && (
        <div className='fuwari-card p-5 mb-4'>
          <p className='text-sm uppercase tracking-widest text-[var(--fuwari-muted)] mb-2'>
            {category ? (locale?.COMMON?.CATEGORY || '分类') : (locale?.COMMON?.TAGS || '标签')}
          </p>
          <div className='flex items-center gap-2'>
            <h1 className='fuwari-section-title text-2xl font-bold'>
              {category || `#${tag}`}
            </h1>
            <span className='fuwari-chip'>{category ? (locale?.COMMON?.CATEGORY || '分类') : (locale?.COMMON?.TAGS || '标签')}</span>
          </div>
        </div>
      )}
      <PostList posts={props.posts} />
      <Pagination page={props.page} postCount={props.postCount} />
    </>
  )
}

const LayoutSlug = props => {
  const locale = getLocale()
  const { post, lock, validPassword, prev, next } = props
  if (!post) return null
  const showComments =
    siteConfig('FUWARI_ARTICLE_COMMENT', true, CONFIG) && isCommentServiceConfigured()
  const articleCoverSrc =
    siteConfig('FUWARI_ARTICLE_COVER_HERO', true, CONFIG) &&
    (post.pageCover || post.pageCoverThumbnail)
  return (
    <>
      {lock ? (
        <ArticleLock validPassword={validPassword} />
      ) : (
        <article className='fuwari-card p-6 overflow-hidden'>
          {articleCoverSrc ? (
            <ArticleHeroCover coverSrc={articleCoverSrc} title={post.title} />
          ) : null}
          <ArticleHeader post={post} />
          <div id='article-wrapper' className='fuwari-prose'>
            <NotionPage post={post} />
            {siteConfig('FUWARI_ARTICLE_SHARE', true, CONFIG) && <ShareBar post={post} />}
          </div>
          <ArticleCopyright post={post} />
          <ArticleAdjacent prev={prev} next={next} />
          {showComments && (
            <section className='mt-8 pt-6 border-t border-[var(--fuwari-border)]' aria-label={locale?.COMMON?.COMMENTS || 'Comments'}>
              <h2 className='text-base font-semibold mb-4 text-[var(--fuwari-text)] flex items-center gap-2'>
                <i className='far fa-comments text-[var(--fuwari-muted)]' aria-hidden='true' />
                {locale?.COMMON?.COMMENTS || 'Comments'}
              </h2>
              <Comment frontMatter={post} className='fuwari-comment !mt-0' />
            </section>
          )}
        </article>
      )}
    </>
  )
}

const LayoutSearch = props => {
  const { keyword } = props
  const router = useRouter()

  useEffect(() => {
    if (isBrowser && keyword) {
      replaceSearchResult({
        doms: document.getElementById('posts-wrapper'),
        search: keyword,
        target: {
          element: 'span',
          className: 'text-red-500 border-b border-dashed'
        }
      })
    }
  }, [router, keyword])

  return <LayoutPostList {...props} />
}

const LayoutArchive = props => {
  const locale = getLocale()
  return (
    <>
      <div className='fuwari-card p-6 mb-4'>
        <p className='text-sm uppercase tracking-widest text-[var(--fuwari-muted)] mb-2'>
          {locale?.NAV?.ARCHIVE || '归档'}
        </p>
        <h1 className='text-3xl font-bold leading-tight'>{locale?.NAV?.ARCHIVE || '归档'}</h1>
      </div>
      <ArchiveList archivePosts={props.archivePosts || {}} />
    </>
  )
}

const Layout404 = () => {
  const locale = getLocale()
  return (
    <div className='fuwari-card p-8 text-center'>
      <h1 className='text-4xl font-bold mb-2'>404</h1>
      <p className='text-sm text-[var(--fuwari-muted)] mb-4'>
        {locale?.NAV?.['404'] || '页面不存在'}
      </p>
      <SmartLink href='/' className='fuwari-link'>{locale?.NAV?.INDEX || '首页'}</SmartLink>
    </div>
  )
}

const LayoutCategoryIndex = props => {
  const locale = getLocale()
  const { categoryOptions } = props
  return (
    <div className='fuwari-card p-5'>
      <h2 className='fuwari-section-title text-2xl font-semibold mb-4'>{locale?.COMMON?.CATEGORY || '分类'}</h2>
      <div className='flex flex-wrap gap-2'>
        {(categoryOptions || []).map(c => (
          <SmartLink
            key={c.name}
            href={`/category/${encodeURIComponent(c.name)}`}
            className='fuwari-chip'>
            {c.name} {c.count ? `(${c.count})` : ''}
          </SmartLink>
        ))}
      </div>
    </div>
  )
}

const LayoutTagIndex = props => {
  const locale = getLocale()
  const { tagOptions } = props
  return (
    <div className='fuwari-card p-5'>
      <h2 className='fuwari-section-title text-2xl font-semibold mb-4'>{locale?.COMMON?.TAGS || '标签'}</h2>
      <div className='flex flex-wrap gap-2'>
        {(tagOptions || []).map(t => (
          <SmartLink
            key={t.name}
            href={`/tag/${encodeURIComponent(t.name)}`}
            className='fuwari-chip'>
            #{t.name} {t.count ? `(${t.count})` : ''}
          </SmartLink>
        ))}
      </div>
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

