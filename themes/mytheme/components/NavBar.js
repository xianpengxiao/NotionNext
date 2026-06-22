import { siteConfig } from '@/lib/config'
import { useGlobal } from '@/lib/global'
import LazyImage from '@/components/LazyImage'
import SmartLink from '@/components/SmartLink'
import SocialButton from './SocialButton'
import { MenuList } from './MenuList'
import CONFIG from '../config'

/**
 * 侧边栏 — 固定定位（桌面端），顶部布局（移动端）
 * 从上到下：头像、作者名、简介、搜索框、导航菜单(首页+文章)、社交图标
 */
export default function NavBar(props) {
  const { siteInfo } = useGlobal()
  const { searchModal } = props

  // 从全局配置动态读取头像、作者名、简介
  const avatar = siteConfig('AVATAR') || siteInfo?.icon || '/avatar.svg'
  const author = siteConfig('AUTHOR') || 'Author'
  const bio = siteConfig('BIO') || ''
  const searchPlaceholder = siteConfig('MYTHEME_SEARCH_PLACEHOLDER', CONFIG)

  // 点击搜索框打开全局搜索弹窗
  const handleOpenSearch = () => {
    if (searchModal?.current) {
      searchModal.current.openSearch?.()
    }
  }

  return (
    <div className='flex flex-col h-full'>
      {/* 侧边栏内边距容器 */}
      <div className='flex flex-col gap-6 p-6'>

        {/* 头像 + 作者信息 */}
        <div className='flex flex-col items-center text-center gap-3'>
          <div className='mytheme-avatar-wrap'>
            <LazyImage
              src={avatar}
              alt={author}
              width={80}
              height={80}
              priority
            />
          </div>
          <div>
            <div className='mytheme-author-name'>{author}</div>
            {bio && <div className='mytheme-bio'>{bio}</div>}
          </div>
        </div>

        {/* 全局搜索框 */}
        <div className='mytheme-search-box' onClick={handleOpenSearch} role='button' tabIndex={0}>
          <i className='fas fa-search' />
          <span>{searchPlaceholder || '搜索文章…'}</span>
        </div>

        {/* 导航菜单 — 仅首页 & 文章 */}
        <nav>
          <MenuList {...props} />
        </nav>
      </div>

      {/* 社交图标 — 固定在底部 */}
      <div className='mt-auto px-6 pb-6'>
        <div className='mytheme-divider mb-4' />
        <SocialButton />
      </div>
    </div>
  )
}
