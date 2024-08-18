"use client";

import React from "react";
import { CheckboxFilterGroup, Title } from ".";
import { Input } from "../ui/input";
import { RangeSlider } from "./range-slider";

import { useFilters, useIngredients, useQueryFilters } from "@/shared/hooks";

interface Props {
  className?: string;
}

export const Filters: React.FC<Props> = ({ className }) => {
  const { ingredients, isLoading } = useIngredients();
  const filters = useFilters();
  useQueryFilters(filters);

  const items = ingredients?.map((item) => ({
    value: String(item.id),
    text: item.name,
  }));

  const updatePrices = (prices: number[]) => {
    filters.setPrices("priceFrom", prices[0]);
    filters.setPrices("priceTo", prices[1]);
  };

  return (
    <div className={className}>
      <Title text="Filters" size="sm" className="mb-5 font-bold" />
      <CheckboxFilterGroup
        title={"Dough type"}
        name="pizzaType"
        className="mb-5"
        items={[
          {
            text: "Thin",
            value: "1",
          },
          {
            text: "Ordinary",
            value: "2",
          },
        ]}
        onClickCheckbox={filters.setPizzaTypes}
        selected={filters.pizzaType}
      />
      <CheckboxFilterGroup
        title={"Sizes"}
        name="sizes"
        className="mb-5"
        items={[
          {
            text: "20 sm",
            value: "20",
          },
          {
            text: "30 sm",
            value: "30",
          },
          {
            text: "40 sm",
            value: "40",
          },
        ]}
        onClickCheckbox={filters.setSizes}
        selected={filters.sizes}
      />
      <div className="flex flex-col gap-4"></div>
      <div className="mt-5 border-y border-neutral-100 py-6 pb-7">
        <p className="font-bold mb-3">Price range</p>
        <div className="flex gap-3 mb-5 ">
          <Input
            type="number"
            placeholder="0"
            min={0}
            max={40}
            value={filters.prices.priceFrom}
            onChange={(e) =>
              filters.setPrices("priceFrom", Number(e.target.value))
            }
          />
          <Input
            type="number"
            min={100}
            max={40}
            value={filters.prices.priceTo}
            placeholder="1000"
            onChange={(e) =>
              filters.setPrices("priceTo", Number(e.target.value))
            }
          />
        </div>
        <RangeSlider
          min={0}
          max={1000}
          step={10}
          value={[
            filters.prices.priceFrom || 0,
            filters.prices.priceTo || 1000,
          ]}
          onValueChange={updatePrices}
        />
      </div>
      <CheckboxFilterGroup
        searchInputPlaceholder="Search..."
        title={"Ingridients"}
        className="mt-5"
        limit={6}
        items={items || []}
        defaultItems={items?.slice(0, 6)}
        loading={isLoading}
        onClickCheckbox={filters.setSelectedIngredients}
        selected={filters.selectedIngredients}
      />
    </div>
  );
};
