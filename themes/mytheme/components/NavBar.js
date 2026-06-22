import { siteConfig } from '@/lib/config'
import { useGlobal } from '@/lib/global'
import LazyImage from '@/components/LazyImage'
import SmartLink from '@/components/SmartLink'
import SocialButton from './SocialButton'
import { MenuList } from './MenuList'

/**
 * 左侧侧边栏 — 数据全部来自 Notion
 *
 * 从上到下：
 * 1. 头像 + 作者名 + 简介（Notion 配置文档）
 * 2. 搜索框（Algolia 弹窗 / 无则跳转搜索页）
 * 3. 导航菜单（从 Notion CUSTOM_MENU 配置读取）
 * 4. 社交图标（从 Notion 社交链接配置读取）
 */
export default function NavBar(props) {
  const { siteInfo, locale } = useGlobal()
  const { searchModal } = props

  const avatar = siteConfig('AVATAR') || siteInfo?.icon || '/avatar.svg'
  const author = siteConfig('AUTHOR') || ''
  const bio = siteConfig('BIO') || ''

  const handleOpenSearch = () => {
    if (siteConfig('ALGOLIA_APP_ID') && searchModal?.current) {
      searchModal.current.openSearch?.()
    } else {
      window.location.href = '/search'
    }
  }

  return (
    <div className='flex flex-col h-full'>
      <div className='flex flex-col gap-6 p-6 overflow-y-auto flex-1'>

        {/* 头像 + 作者信息 */}
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

        {/* 搜索框 */}
        <div className='mytheme-search-box' onClick={handleOpenSearch} role='button' tabIndex={0}>
          <i className='fas fa-search' />
          <span>{locale?.SEARCH?.ARTICLES || 'Search'}</span>
        </div>

        {/* 导航菜单 — 从 Notion CUSTOM_MENU 读取 */}
        <nav>
          <MenuList {...props} />
        </nav>
      </div>

      {/* 社交图标（底部） */}
      <div className='mt-auto px-6 pb-6'>
        <div className='mytheme-divider mb-4' />
        <SocialButton />
      </div>
    </div>
  )
}
