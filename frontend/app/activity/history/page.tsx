"use client";

import React from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Clock, MapPin } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const HISTORY = [
    { id: 1, type: "Walk", date: "Today", time: "09:00 AM", duration: "45 min", distance: "2.1 km", sitter: "Kim Min-su", status: "Completed" },
    { id: 2, type: "Visit", date: "Yesterday", time: "02:00 PM", duration: "60 min", distance: "-", sitter: "Lee Ji-won", status: "Completed" },
    { id: 3, type: "Walk", date: "Oct 24", time: "05:30 PM", duration: "30 min", distance: "1.5 km", sitter: "Kim Min-su", status: "Completed" },
    { id: 4, type: "Training", date: "Oct 22", time: "11:00 AM", duration: "90 min", distance: "-", sitter: "Park Trainer", status: "Completed" },
    { id: 5, type: "Walk", date: "Oct 20", time: "08:15 AM", duration: "50 min", distance: "2.8 km", sitter: "Kim Min-su", status: "Completed" },
];

export default function ActivityHistoryPage() {
    return (
        <div className="min-h-screen bg-gray-50/50 p-6 md:p-10 font-sans">
            <div className="max-w-4xl mx-auto">

                {/* Header */}
                <div className="flex items-center gap-3 mb-8">
                    <Link href="/activity">
                        <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-white bg-white/50 rounded-full shadow-sm">
                            <ArrowLeft className="w-5 h-5 text-gray-600" />
                        </Button>
                    </Link>
                    <h1 className="text-2xl font-bold tracking-tight text-gray-900">Activity History</h1>
                </div>

                <div className="space-y-4">
                    {HISTORY.map((item) => (
                        <Card key={item.id} className="p-5 flex items-center justify-between hover:border-gray-300 transition-colors cursor-pointer group">
                            <div className="flex items-center gap-4">
                                <div className="flex flex-col items-center justify-center w-14 h-14 bg-gray-100 rounded-xl">
                                    <span className="text-xs font-bold text-gray-500 uppercase">{item.date.split(' ')[0]}</span>
                                    <span className="text-lg font-bold text-gray-900">{item.date.split(' ')[1] || ''}</span>
                                </div>

                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <h3 className="font-bold text-gray-900 text-lg">{item.type}</h3>
                                        <Badge variant="secondary" className="text-xs font-normal text-gray-500 bg-gray-100 hover:bg-gray-100">
                                            {item.status}
                                        </Badge>
                                    </div>
                                    <div className="flex items-center gap-4 text-sm text-gray-500">
                                        <div className="flex items-center gap-1">
                                            <Clock className="w-4 h-4" />
                                            {item.time} ({item.duration})
                                        </div>
                                        {item.distance !== "-" && (
                                            <div className="flex items-center gap-1">
                                                <MapPin className="w-4 h-4" />
                                                {item.distance}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="text-right hidden sm:block">
                                    <p className="text-sm font-medium text-gray-900">{item.sitter}</p>
                                    <p className="text-xs text-gray-500">Caregiver</p>
                                </div>
                                <Avatar className="h-10 w-10 border border-gray-100">
                                    <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${item.sitter}`} />
                                    <AvatarFallback>S</AvatarFallback>
                                </Avatar>
                            </div>
                        </Card>
                    ))}
                </div>

            </div>
        </div>
    );
}
