import { useGlobal } from '@/lib/global'
import { useRouter } from 'next/router'
import SmartLink from '@/components/SmartLink'
import { siteConfig } from '@/lib/config'

/**
 * 导航菜单 — 从 Notion CUSTOM_MENU 配置读取
 * 用户在 Notion 配置文档的 CUSTOM_MENU 字段中添加菜单项
 * 自动高亮当前路由对应的菜单项（浅米色背景 + 右侧箭头）
 */
export const MenuList = (props) => {
  const { locale } = useGlobal()
  const router = useRouter()
  const customMenu = siteConfig('CUSTOM_MENU')

  // 如果 Notion 配置中有 CUSTOM_MENU，用它覆盖默认菜单
  let links = []
  if (Array.isArray(customMenu) && customMenu.length > 0) {
    links = customMenu.map((item, index) => ({
      id: item.id || `menu-${index}`,
      name: item.name || item.title || item.label || '',
      href: item.href || item.url || '/',
      icon: item.icon || '',
      target: item.target || ''
    })).filter(item => item.name)
  } else {
    // CUSTOM_MENU 为空时，显示默认的首页和归档
    links = [
      { id: 'menu-home', name: locale?.NAV?.INDEX || 'Home', href: '/', icon: 'fas fa-home' },
      { id: 'menu-archive', name: locale?.NAV?.ARCHIVE || 'Archive', href: '/archive', icon: 'fas fa-archive' }
    ]
  }

  const isActive = href => {
    if (!href) return false
    if (router.asPath === href) return true
    if (href !== '/' && router.asPath.startsWith(href)) {
      const next = router.asPath.charAt(href.length)
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
          <SmartLink key={link.id} href={link.href} target={link.target || undefined}>
            <div className={`mytheme-nav-item ${active ? 'active' : ''}`}>
              <span className='flex items-center gap-2.5'>
                {link.icon && <i className={`${link.icon} text-sm w-4 text-center`} />}
                <span>{link.name}</span>
              </span>
              <span className='nav-arrow'>
                <i className='fas fa-arrow-right text-xs' />
              </span>
            </div>
          </SmartLink>
        )
      })}
    </div>
  )
}
