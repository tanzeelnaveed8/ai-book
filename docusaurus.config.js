import { themes as prismThemes } from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Physical AI & Humanoid Robotics',
  tagline: 'An Academic Textbook on Embodied Intelligence',
  favicon: 'img/favicon.ico',

  url: 'https://tanzeelnaveed8.github.io',
  baseUrl: '/ai-book/',

  organizationName: 'tanzeelnaveed8',
  projectName: 'ai-book',

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          routeBasePath: '/',
          editUrl:
            'https://github.com/tanzeelnaveed8/ai-book/tree/main/',
        },
        blog: false,
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],

  stylesheets: [
    {
      href: '/ai-book/chat-widget.css',
      type: 'text/css',
    },
  ],

  scripts: [
    {
      src: '/ai-book/chat-widget.js',
      async: true,
    },
  ],

  themeConfig: {
    image: 'img/docusaurus-social-card.jpg',
    navbar: {
      title: 'Physical AI & Humanoid Robotics',
      logo: {
        alt: 'Site Logo',
        src: 'img/logo.png',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Curriculum',
        },
        { to: '/modules', label: 'Modules', position: 'left' },
        { to: '/weekly-map/weeks-1-13', label: 'Weekly Map', position: 'left' },
        { to: '/hardware/setup', label: 'Hardware', position: 'left' },
        { to: '/capstone/overview', label: 'Capstone', position: 'left' },
        {
          href: 'https://github.com/tanzeelnaveed8/ai-book',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Learning',
          items: [
            { label: 'Curriculum', to: '/' },
            { label: 'Modules', to: '/modules' },
            { label: 'Capstone Project', to: '/capstone/overview' },
          ],
        },
        {
          title: 'Community',
          items: [
            { label: 'ROS Discourse', href: 'https://discourse.ros.org/' },
            { label: 'NVIDIA Developer Forums', href: 'https://forums.developer.nvidia.com/' },
            { label: 'Discord', href: 'https://discordapp.com/invite/docusaurus' },
          ],
        },
        {
          title: 'More',
          items: [
            { label: 'GitHub', href: 'https://github.com/tanzeelnaveed8/ai-book' },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} My Project, Inc.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['bash', 'python', 'cpp', 'cmake', 'yaml'],
    },
  },
};

export default config;
