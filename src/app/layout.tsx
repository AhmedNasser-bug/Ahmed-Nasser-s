import type { Metadata } from "next";
import { Inter, IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import Script from "next/script";
import "./blueprint.css";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const ibmPlexSans = IBM_Plex_Sans({
  variable: "--font-ibm-plex-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ahmed Naser | Technical Consultant & Full-Stack Architect",
  description: "Ahmed Naser - Full-Stack & AI Engineer. Slashing timelines and eliminating technical debt via deep systems-level knowledge and bleeding-edge AI orchestration.",
  metadataBase: new URL("https://ahmednasser-dev.netlify.app"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${ibmPlexSans.variable} ${ibmPlexMono.variable}`}
    >
      <head>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-9ndCyUaIbzAi2FUVXJi0CjmCapSmO7SnpJef0486qhLnuZ2cdeRhO02iuK6FUUVM" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
      </head>
      <body>
        <a href="#main-content" className="skip-to-content position-absolute visually-hidden-focusable p-3 bg-primary text-white" style={{ zIndex: 1050 }}>
          Skip to main content
        </a>
        {children}
        <Script src="https://unpkg.com/@studio-freight/lenis@1.0.42/dist/lenis.min.js" integrity="sha384-li4UtcFCH6QeUqR4JyV58/VgTprMuz9aauj+oWtew7V4Y7ZVjnvz5px9Y3UCG0Ea" crossOrigin="anonymous" strategy="lazyOnload" />
        <Script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js" integrity="sha384-geWF76RCwLtnZ8qwWowPQNguL3RmwHVBC9FhGdlKrxdiJJigb/j/68SIy3Te4Bkz" crossOrigin="anonymous" strategy="lazyOnload" />
        <Script src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/js/all.min.js" integrity="sha512-yFjZbTYRCJodnuyGlsKamNE/LlEaEAxSUDe5+u61mV8zzqJVFOH7TnULE2/PP/l5vKWpUNnF4VGVkXh3MjgLsg==" crossOrigin="anonymous" referrerPolicy="no-referrer" strategy="lazyOnload" />
      </body>
    </html>
  );
}
