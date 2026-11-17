import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "@fontsource-variable/inter";
import "@fontsource-variable/jetbrains-mono";
import "./globals.css";
import { profile } from "@/content/profile";
import { UiProvider } from "@/components/app/UiProvider";
import { themeInitScript } from "@/components/app/theme";

const title = `${profile.name} | ${profile.title} & Engineer`;

export const metadata: Metadata = {
  metadataBase: new URL(profile.siteUrl),
  title: { default: title, template: `%s | ${profile.name}` },
  description: profile.description,
  authors: [{ name: profile.name, url: profile.siteUrl }],
  creator: profile.name,
  keywords: [profile.name, "COO", "Coastal Marketing Group", "software engineer", "operations", "Next.js", "Kotlin"],
  alternates: { canonical: "/" },
  openGraph: {
    type: "profile",
    url: "/",
    siteName: profile.name,
    title,
    description: profile.description,
    locale: "en_US",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: `${profile.name}: ${profile.title}` }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: profile.description,
    images: ["/og.png"],
  },
  robots: { index: true, follow: true },
  verification: { google: profile.googleSiteVerification },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fafaf9" },
    { media: "(prefers-color-scheme: dark)", color: "#09090b" },
  ],
  width: "device-width",
  initialScale: 1,
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  url: profile.siteUrl,
  image: `${profile.siteUrl}/images/avatar.webp`,
  jobTitle: profile.title,
  worksFor: { "@type": "Organization", name: profile.company, url: profile.companyUrl },
  alumniOf: [
    { "@type": "CollegeOrUniversity", name: "University of Nevada, Las Vegas" },
    { "@type": "CollegeOrUniversity", name: "California State University, Fullerton" },
  ],
  sameAs: [profile.links.github, profile.links.linkedin],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }} />
      </head>
      <body className="min-h-dvh">
        <UiProvider>{children}</UiProvider>

        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${profile.analyticsId}`}
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${profile.analyticsId}');`}
        </Script>
      </body>
    </html>
  );
}
