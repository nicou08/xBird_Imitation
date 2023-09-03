import "../globals.css";

export const metadata = {
  title: "Log in to Twitter / X",
  description: "Twitter Clone",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-black h-screen">{children}</body>
    </html>
  );
}
