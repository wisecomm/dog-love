"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Search } from "lucide-react";
import { ActionButtons, toolbarButtonClass } from "@/components/common";
import { MenuFilters } from "./types";

interface DataTableToolbarProps {
    onAdd: () => void;
    onEdit: () => void;
    onDelete: () => void;
    onSearch: (params: MenuFilters) => void;
    isLoading?: boolean;
}

export function DataTableToolbar({
    onAdd,
    onEdit,
    onDelete,
    onSearch,
    isLoading,
}: DataTableToolbarProps) {
    const [menuName, setMenuName] = React.useState("");
    const [category, setCategory] = React.useState("");

    const handleSearch = () => {
        onSearch({ menuName, category });
    };

    const handleKeyDown = (event: React.KeyboardEvent) => {
        if (event.key === "Enter") {
            handleSearch();
        }
    };

    return (
        <Card className="w-full">
            <CardContent className="flex items-center justify-between gap-4 flex-wrap">
                <div className="flex flex-1 items-center gap-4 flex-wrap">
                    <div className="flex items-center gap-2">
                        <span className="text-sm font-medium whitespace-nowrap">메뉴명</span>
                        <Input
                            placeholder="메뉴명 입력"
                            value={menuName}
                            onChange={(event) => setMenuName(event.target.value)}
                            onKeyDown={handleKeyDown}
                            className="w-[150px] lg:w-[200px]"
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-sm font-medium whitespace-nowrap">카테고리</span>
                        <Input
                            placeholder="카테고리 입력"
                            value={category}
                            onChange={(event) => setCategory(event.target.value)}
                            onKeyDown={handleKeyDown}
                            className="w-[150px] lg:w-[200px]"
                        />
                    </div>
                    <Button
                        variant="outline"
                        onClick={handleSearch}
                        className={toolbarButtonClass}
                        disabled={isLoading}
                    >
                        <Search className="mr-2 h-4 w-4" />
                        조회
                    </Button>
                </div>

                <div className="flex items-center space-x-2">
                    <ActionButtons
                        onAdd={onAdd}
                        onEdit={onEdit}
                        onDelete={onDelete}
                        disabled={isLoading}
                    />
                </div>
            </CardContent>
        </Card>
    );
}
