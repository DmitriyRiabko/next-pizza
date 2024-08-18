
import { cn } from "@/shared/lib/utils";
import React from "react";
import { PizzaImage, Title } from ".";
import { Button } from "../ui/button";

interface Props {
  imageUrl: string;
  name: string;
  onClickAdd?: VoidFunction;
  className?: string;
}

export const ChoosePizzaForm: React.FC<Props> = ({
  className,
  name,
  imageUrl,
  onClickAdd,
}) => {
  const textDetails =
    "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Animi, explicabo!";
  const totalPrice = 250
    return (
    <div className={cn("flex flex-1", className)}>
      <PizzaImage imageUrl={imageUrl} size={30} />

      <div className="w-[490px] bg-[#f7f6f5] p-7">
        <Title text={name} size="md" className="font-extrabold mb-1" />
        <p className="text-gray-400 mb-5">{textDetails}</p>
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
