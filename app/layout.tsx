import './globals.css';

export const metadata = {
  title: "Vincent Boilerplate",
  description: "Minimal Next.js + Vincent setup",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

