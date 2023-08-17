import prismadb from '@/lib/prismadb';

import { VariantForm } from './components/variant-form';

const VariantPage = async ({ params }: { params: { productId: string; storeId: string, variantId: string } }) => {
  const variant = await prismadb.variant.findUnique({
    where: {
      id: params.variantId,
    },
  });

  const colors = await prismadb.color.findMany({
    where: {
      storeId: params.storeId,
    },
  });

  const sizes = await prismadb.size.findMany({
    where: {
      storeId: params.storeId,
    },
  });

  const discounts = await prismadb.discount.findMany({
    where: {
      storeId: params.storeId,
    },
  });

  return (
    <div className='flex-col'>
      <div className='flex-1 space-y-4 p-8 pt-6'>
        <VariantForm colors={colors} sizes={sizes} discounts={discounts} initialData={variant} />
      </div>
    </div>
  );
};

export default VariantPage;
