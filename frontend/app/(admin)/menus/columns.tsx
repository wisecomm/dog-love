"use client";

import { MenuDetail } from "./types";
import { SOColumnDef } from "so-grid-core";

export const getColumns = (): SOColumnDef<MenuDetail>[] => [
    {
        field: 'id',
        headerName: '',
        maxWidth: 30,
        checkboxSelection: true,
    },
    {
        field: 'menuId',
        headerName: '메뉴 ID',
        maxWidth: 100,
        sortable: true,
    },
    {
        field: 'menuName',
        headerName: '메뉴명',
        maxWidth: 200,
    },
    {
        field: 'price',
        headerName: '가격',
        maxWidth: 100,
        cellStyle: { textAlign: 'right' },
        valueFormatter: ({ value }) => Number(value).toLocaleString(),
    },
    {
        field: 'category',
        headerName: '카테고리',
        maxWidth: 120,
    },
    {
        field: 'useYn',
        headerName: '사용여부',
        maxWidth: 80,
        cellStyle: { textAlign: 'center' },
    },
    {
        field: 'description',
        headerName: '설명',
        maxWidth: 300,
    },
];
