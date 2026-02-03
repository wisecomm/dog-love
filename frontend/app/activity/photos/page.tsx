"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Download, Share2 } from "lucide-react";
// import Image from "next/image"; // Commented out to avoid config issues, using img tag for mock

const PHOTOS = [
    { id: 1, src: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=500&q=80", date: "Today, 10:45 AM" },
    { id: 2, src: "https://images.unsplash.com/photo-1596495578065-6e0763fa1178?auto=format&fit=crop&w=500&q=80", date: "Today, 10:30 AM" },
    { id: 3, src: "https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=500&q=80", date: "Yesterday" },
    { id: 4, src: "https://images.unsplash.com/photo-1530281700549-e82e7bf110d6?auto=format&fit=crop&w=500&q=80", date: "Yesterday" },
    { id: 5, src: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=500&q=80", date: "2 days ago" },
    { id: 6, src: "https://images.unsplash.com/photo-1544568100-847a948585b9?auto=format&fit=crop&w=500&q=80", date: "2 days ago" },
];

export default function PhotoGalleryPage() {
    return (
        <div className="min-h-screen bg-white">
            {/* Header */}
            <div className="bg-white border-b border-gray-200 px-6 py-4 sticky top-0 z-10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <Link href="/activity">
                        <Button variant="ghost" size="icon" className="h-9 w-9 hover:bg-gray-100 rounded-full">
                            <ArrowLeft className="w-5 h-5 text-gray-700" />
                        </Button>
                    </Link>
                    <h1 className="text-xl font-bold text-gray-900">Photo Album</h1>
                </div>
                <Button variant="outline" size="sm" className="gap-2">
                    <Share2 className="w-4 h-4" />
                    Share
                </Button>
            </div>

            <div className="p-6">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {PHOTOS.map((photo) => (
                        <div key={photo.id} className="group relative aspect-square bg-gray-100 rounded-xl overflow-hidden cursor-pointer shadow-sm hover:shadow-md transition-all">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src={photo.src}
                                alt="Dog photo"
                                loading="lazy"
                                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-end p-4 opacity-0 group-hover:opacity-100">
                                <div className="w-full flex justify-between items-end text-white">
                                    <span className="text-xs font-medium drop-shadow-md">{photo.date}</span>
                                    <div className="p-2 bg-white/20 backdrop-blur rounded-full hover:bg-white/40 transition-colors">
                                        <Download className="w-4 h-4" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
