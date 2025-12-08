/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  // By default, Docusaurus generates a sidebar from the docs folder structure
  tutorialSidebar: [
    {
      type: 'category',
      label: 'Course Introduction',
      items: ['introduction/chapter1'],
    },
    {
      type: 'category',
      label: 'Modules',
      link: {
        type: 'generated-index',
        title: 'Course Modules',
        description: 'Deep dive into the core concepts of Physical AI and Humanoid Robotics.',
        slug: '/modules',
      },
      items: [
        'modules/01-ros-2',
        'modules/02-digital-twin',
        'modules/03-nvidia-isaac',
        'modules/04-vla-systems',
        'modules/05-bipedal-locomotion',
        'modules/06-human-robot-interaction',
        'modules/07-ethics-and-society',
        'modules/08-future-trends',
      ],
    },
    {
      type: 'category',
      label: 'Weekly Learning Map',
      items: ['weekly-map/weeks-1-13'],
    },
    {
      type: 'category',
      label: 'Hardware & Infrastructure',
      items: ['hardware/setup'],
    },
    {
      type: 'category',
      label: 'Capstone Project',
      items: ['capstone/overview'],
    },
    'glossary',
    'references',
  ],
};

export default sidebars;

