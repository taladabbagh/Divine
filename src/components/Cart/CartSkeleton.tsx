// components/CartSkeleton.tsx
import React from 'react';
import { Skeleton } from '@mui/material';

const CartSkeleton: React.FC = () => {
  return (
    <div>
      {[...Array(3)].map((_, index) => (
        <div key={index} className="flex justify-between items-center mb-4">
          <Skeleton variant="rectangular" width={80} height={80} />
          <div className="flex flex-col flex-1 ml-4">
            <Skeleton variant="text" width="80%" />
            <Skeleton variant="text" width="60%" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default CartSkeleton;