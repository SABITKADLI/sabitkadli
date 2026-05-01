import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  metadataBase: new URL("https://sabitkadli.com"),
  title: {
    default: "Sabit Kadli — Business Analyst, IT Consultant & Full-Stack Developer",
    template: "%s | Sabit Kadli",
  },
  description:
    "Sabit Kadli is a Business Analyst, IT Consultant, Solution Architect, and Full-Stack Developer with 5+ years of experience in CRM development, data migration, API integration, and SaaS delivery. Based in Melbourne, Bengaluru, and Dubai.",
  keywords: [
    "Business Analyst",
    "IT Consultant",
    "Solution Architect",
    "Full-Stack Developer",
    "CRM Development",
    "Data Migration",
    "API Integration",
    "React",
    "Next.js",
    "Melbourne",
    "Bengaluru",
    "Dubai",
  ],
  authors: [{ name: "Sabit Kadli", url: "https://sabitkadli.com" }],
  creator: "Sabit Kadli",
  openGraph: {
    type: "website",
    locale: "en_AU",
    url: "https://sabitkadli.com",
    siteName: "Sabit Kadli Portfolio",
    title: "Sabit Kadli — Business Analyst, IT Consultant & Full-Stack Developer",
    description:
      "5+ years bridging business and technology: CRM systems, data migration, API integration, 3D web experiences, and automation. Melbourne · Bengaluru · Dubai.",
    images: [
      {
        url: "/assets/profile.jpg",
        width: 768,
        height: 1024,
        alt: "Sabit Kadli — Business Analyst & IT Consultant",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sabit Kadli — Business Analyst, IT Consultant & Full-Stack Developer",
    description:
      "5+ years bridging business and technology: CRM, data migration, API integration, 3D web, and automation.",
    images: ["/assets/profile.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Sabit Kadli",
  url: "https://sabitkadli.com",
  email: "jobs@sabitkadli.com",
  jobTitle: "Business Analyst, IT Consultant & Full-Stack Developer",
  description:
    "IT professional with 5+ years of experience in CRM development, data migration, system integration, API architecture, and full-stack web development.",
  alumniOf: [
    { "@type": "EducationalOrganization", name: "RMIT University" },
    { "@type": "EducationalOrganization", name: "Jain University" },
  ],
  knowsAbout: [
    "Business Analysis",
    "IT Consulting",
    "CRM Development",
    "Data Migration",
    "API Integration",
    "React",
    "Next.js",
    "Node.js",
    "TypeScript",
    "Genesys Cloud",
    "AWS",
    "Three.js",
    "SQL",
    "Salesforce",
    "Solution Architecture",
  ],
  address: [
    { "@type": "PostalAddress", addressLocality: "Melbourne", addressCountry: "AU" },
    { "@type": "PostalAddress", addressLocality: "Bengaluru", addressCountry: "IN" },
    { "@type": "PostalAddress", addressLocality: "Dubai", addressCountry: "AE" },
  ],
  sameAs: [
    "https://www.linkedin.com/in/sabit-kadli",
    "https://github.com/sabitkadli",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="dark">
      <head>
        {/* Inline SVG favicon — no external file required */}
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'><rect width='32' height='32' rx='8' fill='%230f1419'/><text x='16' y='22' font-family='system-ui,sans-serif' font-size='16' font-weight='900' fill='%234a9eff' text-anchor='middle'>SK</text></svg>"
          type="image/svg+xml"
        />

        {/* hreflang — multi-region signals for Google */}
        <link rel="alternate" hrefLang="en-au" href="https://sabitkadli.com" />
        <link rel="alternate" hrefLang="en-in" href="https://sabitkadli.com" />
        <link rel="alternate" hrefLang="en-ae" href="https://sabitkadli.com" />
        <link rel="alternate" hrefLang="en" href="https://sabitkadli.com" />
        <link rel="alternate" hrefLang="x-default" href="https://sabitkadli.com" />

        {/* JSON-LD structured data — Person schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${inter.variable} font-sans antialiased bg-background text-foreground`}
      >
        {children}
      </body>
    </html>
  );
}
