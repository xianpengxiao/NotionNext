/* eslint-disable react/no-unknown-property */
/**
 * 奶油极简风格 — 浅米色柔和配色、大圆角、极淡阴影
 */
const Style = () => {
  return (
    <style jsx global>{`
      /* ========================================
       * CSS VARIABLES — 奶油配色
       * ======================================== */
      :root {
        --mytheme-bg: #FDFBF7;
        --mytheme-bg-secondary: #F5F0EB;
        --mytheme-bg-card: #FFFFFF;
        --mytheme-sidebar-bg: #FAF7F2;
        --mytheme-text-primary: #3D352C;
        --mytheme-text-secondary: #8B7E74;
        --mytheme-text-tertiary: #B8ADA2;
        --mytheme-text-muted: #C9BFB5;
        --mytheme-accent: #C9A87C;
        --mytheme-accent-hover: #B8956A;
        --mytheme-border: #EDE6DC;
        --mytheme-border-light: #F2ECE4;
        --mytheme-shadow: 0 2px 16px rgba(180, 160, 140, 0.08);
        --mytheme-shadow-hover: 0 4px 24px rgba(180, 160, 140, 0.12);
        --mytheme-sidebar-width: 300px;
      }

      .dark,
      html[data-theme='dark'] {
        --mytheme-bg: #1C1A17;
        --mytheme-bg-secondary: #24221E;
        --mytheme-bg-card: #2A2723;
        --mytheme-sidebar-bg: #201E1A;
        --mytheme-text-primary: #E6DDD4;
        --mytheme-text-secondary: #A69B8E;
        --mytheme-text-tertiary: #7D7266;
        --mytheme-text-muted: #5F554A;
        --mytheme-accent: #C9A87C;
        --mytheme-accent-hover: #D4B892;
        --mytheme-border: #38332C;
        --mytheme-border-light: #2D2923;
        --mytheme-shadow: 0 2px 16px rgba(0, 0, 0, 0.3);
        --mytheme-shadow-hover: 0 4px 24px rgba(0, 0, 0, 0.4);
      }

      /* ========================================
       * GLOBAL BASE
       * ======================================== */
      html {
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
      }
      body {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Hiragino Sans GB',
          'Microsoft YaHei', 'Helvetica Neue', Helvetica, Arial, sans-serif;
        background-color: var(--mytheme-bg);
        color: var(--mytheme-text-primary);
        font-size: 0.9375rem;
        line-height: 1.7;
      }
      a {
        color: inherit;
        text-decoration: none;
        transition: color 0.2s ease;
      }
      a:hover {
        color: var(--mytheme-accent);
      }
      ::selection {
        background: rgba(201, 168, 124, 0.25);
      }

      /* ========================================
       * THEME CONTAINER
       * ======================================== */
      #theme-mytheme {
        background-color: var(--mytheme-bg);
        color: var(--mytheme-text-primary);
      }

      /* ========================================
       * LEFT SIDEBAR — fixed 固定定位
       * ======================================== */
      .mytheme-sidebar {
        position: fixed;
        top: 0;
        left: 0;
        width: var(--mytheme-sidebar-width);
        height: 100vh;
        background-color: var(--mytheme-sidebar-bg);
        border-right: 1px solid var(--mytheme-border);
        overflow-y: auto;
        overflow-x: hidden;
        z-index: 40;
      }
      .mytheme-sidebar::-webkit-scrollbar {
        width: 4px;
      }
      .mytheme-sidebar::-webkit-scrollbar-thumb {
        background: var(--mytheme-text-muted);
        border-radius: 99px;
      }

      /* 主内容偏移，留出侧边栏宽度 */
      #theme-mytheme .mytheme-main {
        margin-left: var(--mytheme-sidebar-width);
        min-height: 100vh;
      }

      /* ========================================
       * SIDEBAR MODULES
       * ======================================== */
      .mytheme-avatar-wrap {
        width: 80px;
        height: 80px;
        border-radius: 9999px;
        overflow: hidden;
        border: 3px solid var(--mytheme-border);
        flex-shrink: 0;
      }
      .mytheme-avatar-wrap img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      .mytheme-author-name {
        font-size: 1.125rem;
        font-weight: 600;
        color: var(--mytheme-text-primary);
        line-height: 1.4;
      }
      .mytheme-bio {
        font-size: 0.8125rem;
        color: var(--mytheme-text-secondary);
        line-height: 1.5;
        margin-top: 2px;
      }

      /* 搜索框 */
      .mytheme-search-box {
        width: 100%;
        display: flex;
        align-items: center;
        background: var(--mytheme-bg);
        border: 1px solid var(--mytheme-border);
        border-radius: 9999px;
        padding: 0.5rem 1rem;
        transition: border-color 0.2s ease, box-shadow 0.2s ease;
        cursor: pointer;
      }
      .mytheme-search-box:hover,
      .mytheme-search-box:focus-within {
        border-color: var(--mytheme-accent);
        box-shadow: 0 0 0 2px rgba(201, 168, 124, 0.12);
      }
      .mytheme-search-box i {
        color: var(--mytheme-text-tertiary);
        font-size: 0.8125rem;
        margin-right: 0.5rem;
      }
      .mytheme-search-box span {
        font-size: 0.8125rem;
        color: var(--mytheme-text-tertiary);
        line-height: 1;
      }

      /* 导航菜单 */
      .mytheme-nav-item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0.625rem 1rem;
        border-radius: 9999px;
        font-size: 0.875rem;
        color: var(--mytheme-text-secondary);
        transition: all 0.2s ease;
        cursor: pointer;
      }
      .mytheme-nav-item:hover {
        background: var(--mytheme-bg);
        color: var(--mytheme-text-primary);
      }
      .mytheme-nav-item.active {
        background: rgba(201, 168, 124, 0.12);
        color: var(--mytheme-accent);
        font-weight: 500;
      }
      .mytheme-nav-item .nav-arrow {
        font-size: 0.75rem;
        opacity: 0;
        transition: opacity 0.2s ease;
      }
      .mytheme-nav-item.active .nav-arrow {
        opacity: 1;
      }

      /* 社交图标行 */
      .mytheme-social-row {
        display: flex;
        align-items: center;
        gap: 0.75rem;
      }
      .mytheme-social-row a {
        color: var(--mytheme-text-tertiary);
        font-size: 1rem;
        transition: color 0.2s ease, transform 0.2s ease;
        display: inline-flex;
      }
      .mytheme-social-row a:hover {
        color: var(--mytheme-accent);
        transform: scale(1.12);
      }

      /* ========================================
       * SECTION DIVIDER
       * ======================================== */
      .mytheme-divider {
        height: 1px;
        background: var(--mytheme-border-light);
        margin: 0;
      }

      /* ========================================
       * HOME PAGE — Welcome Hero
       * ======================================== */
      .mytheme-hero {
        padding: 3rem 0 2rem;
      }
      .mytheme-hero h1 {
        font-size: 2rem;
        font-weight: 700;
        color: var(--mytheme-text-primary);
        line-height: 1.3;
        letter-spacing: -0.02em;
        margin: 0 0 0.75rem;
      }
      .mytheme-hero p {
        font-size: 0.95rem;
        color: var(--mytheme-text-secondary);
        line-height: 1.7;
        margin: 0 0 1.5rem;
        max-width: 520px;
      }

      /* ========================================
       * CARDS — 2x2 信息卡片网格
       * ======================================== */
      .mytheme-card-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 1rem;
        margin: 2rem 0;
      }
      .mytheme-card {
        background: var(--mytheme-bg-card);
        border: 1px solid var(--mytheme-border);
        border-radius: 1rem;
        padding: 1.25rem;
        box-shadow: var(--mytheme-shadow);
        transition: box-shadow 0.2s ease, transform 0.2s ease;
      }
      .mytheme-card:hover {
        box-shadow: var(--mytheme-shadow-hover);
        transform: translateY(-1px);
      }
      .mytheme-card-icon {
        font-size: 1.5rem;
        margin-bottom: 0.5rem;
        line-height: 1;
      }
      .mytheme-card-title {
        font-size: 0.9375rem;
        font-weight: 600;
        color: var(--mytheme-text-primary);
        margin: 0 0 0.25rem;
      }
      .mytheme-card-desc {
        font-size: 0.8125rem;
        color: var(--mytheme-text-secondary);
        line-height: 1.5;
        margin: 0;
      }

      /* ========================================
       * LATEST POSTS SECTION
       * ======================================== */
      .mytheme-section-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 1rem;
      }
      .mytheme-section-title {
        font-size: 1.125rem;
        font-weight: 600;
        color: var(--mytheme-text-primary);
        margin: 0;
      }
      .mytheme-view-all {
        font-size: 0.8125rem;
        color: var(--mytheme-accent);
        transition: color 0.2s ease;
        white-space: nowrap;
      }
      .mytheme-view-all:hover {
        color: var(--mytheme-accent-hover);
      }

      .mytheme-post-item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0.75rem 0;
        border-bottom: 1px solid var(--mytheme-border-light);
        transition: color 0.2s ease;
      }
      .mytheme-post-item:last-child {
        border-bottom: none;
      }
      .mytheme-post-item:hover {
        color: var(--mytheme-accent);
      }
      .mytheme-post-item .post-title {
        font-size: 0.875rem;
        font-weight: 500;
        line-height: 1.4;
        flex: 1;
        min-width: 0;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .mytheme-post-item .post-date {
        font-size: 0.75rem;
        color: var(--mytheme-text-tertiary);
        flex-shrink: 0;
        margin: 0 0.75rem;
      }
      .mytheme-post-item .post-arrow {
        font-size: 0.75rem;
        color: var(--mytheme-text-muted);
        flex-shrink: 0;
        opacity: 0;
        transition: opacity 0.2s ease;
      }
      .mytheme-post-item:hover .post-arrow {
        opacity: 1;
      }

      /* ========================================
       * BLOG LIST — 按年份分组
       * ======================================== */
      .mytheme-year-header {
        font-size: 2.5rem;
        font-weight: 700;
        color: var(--mytheme-text-muted);
        letter-spacing: -0.03em;
        margin: 2rem 0 0.5rem;
        line-height: 1.1;
      }
      .mytheme-year-header:first-of-type {
        margin-top: 0;
      }

      .mytheme-blog-item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0.875rem 0;
        border-bottom: 1px solid var(--mytheme-border-light);
        transition: color 0.2s ease;
      }
      .mytheme-blog-item:last-of-type {
        border-bottom: none;
      }
      .mytheme-blog-item:hover {
        color: var(--mytheme-accent);
      }
      .mytheme-blog-item .blog-title {
        font-size: 0.9375rem;
        font-weight: 500;
        line-height: 1.4;
        flex: 1;
        min-width: 0;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .mytheme-blog-item .blog-date {
        font-size: 0.8125rem;
        color: var(--mytheme-text-tertiary);
        flex-shrink: 0;
        margin: 0 1rem;
      }
      .mytheme-blog-item .blog-arrow {
        font-size: 0.75rem;
        color: var(--mytheme-text-muted);
        flex-shrink: 0;
        opacity: 0;
        transition: opacity 0.2s ease;
      }
      .mytheme-blog-item:hover .blog-arrow {
        opacity: 1;
      }

      /* ========================================
       * BUTTON
       * ======================================== */
      .mytheme-btn {
        display: inline-flex;
        align-items: center;
        gap: 0.375rem;
        padding: 0.625rem 1.25rem;
        border-radius: 9999px;
        font-size: 0.875rem;
        font-weight: 500;
        transition: all 0.2s ease;
        cursor: pointer;
        border: none;
      }
      .mytheme-btn-primary {
        background: var(--mytheme-accent);
        color: #fff;
      }
      .mytheme-btn-primary:hover {
        background: var(--mytheme-accent-hover);
        color: #fff;
      }

      /* ========================================
       * RESPONSIVE — 移动端
       * ======================================== */
      @media (max-width: 767px) {
        .mytheme-sidebar {
          position: relative;
          width: 100%;
          height: auto;
          border-right: none;
          border-bottom: 1px solid var(--mytheme-border);
        }
        #theme-mytheme .mytheme-main {
          margin-left: 0;
        }
        .mytheme-card-grid {
          grid-template-columns: 1fr;
        }
        .mytheme-hero h1 {
          font-size: 1.625rem;
        }
        .mytheme-year-header {
          font-size: 1.75rem;
        }
      }
      @media (min-width: 768px) and (max-width: 1023px) {
        :root {
          --mytheme-sidebar-width: 260px;
        }
      }
    `}</style>
  )
}
export { Style }
