import '../styles/globals.css';

export const metadata = {
  title: 'SocialCarding - Optimize Your Social Media Previews',
  description: 'Generate perfect social media cards. Get optimization scores and recommendations.',
  keywords: 'social media cards, open graph, twitter cards, meta tags, SEO, social media optimization',
  authors: [{ name: 'SocialCarding' }],
  creator: 'SocialCarding',
  publisher: 'SocialCarding',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://socialcarding.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'SocialCarding - Optimize Your Social Media Previews',
    description: 'Generate perfect social media cards. Get optimization scores and recommendations.',
    url: 'https://socialcarding.com',
    siteName: 'SocialCarding',
    images: [
      {
        url: '/social.png',
        width: 1200,
        height: 630,
        alt: 'SocialCarding - AI-Powered Social Media Optimization Tool',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SocialCarding - Optimize Your Social Media Previews',
    description: 'Generate perfect social media cards. Get optimization scores and recommendations.',
    images: ['/social.png'],
    creator: '@socialcarding',
    site: '@socialcarding',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Additional meta tags for better social sharing */}
        <meta name="theme-color" content="#4A90E2" />
        <meta name="msapplication-TileColor" content="#4A90E2" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="SocialCarding" />
        
        {/* Favicon and app icons */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "SocialCarding",
              "description": "Generate perfect social media cards. Get optimization scores and recommendations.",
              "url": "https://socialcarding.com",
              "applicationCategory": "BusinessApplication",
              "operatingSystem": "Web",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
              },
              "creator": {
                "@type": "Organization",
                "name": "SocialCarding"
              },
              "featureList": [
                "AI-powered social media optimization",
                "Open Graph meta tag generation",
                "Twitter Card optimization",
                "LinkedIn preview optimization",
                "Real-time social media previews",
                "SEO recommendations"
              ]
            })
          }}
        />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}