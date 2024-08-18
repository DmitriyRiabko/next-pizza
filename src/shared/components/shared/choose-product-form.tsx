
import { cn } from "@/shared/lib/utils";
import React from "react";
import { Title } from ".";
import { Button } from "../ui/button";

interface Props {
  imageUrl: string;
  name: string;
  ingredients: any[];
  items: any[];
  onClickAdd?: VoidFunction;
  className?: string;
}

export const ChooseProductForm: React.FC<Props> = ({
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
      <div className="flex items-center justify-center flex-1 relative w-full">
        <img
          src={imageUrl}
          alt={name}
          className="relative left-2 top-2 transition-all z-10 duration-300 size-[350px]"
        />
      </div>

      <div className="w-[490px] bg-[#f7f6f5] p-7">
        <Title text={name} size="md" className="font-extrabold mb-1" />
        <p className="text-gray-400 mb-5">{textDetails}</p>
        <Button
          className="h-[55px] [x-10 text-base rounded-[18px] w-full"
          variant={"default"}
        >
          Add to cart
        </Button>
      </div>
    </div>
  );
};
