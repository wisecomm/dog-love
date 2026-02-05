/**
 * useMenuManagement Hook
 * 
 * 메뉴 관리 페이지의 비즈니스 로직 캡슐화
 */

import { useState, useCallback, useEffect } from 'react';
import { PaginationState } from '@tanstack/react-table';
import { useMenus, useCreateMenu, useUpdateMenu, useDeleteMenu } from './use-menu-query';
import { useToast } from '@/hooks/use-toast';
import { MenuDetail, MenuFilters } from '../types';
import { SortModel } from 'so-grid-core';

export function useMenuManagement() {
    const { toast } = useToast();

    // 검색 상태
    const [searchParams, setSearchParams] = useState<MenuFilters>({
        menuName: '',
        category: '',
        useYn: '',
    });

    const [sort, setSort] = useState<string[] | undefined>(undefined);

    // 페이지네이션 상태
    const [pagination, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: 10,
    });

    // 다이얼로그 상태
    const [dialogOpen, setDialogOpen] = useState(false);
    const [selectedMenu, setSelectedMenu] = useState<MenuDetail | null>(null);

    // API 훅
    const { data: menusData, isLoading, isError, error, refetch } = useMenus({
        page: pagination.pageIndex + 1,
        size: pagination.pageSize,
        sort,
        ...searchParams,
    });

    useEffect(() => {
        if (isError) {
            toast({
                title: '목록 조회 실패',
                description: error?.message || '메뉴 목록을 불러오는 중 오류가 발생했습니다.',
                variant: 'destructive',
            });
        }
    }, [isError, error, toast]);

    const createMutation = useCreateMenu();
    const updateMutation = useUpdateMenu();
    const deleteMutation = useDeleteMenu();

    /**
     * 검색 핸들러
     */
    const onSearch = useCallback((params: Partial<MenuFilters>) => {
        setSearchParams((prev) => ({ ...prev, ...params }));
        setPagination(prev => ({ ...prev, pageIndex: 0 }));
        setTimeout(() => refetch(), 0);
    }, [refetch]);

    const onSortChange = useCallback((sortModel: SortModel[]) => {
        const newSort = sortModel.map(s => `${s.colId},${s.sort}`);
        setSort(newSort.length > 0 ? newSort : undefined);
        setPagination(prev => ({ ...prev, pageIndex: 0 }));
    }, []);

    /**
     * 다이얼로그 열기
     */
    const openDialog = useCallback((menu?: MenuDetail) => {
        setSelectedMenu(menu || null);
        setDialogOpen(true);
    }, []);

    /**
     * 다이얼로그 닫기
     */
    const closeDialog = useCallback(() => {
        setDialogOpen(false);
        setSelectedMenu(null);
    }, []);

    /**
     * 저장 (생성/수정)
     */
    const handleSubmit = useCallback(async (data: Partial<MenuDetail>) => {
        try {
            if (selectedMenu) {
                await updateMutation.mutateAsync({
                    id: selectedMenu.menuId,
                    data,
                });
                toast({ title: '수정 완료', description: '메뉴가 수정되었습니다.', variant: 'success' });
            } else {
                await createMutation.mutateAsync(data);
                toast({ title: '등록 완료', description: '새 메뉴가 등록되었습니다.', variant: 'success' });
            }
            closeDialog();
        } catch (error) {
            const message = error instanceof Error ? error.message : '저장에 실패했습니다.';
            toast({ title: '저장 실패', description: message, variant: 'destructive' });
        }
    }, [selectedMenu, createMutation, updateMutation, toast, closeDialog]);

    /**
     * 삭제
     */
    const handleDelete = useCallback(async (menuIds: string[]) => {
        if (menuIds.length === 0) {
            toast({ title: '알림', description: '삭제할 메뉴를 선택해주세요.', variant: 'default' });
            return;
        }

        if (!confirm(`${menuIds.length}건의 메뉴를 삭제하시겠습니까?`)) return;

        const results = await Promise.allSettled(
            menuIds.map(id => deleteMutation.mutateAsync(id))
        );

        const succeeded = results.filter(r => r.status === 'fulfilled').length;
        if (succeeded === menuIds.length) {
            toast({ title: '삭제 완료', description: `${succeeded}개의 메뉴가 삭제되었습니다.`, variant: 'success' });
        } else {
            toast({ title: '일부 삭제 실패', description: `${succeeded}개 성공, ${menuIds.length - succeeded}개 실패`, variant: 'destructive' });
        }
    }, [deleteMutation, toast]);

    return {
        menus: menusData?.list || [],
        totalRows: menusData?.total || 0,
        isLoading,
        pagination,
        onPaginationChange: setPagination,
        searchParams,
        onSearch,
        onSortChange,
        dialogOpen,
        selectedMenu,
        openDialog,
        closeDialog,
        handleSubmit,
        handleDelete,
    };
}
