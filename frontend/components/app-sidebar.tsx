"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
    BarChart3,
    Users,
    UserCheck,
    FileText,
    CheckSquare,
    Settings,
    LogOut,
    Crown
} from "lucide-react";

const routes = [
    {
        label: "Dashboard",
        icon: BarChart3,
        href: "/dashboard",
        color: "text-sky-500",
    },
    {
        label: "Leads",
        icon: Users,
        href: "/dashboard/leads",
        color: "text-violet-500",
    },
    {
        label: "Tasks",
        icon: CheckSquare,
        href: "/dashboard/tasks",
        color: "text-pink-700",
    },
    {
        label: "Team",
        icon: Crown, // Using Crown for Super Admin visuals
        href: "/dashboard/team",
        color: "text-orange-700",
    },
    {
        label: "Settings",
        icon: Settings,
        href: "/dashboard/settings",
    },
];

export function Sidebar() {
    const pathname = usePathname();

    return (
        <div className="space-y-4 py-4 flex flex-col h-full bg-[#111827] text-white border-r border-white/10 glass-dark">
            <div className="px-3 py-2 flex-1">
                <Link href="/dashboard" className="flex items-center pl-3 mb-14">
                    <div className="relative w-8 h-8 mr-4">
                        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg blur-sm opacity-75"></div>
                        <div className="relative w-full h-full bg-black rounded-lg flex items-center justify-center font-bold text-white border border-white/10">Q</div>
                    </div>
                    <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-cyan-400">
                        Qilin CRM
                    </h1>
                </Link>
                <div className="space-y-1">
                    {routes.map((route) => (
                        <Link
                            key={route.href}
                            href={route.href}
                            className={cn(
                                "text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition",
                                pathname === route.href ? "text-white bg-white/10" : "text-zinc-400"
                            )}
                        >
                            <div className="flex items-center flex-1">
                                <route.icon className={cn("h-5 w-5 mr-3", route.color)} />
                                {route.label}
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
            <div className="px-3 py-2">
                <div className="p-3 bg-white/5 rounded-xl border border-white/10">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-xs">SA</div>
                        <div className="overflow-hidden">
                            <p className="text-sm font-medium truncate">Super Admin</p>
                            <p className="text-xs text-muted-foreground truncate">Acme Corp</p>
                        </div>
                    </div>
                    <button className="w-full flex items-center justify-center p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition text-xs">
                        <LogOut className="w-3 h-3 mr-2" /> Sign Out
                    </button>
                </div>
            </div>
        </div>
    );
}
