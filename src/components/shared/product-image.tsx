import { cn } from "@/lib/utils";
import React from "react";

interface Props {
  className?: string;
  imageUrl: string;
  size: 20 | 30 | 40;
}

export const ProductImage: React.FC<Props> = ({
  imageUrl,
  size,
  className,
}) => {
  return (
    <div
      className={cn(
        "flex items-center justify-center flex-1 relative w-full",
        className
      )}
    >
      <img
        src={imageUrl}
        alt="image"
        className={cn(
          "relative left-2 top-2 transition-all z-10 duration-300",
          {
            "size-[300px]": size == 20,
            "size-[400px]": size == 30,
            "size-[500px]": size == 40,
          }
        )}
      />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 border-dashed border-2 rounded-full border-gray-200 size-[450px]"></div>
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 border-dashed border-2 rounded-full border-gray-100 size-[370px]"></div>
    </div>
  );
};
