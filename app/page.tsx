import { db } from "./_lib/prisma";
import CategoryList from "./_components/category-list";
import Header from "./_components/header";
import Search from "./_components/search";
import ProductList from "./_components/product-list";
import { Button } from "./_components/ui/button";
import { ChevronRightIcon } from "lucide-react";
import PromoBanner from "./_components/promo-banner";
import RestaurantList from "./_components/restaurant-list";
import Link from "next/link";

const fetch = async () => {
  const getProducts = await db.product.findMany({
    take: 10,
    include: {
      restaurant: {
        select: {
          name: true,
        },
      },
    },
  });

  const getBurguersCategory = await db.category.findFirst({
    where: {
      name: "Hambúrgueres",
    },
  });

  const getPizzasCategory = await db.category.findFirst({
    where: {
      name: "Pizzas",
    },
  });

  const [products, burguerCategory, pizzasCategory] = await Promise.all([
    getProducts,
    getBurguersCategory,
    getPizzasCategory,
  ]);

  return { products, burguerCategory, pizzasCategory };
};

const Home = async () => {
  const { products, burguerCategory, pizzasCategory } = await fetch();

  return (
    <div className="lg:flex lg:flex-col">
      <Header />

      <div className="lg:bg-right-center px-5 pt-6 lg:relative lg:h-[500px] lg:bg-primary lg:bg-hungry-image lg:bg-cover lg:pb-[167px] lg:pl-36 lg:pt-[245px]">
        <Search />
      </div>

      <div className="lg:px-36">
        <div className="px-5 pt-6">
          <CategoryList />
        </div>
        <div className="md:flex">
          <div className="order-2 px-5 pt-6 lg:w-1/2">
            <Link href={`/categories/${pizzasCategory?.id}/products`}>
              <PromoBanner
                src="/promo-banner-01.png"
                alt="Até 30% de desconto em pizzas"
              />
            </Link>
          </div>
          <div className="order-2 px-5 pt-6 lg:w-1/2">
            <Link href={`/categories/${burguerCategory?.id}/products`}>
              <PromoBanner
                src="/promo-banner-02.png"
                alt="A partir de R$17,90 em lanches"
              />
            </Link>
          </div>
        </div>
        <div className="space-y-4 pt-6 lg:order-1">
          <div className="flex items-center justify-between px-5">
            <h2 className="font-semibold">Pedidos Recomendados</h2>
            <Button
              variant="ghost"
              className="h-fit p-0 text-primary hover:bg-transparent"
              asChild
            >
              <Link href="/products/recommended">
                Ver todos
                <ChevronRightIcon />
              </Link>
            </Button>
          </div>
          <ProductList products={products} />
        </div>
        <div className="space-y-4 py-6 lg:order-3">
          <div className="flex items-center justify-between px-5">
            <h2 className="font-semibold">Restaurantes Recomendados</h2>
            <Button
              variant="ghost"
              className="h-fit p-0 text-primary hover:bg-transparent"
              asChild
            >
              <Link href={`/restaurant/recommended`}>
                Ver todos
                <ChevronRightIcon />
              </Link>
            </Button>
          </div>
          <RestaurantList />
        </div>
      </div>
    </div>
  );
};

export default Home;
