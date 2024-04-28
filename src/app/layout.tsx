import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { ClerkProvider } from '@clerk/nextjs'
import { fonts } from '@/styles/fonts'
import { sharedMetadata } from '@/config/metadata'

import "@/styles/globals.css";
import { Toaster } from "@/components/ui/sonner";
import ExitModal from "@/components/modals/exit-modal";
import HeartsModal from "@/components/modals/hearts-modal";
import PracticeModal from "@/components/modals/practice-modal";

export const metadata: Metadata = {
  ...sharedMetadata,
  title: {
    template: '%s | Rocket App',
    default: 'Rocket App - Unlock a new language.',
  },
  description:
    'Master a new language with the Rocket app - the fun and easy way to speak like a local!',
  keywords: ['Duolingo', 'Language', 'Learn Languages'],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
    <html lang="en" suppressHydrationWarning>
      <body className={`${fonts} flex min-h-screen flex-col font-sans`}>
        <ThemeProvider attribute="class" defaultTheme="dark" disableTransitionOnChange>
          <Toaster/>
          <ExitModal/>
          <HeartsModal/>
          <PracticeModal/>
          {children}
        </ThemeProvider>
      </body>
    </html>
    </ClerkProvider>
  );
}
