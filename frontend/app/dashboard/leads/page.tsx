"use client";

import { PipelineBoard } from "@/components/pipeline-board";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function LeadsPage() {
    return (
        <div className="p-8 h-full flex flex-col">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Lead Pipeline</h2>
                    <p className="text-muted-foreground">Manage and track student leads across stages.</p>
                </div>
                <Button variant="premium">
                    <Plus className="w-4 h-4 mr-2" /> Add New Lead
                </Button>
            </div>

            <div className="flex-1 overflow-x-auto">
                <PipelineBoard />
            </div>
        </div>
    );
}
