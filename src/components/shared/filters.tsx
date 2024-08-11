"use client";

import React from "react";
import { CheckboxFilterGroup, Title } from ".";
import { FilterCheckbox } from "./filter-checkbox";
import { Input } from "../ui/input";
import { RangeSlider } from "./range-slider";
import { useFilterIngredients } from "@/hooks/useFilterIngredients";
import { useSet } from "react-use";

interface Props {
  className?: string;
}

interface PriceRangeProps {
  priceFrom: number;
  priceTo: number;
}

export const Filters: React.FC<Props> = ({ className }) => {
  const { ingredients, isLoading, onAddId, selectedIds } =
    useFilterIngredients();

  const [sizes, { toggle: toggleSizes }] = useSet(new Set<string>([]));

  const [prices, setPrice] = React.useState<PriceRangeProps>({
    priceFrom: 0,
    priceTo: 1000,
  });

  const items = ingredients?.map((item) => ({
    value: String(item.id),
    text: item.name,
  }));

  const updatePrice = (name: keyof PriceRangeProps, value: number) => {
    setPrice({ ...prices, [name]: value });
  };

  return (
    <div className={className}>
      <Title text="Filters" size="sm" className="mb-5 font-bold" />
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
        onClickCheckbox={toggleSizes}
        selected={sizes}
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
            value={prices.priceFrom}
            onChange={(e) => updatePrice("priceFrom", Number(e.target.value))}
          />
          <Input
            type="number"
            min={100}
            max={40}
            value={prices.priceTo}
            placeholder="400"
            onChange={(e) => updatePrice("priceTo", Number(e.target.value))}
          />
        </div>
        <RangeSlider
          min={0}
          max={1000}
          step={10}
          value={[prices.priceFrom, prices.priceTo]}
          onValueChange={([from, to]) =>
            setPrice({ priceFrom: from, priceTo: to })
          }
        />
      </div>
      <CheckboxFilterGroup
        searchInputPlaceholder="Search..."
        title={"Ingridients"}
        className="mt-5"
        limit={6}
        items={items}
        defaultItems={items?.slice(0, 6)}
        loading={isLoading}
        onClickCheckbox={onAddId}
        selected={selectedIds}
      />
    </div>
  );
};
