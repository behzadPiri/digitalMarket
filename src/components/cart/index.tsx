'use client';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui';
import { ShoppingCart, X } from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import { CartWithProduct } from '@/types';

export default function CardDropDown() {
  const { card, isLoading, removeToCartMutation } = useCart();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="relative">
          <ShoppingCart size={24} />
          {card?.length > 0 && (
            <span className="absolute -top-2 -right-2 w-5 h-5 text-white text-xs items-center justify-center bg-red-500 rounded-full">
              {card.length}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-72 p-4">
        <h4 className="text-lg font-semibold mb-4">Card Items</h4>
        {isLoading ? (
          <p>Loading...</p>
        ) : !card || card?.length === 0 ? (
          <p>Card is empty</p>
        ) : (
          <div className="space-y-3">
            {card?.map((item: CartWithProduct, index: number) => (
              <div
                key={index}
                className="flex justify-between items-center border-b pb-2"
              >
                <div>
                  <p className="text-sm font-medium">{item?.product?.name}</p>
                  <p className="text-xs text-gray-500">
                    {item?.product?.price?.toFixed(2)}
                  </p>
                  <p className="text-xs text-gray-500">{item?.quantity}</p>
                </div>
                <Button
                  onClick={() => removeToCartMutation.mutate(item?.productId)}
                  className="flex justify-center items-center"
                  variant="destructive"
                  size="sm"
                >
                  <X />
                </Button>
              </div>
            ))}
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
