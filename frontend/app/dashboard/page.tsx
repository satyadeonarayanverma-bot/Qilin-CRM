"use client";

import { motion } from "framer-motion";
import { BarChart3, Users, DollarSign, Activity, Bot } from "lucide-react";
import { cn } from "@/lib/utils";

export default function DashboardPage() {
    return (
        <div className="p-8 space-y-8">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
                <div className="flex items-center gap-2 text-sm text-muted-foreground bg-white/5 px-4 py-2 rounded-full border border-white/10">
                    <span>Organization: Acme Corp</span>
                    <span className="w-1 h-1 bg-gray-500 rounded-full"></span>
                    <span className="text-green-400">Premium Plan</span>
                </div>
            </div>

            {/* KPI Grid */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <KPICard title="Total Leads" value="1,234" icon={Users} trend="+12% from last month" color="text-indigo-400" />
                <KPICard title="Active Pipelines" value="45" icon={Activity} trend="+2 new this week" color="text-purple-400" />
                <KPICard title="Conversion Rate" value="24%" icon={BarChart3} trend="+4.3% increase" color="text-green-400" />
                <KPICard title="Revenue (Projected)" value="$45.2k" icon={DollarSign} trend="+8% from last month" color="text-emerald-400" />
            </div>

            {/* Main Content Area */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <div className="col-span-4 rounded-xl border border-white/10 bg-black/20 glass-dark p-6">
                    <div className="mb-4 flex items-center justify-between">
                        <h3 className="font-semibold">Recent Activity</h3>
                    </div>
                    <div className="space-y-4">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="flex items-center gap-4 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition">
                                <div className="w-10 h-10 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-400">
                                    <Users className="w-5 h-5" />
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm font-medium">New Lead Assigned</p>
                                    <p className="text-xs text-muted-foreground">Rahul assigned "Amit Sharma" to Team Alpha</p>
                                </div>
                                <span className="text-xs text-muted-foreground">2m ago</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="col-span-3 rounded-xl border border-white/10 bg-gradient-to-br from-indigo-900/20 to-purple-900/20 glass-dark p-6 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-10">
                        <Bot className="w-32 h-32" />
                    </div>
                    <h3 className="font-semibold flex items-center gap-2 mb-4">
                        <Bot className="w-5 h-5 text-purple-400" /> AI Copilot Insights
                    </h3>
                    <div className="space-y-3">
                        <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/20 text-sm">
                            <p className="font-medium text-purple-200">Opportunity Alert</p>
                            <p className="text-purple-300/80 text-xs mt-1">Lead "Sarah Jones" has visited the pricing page 3 times today. High intent detected.</p>
                        </div>
                        <div className="p-3 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-sm">
                            <p className="font-medium text-indigo-200">Daily Summary</p>
                            <p className="text-indigo-300/80 text-xs mt-1">Team conversion rate is up 5% today compared to weekly average.</p>
                        </div>
                    </div>
                    <button className="w-full mt-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-sm transition">
                        Open Copilot Chat
                    </button>
                </div>
            </div>
        </div>
    );
}

function KPICard({ title, value, icon: Icon, trend, color }: any) {
    return (
        <div className="rounded-xl border border-white/10 bg-black/20 glass-dark p-6 transition hover:bg-black/30">
            <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                <h3 className="tracking-tight text-sm font-medium text-muted-foreground">{title}</h3>
                <Icon className={cn("h-4 w-4", color)} />
            </div>
            <div>
                <div className="text-2xl font-bold">{value}</div>
                <p className="text-xs text-muted-foreground mt-1">{trend}</p>
            </div>
        </div>
    )
}
