"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface User {
    id: string;
    name: string;
    email: string;
    role: string;
    tenant_id: string;
}

interface AuthContextType {
    user: User | null;
    token: string | null;
    login: (email: string, password: string) => Promise<void>;
    register: (data: any) => Promise<void>;
    logout: () => void;
    isLoading: boolean;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        const storedUser = localStorage.getItem("user");
        if (storedToken && storedUser) {
            setToken(storedToken);
            setUser(JSON.parse(storedUser));
        }
        setIsLoading(false);
    }, []);

    const login = async (email: string, password: string) => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            if (!res.ok) throw new Error('Login failed');

            const data = await res.json();
            setToken(data.token);
            setUser({ id: data.id, name: data.name, email: data.email, role: data.role, tenant_id: data.tenant_id });

            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data));

            router.push('/dashboard');
        } catch (error) {
            console.error("Login error", error);
            throw error;
        }
    };

    const register = async (data: any) => {
        try {
            const endpoint = data.companyName ? '/api/auth/register-org' : '/api/auth/join-org'; // Logic for switching endpoints
            // Note: 'join-org' logic needs to be implemented in backend if not already matches prompt spec

            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}${endpoint}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    company_name: data.companyName,
                    ...data
                })
            });

            if (!res.ok) throw new Error('Registration failed');

            const userData = await res.json();
            setToken(userData.token);
            setUser(userData);
            localStorage.setItem("token", userData.token);
            localStorage.setItem("user", JSON.stringify(userData));

            router.push('/dashboard');
        } catch (error) {
            console.error("Register error", error);
            throw error;
        }
    };

    const logout = () => {
        setToken(null);
        setUser(null);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        router.push('/auth/login');
    };

    return (
        <AuthContext.Provider value={{ user, token, login, register, logout, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
