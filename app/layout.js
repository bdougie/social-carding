import '../styles/globals.css';

export const metadata = {
  title: 'SocialCarding - Optimize Your Social Media Previews',
  description: 'Generate perfect social media cards. Get optimization scores and recommendations.',
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