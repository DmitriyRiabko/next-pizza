import qs from "qs";
import { Filters } from "./use-filters";
import React from "react";
import { useRouter } from "next/navigation";

export const useQueryFilters = (filters: Filters) => {
  const router = useRouter();

  React.useEffect(() => {
    const params = {
      ...filters.prices,
      pizzaType: Array.from(filters.pizzaType),
      sizes: Array.from(filters.sizes),
      ingredients: Array.from(filters.selectedIngredients),
    };

    const query = qs.stringify(params, { arrayFormat: "comma" });
    router.push(`?${query}`, { scroll: false });
  }, [filters, router]);
};
