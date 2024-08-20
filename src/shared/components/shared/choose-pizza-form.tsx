import { cn } from "@/shared/lib/utils";
import React from "react";
import { GroupVariants, PizzaImage, Title } from ".";
import { Button } from "../ui/button";
import {
  PizzaSize,
  PizzaType,

  pizzaTypes,
} from "@/shared/constants/pizza";
import { Ingredient, ProductItem } from "@prisma/client";
import { IngredientItem } from "./ingredient-item";
import { usePizzaOptions } from "@/shared/hooks/use-pizza-options";
import { getPizzaDetails } from "@/shared/lib/get-pizza-details";

interface Props {
  ingredients: Ingredient[];
  imageUrl: string;
  name: string;
  items: ProductItem[];
  onClickAddCart?: VoidFunction;
  className?: string;
}

export const ChoosePizzaForm: React.FC<Props> = ({
  className,
  name,
  imageUrl,
  onClickAddCart,
  ingredients,
  items,
}) => {
  const {
    type,
    size,
    selectedIngredients,
    availableSizes,
    setSize,
    setType,
    addIngredient,
  } = usePizzaOptions(items);

  const handleClickAdd = () => {
    onClickAddCart?.();
  };

  const { textDetails, totalPrice } = getPizzaDetails(
    type,
    size,
    items,
    ingredients,
    selectedIngredients
  );

  return (
    <div className={cn("flex flex-1", className)}>
      <PizzaImage imageUrl={imageUrl} size={size} />

      <div className="w-[490px] bg-[#f7f6f5] p-7">
        <Title text={name} size="md" className="font-extrabold mb-1" />
        <p className="text-gray-400 mb-5">{textDetails}</p>
        <div className="fles flex-col gap-4 my-5">
          <GroupVariants
            items={availableSizes}
            value={String(size)}
            onClick={(value) => setSize(Number(value) as PizzaSize)}
          />
          <GroupVariants
            items={pizzaTypes}
            value={String(type)}
            onClick={(value) => setType(Number(value) as PizzaType)}
          />
        </div>

        <div className="bg-gray-50 p-5 rounded-md h-[420px] overflow-auto scrollbar mt-5">
          {" "}
          <div className="grid grid-cols-3 gap-3">
            {ingredients?.map((item) => (
              <IngredientItem
                key={item.id}
                imageUrl={item.imageUrl}
                name={item.name}
                price={item.price}
                active={selectedIngredients.has(item.id)}
                onClick={() => addIngredient(item.id)}
              />
            ))}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3"></div>
        <Button
          className="h-[55px] [x-10 text-base rounded-[18px] w-full"
          variant={"default"}
        >
          Add to cart by {totalPrice} $
        </Button>
      </div>
    </div>
  );
};
