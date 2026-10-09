import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import Image from 'next/image';
import { appName, gitConfig } from './shared';

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: (
        <div className="flex items-center gap-2.5 font-bold tracking-tight">
          <Image
            src="/logo.svg"
            alt="Farz Logo"
            width={26}
            height={26}
            className="rounded-md"
            priority
          />
          <span>{appName}</span>
        </div>
      ),
    },
    links: [
      {
        text: 'Documentation',
        url: '/docs',
        active: 'nested-url',
      },
      {
        text: 'Farz App',
        url: 'https://farz.app',
        external: true,
      },
    ],
    githubUrl: `https://github.com/${gitConfig.user}/${gitConfig.repo}`,
  };
}
