import { Suspense } from "react";
import Restaurants from "./_components/restaurants";
import { authOptions } from "../_lib/auth";
import { getServerSession } from "next-auth";
import { db } from "../_lib/prisma";

const RestaurantsPage = async () => {
  const session = await getServerSession(authOptions);
  const userFavoriteRestaurants = await db.userFavoriteRestaurant.findMany({
    where: {
      userId: session?.user?.id,
    },
    include: {
      restaurant: true,
    },
  });

  return (
    <Suspense>
      <Restaurants userFavoriteRestaurants={userFavoriteRestaurants} />
    </Suspense>
  );
};

export default RestaurantsPage;
