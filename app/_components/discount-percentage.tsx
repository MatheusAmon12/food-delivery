import { Product } from "@prisma/client";
import { ArrowDownIcon } from "lucide-react";

interface DiscountPercentageProps {
  product: Pick<Product, "discountPercentage">;
}

const DiscountPercentage = ({ product }: DiscountPercentageProps) => {
  return (
    <div className="flex items-center gap-[2px] rounded-full bg-primary px-2 py-[2px] text-white">
      <ArrowDownIcon size={12} />
      <span className="text-xs font-semibold">
        {
          //adicionar valor do db
          product.discountPercentage ? product.discountPercentage : "10%"
        }
      </span>
    </div>
  );
};

export default DiscountPercentage;
