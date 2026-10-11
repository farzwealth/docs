import type { Metadata } from 'next';
import { RootProvider } from 'fumadocs-ui/provider/next';
import './global.css';
import { Inter } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || 'https://docs.api.farz.app'
  ),
  title: {
    template: '%s | Farz Docs',
    default: 'Farz Docs — Official Documentation & Developer Guides',
  },
  description: 'Official documentation for Farz Wealth — verified API contracts, authentication, money tracking, lending, and integration availability.',
  icons: {
    icon: '/favicon.png',
    apple: '/favicon.png',
  },
  openGraph: {
    title: 'Farz Docs — Official Documentation & Developer Guides',
    description: 'Official documentation for Farz Wealth — verified API contracts, authentication, money tracking, lending, and integration availability.',
    url: 'https://docs.api.farz.app',
    siteName: 'Farz Docs',
    images: [
      {
        url: '/social.png',
        width: 1200,
        height: 630,
        alt: 'Farz Docs Preview',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Farz Docs',
    description: 'Official documentation for Farz Wealth.',
    images: ['/social.png'],
  },
};

export default function Layout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en" className={inter.className} suppressHydrationWarning>
      <body className="flex flex-col min-h-screen">
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  );
}
