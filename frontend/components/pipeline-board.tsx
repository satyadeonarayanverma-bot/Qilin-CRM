"use client";

import { useState, useEffect } from "react";
import { Lead, LeadStatus } from "@/types";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { MoreHorizontal, Phone, Mail } from "lucide-react";
import { useAuth } from "@/context/auth-context";

const COLUMNS: LeadStatus[] = ["NEW", "CONTACTED", "INTERESTED", "FOLLOW_UP", "CONVERTED", "LOST"];

export function PipelineBoard() {
    const { token } = useAuth();
    const [leads, setLeads] = useState<Lead[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!token) return;

        const fetchLeads = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/leads`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                if (res.ok) {
                    const data = await res.json();
                    setLeads(data);
                }
            } catch (error) {
                console.error("Failed to fetch leads", error);
            } finally {
                setLoading(false);
            }
        };

        fetchLeads();
    }, [token]);

    if (loading) return <div className="p-8 text-center text-muted-foreground">Loading pipeline...</div>;

    return (
        <div className="flex gap-4 h-full min-w-[1200px]">
            {COLUMNS.map((col) => (
                <Column key={col} status={col} leads={leads.filter((l) => l.status === col)} />
            ))}
        </div>
    );
}

function Column({ status, leads }: { status: LeadStatus, leads: Lead[] }) {
    return (
        <div className="flex-1 min-w-[280px] flex flex-col bg-white/5 rounded-xl border border-white/10 glass-dark">
            <div className="p-4 border-b border-white/10 flex items-center justify-between sticky top-0 bg-inherit rounded-t-xl z-10 backdrop-blur-xl">
                <h3 className="font-semibold text-sm">{status.replace("_", " ")}</h3>
                <span className="bg-white/10 text-xs px-2 py-0.5 rounded-full">{leads.length}</span>
            </div>
            <div className="p-2 space-y-2 flex-1 overflow-y-auto">
                {leads.map((lead) => (
                    <LeadCard key={lead.id} lead={lead} />
                ))}
            </div>
        </div>
    );
}

function LeadCard({ lead }: { lead: Lead }) {
    return (
        <motion.div
            layoutId={lead.id}
            className="p-3 bg-black/40 border border-white/5 rounded-lg shadow-sm hover:border-indigo-500/50 transition cursor-pointer group"
        >
            <div className="flex justify-between items-start mb-2">
                <h4 className="font-medium text-sm text-gray-200">{lead.name}</h4>
                <button className="text-gray-500 hover:text-white opacity-0 group-hover:opacity-100 transition">
                    <MoreHorizontal className="w-4 h-4" />
                </button>
            </div>
            <p className="text-xs text-muted-foreground mb-3">{lead.course_interest}</p>
            <div className="flex gap-2 text-gray-400">
                <button className="p-1 hover:bg-white/10 rounded" title="Call">
                    <Phone className="w-3 h-3" />
                </button>
                <button className="p-1 hover:bg-white/10 rounded" title="Email">
                    <Mail className="w-3 h-3" />
                </button>
            </div>
        </motion.div>
    );
}
