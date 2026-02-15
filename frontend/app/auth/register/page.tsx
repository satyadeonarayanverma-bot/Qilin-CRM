"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { MoveLeft, Building2, UserPlus } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/auth-context";

type RegMode = "create_org" | "join_org";

export default function RegisterPage() {
    const { register } = useAuth();
    const [mode, setMode] = useState<RegMode>("create_org");
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        companyName: "",
        associateRefId: ""
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await register(formData);
    };

    return (
        <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-background py-10">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-900/20 blur-[120px] rounded-full pointer-events-none" />

            <div className="w-full max-w-lg p-8 rounded-2xl border border-white/10 bg-black/40 backdrop-blur-xl shadow-2xl relative z-10 glass-dark">
                <Link href="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-white mb-6 transition-colors">
                    <MoveLeft className="w-4 h-4 mr-2" /> Back to Home
                </Link>

                <div className="text-center mb-6">
                    <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">Get Started</h1>
                    <p className="text-muted-foreground mt-2">Choose how you want to join Qilin CRM</p>
                </div>

                {/* Role Toggle */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                    <button
                        onClick={() => setMode("create_org")}
                        className={cn(
                            "flex flex-col items-center p-4 rounded-xl border transition-all",
                            mode === "create_org"
                                ? "bg-indigo-500/20 border-indigo-500/50 text-white"
                                : "bg-white/5 border-white/10 text-muted-foreground hover:bg-white/10"
                        )}
                    >
                        <Building2 className="w-6 h-6 mb-2" />
                        <span className="text-sm font-medium">Create Organization</span>
                    </button>

                    <button
                        onClick={() => setMode("join_org")}
                        className={cn(
                            "flex flex-col items-center p-4 rounded-xl border transition-all",
                            mode === "join_org"
                                ? "bg-purple-500/20 border-purple-500/50 text-white"
                                : "bg-white/5 border-white/10 text-muted-foreground hover:bg-white/10"
                        )}
                    >
                        <UserPlus className="w-6 h-6 mb-2" />
                        <span className="text-sm font-medium">Join as Associate</span>
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300">Full Name</label>
                        <input
                            type="text" required
                            className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300">Email</label>
                        <input
                            type="email" required
                            className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300">Password</label>
                        <input
                            type="password" required
                            className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        />
                    </div>

                    {mode === "create_org" ? (
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-300">Organization Name</label>
                            <input
                                type="text" required
                                placeholder="Ex. Acme Consultants"
                                className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none"
                                value={formData.companyName}
                                onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                            />
                        </div>
                    ) : (
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-300">Associate Reference ID</label>
                            <input
                                type="text" required
                                placeholder="Ex. QILIN-1234-5678"
                                className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none"
                                value={formData.associateRefId}
                                onChange={(e) => setFormData({ ...formData, associateRefId: e.target.value })}
                            />
                            <p className="text-xs text-muted-foreground">Ask your Super Admin for this ID.</p>
                        </div>
                    )}

                    <Button type="submit" variant="premium" className="w-full mt-4 bg-gradient-to-r from-indigo-600 to-purple-600">
                        {mode === "create_org" ? "Create Organization" : "Send Join Request"}
                    </Button>
                </form>

                <div className="mt-6 text-center text-sm text-muted-foreground">
                    Already have an account? <Link href="/auth/login" className="text-indigo-400 hover:underline">Sign In</Link>
                </div>
            </div>
        </div>
    );
}
