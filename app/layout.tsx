import type { Metadata } from "next";
import { Newsreader, DM_Sans, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import { ProgressBar } from "@/components/base";
import "./globals.css";

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500"],
});

const siteUrl = "https://jerrysoer.github.io/seed2-explainer";

export const metadata: Metadata = {
  title: "Seed2.0 — ByteDance's Frontier LLM at 1/10th the Cost | Interactive Explainer",
  description:
    "Explore how ByteDance's Seed2.0 matches GPT-5.2, Claude Opus, and Gemini-3-Pro at a fraction of the cost. Interactive benchmarks, pricing calculators, and capability breakdowns for AI leaders.",
  keywords: [
    "Seed2.0",
    "ByteDance",
    "LLM",
    "AI model comparison",
    "GPT-5.2 alternative",
    "Claude Opus comparison",
    "frontier model",
    "AI pricing",
    "Doubao",
    "interactive explainer",
  ],
  authors: [{ name: "jerrysoer" }],
  creator: "jerrysoer",
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "article",
    locale: "en_US",
    url: siteUrl,
    title: "Seed2.0 — ByteDance's Frontier LLM at 1/10th the Cost",
    description:
      "Interactive explainer: how Seed2.0 matches the best AI models at a fraction of the cost — and already powers hundreds of millions of daily users.",
    siteName: "Seed2.0 Explainer",
    images: [
      {
        url: "/generated/og-image.png",
        width: 1200,
        height: 630,
        alt: "Seed2.0 — ByteDance's Frontier LLM Interactive Explainer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Seed2.0 — ByteDance's Frontier LLM at 1/10th the Cost",
    description:
      "Interactive explainer: benchmarks, pricing, and capabilities of ByteDance's new frontier model family.",
    images: ["/generated/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Seed2.0 Interactive Explainer",
      description:
        "Interactive explainer showing how ByteDance's Seed2.0 LLM family competes with frontier models at a fraction of the cost.",
      url: siteUrl,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
      author: {
        "@type": "Person",
        name: "jerrysoer",
      },
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "What is Seed2.0?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Seed2.0 is ByteDance's frontier large language model family, comprising Pro, Lite, and Mini tiers. It competes with GPT-5.2, Claude Opus, and Gemini-3-Pro across reasoning, code, math, and multimodal tasks at roughly 1/10th the cost.",
          },
        },
        {
          "@type": "Question",
          name: "How does Seed2.0 compare to GPT-5.2 and Claude Opus?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Seed2.0 Pro achieves benchmark parity or superiority across key metrics: 94.2 on AIME 2025, 3020 Codeforces Elo, 76.5 on SWE-Bench Verified, and Gold Medals at IMO 2025 and CMO 2025. Its input pricing is $0.47/M tokens vs GPT-5.2's $1.75 and Claude Opus's $5.00.",
          },
        },
        {
          "@type": "Question",
          name: "How much does Seed2.0 cost compared to other frontier models?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Seed2.0 Pro costs $0.47/M input tokens and $2.57/M output tokens. Compared to GPT-5.2 ($1.75/$14.00) and Claude Opus 4.5 ($5.00/$25.00), Seed2.0 offers roughly 4-10x cost savings at comparable performance.",
          },
        },
        {
          "@type": "Question",
          name: "Is Seed2.0 used in production?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. Seed2.0 powers Doubao, ByteDance's AI assistant with hundreds of millions of daily active users, making it one of the most battle-tested frontier models in production.",
          },
        },
      ],
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('seed2-explainer-theme');
                  if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                    document.documentElement.setAttribute('data-theme', 'dark');
                  }
                } catch(e) {}
              })();
            `,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Script defer src="https://cloud.umami.is/script.js" data-website-id="2ae605db-85da-46d9-ad96-b28d1cb93ec2" />
      </head>
      <body
        suppressHydrationWarning
        className={`${newsreader.variable} ${dmSans.variable} ${jetbrainsMono.variable} antialiased`}
      >
        <ProgressBar />
        {children}
        {/* Scrolly engagement tracking — privacy-friendly: no cookies, no PII */}
        <Script
          src="https://scrolly.to/t.js"
          data-explainer="5b9b7eb5-6080-4376-9f01-c3438017596a"
          data-name="Seed2.0 by ByteDance"
          data-url="https://jerrysoer.github.io/seed2-explainer"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
