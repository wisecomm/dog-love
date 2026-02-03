"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ArrowLeft, Plus, Droplets, Utensils, FileText, CheckCircle2 } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const MOCK_LOGS = [
    { id: 1, type: "Pee", time: "10:30 AM", user: "Kim", detail: "Normal quantity", icon: Droplets, color: "text-blue-500 bg-blue-50" },
    { id: 2, type: "Poo", time: "10:35 AM", user: "Kim", detail: "Healthy", icon: CheckCircle2, color: "text-amber-600 bg-amber-50" },
    { id: 3, type: "Food", time: "12:00 PM", user: "Lee", detail: "Dry Food 1 cup", icon: Utensils, color: "text-green-600 bg-green-50" },
    { id: 4, type: "Note", time: "01:15 PM", user: "Kim", detail: "Drank a lot of water after walk", icon: FileText, color: "text-gray-600 bg-gray-100" },
];

export default function CareLogsPage() {
    const [logs] = useState(MOCK_LOGS);

    const addLog = (type: string) => {
        // In real app, open a modal or form. Here just mock adding.
        const newLog = {
            id: Date.now(),
            type: type,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            user: "Me",
            detail: "Added log",
            icon: type === "Water" ? Droplets : type === "Food" ? Utensils : FileText,
            color: "text-gray-600 bg-gray-100"
        };
        console.log("Mock add:", newLog);
        // setLogs([newLog, ...logs]); // Commented out to keep mock clean
        alert(`Add ${type} log feature would open here.`);
    };

    return (
        <div className="min-h-screen bg-gray-50/50 p-6 md:p-10">
            <div className="max-w-3xl mx-auto space-y-6">

                {/* Header */}
                <div className="flex items-center gap-3 mb-6">
                    <Link href="/activity">
                        <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-white bg-white/50 rounded-full shadow-sm">
                            <ArrowLeft className="w-5 h-5 text-gray-600" />
                        </Button>
                    </Link>
                    <h1 className="text-2xl font-bold tracking-tight text-gray-900">Care Logs</h1>
                </div>

                {/* Quick Actions */}
                <Card className="border-none shadow-sm bg-white">
                    <CardHeader>
                        <CardTitle className="text-lg">Quick Add</CardTitle>
                        <CardDescription>Record an event instantly</CardDescription>
                    </CardHeader>
                    <CardContent className="grid grid-cols-4 gap-4">
                        <Button
                            variant="outline"
                            className="flex flex-col h-auto py-4 space-y-2 hover:bg-blue-50 hover:border-blue-200 transition-colors"
                            onClick={() => addLog("Pee")}
                        >
                            <div className="p-2 bg-blue-100 rounded-full text-blue-600"><Droplets className="w-5 h-5" /></div>
                            <span className="text-xs font-medium">Pee</span>
                        </Button>
                        <Button
                            variant="outline"
                            className="flex flex-col h-auto py-4 space-y-2 hover:bg-amber-50 hover:border-amber-200 transition-colors"
                            onClick={() => addLog("Poo")}
                        >
                            <div className="p-2 bg-amber-100 rounded-full text-amber-700 font-bold text-sm">💩</div>
                            <span className="text-xs font-medium">Poo</span>
                        </Button>
                        <Button
                            variant="outline"
                            className="flex flex-col h-auto py-4 space-y-2 hover:bg-green-50 hover:border-green-200 transition-colors"
                            onClick={() => addLog("Food")}
                        >
                            <div className="p-2 bg-green-100 rounded-full text-green-600"><Utensils className="w-5 h-5" /></div>
                            <span className="text-xs font-medium">Food</span>
                        </Button>
                        <Button
                            variant="outline"
                            className="flex flex-col h-auto py-4 space-y-2 hover:bg-gray-50 hover:border-gray-200 transition-colors"
                            onClick={() => addLog("Note")}
                        >
                            <div className="p-2 bg-gray-100 rounded-full text-gray-600"><Plus className="w-5 h-5" /></div>
                            <span className="text-xs font-medium">Note</span>
                        </Button>
                    </CardContent>
                </Card>

                {/* Logs Timeline */}
                <div className="space-y-4">
                    <h2 className="text-lg font-semibold px-1">Today</h2>
                    {logs.map((log) => (
                        <div key={log.id} className="flex gap-4 p-4 bg-white rounded-xl shadow-sm border border-gray-100">
                            <div className={`shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${log.color}`}>
                                <log.icon className="w-5 h-5" />
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center justify-between mb-1">
                                    <h3 className="font-semibold text-gray-900">{log.type}</h3>
                                    <span className="text-xs text-gray-500 font-medium">{log.time}</span>
                                </div>
                                <p className="text-sm text-gray-600 mb-2">{log.detail}</p>
                                <div className="flex items-center gap-2">
                                    <Avatar className="w-5 h-5 border border-gray-100">
                                        <AvatarFallback className="text-[9px] bg-indigo-50 text-indigo-700">{log.user}</AvatarFallback>
                                    </Avatar>
                                    <span className="text-xs text-gray-400">Logged by {log.user}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
}
