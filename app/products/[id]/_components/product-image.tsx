"use client";

import { Product } from "@prisma/client";
import Image from "next/image";
import { Button } from "@/app/_components/ui/button";
import { ChevronLeftIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { cn } from "@/app/_lib/utils";

interface ProductImageProps {
  product: Pick<Product, "name" | "imageUrl">;
  className?: string;
}

const ProductImage = ({ product, className }: ProductImageProps) => {
  const router = useRouter();

  const handleBackClick = () => router.back();

  return (
    <div className="relative h-[360px] w-full lg:h-auto">
      <Image
        src={product.imageUrl}
        alt={product.name}
        fill
        className={cn("object-cover", className)}
      />

      <Button
        className="absolute left-4 top-4 rounded-full bg-white text-foreground hover:text-white"
        size="icon"
        onClick={handleBackClick}
      >
        <ChevronLeftIcon />
      </Button>
    </div>
  );
};

export default ProductImage;
