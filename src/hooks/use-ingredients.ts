import { Api } from "@/services/api-client";
import { useQuery } from "@tanstack/react-query";

export const useIngredients = () => {
  const { data: ingredients, isLoading } = useQuery({
    queryKey: ["getIngredients"],
    queryFn: () => Api.ingredients.getAll(),
  });

  return { ingredients, isLoading };
};
