"use client";

import { cn } from "@/lib/utils";
import { useCategoryStore } from "@/store/category.store";
import Link from "next/link";
import React from "react";

interface Props {
  className?: string;
}

const cats = [
  { id: 1, name: "Pizza" },
  { id: 2, name: "Combo" },
  { id: 3, name: "Sides" },
  { id: 4, name: "Cocktails" },
  { id: 5, name: "Coffee" },
  { id: 6, name: "Drinks" },
  { id: 7, name: "Desserts" },
];

export const Categories: React.FC<Props> = ({ className }) => {
  const categoryId = useCategoryStore((state) => state.activeId);
  return (
    <div
      className={cn("inline-flex gap-1 bg-gray-50 p-1 rounded-2xl", className)}
    >
      {cats.map((item) => (
        <a
          className={cn(
            "flex items-center font-bold h-11 rounded-2xl px-5",
            categoryId == item.id &&
              "bg-white shadow-md shadow-gray-200 text-primary"
          )}
          href={`/#${item.name}`}
          key={item.name}
        >
          <button>{item.name}</button>
        </a>
      ))}
    </div>
  );
};
