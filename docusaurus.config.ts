import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'Agentic Engineering Setup',
  tagline: 'An 8-part guide to disciplined AI-assisted software development',
  favicon: 'img/favicon.ico',

  url: 'https://odere-pro.github.io',
  baseUrl: '/sdlc-factory-guide/',

  organizationName: 'odere-pro',
  projectName: 'sdlc-factory-guide',
  trailingSlash: false,
  deploymentBranch: 'gh-pages',

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'sv', 'uk', 'es', 'de', 'fr', 'ja', 'zh-Hans', 'pt-BR', 'ko', 'hi'],
    localeConfigs: {
      en: { label: 'English', htmlLang: 'en-US' },
      sv: { label: 'Svenska', htmlLang: 'sv-SE' },
      uk: { label: 'Українська', htmlLang: 'uk-UA' },
      es: { label: 'Español', htmlLang: 'es-ES' },
      de: { label: 'Deutsch', htmlLang: 'de-DE' },
      fr: { label: 'Français', htmlLang: 'fr-FR' },
      ja: { label: '日本語', htmlLang: 'ja-JP' },
      'zh-Hans': { label: '简体中文', htmlLang: 'zh-CN' },
      'pt-BR': { label: 'Português (Brasil)', htmlLang: 'pt-BR' },
      ko: { label: '한국어', htmlLang: 'ko-KR' },
      hi: { label: 'हिन्दी', htmlLang: 'hi-IN' },
    },
  },

  future: {
    faster: {
      swcJsLoader: true,
      swcJsMinimizer: true,
      lightningCssMinimizer: true,
      mdxCrossCompilerCache: true,
    },
  },

  headTags: [
    {
      tagName: 'script',
      attributes: { type: 'application/ld+json' },
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org/',
        '@type': 'WebSite',
        name: 'Agentic Engineering Setup',
        url: 'https://odere-pro.github.io/sdlc-factory-guide/',
        description: 'An 8-part guide to disciplined AI-assisted software development',
        author: {
          '@type': 'Person',
          name: 'Oleksandr Derechei',
          url: 'https://www.linkedin.com/in/oleksander-derechei/',
          sameAs: [
            'https://github.com/odere-pro',
            'https://medium.com/@odere.pub',
            'https://www.linkedin.com/in/oleksander-derechei/',
          ],
        },
        publisher: {
          '@type': 'Person',
          name: 'Oleksandr Derechei',
        },
        inLanguage: ['en', 'sv', 'uk', 'es', 'de', 'fr', 'ja', 'zh-Hans', 'pt-BR', 'ko', 'hi'],
      }),
    },
  ],

  presets: [
    [
      'classic',
      {
        docs: {
          routeBasePath: '/',
          sidebarPath: './sidebars.ts',
          editUrl: 'https://github.com/odere-pro/sdlc-factory-guide/tree/main/',
          showLastUpdateTime: true,
          showLastUpdateAuthor: true,
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
        sitemap: {
          lastmod: 'date',
          changefreq: 'weekly',
          priority: 0.5,
          ignorePatterns: ['/tags/**'],
          filename: 'sitemap.xml',
        },
        // gtag: {
        //   trackingID: 'G-XXXXXXXXXX',
        //   anonymizeIP: true,
        // },
      } satisfies Preset.Options,
    ],
  ],

  themes: [
    [
      '@easyops-cn/docusaurus-search-local',
      {
        hashed: true,
        language: ['en'],
        indexBlog: false,
      },
    ],
  ],

  themeConfig: {
    colorMode: {
      defaultMode: 'light',
      disableSwitch: false,
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'Agentic Engineering Setup',
      logo: {
        alt: 'Agentic Engineering Setup Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          href: 'https://medium.com/@odere.pub',
          label: 'Medium',
          position: 'right',
        },
        {
          href: 'https://github.com/odere-pro/sdlc-factory-guide',
          label: 'GitHub',
          position: 'right',
        },
        {
          href: 'https://www.linkedin.com/in/oleksander-derechei/',
          label: 'LinkedIn',
          position: 'right',
        },
        {
          type: 'localeDropdown',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'light',
      links: [],
      copyright: `Copyright © ${new Date().getFullYear()} Oleksandr Derechei. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['bash', 'yaml', 'python', 'markdown'],
    },
    tableOfContents: {
      minHeadingLevel: 2,
      maxHeadingLevel: 3,
    },
    metadata: [
      { name: 'keywords', content: 'agentic engineering, AI workflow, SDLC, software development, LLM, coding agent, vibe coding' },
      { name: 'author', content: 'Oleksandr Derechei' },
      { property: 'og:type', content: 'website' },
      { property: 'og:image', content: 'https://odere-pro.github.io/sdlc-factory-guide/img/og-image.png' },
      { property: 'og:image:width', content: '1200' },
      { property: 'og:image:height', content: '630' },
      { property: 'og:image:type', content: 'image/png' },
      { property: 'og:site_name', content: 'Agentic Engineering Setup' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:image', content: 'https://odere-pro.github.io/sdlc-factory-guide/img/og-image.png' },
      { name: 'robots', content: 'index, follow' },
    ],
  } satisfies Preset.ThemeConfig,
};

export default config;
