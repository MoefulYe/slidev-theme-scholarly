import { defineConfig } from 'vitepress'
import { withSidebar } from 'vitepress-sidebar';

// https://vitepress.dev/reference/site-config


const vitePressOptions = {
  title: "Slidev Theme Scholarly",
  description: "A Slidev Theme for professional academic presentations",

  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    socialLinks: [
      { icon: 'github', link: 'https://github.com/jxpeng98/slidev-theme-scholarly' }
    ],
    outline: {
      label: 'On this page',
      level: [1, 6],
    },
  },

  locales: {
    root: {
      label: 'English',
      lang: 'en',
      link: '/en/',
      themeConfig: {
        nav: [
          { text: 'Home', link: '/en/' },
          {
            text: 'Guide',
            items: [
              { text: 'Quick Start', link: '/en/guide/quick-start' },
              { text: 'Features', link: '/en/guide/features' },
              { text: 'Configurations', link: '/en/guide/configurations' }
            ]
          },
          {
            text: 'Layouts',
            items: [
              { text: 'Basic Layouts', link: '/en/layouts/basic' },
              { text: 'Advanced Layouts (v2.0)', link: '/en/layouts/advanced' }
            ]
          },
          {
            text: 'Components',
            items: [
              { text: 'Overview', link: '/en/components/' },
              { text: 'Theorem', link: '/en/components/theorem' },
              { text: 'Block', link: '/en/components/block' },
              { text: 'Steps', link: '/en/components/steps' },
              { text: 'Keywords', link: '/en/components/keywords' },
              { text: 'Columns', link: '/en/components/columns' },
              { text: 'Highlight', link: '/en/components/highlight' },
              { text: 'Cite', link: '/en/components/cite' }
            ]
          },
          { text: 'Syntax Sugar', link: '/en/syntax-sugar' },
          { text: 'Examples', link: '/en/examples' }
        ],
      }
    },
    zh: {
      label: '简体中文',
      lang: 'zh',
      link: '/zh/',
      themeConfig: {
        nav: [
          { text: '首页', link: '/zh/' },
          {
            text: '指南',
            items: [
              { text: '快速开始', link: '/zh/guide/quick-start' },
              { text: '主要功能', link: '/zh/guide/features' },
              { text: '配置', link: '/zh/guide/configurations' }
            ]
          },
          {
            text: '布局',
            items: [
              { text: '基础布局', link: '/zh/layouts/basic' },
              { text: '高级布局 (v2.0)', link: '/zh/layouts/advanced' }
            ]
          },
          {
            text: '组件',
            items: [
              { text: '概览', link: '/zh/components/' },
              { text: '定理', link: '/zh/components/theorem' },
              { text: 'Block', link: '/zh/components/block' },
              { text: 'Steps', link: '/zh/components/steps' },
              { text: 'Keywords', link: '/zh/components/keywords' },
              { text: 'Columns', link: '/zh/components/columns' },
              { text: 'Highlight', link: '/zh/components/highlight' },
              { text: 'Cite', link: '/zh/components/cite' }
            ]
          },
          { text: '语法糖', link: '/zh/syntax-sugar' },
          { text: '示例', link: '/zh/examples' }
        ],
      }
    }
  }
}

const commonSidebarOptions = {
  documentRootPath: '/',
  useTitleFromFrontmatter: true,
  frontmatterTitleFieldName: 'title',
  collapsed: true,
  removePrefixAfterOrdering: true,
  prefixSeparator: '-',
  hyphenToSpace: true,
  useFolderTitleFromIndexFile: true,
  useFolderLinkFromIndexFile: true,
  sortMenusByName: false,
};

const vitePressSidebarOptions = [
  {
    ...commonSidebarOptions,
    scanStartPath: '/en',
    basePath: '/',
    resolvePath: '/en/'
  },
  {
    ...commonSidebarOptions,
    scanStartPath: '/zh',
    basePath: '/',
    resolvePath: '/zh/',
  }
];

export default defineConfig(withSidebar(vitePressOptions, vitePressSidebarOptions));