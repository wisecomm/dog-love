"use client";

import React from "react";
import { Bell, LogOut, User as UserIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { sessionManager } from "@/lib/auth/session-manager";
import { useLogout } from "@/hooks/use-auth-query";

interface TopBarProps {
    userName?: string;
    className?: string;
}

export function TopBar({ userName = "개좋아", className = "" }: TopBarProps) {
    const router = useRouter();

    const logoutMutation = useLogout();

    const handleLogout = () => {

        // Clear session using sessionManager
        sessionManager.clearSession();

        // Also clear cookies manually just in case, similar to previous logic
        if (typeof window !== "undefined") {
            logoutMutation.mutate();
        }
    };

    return (
        <header className={`sticky top-0 z-50 w-full bg-white border-b border-gray-100/50 shadow-sm backdrop-blur-md bg-white/80 ${className}`}>
            <div className="flex items-center justify-between px-6 py-4 max-w-md mx-auto md:max-w-full">
                <div className="flex items-center gap-3">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Avatar className="h-10 w-10 border border-gray-200 shadow-sm cursor-pointer hover:opacity-80 transition-opacity">
                                <AvatarImage src="https://api.dicebear.com/7.x/miniavs/svg?seed=doglove" alt="User" />
                                <AvatarFallback>DL</AvatarFallback>
                            </Avatar>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="start" className="w-56">
                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => router.push("/profile")}>
                                <UserIcon className="mr-2 h-4 w-4" />
                                <span>Profile</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={handleLogout} className="text-red-600 focus:text-red-600">
                                <LogOut className="mr-2 h-4 w-4" />
                                <span>Log out</span>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    <div className="flex flex-col">
                        <span className="text-xs text-gray-500 font-medium">Welcome back,</span>
                        <span className="text-sm font-bold text-gray-900 leading-none">{userName}</span>
                    </div>
                </div>

                <Button variant="ghost" size="icon" className="relative rounded-full hover:bg-gray-100 transition-colors">
                    <Bell className="w-6 h-6 text-gray-600" />
                    <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                </Button>
            </div>
        </header>
    );
}
