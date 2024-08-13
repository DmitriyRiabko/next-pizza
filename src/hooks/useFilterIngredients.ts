import { Api } from "@/services/api-client";
import { Ingredient } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { useSet } from "react-use";

interface ReturnProps {
  ingredients: Ingredient[];
  isLoading?: boolean;
  selectedIngredients: Set<string>;
  setSelectedIngredients: (ids: string[]) => void;
  onAddId: (id: string) => void;
}

export const useFilterIngredients = (): ReturnProps => {
  const [selectedIds, { toggle }] = useSet(new Set<string>([]));

  const { data: ingredients, isLoading } = useQuery({
    queryKey: ["getIngredients"],
    queryFn: () => Api.ingredients.getAll(),
  });

  const setSelectedIngredients = (ids: string[]) => {
    ids.forEach(selectedIds.add);
  };

  return {
    ingredients,
    selectedIngredients: selectedIds,
    isLoading,
    onAddId: toggle,
    setSelectedIngredients,
  };
};
