import prismadb from '@/lib/prismadb';

import { format } from 'date-fns';
import { formatter } from '@/lib/utils';
import { VariantColumn } from './components/columns';
import { VariantsClient } from './components/client';

const VariantPage = async ({ params }: { params: { productId: string; storeId: string } }) => {
  const variants = await prismadb.variant.findMany({
    where: {
      productId: params.productId,
    },
    include: {
      color: true,
      size: true,
      discount: true,
    },
  });

  const formattedVariants: VariantColumn[] =
    variants.map((item) => ({
      id: item.id,
      price: formatter.format(item.price.toNumber()),
      stock: item.stock,
      color: item.color?.name || 'None',
      size: item.size?.name || 'None',
      discount: item.discount?.name || 'None',
    })) || [];

  return (
    <div className='flex-col'>
      <div className='flex-1 space-y-4 p-8 pt-6'>
        <VariantsClient data={formattedVariants} />
      </div>
    </div>
  );
};

export default VariantPage;
