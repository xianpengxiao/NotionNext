import SmartLink from '@/components/SmartLink'
import { siteConfig } from '@/lib/config'
import CONFIG from '../config'

const formatDate = d => {
  if (!d) return ''
  const s = String(d)
  const m = s.match(/^(\d{4})[-/.](\d{1,2})[-/.](\d{1,2})/)
  return m ? `${m[1]}.${m[2].padStart(2, '0')}.${m[3].padStart(2, '0')}` : s
}

const getSummary = post => {
  const text = post?.summary || post?.textContent || ''
  return text.length > 40 ? text.slice(0, 40) + '…' : text
}

const AdjacentCard = ({ label, post }) => {
  if (!post) return <div className='fuwari-card p-4 opacity-50'>{label}</div>
  const coverSrc = post.pageCoverThumbnail || post.pageCover || ''
  const summary = getSummary(post)
  const date = formatDate(post.publishDay || post.date?.start_date || post.createdTime)
  return (
    <SmartLink href={post.href || `/${post.slug}`} className='fuwari-card p-4 block group'>
      <p className='text-xs uppercase tracking-wider text-[var(--fuwari-muted)] mb-2'>{label}</p>
      <div className='flex items-start gap-3'>
        {coverSrc && (
          <div className='w-12 h-12 shrink-0 rounded-lg overflow-hidden bg-[var(--fuwari-bg-soft)]'>
            <img src={coverSrc} alt='' className='w-full h-full object-cover' loading='lazy' />
          </div>
        )}
        <div className='min-w-0 flex-1'>
          <p className='text-sm font-medium text-[var(--fuwari-text)] group-hover:text-[var(--fuwari-primary)] transition-colors leading-6'>
            {post.title}
          </p>
          {summary && (
            <p className='text-xs text-[var(--fuwari-muted)] mt-0.5 leading-5 line-clamp-1'>
              {summary}
            </p>
          )}
        </div>
        {date && (
          <span className='text-[11px] text-[var(--fuwari-muted)] shrink-0 whitespace-nowrap'>
            {date}
          </span>
        )}
      </div>
    </SmartLink>
  )
}

const ArticleAdjacent = ({ prev, next }) => {
  if (!siteConfig('FUWARI_ARTICLE_ADJACENT', true, CONFIG)) return null
  if (!prev && !next) return null

  return (
    <section className='grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6'>
      <AdjacentCard label='Previous' post={prev} />
      <AdjacentCard label='Next' post={next} />
    </section>
  )
}

export default ArticleAdjacent

