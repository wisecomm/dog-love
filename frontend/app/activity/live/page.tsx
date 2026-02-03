"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Pause, Play, StopCircle, Navigation } from "lucide-react";

export default function LiveTrackingPage() {
    const [isActive, setIsActive] = useState(true);
    const [duration, setDuration] = useState(0); // seconds
    const [distance, setDistance] = useState(1.2); // km

    // Simulate timer
    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isActive) {
            interval = setInterval(() => {
                setDuration((prev) => prev + 1);
                setDistance((prev) => prev + 0.001); // mild distance increase
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [isActive]);

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <div className="min-h-screen bg-white flex flex-col">
            {/* Header */}
            <div className="bg-white border-b border-gray-200 px-4 py-3 sticky top-0 z-10 flex items-center justify-between shadow-sm">
                <div className="flex items-center gap-3">
                    <Link href="/activity">
                        <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-gray-100 rounded-full">
                            <ArrowLeft className="w-5 h-5 text-gray-600" />
                        </Button>
                    </Link>
                    <h1 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                        <div className="animate-pulse w-2 h-2 bg-red-500 rounded-full"></div>
                        Live Tracking
                    </h1>
                </div>
                <Badge variant="secondary" className="bg-red-50 text-red-600 border-red-100 font-mono">
                    REC
                </Badge>
            </div>

            {/* Main Map Area (Mock) */}
            <div className="flex-1 relative bg-gray-100 flex items-center justify-center overflow-hidden">
                {/* Placeholder for Map - In real app, this would be Naver Map or Google Map */}
                <div className="absolute inset-0 grayscale-20" style={{ backgroundImage: "url('https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/127.0276,37.4979,15,0/800x600?access_token=YOUR_TOKEN')", backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.3 }} />

                {/* Mock Map UI Elements */}
                <div className="absolute inset-0 bg-size-[16px_16px] mask-[radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" style={{ backgroundImage: "radial-gradient(#e5e7eb 1px, transparent 1px)" }}></div>

                <div className="relative z-10 flex flex-col items-center gap-4 p-8 text-center">
                    <div className="p-4 bg-white/90 backdrop-blur rounded-2xl shadow-lg border border-gray-200 animate-bounce max-w-xs">
                        <div className="flex items-center gap-3 text-left">
                            <div className="bg-blue-100 p-2 rounded-full">
                                <Navigation className="w-6 h-6 text-blue-600" />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-500">Current Location</p>
                                <p className="font-bold text-gray-900">Gangnam-gu, Seoul</p>
                            </div>
                        </div>
                    </div>
                    <p className="text-gray-500 text-sm italic">
                        (Map Visualization Placeholder)
                    </p>
                </div>
            </div>

            {/* Bottom Control Panel */}
            <div className="bg-white border-t border-gray-200 p-6 rounded-t-3xl shadow-[0_-5px_20px_-5px_rgba(0,0,0,0.1)] -mt-6 relative z-20">
                <div className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto mb-6" />

                <div className="grid grid-cols-2 gap-8 mb-8 text-center">
                    <div>
                        <p className="text-gray-500 text-sm mb-1 uppercase tracking-wider font-medium">Duration</p>
                        <div className="text-4xl font-black text-gray-900 font-mono">{formatTime(duration)}</div>
                    </div>
                    <div>
                        <p className="text-gray-500 text-sm mb-1 uppercase tracking-wider font-medium">Distance</p>
                        <div className="text-4xl font-black text-gray-900 font-mono">{distance.toFixed(2)} <span className="text-lg text-gray-500 font-sans font-normal">km</span></div>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <Button
                        variant="outline"
                        size="lg"
                        className="flex-1 h-14 text-base font-semibold border-2"
                        onClick={() => setIsActive(!isActive)}
                    >
                        {isActive ? <Pause className="mr-2 w-5 h-5" /> : <Play className="mr-2 w-5 h-5" />}
                        {isActive ? "Pause" : "Resume"}
                    </Button>
                    <Button
                        variant="destructive"
                        size="lg"
                        className="flex-1 h-14 text-base font-semibold shadow-lg shadow-red-200"
                    >
                        <StopCircle className="mr-2 w-5 h-5" />
                        End Walk
                    </Button>
                </div>
            </div>
        </div>
    );
}
