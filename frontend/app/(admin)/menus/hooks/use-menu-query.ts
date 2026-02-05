/**
 * Menu Query Hooks
 */

import { BaseResourceClient } from '@/lib/base-resource-client';
import { createResourceHooks } from '@/hooks/query/resource-factory';
import { MenuDetail, MenuSearchParams } from '../types';

// 리소스 클라이언트 생성
const client = new BaseResourceClient<MenuDetail>({
    baseUrl: '/v1/mgmt/menus',
    resourceName: 'menus',
});

// 팩토리를 통해 표준 훅 생성
export const {
    keys: menuKeys,
    useList: useMenus,
    useDetail: useMenu,
    useCreate: useCreateMenu,
    useUpdate: useUpdateMenu,
    useDelete: useDeleteMenu,
} = createResourceHooks<MenuDetail, MenuSearchParams>(client);
