const CONFIG = {
  // 自定义首页 Notion Page ID（用于 Home.js 动态渲染内容）
  MYTHEME_HOMEPAGE_ID: process.env.NEXT_PUBLIC_MYTHEME_HOMEPAGE_ID || '',

  // 首页 LATEST 区域显示最新文章数量
  MYTHEME_LATEST_POST_COUNT: process.env.NEXT_PUBLIC_MYTHEME_LATEST_POST_COUNT
    ? Number(process.env.NEXT_PUBLIC_MYTHEME_LATEST_POST_COUNT)
    : 4,

  // 文章列表标题
  MYTHEME_BLOG_TITLE: process.env.NEXT_PUBLIC_MYTHEME_BLOG_TITLE || '文章',
  MYTHEME_BLOG_DESC: process.env.NEXT_PUBLIC_MYTHEME_BLOG_DESC || '记录与分享',

  // 侧边栏搜索
  MYTHEME_SEARCH_PLACEHOLDER: process.env.NEXT_PUBLIC_MYTHEME_SEARCH_PLACEHOLDER || '搜索文章…',

  // 文章推荐（兼容 claude 组件）
  CLAUDE_ARTICLE_RECOMMEND_POSTS: process.env.NEXT_PUBLIC_CLAUDE_ARTICLE_RECOMMEND_POSTS || true,
}
export default CONFIG
