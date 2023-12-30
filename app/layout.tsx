import "@radix-ui/themes/styles.css";
import "./theme-config.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Container, Theme } from "@radix-ui/themes";
import "./globals.css";
import Navbar from "./Navbar";
import AuthProvider from "./auth/Provider";
import QueryClientProvider from "./QueryClientProvider";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Sameer Issue Tracker App",
  description:
    "This is an application to track user issues. Created using Next js, Prisma, Radix",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <QueryClientProvider>
        <AuthProvider>
          <body>
            <Theme accentColor="violet">
              <Navbar />
              <main className="p-5">
                <Container>{children}</Container>
              </main>
            </Theme>
          </body>
        </AuthProvider>
      </QueryClientProvider>
    </html>
  );
}
