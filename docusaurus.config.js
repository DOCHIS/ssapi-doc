// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import { themes as prismThemes } from "prism-react-renderer";

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "SSAPI: 숲(아프리카)/치지직 후원 및 채팅 API",
  tagline: "숲(아프리카)과 치지직의 채팅/후원 데이터를 손쉽게 활용하는 방법",
  favicon: "img/favicon.ico",

  // Set the production url of your site here
  url: "https://ssapi.kr",
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: "/",

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "Dochis", // Usually your GitHub org/user name.
  projectName: "SSAPI", // Usually your repo name.

  onBrokenLinks: "warn",

  markdown: {
    hooks: {
      onBrokenMarkdownLinks: "warn",
    },
  },

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "ko-KR",
    locales: ["ko-KR"],
  },

  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: "./sidebars.js",
          docItemComponent: "@theme/ApiItem",
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl: "https://github.com/DOCHIS/ssapi-doc/tree/main/",
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ["rss", "atom"],
            xslt: true,
          },
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl: "https://github.com/DOCHIS/ssapi-doc/tree/main/",
          // Useful options to enforce blogging best practices
          onInlineTags: "warn",
          onInlineAuthors: "warn",
          onUntruncatedBlogPosts: "warn",
        },
        sitemap: {
          lastmod: "date",
          changefreq: "weekly",
          priority: 0.5,
          ignorePatterns: ["/tags/**"],
          filename: "sitemap.xml",
          createSitemapItems: async (params) => {
            const { defaultCreateSitemapItems, ...rest } = params;
            const items = await defaultCreateSitemapItems(rest);
            return items.filter((item) => !item.url.includes("/page/"));
          },
        },
        theme: {
          customCss: "./src/css/custom.css",
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: "img/docusaurus-social-card.jpg",
      navbar: {
        title: "SSAPI",
        logo: {
          alt: "SSAPI Logo",
          src: "img/logo.svg",
        },
        items: [
          {
            type: "docSidebar",
            sidebarId: "documentSidebar",
            position: "left",
            label: "문서",
          },
          { to: "/blog", label: "블로그", position: "left" },
          { to: "/docs/projects", label: "포트폴리오", position: "left" },
          {
            label: "관리자 대시보드",
            href: "http://dashboard.ssapi.kr/",
            position: "right",
            className: "navbar-dashboard-link",
          },
        ],
      },
      footer: {
        style: "dark",
        links: [
          {
            title: "Docs",
            items: [
              {
                label: "소개",
                to: "/docs/intro",
              },
              {
                label: "함께하는 프로젝트",
                to: "/docs/projects",
              },
              {
                label: "이용 정책",
                to: "/docs/additional-info/policy",
              },
            ],
          },
          {
            title: "Community",
            items: [
              {
                label: "디스코드",
                href: "https://discord.gg/cNVpzCkEvM",
              },
              {
                label: "블로그",
                to: "/blog",
              },
              {
                label: "문의하기",
                to: "/docs/contact",
              },
            ],
          },
          {
            title: "More",
            items: [
              {
                label: "개발자 방송국",
                href: "https://ch.sooplive.co.kr/sack2022",
              },
              {
                label: "개발자 깃허브",
                href: "https://github.com/DOCHIS",
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} SSAPI, Inc. Built with Docusaurus.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),

  plugins: [
    "docusaurus-plugin-sass",
    [
      "docusaurus-plugin-openapi-docs",
      {
        id: "rest-api",
        docsPluginId: "classic",
        config: {
          ssapi: {
            specPath: "schemas/rest-api.yaml",
            outputDir: "docs/rest-api",
            sidebarOptions: {
              groupPathsBy: "tag",
            },
            showSchemas: false,
          },
        },
      },
    ],
    [
      "@docusaurus/plugin-client-redirects",
      {
        redirects: [
          // 문서 구조 재정비 (2025-10-28) - 9fb6702 커밋
          {
            from: "/docs/intro/api",
            to: "/docs/additional-info/api",
          },
          {
            from: "/docs/additional/policy/data-retention",
            to: "/docs/additional-info/data-retention",
          },
          {
            from: "/docs/intro/policy",
            to: "/docs/additional-info/policy",
          },
          {
            from: "/docs/intro/why-use",
            to: "/docs/additional-info/why-use",
          },
          {
            from: "/docs/contact/index",
            to: "/docs/contact",
          },
          {
            from: "/docs/intro/projects",
            to: "/docs/projects",
          },
          // 삭제된 페이지 리다렉션
          {
            from: "/docs/additional/policy/socket-limit",
            to: "/docs/additional-info/policy",
          },
          {
            from: "/docs/contact/application",
            to: "/docs/contact",
          },
        ],
      },
    ],
  ],

  themes: ["docusaurus-theme-openapi-docs"],
};

export default config;
