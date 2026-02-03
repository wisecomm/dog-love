"use client";

import React from "react";
import { TopBar } from "@/components/dashboard/top-bar";
import { BottomNav } from "@/components/dashboard/bottom-nav";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Clock, Star } from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function AdminDashboardPage() {
    return (
        <div className="min-h-screen bg-gray-50 pb-24 font-sans text-gray-900 flex flex-col">
            <TopBar userName="Danyoh" />

            <main className="flex-1 px-5 py-6 space-y-8 max-w-md mx-auto w-full md:max-w-4xl">

                {/* Important Status / Summary Card */}
                <section>
                    <div className="flex items-center justify-between mb-3">
                        <h2 className="text-lg font-bold">Current Status</h2>
                        <Link href="/activity" className="text-sm text-blue-600 font-medium">View Activity</Link>
                    </div>
                    <Card className="border-0 shadow-md bg-gradient-to-r from-gray-900 to-gray-800 text-white overflow-hidden relative">
                        <div className="absolute top-0 right-0 p-3 opacity-10">
                            <MapPin className="w-24 h-24" />
                        </div>
                        <CardContent className="p-5 relative z-10">
                            <div className="flex items-start justify-between mb-4">
                                <div>
                                    <p className="text-gray-300 text-xs font-medium uppercase tracking-wider mb-1">Walking Now</p>
                                    <h3 className="text-2xl font-bold">River Park Trail</h3>
                                </div>
                                <Badge className="bg-green-500 hover:bg-green-600 text-white border-0 px-2 py-0.5 animate-pulse">Live</Badge>
                            </div>

                            <div className="flex items-center gap-6">
                                <div>
                                    <p className="text-gray-400 text-xs">Time</p>
                                    <p className="font-mono text-xl font-medium">24:10</p>
                                </div>
                                <div>
                                    <p className="text-gray-400 text-xs">Distance</p>
                                    <p className="font-mono text-xl font-medium">1.2 km</p>
                                </div>
                            </div>

                            <div className="mt-5 pt-4 border-t border-white/10 flex items-center gap-3">
                                <Avatar className="h-8 w-8 border border-white/20">
                                    <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=sitter1" />
                                    <AvatarFallback>S</AvatarFallback>
                                </Avatar>
                                <div className="text-sm">
                                    <p className="text-gray-200 font-medium">With Sitter Kim</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </section>

                {/* Quick Actions / Services */}
                <section>
                    <h2 className="text-lg font-bold mb-3">Quick Actions</h2>
                    <div className="grid grid-cols-4 gap-3">
                        {[
                            { name: "Walk", icon: "🐾", color: "bg-orange-100 text-orange-600" },
                            { name: "Food", icon: "🦴", color: "bg-green-100 text-green-600" },
                            { name: "Health", icon: "💊", color: "bg-red-100 text-red-600" },
                            { name: "More", icon: "⋯", color: "bg-gray-100 text-gray-600" },
                        ].map((action) => (
                            <button key={action.name} className="flex flex-col items-center gap-2 group">
                                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shadow-sm transition-transform group-active:scale-95 ${action.color}`}>
                                    {action.icon}
                                </div>
                                <span className="text-xs font-medium text-gray-600">{action.name}</span>
                            </button>
                        ))}
                    </div>
                </section>

                {/* Recent Updates / Feed */}
                <section>
                    <div className="flex items-center justify-between mb-3">
                        <h2 className="text-lg font-bold">Recent Updates</h2>
                    </div>

                    <div className="space-y-3">
                        {/* Update Item 1 */}
                        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-start gap-4">
                            <div className="w-12 h-12 rounded-lg bg-gray-100 shrink-0 overflow-hidden relative">
                                {/* Placeholder Image */}
                                <div className="absolute inset-0 bg-blue-100 flex items-center justify-center text-blue-300">
                                    <span className="text-xs">IMG</span>
                                </div>
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-start">
                                    <h4 className="font-semibold text-gray-900 text-sm">Walk Completed</h4>
                                    <span className="text-[10px] text-gray-400">2h ago</span>
                                </div>
                                <p className="text-xs text-gray-500 mt-1 line-clamp-1">Morning walk session finished successfully with no issues.</p>
                                <div className="flex items-center gap-1 mt-2">
                                    <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                                    <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                                    <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                                    <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                                    <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                                </div>
                            </div>
                        </div>

                        {/* Update Item 2 */}
                        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
                            <div className="w-12 h-12 rounded-lg bg-indigo-50 shrink-0 flex items-center justify-center text-indigo-500">
                                <Clock className="w-5 h-5" />
                            </div>
                            <div className="flex-1">
                                <div className="flex justify-between items-start">
                                    <h4 className="font-semibold text-gray-900 text-sm">Upcoming Booking</h4>
                                    <span className="text-[10px] text-gray-400">Tomorrow</span>
                                </div>
                                <p className="text-xs text-gray-500 mt-1">Grooming session at 2:00 PM</p>
                            </div>
                            <Button size="sm" variant="outline" className="h-8 text-xs font-medium">View</Button>
                        </div>
                    </div>
                </section>

            </main>

            <BottomNav />
        </div>
    );
}


