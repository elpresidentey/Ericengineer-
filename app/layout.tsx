import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Eric Ohiol Engineering - Premium Electrical & Solar Solutions",
  description: "Professional electrical engineering, solar installations, CCTV security, and facility management services across Nigeria. Over 30 years of trusted expertise.",
  keywords: "electrical engineering, solar installation, inverter systems, CCTV security, fire alarm, automation, facility management, Lagos, Nigeria",
  openGraph: {
    title: "Eric Ohiol Engineering - Premium Electrical & Solar Solutions",
    description: "Professional electrical engineering and solar solutions with over 30 years of experience",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
