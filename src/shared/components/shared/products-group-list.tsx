"use client";

import React from "react";
import { cn } from "@/shared/lib/utils";
import { Title } from ".";
import { ProductCard } from "./product-card";
import { useIntersection } from "react-use";
import { useCategoryStore } from "@/shared/store/category.store";

interface Props {
  title: string;
  products: any[];
  categoryId: number;
  listClassName?: string;
  className?: string;
}

export const ProductsGroupList: React.FC<Props> = ({
  title,
  products,
  listClassName,
  categoryId,
  className,
}) => {
  const setActiveCategoryId = useCategoryStore((state) => state.setActiveId);
  const intersectionRef = React.useRef(null);

  const intersection = useIntersection(intersectionRef, { threshold: 0.4 });

  React.useEffect(() => {
    if (intersection?.isIntersecting) {
      setActiveCategoryId(categoryId);
    }
  }, [categoryId, intersection?.isIntersecting, title]);

  ;
  

  return (
    <div className={cn(className)} id={title} ref={intersectionRef}>
      <Title text={title} size="lg" className="font-extrabold mb-5" />
      <div className={cn("grid grid-cols-3 gap-[50px]", listClassName)}>
        {products.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            name={product.name}
            price={product.items[0].price}
            imageUrl={product.imageUrl}
          />
        ))}
      </div>
    </div>
  );
};
