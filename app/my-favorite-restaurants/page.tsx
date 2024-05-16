import Header from "@/app/_components/header";
import RestaurantItem from "../_components/restaurant-item";
import { db } from "@/app/_lib/prisma";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import { authOptions } from "../_lib/auth";

const MyFavoriteRestaurants = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return notFound();
  }

  const userFavoriteRestaurants = await db.userFavoriteRestaurant.findMany({
    where: {
      userId: session.user.id,
    },
    include: {
      restaurant: true,
    },
  });
  return (
    <>
      <Header />
      <div className="px-6 py-6 lg:px-36">
        <h2 className="mb-6 text-lg font-semibold">
          Restaurantes Recomendados
        </h2>
        <div className="flex w-full flex-col gap-6 lg:grid lg:grid-cols-3 lg:gap-[21px]">
          {userFavoriteRestaurants.length > 0 ? (
            userFavoriteRestaurants.map(({ restaurant }) => (
              <RestaurantItem
                key={restaurant.id}
                restaurant={restaurant}
                className="min-w-full max-w-full"
                userFavoriteRestaurants={userFavoriteRestaurants}
              />
            ))
          ) : (
            <h3>Você ainda não possui restaurantes favoritos</h3>
          )}
        </div>
      </div>
    </>
  );
};

export default MyFavoriteRestaurants;
