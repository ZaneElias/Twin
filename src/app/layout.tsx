import type { Metadata } from "next";
import "./globals.css";
import ClientBody from "./ClientBody";

export const metadata: Metadata = {
  title: "Hackathon Twin - AI Event Orchestration Platform",
  description: "AI agents that run your global hackathon from start to finish while growing your community to 100,000+ members. Automate outreach, jury management, content creation, and community growth.",
  keywords: "AI agents, hackathon automation, event orchestration, community growth, multi-agent system, OpenAI, LangChain",
  authors: [{ name: "Hack-Nation Team" }],
  openGraph: {
    title: "Hackathon Twin - AI Event Orchestration Platform",
    description: "AI agents that run your global hackathon from start to finish while growing your community to 100,000+ members.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ClientBody>{children}</ClientBody>
    </html>
  );
}

