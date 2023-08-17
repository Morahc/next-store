'use client';

import { ColumnDef } from '@tanstack/react-table';

import { CellAction } from './cell-action';

export type VariantColumn = {
  id: string;
  price: string;
  stock: number;
  color: string;
  size: string;
  discount: string;
};

export const columns: ColumnDef<VariantColumn>[] = [
  {
    accessorKey: 'price',
    header: 'Price',
  },
  {
    accessorKey: 'stock',
    header: 'Count in stock',
  },
  {
    accessorKey: 'color',
    header: 'Color',
    cell: ({ row }) => (
      <div className='flex items-center gap-x-2'>
        {row.original.color}
        <div
          className='h-6 w-6 rounded-full border'
          style={{ backgroundColor: row.original.color }}
        />
      </div>
    ),
  },
  {
    accessorKey: 'size',
    header: 'Size',
  },
  {
    accessorKey: 'discount',
    header: 'Discount',
  },
  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
