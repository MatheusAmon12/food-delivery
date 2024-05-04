import { UserFavoriteRestaurant } from "@prisma/client";

export const isRestaurantFavorited = (
  restaurantId: string,
  userFavoriteRestaurants: UserFavoriteRestaurant[],
) =>
  userFavoriteRestaurants.some(
    (restaurant) => restaurant.restaurantId === restaurantId,
  );
