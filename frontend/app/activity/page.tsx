"use client";

import React from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Activity, MapPin, ClipboardList, Image as ImageIcon, History, Play } from "lucide-react";

export default function ActivityDashboard() {
    return (
        <div className="min-h-screen bg-gray-50/50 p-6 md:p-10 font-sans text-gray-900">
            <div className="max-w-5xl mx-auto space-y-8">

                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Activity & Logs</h1>
                        <p className="text-gray-500 mt-1">Manage pet care activities, tracking, and daily logs.</p>
                    </div>
                    <Link href="/activity/live">
                        <Button className="bg-green-600 hover:bg-green-700 text-white gap-2 shadow-sm rounded-full px-6">
                            <Play className="w-4 h-4 fill-current" />
                            Start New Walk
                        </Button>
                    </Link>
                </div>

                {/* Quick Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <Card className="shadow-sm hover:shadow-md transition-shadow">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Walks</CardTitle>
                            <Activity className="h-4 w-4 text-gray-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">128</div>
                            <p className="text-xs text-gray-500">+4 from last week</p>
                        </CardContent>
                    </Card>

                    <Card className="shadow-sm hover:shadow-md transition-shadow">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Avg. Duration</CardTitle>
                            <History className="h-4 w-4 text-gray-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">45m</div>
                            <p className="text-xs text-gray-500">Per session</p>
                        </CardContent>
                    </Card>

                    <Card className="shadow-sm hover:shadow-md transition-shadow">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Recent Photos</CardTitle>
                            <ImageIcon className="h-4 w-4 text-gray-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">24</div>
                            <p className="text-xs text-gray-500">Added this month</p>
                        </CardContent>
                    </Card>

                    <Card className="shadow-sm hover:shadow-md transition-shadow">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Active Sitter</CardTitle>
                            <Badge variant="outline" className="text-xs border-green-200 bg-green-50 text-green-700">Online</Badge>
                        </CardHeader>
                        <CardContent>
                            <div className="text-lg font-bold truncate">Kim Min-su</div>
                            <p className="text-xs text-gray-500">Last update: 5m ago</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Navigation Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    {/* Live Tracking Card */}
                    <Link href="/activity/live" className="block group">
                        <Card className="h-full border-2 border-transparent group-hover:border-blue-100 transition-all hover:shadow-lg">
                            <div className="h-32 bg-blue-50/50 flex items-center justify-center rounded-t-xl group-hover:bg-blue-50 transition-colors">
                                <MapPin className="w-12 h-12 text-blue-500 opacity-80" />
                            </div>
                            <CardHeader>
                                <CardTitle className="group-hover:text-blue-600 transition-colors">Live GPS Tracking</CardTitle>
                                <CardDescription>View real-time location and walk paths.</CardDescription>
                            </CardHeader>
                        </Card>
                    </Link>

                    {/* Care Logs Card */}
                    <Link href="/activity/logs" className="block group">
                        <Card className="h-full border-2 border-transparent group-hover:border-orange-100 transition-all hover:shadow-lg">
                            <div className="h-32 bg-orange-50/50 flex items-center justify-center rounded-t-xl group-hover:bg-orange-50 transition-colors">
                                <ClipboardList className="w-12 h-12 text-orange-500 opacity-80" />
                            </div>
                            <CardHeader>
                                <CardTitle className="group-hover:text-orange-600 transition-colors">Care Logs</CardTitle>
                                <CardDescription>Record pee, poo, food, and water intake.</CardDescription>
                            </CardHeader>
                        </Card>
                    </Link>

                    {/* Photos Card */}
                    <Link href="/activity/photos" className="block group">
                        <Card className="h-full border-2 border-transparent group-hover:border-purple-100 transition-all hover:shadow-lg">
                            <div className="h-32 bg-purple-50/50 flex items-center justify-center rounded-t-xl group-hover:bg-purple-50 transition-colors">
                                <ImageIcon className="w-12 h-12 text-purple-500 opacity-80" />
                            </div>
                            <CardHeader>
                                <CardTitle className="group-hover:text-purple-600 transition-colors">Photo Album</CardTitle>
                                <CardDescription>Browse photos uploaded by sitters.</CardDescription>
                            </CardHeader>
                        </Card>
                    </Link>

                    {/* History Card */}
                    <Link href="/activity/history" className="block group">
                        <Card className="h-full border-2 border-transparent group-hover:border-gray-200 transition-all hover:shadow-lg">
                            <div className="h-32 bg-gray-100 flex items-center justify-center rounded-t-xl group-hover:bg-gray-200 transition-colors">
                                <History className="w-12 h-12 text-gray-500 opacity-80" />
                            </div>
                            <CardHeader>
                                <CardTitle className="group-hover:text-gray-800 transition-colors">Past History</CardTitle>
                                <CardDescription>Review all past walks and care events.</CardDescription>
                            </CardHeader>
                        </Card>
                    </Link>

                </div>
            </div>
        </div>
    );
}
