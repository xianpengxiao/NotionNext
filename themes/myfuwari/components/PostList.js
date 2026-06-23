import SmartLink from '@/components/SmartLink'

const formatDate = d => {
  if (!d) return ''
  const s = String(d)
  const m = s.match(/^(\d{4})[-/.](\d{1,2})[-/.](\d{1,2})/)
  return m ? `${m[1]}.${m[2].padStart(2, '0')}.${m[3].padStart(2, '0')}` : s
}

const PostList = ({ posts = [] }) => {
  return (
    <div className='fuwari-card p-5'>
      <div className='grid gap-3'>
        {posts.map(post => (
          <a
            key={post.id}
            href={post.href || `/${post.slug}`}
            className='flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-[var(--fuwari-border)] pb-3 gap-2 last:border-b-0 last:pb-0'>
            <span className='text-base sm:text-lg font-medium text-[var(--fuwari-text)] hover:text-[var(--fuwari-primary)] transition-colors'>
              {post.title}
            </span>
            <span className='text-sm text-[var(--fuwari-muted)]'>
              {formatDate(post.publishDay || post.date?.start_date || post.createdTime)}
            </span>
          </a>
        ))}
      </div>
    </div>
  )
}

export default PostList
