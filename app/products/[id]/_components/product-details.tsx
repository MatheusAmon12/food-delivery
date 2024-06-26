"use client";

import Cart from "@/app/_components/cart";
import DeliveryInfo from "@/app/_components/delivery-info";
import DiscountPercentage from "@/app/_components/discount-percentage";
import ProductList from "@/app/_components/product-list";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/app/_components/ui/alert-dialog";
import { Button } from "@/app/_components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/app/_components/ui/sheet";
import { CartContext } from "@/app/_context/cart";
import {
  calculateProductTotalPrice,
  formatCurrency,
} from "@/app/_helpers/price";
import { Prisma } from "@prisma/client";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import Image from "next/image";
import { useContext, useState } from "react";
import ProductImage from "./product-image";
import Header from "@/app/_components/header";

interface ProductDetailsProps {
  product: Prisma.ProductGetPayload<{
    include: {
      restaurant: true;
    };
  }>;
  complementaryProducts: Prisma.ProductGetPayload<{
    include: {
      restaurant: true;
    };
  }>[];
}

const ProductDetails = ({
  product,
  complementaryProducts,
}: ProductDetailsProps) => {
  const [quantity, setQuantity] = useState(1);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAlertDialogOpen, setIsAlertDialogOpen] = useState(false);

  const { addProductToCart, products } = useContext(CartContext);

  const addToCart = ({ emptyCart }: { emptyCart?: boolean }) => {
    addProductToCart({ product: { ...product, quantity }, emptyCart });
    setIsCartOpen(true);
  };

  const handleAddToCartClick = () => {
    const hasDifferentRestaurantProduct = products.some(
      (cartProduct) => cartProduct.restaurantId !== product.restaurantId,
    );

    if (hasDifferentRestaurantProduct) return setIsAlertDialogOpen(true);

    addToCart({
      emptyCart: false,
    });
  };

  const handleIncreaseQuantityClick = () =>
    setQuantity((currentQuantity) => currentQuantity + 1);
  const handleDecreaseQuantityClick = () =>
    setQuantity((currentQuantity) => {
      if (currentQuantity === 1) return 1;

      return currentQuantity - 1;
    });

  return (
    <>
      <Header className="hidden lg:flex" />
      <div className="lg:px-36 lg:py-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-8">
          <ProductImage product={product} className="lg:rounded-lg" />
          <div className="relative z-50 mt-[-1.5rem] rounded-tl-3xl rounded-tr-3xl border-2 border-muted bg-white py-5 lg:mt-0 lg:rounded-lg">
            <div className="flex items-center gap-[0.375rem] px-5">
              <div className="relative h-6 w-6">
                <Image
                  src={product.restaurant.imageUrl}
                  alt={product.restaurant.name}
                  fill
                  className="rounded-full object-cover"
                />
              </div>
              <span className="text-xs text-muted-foreground">
                {product.restaurant.name}
              </span>
            </div>
            <h1 className="mb-3 mt-1 px-5 text-xl font-semibold lg:mt-0">
              {product.name}
            </h1>
            <div className="flex justify-between px-5">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-semibold">
                    {formatCurrency(calculateProductTotalPrice(product))}
                  </h2>
                  {product.discountPercentage && (
                    <DiscountPercentage product={product} />
                  )}
                </div>
                {product.discountPercentage > 0 && (
                  <p className="text-sm text-muted-foreground">
                    De {formatCurrency(Number(product.price))}
                  </p>
                )}
              </div>
              <div className="flex items-center gap-2 text-center">
                <Button
                  size="icon"
                  variant="ghost"
                  className="border border-solid border-muted-foreground"
                  onClick={handleDecreaseQuantityClick}
                >
                  <ChevronLeftIcon />
                </Button>
                <span className="w-4">{quantity}</span>
                <Button size="icon" onClick={handleIncreaseQuantityClick}>
                  <ChevronRightIcon />
                </Button>
              </div>
            </div>
            <div className="px-5">
              <DeliveryInfo restaurant={product.restaurant} />
            </div>
            <div className="mt-6 space-y-3 px-5">
              <h3 className="font-semibold">Sobre</h3>
              <p className="text-sm text-muted-foreground">
                {product.description}
              </p>
            </div>
            <div className="mt-6 hidden px-5 lg:block">
              <Button
                className="w-full font-semibold"
                onClick={handleAddToCartClick}
              >
                Adicionar ao carrinho
              </Button>
            </div>
          </div>
        </div>
        <div className="mt-6 space-y-3">
          <h3 className="px-5 font-semibold">
            Mais em {product.restaurant.name}
          </h3>
          <ProductList products={complementaryProducts} />
        </div>

        <div className="mt-6 px-5 lg:hidden">
          <Button
            className="w-full font-semibold"
            onClick={handleAddToCartClick}
          >
            Adicionar ao carrinho
          </Button>
        </div>

        <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
          <SheetContent className="w-[90vw]">
            <SheetHeader>
              <SheetTitle className="text-left">Carrinho</SheetTitle>
            </SheetHeader>
            <Cart setIsOpen={setIsCartOpen} />
          </SheetContent>
        </Sheet>

        <AlertDialog
          open={isAlertDialogOpen}
          onOpenChange={setIsAlertDialogOpen}
        >
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Você só pode adicionar itens de um mesmo restaurante por vez
              </AlertDialogTitle>
              <AlertDialogDescription>
                Ao adicionar um produto de restaurantes diferentes é preciso que
                seu carrinho seja limpo antes.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              <AlertDialogAction onClick={() => addToCart({ emptyCart: true })}>
                Adicionar
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </>
  );
};

export default ProductDetails;
