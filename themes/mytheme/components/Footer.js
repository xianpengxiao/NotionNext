import { siteConfig } from '@/lib/config'

/**
 * 简洁页脚 — 仅显示版权信息
 */
const Footer = () => {
  const author = siteConfig('AUTHOR') || ''
  const since = siteConfig('SINCE') || ''
  const copyright = siteConfig('MYTHEME_FOOTER_COPYRIGHT') || `© ${since ? since + ' - ' : ''}${new Date().getFullYear()} ${author}`

  return (
    <footer className='text-center text-xs text-[var(--mytheme-text-tertiary)] py-4'>
      {copyright}
    </footer>
  )
}
export default Footer
