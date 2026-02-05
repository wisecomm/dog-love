/**
 * Menu Types
 */

import { PaginationParams } from '@/lib/base-resource-client';

export interface MenuDetail {
    menuId: string;
    menuName: string;
    price: number;
    category: string;
    description: string;
    useYn: string;
    sysInsertDtm?: string;
    sysUpdateDtm?: string;
}

export interface MenuSearchParams extends PaginationParams {
    menuName?: string;
    category?: string;
    useYn?: string;
}

export type MenuFilters = Omit<MenuSearchParams, keyof PaginationParams>;
