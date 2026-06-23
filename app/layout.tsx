import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://mantakamahir.github.io"),
  title: {
    default: "Mantaka Mahir | AI Engineer",
    template: "%s | Mantaka Mahir",
  },
  description: "Goal-driven AI Engineer building RAG systems, AI agents, multimodal tools, and production automation workflows.",
  keywords: [
    "Mantaka Mahir",
    "AI Engineer",
    "RAG",
    "AI agents",
    "automation",
    "Next.js",
    "Flutter",
    "machine learning",
    "portfolio",
  ],
  authors: [{ name: "Mantaka Mahir" }],
  creator: "Mantaka Mahir",
  publisher: "Mantaka Mahir",
  alternates: { canonical: "/" },
  openGraph: {
    type: "profile",
    url: "/",
    siteName: "Mantaka Mahir",
    title: "Mantaka Mahir | AI Engineer",
    description: "Goal-driven AI Engineer building RAG systems, AI agents, multimodal tools, and production automation workflows.",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "Mantaka Mahir portfolio preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mantaka Mahir | AI Engineer",
    description: "Goal-driven AI Engineer building RAG systems, AI agents, multimodal tools, and production automation workflows.",
    images: ["/og-image.svg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="google-site-verification" content="_587wDEK1bQ47ZaK5OaXrSOQhp5zOqEZAlUfnEwSiL4" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Mantaka Mahir",
              url: "https://mantakamahir.github.io/",
              jobTitle: "AI Engineer",
              image: "https://github.com/MantakaMahir.png",
              sameAs: [
                "https://github.com/MantakaMahir",
                "https://www.linkedin.com/in/mantakamahir/",
                "https://n8n.io/creators/mantakamahir",
              ],
              knowsAbout: [
                "AI engineering",
                "RAG systems",
                "AI agents",
                "automation",
                "Next.js",
                "Flutter",
                "FastAPI",
              ],
            }),
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  if (!theme || theme === 'dark') {
                    document.documentElement.setAttribute('data-theme', 'dark');
                  }
                } catch(e) {}
              })();
            `,
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
