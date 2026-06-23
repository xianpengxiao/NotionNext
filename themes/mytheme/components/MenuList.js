import { useGlobal } from '@/lib/global'
import { useRouter } from 'next/router'
import { useState } from 'react'
import SmartLink from '@/components/SmartLink'
import { getMythemeMenuLinks } from './menu'

/**
 * 导航菜单 — 从 Notion 内容动态加载
 *
 * 数据源（按优先级）：
 * 1. Notion 配置文档的 CUSTOM_MENU（Menu/SubMenu 类型页）
 * 2. Notion 中 type=Page 的页面（customNav）
 * 3. 兜底：首页 + 归档
 *
 * 支持：图标（FontAwesome）、二级菜单展开折叠、外链、路由高亮
 */
export const MenuList = ({ customNav, customMenu }) => {
  const { locale } = useGlobal()
  const router = useRouter()
  const [openSubId, setOpenSubId] = useState(null)

  const links = getMythemeMenuLinks({ locale, customNav, customMenu })

  // 判断路由匹配
  const isActive = href => {
    if (!href) return false
    if (router.asPath === href) return true
    if (href !== '/' && router.asPath.startsWith(href)) {
      const next = router.asPath.charAt(href.length)
      return next === '' || next === '/' || next === '?'
    }
    return false
  }

  // 渲染图标
  const renderIcon = icon => {
    if (!icon) return null
    const str = String(icon).trim()
    if (!str) return null
    // FontAwesome 图标
    if (/^(fa[srldb]?\s|fa-)/.test(str)) {
      return <i className={`${str} text-sm w-4 text-center`} aria-hidden='true' />
    }
    // emoji 或其他文本图标
    return <span className='text-sm w-4 text-center'>{str}</span>
  }

  // 单个菜单项
  const renderLeaf = link => {
    const active = isActive(link.href)
    return (
      <SmartLink key={link.id} href={link.href} target={link.target || undefined}>
        <div className={`mytheme-nav-item ${active ? 'active' : ''}`}>
          <span className='flex items-center gap-2.5'>
            {renderIcon(link.icon)}
            <span>{link.name}</span>
          </span>
          <span className='nav-arrow'>
            <i className='fas fa-arrow-right text-xs' />
          </span>
        </div>
      </SmartLink>
    )
  }

  // 带二级菜单的组
  const renderGroup = link => {
    const hasSub = link.subMenus?.length > 0
    const isOpen = openSubId === link.id

    // 无子菜单且本身有链接 → 渲染为普通项
    if (!hasSub && link.href) {
      return renderLeaf(link)
    }

    const childActive = link.subMenus?.some(s => isActive(s.href))
    return (
      <div key={link.id}>
        <div
          className={`mytheme-nav-item ${childActive ? 'active' : ''}`}
          role='button'
          tabIndex={0}
          onClick={() => setOpenSubId(prev => (prev === link.id ? null : link.id))}
          onKeyDown={e => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault()
              setOpenSubId(prev => (prev === link.id ? null : link.id))
            }
          }}>
          <span className='flex items-center gap-2.5'>
            {renderIcon(link.icon)}
            <span>{link.name}</span>
          </span>
          <span className={`text-xs text-[var(--mytheme-text-muted)] transition-transform ${isOpen ? 'rotate-180' : ''}`}>
            <i className='fas fa-angle-down' />
          </span>
        </div>
        {isOpen && (
          <div className='ml-4 pl-3 border-l border-[var(--mytheme-border)] mt-0.5 flex flex-col gap-0.5'>
            {link.subMenus.map(sub => (
              <SmartLink key={sub.id} href={sub.href} target={sub.target || undefined}>
                <div className={`mytheme-nav-item ${isActive(sub.href) ? 'active' : ''}`}>
                  <span className='flex items-center gap-2.5'>
                    {renderIcon(sub.icon)}
                    <span>{sub.name}</span>
                  </span>
                  <span className='nav-arrow'>
                    <i className='fas fa-arrow-right text-xs' />
                  </span>
                </div>
              </SmartLink>
            ))}
          </div>
        )}
      </div>
    )
  }

  if (!links.length) return null

  return (
    <div className='flex flex-col gap-1'>
      {links.map((link, index) =>
        link.subMenus?.length > 0
          ? renderGroup({ ...link, id: link.id || `menu-${index}` })
          : renderLeaf({ ...link, id: link.id || `menu-${index}` })
      )}
    </div>
  )
}
