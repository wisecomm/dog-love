import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { MenuDetail } from "./types";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";
import { menuFormSchema, MenuFormValues } from "./hooks/use-input-form";

export interface InputFormProps {
    item?: MenuDetail | null;
    onSubmit: (data: Partial<MenuDetail>) => Promise<void>;
    onCancel: () => void;
}

export function InputForm({ item, onSubmit, onCancel }: InputFormProps) {
    const isEdit = !!item;

    const form = useForm<MenuFormValues>({
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        resolver: zodResolver(menuFormSchema) as any,
        defaultValues: {
            menuId: item?.menuId || "",
            menuName: item?.menuName || "",
            price: item?.price || 0,
            category: item?.category || "",
            description: item?.description || "",
            useYn: item?.useYn || "Y",
        },
    });

    const handleSubmit = async (values: MenuFormValues) => {
        await onSubmit(values);
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="px-6 py-6 space-y-5">
                <FormField
                    control={form.control}
                    name="menuId"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="block text-xs font-bold text-muted-foreground dark:text-muted-foreground mb-1.5">
                                메뉴 ID <span className="text-primary">*</span>
                            </FormLabel>
                            <FormControl>
                                <Input
                                    className="block w-full sm:text-sm border-border dark:border-border dark:bg-input rounded-md py-2.5 placeholder:text-muted-foreground"
                                    placeholder="MNU-001"
                                    {...field}
                                    disabled={isEdit}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="flex gap-4">
                    <FormField
                        control={form.control}
                        name="menuName"
                        render={({ field }) => (
                            <FormItem className="w-1/2">
                                <FormLabel className="block text-xs font-bold text-muted-foreground dark:text-muted-foreground mb-1.5">
                                    메뉴명 <span className="text-primary">*</span>
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        className="block w-full sm:text-sm border-border dark:border-border dark:bg-input rounded-md py-2.5 placeholder:text-muted-foreground"
                                        placeholder="아메리카노"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="price"
                        render={({ field }) => (
                            <FormItem className="w-1/2">
                                <FormLabel className="block text-xs font-bold text-muted-foreground dark:text-muted-foreground mb-1.5">
                                    가격 <span className="text-primary">*</span>
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        type="number"
                                        className="block w-full sm:text-sm border-border dark:border-border dark:bg-input rounded-md py-2.5 placeholder:text-muted-foreground"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <div className="flex gap-4">
                    <FormField
                        control={form.control}
                        name="category"
                        render={({ field }) => (
                            <FormItem className="w-1/2">
                                <FormLabel className="block text-xs font-bold text-muted-foreground dark:text-muted-foreground mb-1.5">
                                    카테고리 <span className="text-primary">*</span>
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        className="block w-full sm:text-sm border-border dark:border-border dark:bg-input rounded-md py-2.5 placeholder:text-muted-foreground"
                                        placeholder="음료"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="useYn"
                        render={({ field }) => (
                            <FormItem className="w-1/2">
                                <FormLabel className="block text-xs font-bold text-muted-foreground dark:text-muted-foreground mb-1.5">
                                    사용 여부 <span className="text-primary">*</span>
                                </FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="선택" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="Y">사용 (Y)</SelectItem>
                                        <SelectItem value="N">미사용 (N)</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="block text-xs font-bold text-muted-foreground dark:text-muted-foreground mb-1.5">
                                설명
                            </FormLabel>
                            <FormControl>
                                <Textarea
                                    className="block w-full sm:text-sm border-border dark:border-border dark:bg-input rounded-md py-2.5 placeholder:text-muted-foreground resize-none"
                                    placeholder="메뉴 상세 설명"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="bg-background dark:bg-card border-t border-border dark:border-border pt-4 flex justify-end gap-2">
                    <Button
                        type="button"
                        variant="ghost"
                        onClick={onCancel}
                        disabled={form.formState.isSubmitting}
                        className="px-4 py-2 bg-background dark:bg-card text-muted-foreground dark:text-muted-foreground border border-border dark:border-border rounded-md text-sm font-bold hover:bg-muted dark:hover:bg-muted"
                    >
                        취소
                    </Button>
                    <Button
                        type="submit"
                        disabled={form.formState.isSubmitting}
                        className="px-6 py-2 bg-primary border border-transparent rounded-md shadow-sm text-sm font-bold text-white hover:opacity-90 hover:bg-primary disabled:opacity-50"
                    >
                        {form.formState.isSubmitting ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                저장 중...
                            </>
                        ) : (
                            "저장"
                        )}
                    </Button>
                </div>
            </form>
        </Form>
    );
}
