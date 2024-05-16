import { db } from "@/app/_lib/prisma";
import { notFound } from "next/navigation";
import RestaurantImage from "./_components/restaurant-image";
import Image from "next/image";
import { StarIcon } from "lucide-react";
import DeliveryInfo from "@/app/_components/delivery-info";
import ProductList from "@/app/_components/product-list";
import CartBanner from "./_components/cart-banner";
import { getServerSession } from "next-auth";
import Header from "@/app/_components/header";

interface RestaurantPageProps {
  params: {
    id: string;
  };
}

const RestaurantPage = async ({ params: { id } }: RestaurantPageProps) => {
  const restaurant = await db.restaurant.findUnique({
    where: {
      id,
    },
    include: {
      categories: {
        orderBy: {
          createdAt: "desc",
        },
        include: {
          products: {
            where: {
              restaurantId: id,
            },
            include: {
              restaurant: {
                select: {
                  name: true,
                },
              },
            },
          },
        },
      },
      products: {
        take: 10,
        include: {
          restaurant: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  });

  if (!restaurant) return notFound();

  const session = await getServerSession();

  const userFavoriteRestaurants = await db.userFavoriteRestaurant.findMany({
    where: {
      userId: session?.user?.id,
    },
  });

  return (
    <>
      <Header className="sm:hidden lg:flex" />
      <div className="lg:px-36 lg:pt-10">
        <div className="lg:flex lg:min-h-[380px] lg:space-x-8 lg:pb-8">
          <RestaurantImage
            restaurant={restaurant}
            userFavoriteRestaurants={userFavoriteRestaurants}
          />
          <div className="relative z-50 mt-[-1.5rem] rounded-tl-3xl rounded-tr-3xl bg-white py-5 lg:block lg:w-[402px]">
            <div className="flex items-center justify-between px-5 pt-5 lg:pt-0 ">
              <div className="flex items-center gap-[0.375rem]">
                <div className="relative h-8 w-8">
                  <Image
                    src={restaurant.imageUrl}
                    alt={restaurant.name}
                    fill
                    className="rounded-full object-cover"
                  />
                </div>
                <h1 className="text-xl font-semibold">{restaurant.name}</h1>
              </div>
              <div className="left-2 top-2 flex items-center gap-[3px] rounded-full bg-foreground px-2 py-[2px] text-white">
                <StarIcon
                  className="fill-yellow-500 text-yellow-500"
                  size={12}
                />
                <span className="text-xs font-semibold">5.0</span>
              </div>
            </div>
            <div className="px-5">
              <DeliveryInfo restaurant={restaurant} />
            </div>
            <div className="mt-3 flex space-x-4 overflow-x-scroll px-5 [&::-webkit-scrollbar]:hidden">
              {restaurant.categories.map((category) => (
                <div
                  className="min-w-[167px] gap-4 rounded-lg bg-[#F4F4F4] text-center"
                  key={category.id}
                >
                  <span className="text-xs text-muted-foreground">
                    {category.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-3 space-y-4">
          {/*TODO mostrar mais pedidos */}
          <h2 className="px-5 font-semibold">Mais Pedidos</h2>
          <ProductList products={restaurant.products} />
        </div>
        <div className="mt-6 space-y-4">
          {restaurant.categories.map((category) => (
            <div key={category.id}>
              <h2 className="px-5 font-semibold">{category.name}</h2>
              <ProductList products={category.products} />
            </div>
          ))}
        </div>

        <CartBanner restaurant={restaurant} />
      </div>
    </>
  );
};

export default RestaurantPage;
