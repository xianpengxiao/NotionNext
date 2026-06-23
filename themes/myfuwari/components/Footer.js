import SmartLink from '@/components/SmartLink'
import { siteConfig } from '@/lib/config'

const Footer = () => {
  const author = siteConfig('AUTHOR') || 'SheepX'

  return (
    <footer className='fuwari-footer py-4'>
      <div className='max-w-6xl mx-auto px-4 flex items-center justify-between'>
        <nav className='flex items-center gap-4'>
          <SmartLink href='/' className='text-sm text-[var(--fuwari-muted)] hover:text-[var(--fuwari-primary)] transition-colors'>
            首页
          </SmartLink>
          <SmartLink href='/about' className='text-sm text-[var(--fuwari-muted)] hover:text-[var(--fuwari-primary)] transition-colors'>
            关于我
          </SmartLink>
          <SmartLink href='/contact' className='text-sm text-[var(--fuwari-muted)] hover:text-[var(--fuwari-primary)] transition-colors'>
            联系我
          </SmartLink>
        </nav>
        <div className='text-sm text-[var(--fuwari-muted)]'>
          &copy; 2026 {author}
        </div>
      </div>
    </footer>
  )
}

export default Footer

