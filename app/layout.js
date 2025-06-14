import '../styles/globals.css';

export const metadata = {
  title: 'SocialCarding - Optimize Your Social Media Previews',
  description: 'Generate, preview, and optimize social media cards for Twitter, Facebook, LinkedIn, Instagram, and Pinterest. AI-powered scoring and SEO recommendations.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}