import { siteConfig } from '@/lib/config'

/**
 * 社交图标 — 自动读取 blog.config.js 的 SOCIAL 配置
 * 支持 B站、YouTube、小红书、抖音、Github
 */
const SocialButton = () => {
  return (
    <div className='mytheme-social-row flex-wrap'>
      {siteConfig('CONTACT_GITHUB') && (
        <a target='_blank' rel='noreferrer' title='GitHub' href={siteConfig('CONTACT_GITHUB')}>
          <i className='fab fa-github' />
        </a>
      )}
      {siteConfig('CONTACT_BILIBILI') && (
        <a target='_blank' rel='noreferrer' title='Bilibili' href={siteConfig('CONTACT_BILIBILI')}>
          <i className='fab fa-bilibili' />
        </a>
      )}
      {siteConfig('CONTACT_YOUTUBE') && (
        <a target='_blank' rel='noreferrer' title='YouTube' href={siteConfig('CONTACT_YOUTUBE')}>
          <i className='fab fa-youtube' />
        </a>
      )}
      {siteConfig('CONTACT_XIAOHONGSHU') && (
        <a target='_blank' rel='noreferrer' title='小红书' href={siteConfig('CONTACT_XIAOHONGSHU')}>
          <i className='fab fa-xiaohongshu' />
        </a>
      )}
      {siteConfig('CONTACT_DOUYIN') && (
        <a target='_blank' rel='noreferrer' title='抖音' href={siteConfig('CONTACT_DOUYIN')}>
          <i className='fab fa-tiktok' />
        </a>
      )}
    </div>
  )
}
export default SocialButton
