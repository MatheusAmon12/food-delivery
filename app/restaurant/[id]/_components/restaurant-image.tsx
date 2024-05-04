"use client";

import { Restaurant, UserFavoriteRestaurant } from "@prisma/client";
import Image from "next/image";
import { Button } from "@/app/_components/ui/button";
import { ChevronLeftIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { HeartIcon } from "lucide-react";
import useToggleFavoriteRestaurant from "@/app/hooks/use-toggle-favorite-restaurant";
import { useSession } from "next-auth/react";
import { isRestaurantFavorited } from "@/app/_helpers/restaurant";

interface RestaurantImageProps {
  restaurant: Pick<Restaurant, "id" | "name" | "imageUrl">;
  userFavoriteRestaurants: UserFavoriteRestaurant[];
}

const RestaurantImage = ({
  restaurant,
  userFavoriteRestaurants,
}: RestaurantImageProps) => {
  const { data } = useSession();

  const router = useRouter();

  const isFavorite = isRestaurantFavorited(
    restaurant.id,
    userFavoriteRestaurants,
  );

  const { handleFavoriteClick: hanleFavoriteClick } =
    useToggleFavoriteRestaurant({
      restaurantId: restaurant.id,
      userId: data?.user.id,
      restaurantIsFavorited: isFavorite,
    });

  const handleBackClick = () => router.back();

  return (
    <div className="relative h-[215px] w-full">
      <Image
        src={restaurant.imageUrl}
        alt={restaurant.name}
        fill
        className="object-cover"
      />

      <Button
        className="absolute left-4 top-4 rounded-full bg-white text-foreground hover:text-white"
        size="icon"
        onClick={handleBackClick}
      >
        <ChevronLeftIcon />
      </Button>

      <Button
        className={`absolute right-4 top-4 rounded-full bg-gray-700 ${isFavorite && "bg-primary hover:bg-gray-700"}`}
        size="icon"
      >
        <HeartIcon
          size={20}
          className="fill-white"
          onClick={hanleFavoriteClick}
        />
      </Button>
    </div>
  );
};

export default RestaurantImage;
