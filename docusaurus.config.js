import {themes as prismThemes} from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Physical AI & Humanoid Robotics',
  tagline: 'An Academic Textbook on Embodied Intelligence',
  favicon: 'img/favicon.ico', // TODO: Replace with a custom favicon

  // Set the production url of your site here
  url: 'https://tanzeelnaveed8.github.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/ai-book/',

  // GitHub pages deployment config.
  organizationName: 'tanzeelnaveed8', // Your GitHub org/user name.
  projectName: 'ai-book', // Your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
          routeBasePath: '/', // Serve the docs at the site's root
          editUrl:
            'https://github.com/your-github-username/ai-book/tree/main/',
        },
        blog: false, // Disable the blog plugin
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // TODO: Replace with your project's social card
      image: 'img/docusaurus-social-card.jpg',
      navbar: {
        title: 'Physical AI & Humanoid Robotics',
        logo: {
          alt: 'Site Logo',
          src: 'img/logo.png', // TODO: Replace with a custom logo
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'tutorialSidebar',
            position: 'left',
            label: 'Curriculum',
          },
          {to: '/modules', label: 'Modules', position: 'left'},
          {to: '/weekly-map/weeks-1-13', label: 'Weekly Map', position: 'left'},
          {to: '/hardware/setup', label: 'Hardware', position: 'left'},
          {to: '/capstone/overview', label: 'Capstone', position: 'left'},
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
              {
                label: 'Curriculum',
                to: '/',
              },
              {
                label: 'Modules',
                to: '/modules',
              },
              {
                label: 'Capstone Project',
                to: '/capstone/overview',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'ROS Discourse',
                href: 'https://discourse.ros.org/',
              },
              {
                label: 'NVIDIA Developer Forums',
                href: 'https://forums.developer.nvidia.com/',
              },
              {
                label: 'Discord',
                href: 'https://discordapp.com/invite/docusaurus', // Placeholder
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'GitHub',
                href: 'https://github.com/tanzeelnaveed8/ai-book',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} My Project, Inc. Built with Docusaurus.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
        additionalLanguages: ['bash', 'python', 'cpp', 'cmake', 'yaml'],
      },
    }),
};

export default config;

