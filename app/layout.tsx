import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "NDEP — Portfolio",
  description:
    "Software Engineer | B.Tech CSE (Core) @ VIT Vellore | Web Infrastructure, Edge Computing, Algorithms",
  openGraph: {
    title: "Nagula Dheeraj Eshwar Prudhvi | Software Engineer",
    description: "Software Engineer | B.Tech CSE (Core) @ VIT Vellore | Web Infrastructure, Edge Computing, Algorithms",
    url: "https://dheerajeshwar32.github.io/Portfolio", // Update this with your actual domain when deployed
    siteName: "NDEP Portfolio",
    images: [
      {
        url: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&q=80", // You can replace this with a real screenshot of your site
        width: 1200,
        height: 630,
        alt: "NDEP Portfolio Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nagula Dheeraj Eshwar Prudhvi | Software Engineer",
    description: "Software Engineer | B.Tech CSE (Core) @ VIT Vellore | Web Infrastructure, Edge Computing, Algorithms",
    images: ["https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&q=80"],
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