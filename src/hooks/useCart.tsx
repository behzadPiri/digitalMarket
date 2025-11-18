'use client';

import { useMutation, useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';
import { queryClient } from '@/providers/ReactQueryProvider';

export const useCart = () => {
  const {
    data: card,
    error,
    isLoading,
  } = useQuery({
    queryKey: ['cart'],
    queryFn: async () => {
      const res = await fetch('/api/card');
      if (res.status === 200) {
        return res.json();
      } else {
        return toast.error(res.statusText);
      }
    },
    staleTime: 5 * 60 * 1000,
  });

  const addToCartMutation = useMutation({
    mutationFn: async (productId: string) => {
      const res = await fetch('/api/card', {
        method: 'POST',
        body: JSON.stringify({ productId }),
        headers: { 'Content-Type': 'application/json' },
      });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
      toast.success('Successfully added cart card');
    },
    onError: () => {
      toast.error('Failed to add product to cart');
    },
  });

  const removeToCartMutation = useMutation({
    mutationFn: async (productId: string) => {
      const res = await fetch('/api/card', {
        method: 'DELETE',
        body: JSON.stringify({ productId }),
        headers: { 'Content-Type': 'application/json' },
      });
      // if (res.status === 200) return toast.error("error remove product to card")
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
      toast.success('Successfully remove cart card');
    },
    onError: () => {
      toast.error('Failed to remove product to cart');
    },
  });

  return {
    card,
    error,
    isLoading,
    addToCartMutation,
    removeToCartMutation,
  };
};
