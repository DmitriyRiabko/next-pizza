import { Api } from "@/services/api-client";
import { Ingredient } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { useSet } from "react-use";

interface ReturnProps {
  ingredients: Ingredient[];
  isLoading?: boolean;
}

export const useFilterIngredients = (): ReturnProps => {
  const [set, { toggle }] = useSet(new Set<string>([]));

  const { data: ingredients, isLoading } = useQuery({
    queryKey: ["getIngredients"],
    queryFn: () => Api.ingredients.getAll(),
  });

  return { ingredients, isLoading };
};
