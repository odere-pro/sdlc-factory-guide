import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  docs: [
    'intro',
    'checklist',
    {
      type: 'category',
      label: 'The Guide',
      collapsed: false,
      items: [
        'rule-file',
        'context-engineering',
        'verification',
        'running-the-work',
        'review-and-ship',
        'controlling-cost',
        'production-agents',
        'team-standard',
      ],
    },
  ],
};

export default sidebars;
