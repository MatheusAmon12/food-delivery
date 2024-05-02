import { useContext } from "react";
import { CartContext } from "../_context/cart";
import CartItem from "./cart-item";
import { Card, CardContent } from "./ui/card";
import { formatCurrency } from "../_helpers/price";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";

const Cart = () => {
  const { products, subTotalPrice, totalPrice, totalDiscounts } =
    useContext(CartContext);

  return (
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

          <Button className="mt-6 w-full">Finalizar pedido</Button>
        </>
      ) : (
        <span>Carrinho vazio</span>
      )}
    </div>
  );
};

export default Cart;
