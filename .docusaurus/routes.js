import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/physical-ai-textbook/__docusaurus/debug',
    component: ComponentCreator('/physical-ai-textbook/__docusaurus/debug', '1b0'),
    exact: true
  },
  {
    path: '/physical-ai-textbook/__docusaurus/debug/config',
    component: ComponentCreator('/physical-ai-textbook/__docusaurus/debug/config', '4ef'),
    exact: true
  },
  {
    path: '/physical-ai-textbook/__docusaurus/debug/content',
    component: ComponentCreator('/physical-ai-textbook/__docusaurus/debug/content', '02c'),
    exact: true
  },
  {
    path: '/physical-ai-textbook/__docusaurus/debug/globalData',
    component: ComponentCreator('/physical-ai-textbook/__docusaurus/debug/globalData', '58f'),
    exact: true
  },
  {
    path: '/physical-ai-textbook/__docusaurus/debug/metadata',
    component: ComponentCreator('/physical-ai-textbook/__docusaurus/debug/metadata', '647'),
    exact: true
  },
  {
    path: '/physical-ai-textbook/__docusaurus/debug/registry',
    component: ComponentCreator('/physical-ai-textbook/__docusaurus/debug/registry', '125'),
    exact: true
  },
  {
    path: '/physical-ai-textbook/__docusaurus/debug/routes',
    component: ComponentCreator('/physical-ai-textbook/__docusaurus/debug/routes', 'aa1'),
    exact: true
  },
  {
    path: '/physical-ai-textbook/LayoutWrapper',
    component: ComponentCreator('/physical-ai-textbook/LayoutWrapper', 'bac'),
    exact: true
  },
  {
    path: '/physical-ai-textbook/',
    component: ComponentCreator('/physical-ai-textbook/', '94f'),
    exact: true
  },
  {
    path: '/physical-ai-textbook/',
    component: ComponentCreator('/physical-ai-textbook/', '90b'),
    routes: [
      {
        path: '/physical-ai-textbook/',
        component: ComponentCreator('/physical-ai-textbook/', 'e76'),
        routes: [
          {
            path: '/physical-ai-textbook/',
            component: ComponentCreator('/physical-ai-textbook/', 'dba'),
            routes: [
              {
                path: '/physical-ai-textbook/advanced-locomotion/advanced-bipedal-locomotion',
                component: ComponentCreator('/physical-ai-textbook/advanced-locomotion/advanced-bipedal-locomotion', 'bb2'),
                exact: true
              },
              {
                path: '/physical-ai-textbook/capstone/overview',
                component: ComponentCreator('/physical-ai-textbook/capstone/overview', '4e7'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/physical-ai-textbook/ethical-implications/ethical-social-implications',
                component: ComponentCreator('/physical-ai-textbook/ethical-implications/ethical-social-implications', 'f31'),
                exact: true
              },
              {
                path: '/physical-ai-textbook/future-trends/future-trends-physical-ai',
                component: ComponentCreator('/physical-ai-textbook/future-trends/future-trends-physical-ai', 'bb1'),
                exact: true
              },
              {
                path: '/physical-ai-textbook/glossary',
                component: ComponentCreator('/physical-ai-textbook/glossary', '36e'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/physical-ai-textbook/hardware/setup',
                component: ComponentCreator('/physical-ai-textbook/hardware/setup', '290'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/physical-ai-textbook/human-robot-collaboration/',
                component: ComponentCreator('/physical-ai-textbook/human-robot-collaboration/', 'a38'),
                exact: true
              },
              {
                path: '/physical-ai-textbook/introduction/chapter1',
                component: ComponentCreator('/physical-ai-textbook/introduction/chapter1', '9b5'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/physical-ai-textbook/module1/chapter2',
                component: ComponentCreator('/physical-ai-textbook/module1/chapter2', '765'),
                exact: true
              },
              {
                path: '/physical-ai-textbook/modules',
                component: ComponentCreator('/physical-ai-textbook/modules', '5c8'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/physical-ai-textbook/modules/01-ros-2',
                component: ComponentCreator('/physical-ai-textbook/modules/01-ros-2', 'a17'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/physical-ai-textbook/modules/02-digital-twin',
                component: ComponentCreator('/physical-ai-textbook/modules/02-digital-twin', '04e'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/physical-ai-textbook/modules/03-nvidia-isaac',
                component: ComponentCreator('/physical-ai-textbook/modules/03-nvidia-isaac', '8fe'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/physical-ai-textbook/modules/04-vla-systems',
                component: ComponentCreator('/physical-ai-textbook/modules/04-vla-systems', 'b55'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/physical-ai-textbook/modules/05-bipedal-locomotion',
                component: ComponentCreator('/physical-ai-textbook/modules/05-bipedal-locomotion', '5fe'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/physical-ai-textbook/modules/06-human-robot-interaction',
                component: ComponentCreator('/physical-ai-textbook/modules/06-human-robot-interaction', 'ab0'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/physical-ai-textbook/modules/07-ethics-and-society',
                component: ComponentCreator('/physical-ai-textbook/modules/07-ethics-and-society', '324'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/physical-ai-textbook/modules/08-future-trends',
                component: ComponentCreator('/physical-ai-textbook/modules/08-future-trends', '641'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/physical-ai-textbook/references',
                component: ComponentCreator('/physical-ai-textbook/references', 'f9a'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/physical-ai-textbook/weekly-map/weeks-1-13',
                component: ComponentCreator('/physical-ai-textbook/weekly-map/weeks-1-13', '209'),
                exact: true,
                sidebar: "tutorialSidebar"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    path: '*',
    component: ComponentCreator('*'),
  },
];
