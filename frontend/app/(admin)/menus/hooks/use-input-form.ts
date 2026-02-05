import { useEffect } from "react";
import { useForm, UseFormReturn, Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { MenuDetail } from "../types";

export const menuFormSchema = z.object({
    menuId: z.string().min(1, "메뉴 ID는 필수입니다."),
    menuName: z.string().min(1, "메뉴명은 필수입니다."),
    price: z.coerce.number().min(0, "가격은 0 이상이어야 합니다."),
    category: z.string().min(1, "카테고리는 필수입니다."),
    description: z.string().optional(),
    useYn: z.string().min(1, "사용 여부는 필수입니다."),
});

export type MenuFormValues = z.infer<typeof menuFormSchema>;

export interface UseInputFormProps {
    item?: MenuDetail | null;
    onSubmit: (data: Partial<MenuDetail>) => Promise<void>;
}

export interface UseInputFormReturn {
    form: UseFormReturn<MenuFormValues>;
    handleSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
    isEdit: boolean;
}

const defaultValues: MenuFormValues = {
    menuId: "",
    menuName: "",
    price: 0,
    category: "",
    description: "",
    useYn: "Y",
};

export function useInputForm({ item, onSubmit }: UseInputFormProps): UseInputFormReturn {
    const isEdit = !!item;

    const form = useForm<MenuFormValues>({
        resolver: zodResolver(menuFormSchema) as Resolver<MenuFormValues>,
        defaultValues,
    });

    useEffect(() => {
        if (item) {
            form.reset({
                menuId: item.menuId || "",
                menuName: item.menuName || "",
                price: item.price || 0,
                category: item.category || "",
                description: item.description || "",
                useYn: item.useYn || "Y",
            });
        } else {
            form.reset(defaultValues);
        }
    }, [item, form]);

    const onFormSubmit = async (data: MenuFormValues) => {
        await onSubmit(data);
    };

    return {
        form,
        handleSubmit: form.handleSubmit(onFormSubmit),
        isEdit,
    };
}
