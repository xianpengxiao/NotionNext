import { useGlobal } from '@/lib/global'
import { useRouter } from 'next/router'
import SmartLink from '@/components/SmartLink'
import { siteConfig } from '@/lib/config'

/**
 * 导航菜单 — 仅首页 + 文章两项
 * 菜单配置从 CUSTOM_MENU 读取，自动匹配当前路由高亮
 * 激活项：浅米色背景 + 右侧箭头指示
 */
export const MenuList = () => {
  const { locale } = useGlobal()
  const router = useRouter()
  const asPath = router.asPath

  // 从 CUSTOM_MENU 读取菜单配置，如果没有则使用默认
  const customMenu = siteConfig('CUSTOM_MENU')
  let links = []

  if (Array.isArray(customMenu) && customMenu.length > 0) {
    // 从 CUSTOM_MENU 读取菜单
    links = customMenu.map((item, index) => ({
      id: item.id || `menu-${index}`,
      name: item.name || item.title || '',
      href: item.href || item.url || '/',
      icon: item.icon || ''
    })).filter(item => item.name)
  } else {
    // 默认两项：首页、文章
    links = [
      {
        id: 'menu-home',
        name: locale?.NAV?.HOME || '首页',
        href: '/',
        icon: 'fas fa-home'
      },
      {
        id: 'menu-archive',
        name: locale?.NAV?.ARCHIVE || '文章',
        href: '/archive',
        icon: 'fas fa-archive'
      }
    ]
  }

  // 判断当前路由是否匹配菜单项
  const isActive = href => {
    if (!href) return false
    if (asPath === href) return true
    if (href !== '/' && asPath.startsWith(href)) {
      const next = asPath.charAt(href.length)
      return next === '' || next === '/' || next === '?'
    }
    return false
  }

  if (!links.length) return null

  return (
    <div className='flex flex-col gap-1'>
      {links.map(link => {
        const active = isActive(link.href)
        return (
          <SmartLink key={link.id} href={link.href}>
            <div className={`mytheme-nav-item ${active ? 'active' : ''}`}>
              <span className='flex items-center gap-2'>
                {link.icon && <i className={`${link.icon} text-sm`} />}
                <span>{link.name}</span>
              </span>
              <span className='nav-arrow'>
                <i className='fas fa-arrow-right' />
              </span>
            </div>
          </SmartLink>
        )
      })}
    </div>
  )
}
