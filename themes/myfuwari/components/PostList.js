import SmartLink from '@/components/SmartLink'

const PostList = ({ posts = [] }) => {
  return (
    <div id='posts-wrapper' className='divide-y divide-[var(--fuwari-border)]'>
      {posts.map(post => (
        <article key={post.id} className='py-3'>
          <SmartLink
            href={post.href || `/${post.slug}`}
            className='block text-sm leading-7 text-[var(--fuwari-text)] hover:text-[var(--fuwari-primary)] transition-colors'>
            {post.title}
          </SmartLink>
        </article>
      ))}
    </div>
  )
}

export default PostList
