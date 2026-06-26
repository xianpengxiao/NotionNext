const formatDate = d => {
  if (!d) return ''
  const s = String(d)
  const m = s.match(/^(\d{4})[-/.](\d{1,2})[-/.](\d{1,2})/)
  return m ? `${m[1]}.${m[2].padStart(2, '0')}.${m[3].padStart(2, '0')}` : s
}

/** 提取标题中的 E 编号，用于排序 */
const extractENumber = title => {
  const m = String(title || '').match(/E(\d+)/)
  return m ? parseInt(m[1], 10) : -1
}

/** 获取文章发布时间戳 */
const getPostTime = post => {
  const d = post.publishDay || post.date?.start_date || post.createdTime
  return d ? new Date(d).getTime() : 0
}

/** 排序：按 E 编号降序 → 按发布时间降序 */
const sortPosts = posts => {
  return [...posts].sort((a, b) => {
    const ea = extractENumber(a.title)
    const eb = extractENumber(b.title)
    if (ea !== -1 && eb !== -1) return eb - ea
    if (ea !== -1) return -1
    if (eb !== -1) return 1
    return getPostTime(b) - getPostTime(a)
  })
}

/** 截取前40字摘要 */
const getSummary = post => {
  const text = post.summary || post.textContent || ''
  return text.length > 40 ? text.slice(0, 40) + '…' : text
}

const PostItem = ({ post }) => {
  const coverSrc = post.pageCoverThumbnail || post.pageCover || ''
  const summary = getSummary(post)
  const date = formatDate(post.publishDay || post.date?.start_date || post.createdTime)

  return (
    <a
      href={post.href || `/${post.slug}`}
      className='flex items-start gap-3 py-3 border-b border-[var(--fuwari-border)] last:border-b-0 group transition-colors'>
      {coverSrc && (
        <div className='w-14 h-14 shrink-0 rounded-lg overflow-hidden bg-[var(--fuwari-bg-soft)]'>
          <img src={coverSrc} alt='' className='w-full h-full object-cover' loading='lazy' />
        </div>
      )}
      <div className='min-w-0 flex-1'>
        <div className='text-sm sm:text-base font-medium text-[var(--fuwari-text)] group-hover:text-[var(--fuwari-primary)] transition-colors leading-6'>
          {post.title}
        </div>
        {summary && (
          <div className='text-xs text-[var(--fuwari-muted)] mt-0.5 leading-5 line-clamp-1'>
            {summary}
          </div>
        )}
      </div>
      {date && (
        <span className='text-[11px] text-[var(--fuwari-muted)] shrink-0 mt-0.5 whitespace-nowrap'>
          {date}
        </span>
      )}
    </a>
  )
}

const PostList = ({ posts = [] }) => {
  const sorted = sortPosts(posts)
  return (
    <div className='fuwari-card p-5'>
      <div className='divide-y divide-[var(--fuwari-border)] -mt-3'>
        {sorted.map(post => (
          <PostItem key={post.id} post={post} />
        ))}
      </div>
    </div>
  )
}

export default PostList
