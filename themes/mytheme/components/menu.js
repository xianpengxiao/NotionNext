import { siteConfig } from '@/lib/config'

/**
 * 从 customNav（Page 类型页）和 customMenu（CUSTOM_MENU 配置）生成菜单链接
 *
 * 优先级：
 * 1. CUSTOM_MENU 开启且有 customMenu 数据 → 使用 customMenu
 * 2. 有 customNav → 合并默认菜单 + customNav
 * 3. 兜底：首页 + 文章归档
 */
export function getMythemeMenuLinks({ locale, customNav, customMenu }) {
  // 默认菜单项（仅当没有 CUSTOM_MENU 时作为基础）
  const defaults = [
    { icon: 'fas fa-home', name: locale?.NAV?.INDEX || '首页', href: '/' },
    { icon: 'fas fa-archive', name: locale?.NAV?.ARCHIVE || '归档', href: '/archive' }
  ]

  let links = [...defaults]

  // 有 customNav 时追加 Page 类型页
  if (Array.isArray(customNav) && customNav.length > 0) {
    links = links.concat(customNav)
  }

  // CUSTOM_MENU 开启且有数据时完全覆盖
  if (siteConfig('CUSTOM_MENU') && Array.isArray(customMenu) && customMenu.length > 0) {
    links = customMenu
  }

  // 标准化：确保每个菜单项有 id、name、href、icon
  return links
    .filter(item => item && item.show !== false)
    .map((item, index) => {
      const subMenus = (item.subMenus || item.children || [])
        .filter(sub => sub && sub.show !== false)
        .map((sub, si) => ({
          id: sub.id || `sub-${index}-${si}`,
          name: sub.name || sub.title || sub.label || '',
          href: sub.href || sub.url || sub.slug || '',
          target: sub.target || '',
          icon: sub.icon || ''
        }))
        .filter(sub => sub.name && sub.href)

      return {
        id: item.id || `menu-${index}`,
        name: item.name || item.title || item.label || '',
        href: item.href || item.url || item.slug || '',
        target: item.target || '',
        icon: item.icon || '',
        subMenus
      }
    })
    .filter(item => item.name && (item.href || item.subMenus.length > 0))
}
