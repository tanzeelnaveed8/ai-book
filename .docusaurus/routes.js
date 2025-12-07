import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/ai-book/__docusaurus/debug',
    component: ComponentCreator('/ai-book/__docusaurus/debug', 'cb7'),
    exact: true
  },
  {
    path: '/ai-book/__docusaurus/debug/config',
    component: ComponentCreator('/ai-book/__docusaurus/debug/config', '993'),
    exact: true
  },
  {
    path: '/ai-book/__docusaurus/debug/content',
    component: ComponentCreator('/ai-book/__docusaurus/debug/content', 'be0'),
    exact: true
  },
  {
    path: '/ai-book/__docusaurus/debug/globalData',
    component: ComponentCreator('/ai-book/__docusaurus/debug/globalData', '83d'),
    exact: true
  },
  {
    path: '/ai-book/__docusaurus/debug/metadata',
    component: ComponentCreator('/ai-book/__docusaurus/debug/metadata', '8b3'),
    exact: true
  },
  {
    path: '/ai-book/__docusaurus/debug/registry',
    component: ComponentCreator('/ai-book/__docusaurus/debug/registry', '438'),
    exact: true
  },
  {
    path: '/ai-book/__docusaurus/debug/routes',
    component: ComponentCreator('/ai-book/__docusaurus/debug/routes', '9ba'),
    exact: true
  },
  {
    path: '/ai-book/docs',
    component: ComponentCreator('/ai-book/docs', 'b98'),
    routes: [
      {
        path: '/ai-book/docs',
        component: ComponentCreator('/ai-book/docs', 'd17'),
        routes: [
          {
            path: '/ai-book/docs',
            component: ComponentCreator('/ai-book/docs', 'f39'),
            routes: [
              {
                path: '/ai-book/docs/introduction/chapter1',
                component: ComponentCreator('/ai-book/docs/introduction/chapter1', 'ffd'),
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
