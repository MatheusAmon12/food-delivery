/* eslint-disable no-unused-vars */
"use client";

import { Prisma } from "@prisma/client";
import { ReactNode, createContext, useMemo, useState } from "react";
import { calculateProductTotalPrice } from "../_helpers/price";

export interface CartProduct
  extends Prisma.ProductGetPayload<{
    include: {
      restaurant: {
        select: {
          id: true;
          deliveryFee: true;
          deliveryTimeMinutes: true;
        };
      };
    };
  }> {
  quantity: number;
}

interface ICartContext {
  products: CartProduct[];
  subTotalPrice: number;
  totalPrice: number;
  totalDiscounts: number;
  totalQuantityProducts: number;
  // eslint-disable-next-line no-unused-vars
  addProductToCart: ({
    product,
    quantity,
    emptyCart,
  }: {
    product: Prisma.ProductGetPayload<{
      include: {
        restaurant: {
          select: {
            id: true;
            deliveryFee: true;
            deliveryTimeMinutes: true;
          };
        };
      };
    }>;
    quantity: number;
    emptyCart?: boolean;
  }) => void;
  // eslint-disable-next-line no-unused-vars
  decreaseProductQuantity: (productId: string) => void;
  // eslint-disable-next-line no-unused-vars
  increaseProductQuantity: (productId: string) => void;
  // eslint-disable-next-line no-unused-vars
  removeProductFromCart: (productId: string) => void;
  clearCart: () => void;
}

export const CartContext = createContext<ICartContext>({
  products: [],
  subTotalPrice: 0,
  totalPrice: 0,
  totalDiscounts: 0,
  totalQuantityProducts: 0,
  addProductToCart: () => {},
  decreaseProductQuantity: () => {},
  increaseProductQuantity: () => {},
  removeProductFromCart: () => {},
  clearCart: () => {},
});

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<CartProduct[]>([]);

  const totalQuantityProducts = useMemo(() => {
    return products.reduce((acc, product) => {
      return acc + product.quantity;
    }, 0);
  }, [products]);

  const subTotalPrice = useMemo(() => {
    return products.reduce((acc, product) => {
      return acc + Number(product.price) * product.quantity;
    }, 0);
  }, [products]);

  const totalPrice = useMemo(() => {
    return products.reduce((acc, product) => {
      return acc + calculateProductTotalPrice(product) * product.quantity;
    }, 0);
  }, [products]);

  const totalDiscounts = subTotalPrice - totalPrice;

  const addProductToCart = ({
    product,
    quantity,
    emptyCart,
  }: {
    product: Prisma.ProductGetPayload<{
      include: {
        restaurant: {
          select: {
            deliveryFee: true;
          };
        };
      };
    }>;
    quantity: number;
    emptyCart?: boolean;
  }) => {
    if (emptyCart) {
      setProducts([]);
    }

    const isProductAlreadyOnCart = products.some(
      (cartProduct) => cartProduct.id === product.id,
    );

    if (isProductAlreadyOnCart) {
      return setProducts((prev) =>
        prev.map((cartProduct) => {
          if (cartProduct.id === product.id) {
            return {
              ...cartProduct,
              quantity: cartProduct.quantity + quantity,
            };
          }

          return cartProduct;
        }),
      );

      return;
    }

    setProducts((prev) => [...prev, { ...product, quantity }]);
  };

  const decreaseProductQuantity = (productId: string) => {
    return setProducts((prev) =>
      prev.map((cartProduct) => {
        if (cartProduct.id === productId) {
          if (cartProduct.quantity === 1) {
            return cartProduct;
          }

          return {
            ...cartProduct,
            quantity: cartProduct.quantity - 1,
          };
        }

        return cartProduct;
      }),
    );
  };

  const increaseProductQuantity = (productId: string) => {
    return setProducts((prev) =>
      prev.map((cartProduct) => {
        if (cartProduct.id === productId) {
          return {
            ...cartProduct,
            quantity: cartProduct.quantity + 1,
          };
        }

        return cartProduct;
      }),
    );
  };

  const removeProductFromCart = (productId: string) => {
    return setProducts((prev) =>
      prev.filter((cartProduct) => cartProduct.id !== productId),
    );
  };

  const clearCart = () => {
    return setProducts([]);
  };

  return (
    <CartContext.Provider
      value={{
        products,
        addProductToCart,
        decreaseProductQuantity,
        increaseProductQuantity,
        removeProductFromCart,
        subTotalPrice,
        totalPrice,
        totalDiscounts,
        totalQuantityProducts,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
