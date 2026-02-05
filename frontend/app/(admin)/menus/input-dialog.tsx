import * as React from "react";
import { MenuDetail } from "./types";
import { Utensils } from "lucide-react";
import {
    Dialog,
    DialogContent,
} from "@/components/ui/dialog";
import { InputForm } from "./input-form";

interface InputDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    menu?: MenuDetail | null;
    onSubmit: (data: Partial<MenuDetail>) => Promise<void>;
}

export function InputDialog({ open, onOpenChange, menu, onSubmit }: InputDialogProps) {
    const isEdit = !!menu;

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-lg p-0 overflow-hidden bg-background dark:bg-card rounded-xl border-none shadow-2xl">
                <div className="bg-background dark:bg-card px-6 py-5 border-b border-border dark:border-border flex items-center justify-between">
                    <h3 className="text-lg font-bold leading-6 text-foreground dark:text-foreground flex items-center gap-2">
                        <Utensils className="text-primary w-6 h-6" />
                        {isEdit ? "메뉴 수정" : "메뉴 추가"}
                    </h3>
                </div>

                <InputForm
                    item={menu}
                    onSubmit={onSubmit}
                    onCancel={() => onOpenChange(false)}
                />
            </DialogContent>
        </Dialog>
    );
}
