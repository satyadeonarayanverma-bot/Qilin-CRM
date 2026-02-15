export type Role = "SUPER_ADMIN" | "ADMIN" | "TEAM_LEADER" | "COUNSELLOR" | "ASSOCIATE";

export type LeadStatus = "NEW" | "CONTACTED" | "INTERESTED" | "FOLLOW_UP" | "CONVERTED" | "LOST";

export interface Tenant {
    id: string;
    company_name: string;
    plan: string;
    status: string;
}

export interface User {
    id: string;
    tenant_id: string;
    name: string;
    email: string;
    role: Role;
    associate_ref_id?: string;
    reports_to_id?: string;
}

export interface Lead {
    id: string;
    tenant_id: string;
    assigned_to_id?: string;
    name: string;
    phone: string;
    email?: string;
    course_interest?: string;
    status: LeadStatus;
    source?: string;
    created_at: string;
    updated_at: string;
}

export interface Note {
    id: string;
    lead_id: string;
    user_id: string;
    content: string;
    created_at: string;
}

export interface Task {
    id: string;
    lead_id?: string;
    assigned_to_id: string;
    title: string;
    description?: string;
    due_date?: string;
    status: "PENDING" | "COMPLETED";
}
