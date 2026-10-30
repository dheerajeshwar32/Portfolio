import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { inter } from "@/lib/fonts";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://ndep-portfolio.vercel.app"),
  title: "NDEP — Portfolio",
  description:
    "Software Engineer | B.Tech CSE (Core) @ VIT Vellore | Web Infrastructure, Edge Computing, Algorithms",
  openGraph: {
    title: "Nagula Dheeraj Eshwar Prudhvi | Software Engineer",
    description: "Software Engineer | B.Tech CSE (Core) @ VIT Vellore | Web Infrastructure, Edge Computing, Algorithms",
    url: "https://ndep-portfolio.vercel.app/",
    siteName: "NDEP Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nagula Dheeraj Eshwar Prudhvi | Software Engineer",
    description: "Software Engineer | B.Tech CSE (Core) @ VIT Vellore | Web Infrastructure, Edge Computing, Algorithms",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}