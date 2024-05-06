import { useContext } from "react";
import { CartContext } from "../_context/cart";
import CartItem from "./cart-item";
import { Card, CardContent } from "./ui/card";
import { formatCurrency } from "../_helpers/price";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import { createOrder } from "../_actions/order";
import { OrderStatus } from "@prisma/client";
import { signIn, useSession } from "next-auth/react";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface CartProps {
  // eslint-disable-next-line no-unused-vars
  setIsOpen: (isOpen: boolean) => void;
}

const Cart = ({ setIsOpen }: CartProps) => {
  const router = useRouter();

  const [isSubmitLoading, setIsSubmitLoading] = useState(false);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);

  const { products, subTotalPrice, totalPrice, totalDiscounts, clearCart } =
    useContext(CartContext);

  const { data } = useSession();

  const handleConfirmationDialog = () => setIsConfirmDialogOpen(true);
  const handleSignInClick = () => {
    signIn("google");
  };

  const handleFinishOrderClick = async () => {
    if (!data?.user) return;

    const restaurant = products[0].restaurant;

    try {
      setIsSubmitLoading(true);

      await createOrder({
        subTotalPrice,
        totalDiscounts,
        totalPrice,
        deliveryFee: restaurant.deliveryFee,
        deliveryTimeMinutes: restaurant.deliveryTimeMinutes,
        restaurant: {
          connect: { id: restaurant.id },
        },
        status: OrderStatus.CONFIRMED,
        user: {
          connect: { id: data.user.id },
        },
        products: {
          createMany: {
            data: products.map((product) => ({
              productId: product.id,
              quantity: product.quantity,
            })),
          },
        },
      });

      clearCart();

      setIsOpen(false);

      toast("Pedido realizado", {
        description: "O seu pedido foi enviado para o restaurante.",
        action: {
          label: "Acompanhar pedido",
          onClick: () => router.push("/my-orders"),
        },
      });
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitLoading(false);
    }
  };

  return (
    <>
      <div className="flex h-full flex-col py-5">
        {products.length ? (
          <>
            <div className="flex-auto space-y-4">
              {products.map((product) => (
                <CartItem cartProduct={product} key={product.id} />
              ))}
            </div>

            <div className="mt-6">
              <Card>
                <CardContent className="space-y-2 p-5">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foredround">Subtotal</span>
                    <span className="text-muted-foredround">
                      {formatCurrency(subTotalPrice)}
                    </span>
                  </div>

                  <Separator className="h-[0.5px]" />

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foredround">Descontos</span>
                    <span className="text-muted-foredround">
                      - {formatCurrency(totalDiscounts)}
                    </span>
                  </div>

                  <Separator className="h-[0.5px]" />

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foredround">Entrega</span>
                    {Number(products[0].restaurant.deliveryFee) > 0 ? (
                      <span className="text-muted-foredround">
                        {formatCurrency(
                          Number(products[0].restaurant.deliveryFee),
                        )}
                      </span>
                    ) : (
                      <span className="uppercase text-primary">Grátis</span>
                    )}
                  </div>

                  <Separator className="h-[0.5px]" />

                  <div className="flex items-center justify-between text-sm font-semibold">
                    <span>Total</span>
                    <span>
                      {formatCurrency(
                        totalPrice + Number(products[0].restaurant.deliveryFee),
                      )}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {data?.user ? (
              <Button
                className="mt-6 w-full"
                onClick={handleConfirmationDialog}
                disabled={isSubmitLoading}
              >
                Finalizar pedido
              </Button>
            ) : (
              <Button
                className="mt-6 w-full"
                onClick={handleSignInClick}
                disabled={isSubmitLoading}
              >
                Fazer Login
              </Button>
            )}
          </>
        ) : (
          <span>Carrinho vazio</span>
        )}
      </div>

      <AlertDialog
        open={isConfirmDialogOpen}
        onOpenChange={setIsConfirmDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Deseja finalizar o pedido?</AlertDialogTitle>
            <AlertDialogDescription>
              Ao prossegui você concorda com as nossas diretrizes.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Voltar</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleFinishOrderClick}
              disabled={isSubmitLoading}
            >
              {isSubmitLoading && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              Confirmar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default Cart;
