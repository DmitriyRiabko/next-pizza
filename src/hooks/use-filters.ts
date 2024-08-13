import { useSearchParams } from "next/navigation";
import { useSet } from "react-use";
import React from "react";

interface PriceRangeProps {
  priceFrom?: number;
  priceTo?: number;
}

export interface QueryFilters extends PriceRangeProps {
  pizzaType: string;
  sizes: string;
  ingredients: string;
}

export interface Filters {
  sizes: Set<string>;
  pizzaType: Set<string>;
  selectedIngredients: Set<string>;
  prices: PriceRangeProps;
}

interface ReturnProps extends Filters {
  setPrices: (name: keyof PriceRangeProps, value: number) => void;
  setPizzaTypes: (value: string) => void;
  setSizes: (value: string) => void;
  setSelectedIngredients: (value: string) => void;
}

export const useFilters = (): ReturnProps => {
  const searchParams = useSearchParams() as unknown as Map<
    keyof QueryFilters,
    string
  >;

  const [selectedIngredients, { toggle: toggleIngredients }] = useSet(
    new Set<string>(searchParams.get("ingredients")?.split(","))
  );

  const [prices, setPrices] = React.useState<PriceRangeProps>({
    priceFrom: Number(searchParams.get("priceFrom")) || undefined,
    priceTo: Number(searchParams.get("priceTo")) || undefined,
  });

  const [sizes, { toggle: toggleSizes }] = useSet(
    new Set<string>(
      searchParams.get("sizes") ? searchParams.get("sizes")?.split(",") : []
    )
  );
  const [pizzaType, { toggle: togglePizzaType }] = useSet(
    new Set<string>(
      searchParams.get("pizzaType")
        ? searchParams.get("pizzaType")?.split(",")
        : []
    )
  );

  const updatePrice = (name: keyof PriceRangeProps, value: number) => {
    setPrices((prev) => ({ ...prev, [name]: value }));
  };

  return {
    sizes,
    pizzaType,
    selectedIngredients,
    prices,
    setPrices: updatePrice,
    setPizzaTypes: togglePizzaType,
    setSizes: toggleSizes,
    setSelectedIngredients: toggleIngredients,
  };
};
