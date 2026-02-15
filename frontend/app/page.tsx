"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Users, BarChart3, Bot } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <header className="px-6 h-16 flex items-center justify-between border-b border-white/10 glass sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold">Q</div>
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-cyan-400">
            Qilin CRM
          </span>
        </div>
        <nav className="flex gap-4">
          <Link href="/auth/login">
            <Button variant="ghost">Sign In</Button>
          </Link>
          <Link href="/auth/register">
            <Button variant="premium">Get Started</Button>
          </Link>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center text-center px-4 pt-20 pb-32 relative overflow-hidden">

        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-indigo-500/20 blur-[120px] rounded-full pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 max-w-4xl"
        >
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60">
            The Ultimate CRM for <br /> Educational Consultants.
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Scale your admission consultancy with AI-powered insights, multi-tenant architecture, and role-based operational command.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/register">
              <Button size="lg" variant="premium" className="gap-2">
                Start Free Trial <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link href="/demo">
              <Button size="lg" variant="outline">
                View Demo
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* Dashboard Preview Mockup */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="mt-16 w-full max-w-5xl rounded-xl border border-white/10 bg-black/50 shadow-2xl overflow-hidden glass-dark"
        >
          <div className="p-4 border-b border-white/10 flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500/50" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
            <div className="w-3 h-3 rounded-full bg-green-500/50" />
          </div>
          <div className="p-8 aspect-video flex items-center justify-center text-muted-foreground">
            {/* Generate Image Placeholder or Actual Dashboard Screenshot later */}
            <div className="text-center">
              <BarChart3 className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <p>Execute Command Center Dashboard</p>
            </div>
          </div>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-32 max-w-6xl w-full text-left">
          <FeatureCard
            icon={<Users className="w-6 h-6 text-indigo-400" />}
            title="Multi-Tenant Architecture"
            description="Enterprise-grade isolation for managing multiple organizations or branches securely."
          />
          <FeatureCard
            icon={<Bot className="w-6 h-6 text-purple-400" />}
            title="AI Copilot Integration"
            description="Smart lead summarization, follow-up drafting, and RAG-powered insights."
          />
          <FeatureCard
            icon={<Shield className="w-6 h-6 text-cyan-400" />}
            title="Role-Based Security"
            description="Granular permissions for Super Admins, Team Leaders, Counsellors, and Associates."
          />
        </div>
      </main>

      {/* Footer */}
      <footer className="py-8 border-t border-white/10 text-center text-sm text-muted-foreground glass">
        © 2026 Qilin CRM. Enterprise Edition.
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="p-6 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors">
      <div className="mb-4 bg-white/5 w-12 h-12 rounded-lg flex items-center justify-center border border-white/10">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  )
}
