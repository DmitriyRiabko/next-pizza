import { cn } from "@/lib/utils";
import React from "react";
import { ProductImage, Title } from ".";
import { Button } from "../ui/button";

interface Props {
  imageUrl: string;
  name: string;
  ingredients: any[];
  items: any[];
  onClickAdd?: VoidFunction;
  className?: string;
}

export const ChoosePizzaForm: React.FC<Props> = ({
  className,
  name,
  imageUrl,
  ingredients,
  items,
  onClickAdd,
}) => {
  const textDetails =
    "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Animi, explicabo!";
  return (
    <div className={cn("flex flex-1", className)}>
      <ProductImage imageUrl={imageUrl} size={30} />

      <div className="w-[490px] bg-[#f7f6f5] p-7">
        <Title text={name} size="md" className="font-extrabold mb-1" />
        <p className="text-gray-400">{textDetails}</p>
        <Button className="h-[55px] [x-10 text-base rounded-[18px] w-full" variant={"default"}>Add to cart</Button>
      </div>
    </div>
  );
};
