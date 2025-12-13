import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/ai-book/__docusaurus/debug',
    component: ComponentCreator('/ai-book/__docusaurus/debug', 'c7e'),
    exact: true
  },
  {
    path: '/ai-book/__docusaurus/debug/config',
    component: ComponentCreator('/ai-book/__docusaurus/debug/config', 'ba6'),
    exact: true
  },
  {
    path: '/ai-book/__docusaurus/debug/content',
    component: ComponentCreator('/ai-book/__docusaurus/debug/content', '6fa'),
    exact: true
  },
  {
    path: '/ai-book/__docusaurus/debug/globalData',
    component: ComponentCreator('/ai-book/__docusaurus/debug/globalData', '2a2'),
    exact: true
  },
  {
    path: '/ai-book/__docusaurus/debug/metadata',
    component: ComponentCreator('/ai-book/__docusaurus/debug/metadata', '8ba'),
    exact: true
  },
  {
    path: '/ai-book/__docusaurus/debug/registry',
    component: ComponentCreator('/ai-book/__docusaurus/debug/registry', '099'),
    exact: true
  },
  {
    path: '/ai-book/__docusaurus/debug/routes',
    component: ComponentCreator('/ai-book/__docusaurus/debug/routes', 'd85'),
    exact: true
  },
  {
    path: '/ai-book/LayoutWrapper',
    component: ComponentCreator('/ai-book/LayoutWrapper', '6a4'),
    exact: true
  },
  {
    path: '/ai-book/',
    component: ComponentCreator('/ai-book/', 'a94'),
    exact: true
  },
  {
    path: '/ai-book/',
    component: ComponentCreator('/ai-book/', '782'),
    routes: [
      {
        path: '/ai-book/',
        component: ComponentCreator('/ai-book/', 'e1b'),
        routes: [
          {
            path: '/ai-book/',
            component: ComponentCreator('/ai-book/', '4ed'),
            routes: [
              {
                path: '/ai-book/advanced-locomotion/advanced-bipedal-locomotion',
                component: ComponentCreator('/ai-book/advanced-locomotion/advanced-bipedal-locomotion', '585'),
                exact: true
              },
              {
                path: '/ai-book/capstone/overview',
                component: ComponentCreator('/ai-book/capstone/overview', 'c0a'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/ai-book/ethical-implications/ethical-social-implications',
                component: ComponentCreator('/ai-book/ethical-implications/ethical-social-implications', '6af'),
                exact: true
              },
              {
                path: '/ai-book/future-trends/future-trends-physical-ai',
                component: ComponentCreator('/ai-book/future-trends/future-trends-physical-ai', 'd70'),
                exact: true
              },
              {
                path: '/ai-book/glossary',
                component: ComponentCreator('/ai-book/glossary', 'f2e'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/ai-book/hardware/setup',
                component: ComponentCreator('/ai-book/hardware/setup', '772'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/ai-book/human-robot-collaboration/',
                component: ComponentCreator('/ai-book/human-robot-collaboration/', 'dbc'),
                exact: true
              },
              {
                path: '/ai-book/introduction/chapter1',
                component: ComponentCreator('/ai-book/introduction/chapter1', '713'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/ai-book/module1/chapter2',
                component: ComponentCreator('/ai-book/module1/chapter2', '3be'),
                exact: true
              },
              {
                path: '/ai-book/modules',
                component: ComponentCreator('/ai-book/modules', 'a71'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/ai-book/modules/01-ros-2',
                component: ComponentCreator('/ai-book/modules/01-ros-2', '2c2'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/ai-book/modules/02-digital-twin',
                component: ComponentCreator('/ai-book/modules/02-digital-twin', '5ca'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/ai-book/modules/03-nvidia-isaac',
                component: ComponentCreator('/ai-book/modules/03-nvidia-isaac', '4d6'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/ai-book/modules/04-vla-systems',
                component: ComponentCreator('/ai-book/modules/04-vla-systems', '960'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/ai-book/modules/05-bipedal-locomotion',
                component: ComponentCreator('/ai-book/modules/05-bipedal-locomotion', 'd3a'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/ai-book/modules/06-human-robot-interaction',
                component: ComponentCreator('/ai-book/modules/06-human-robot-interaction', '0db'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/ai-book/modules/07-ethics-and-society',
                component: ComponentCreator('/ai-book/modules/07-ethics-and-society', '118'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/ai-book/modules/08-future-trends',
                component: ComponentCreator('/ai-book/modules/08-future-trends', '685'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/ai-book/references',
                component: ComponentCreator('/ai-book/references', 'a37'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/ai-book/weekly-map/weeks-1-13',
                component: ComponentCreator('/ai-book/weekly-map/weeks-1-13', '26c'),
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
