'use client';

import { Plus } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';

import { VariantColumn, columns } from './columns';

interface VariantsClientProps {
  data: VariantColumn[];
}

export const VariantsClient: React.FC<VariantsClientProps> = ({ data }) => {
  const params = useParams();
  const router = useRouter();

  return (
    <>
      <div className='flex items-center justify-between'>
        <Heading
          title={`Variants (${data.length})`}
          description='Manage variants for your products'
        />
        <Button
          onClick={() =>
            router.push(`/${params.storeId}/products/${params.productId}/variants/new`)
          }
        >
          <Plus className='mr-2 h-4 w-4' /> Add New
        </Button>
      </div>
      <Separator />
      <DataTable columns={columns} data={data} />
    </>
  );
};
