"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Calendar, Grip, MessageCircle, User } from "lucide-react";

export function BottomNav() {
    const pathname = usePathname();

    const tabs = [
        { name: "Home", href: "/home", icon: Home },
        { name: "Bookings", href: "/bookings", icon: Calendar },
        { name: "Services", href: "/services", icon: Grip, isCenter: true }, // Central Highlight
        { name: "Messages", href: "/messages", icon: MessageCircle },
        { name: "Profile", href: "/profile", icon: User },
    ];

    return (
        <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 pb-safe pt-2 shadow-[0_-5px_20px_-5px_rgba(0,0,0,0.05)]">
            <div className="flex items-end justify-between px-6 pb-2 max-w-md mx-auto md:max-w-full md:justify-center md:gap-12">
                {tabs.map((tab) => {
                    const isActive = pathname === tab.href;
                    const Icon = tab.icon;

                    if (tab.isCenter) {
                        return (
                            <Link
                                key={tab.name}
                                href={tab.href}
                                className="relative -top-5"
                            >
                                <div className="flex items-center justify-center w-14 h-14 bg-gray-900 rounded-full shadow-lg shadow-gray-300 transform transition-transform active:scale-95">
                                    <Icon className="w-6 h-6 text-white" />
                                </div>
                                {/* <span className="text-[10px] font-medium text-center block mt-1 text-gray-500">{tab.name}</span> */}
                            </Link>
                        );
                    }

                    return (
                        <Link
                            key={tab.name}
                            href={tab.href}
                            className={`flex flex-col items-center gap-1 p-2 transition-colors ${isActive ? "text-gray-900" : "text-gray-400 hover:text-gray-600"
                                }`}
                        >
                            <Icon className={`w-6 h-6 ${isActive ? "fill-current" : ""}`} strokeWidth={isActive ? 2.5 : 2} />
                            <span className="text-[10px] font-medium">{tab.name}</span>
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
}
