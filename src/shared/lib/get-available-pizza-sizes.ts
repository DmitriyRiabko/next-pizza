import { ProductItem } from "@prisma/client";
import { PizzaSize, PizzaType, pizzaSizes } from "../constants/pizza";
import { Variant } from "../components/shared";

export const getAvailablePizzaSizes = (
  type: PizzaType,
  items: ProductItem[]
): Variant[] => {
  const filteredPizzaByType = items.filter((item) => item.pizzaType == type);

  return pizzaSizes.map((item) => ({
    name: item.name,
    value: item.value,
    disabled: !filteredPizzaByType.some(
      (pizza) => Number(pizza.size) === Number(item.value)
    ),
  }));
};
