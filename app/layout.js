import '../styles/globals.css';

export const metadata = {
  title: 'Social Card App',
  description: 'Social card generator',
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
