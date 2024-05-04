import { toast } from "sonner";
import { toggleFavoriteRestaurant } from "../_actions/restaurant";
import { useRouter } from "next/navigation";

interface UseToggleFavoriteRestaurantProps {
  userId?: string;
  restaurantId: string;
  restaurantIsFavorited?: boolean;
}

const useToggleFavoriteRestaurant = ({
  userId,
  restaurantId,
  restaurantIsFavorited,
}: UseToggleFavoriteRestaurantProps) => {
  const router = useRouter();

  const handleFavoriteClick = async () => {
    if (!userId) return;
    try {
      await toggleFavoriteRestaurant(userId, restaurantId);

      toast(
        restaurantIsFavorited
          ? "Restaurante desfavoritado com sucesso!"
          : "Restaurante favoritado com sucesso!",
        {
          action: {
            label: "Ver Favoritos",
            onClick: () => router.push("/my-favorite-restaurants"),
          },
        },
      );
    } catch (error) {
      toast.error("Erro ao favoritar o restaurante!");
    }
  };

  return { handleFavoriteClick };
};

export default useToggleFavoriteRestaurant;
