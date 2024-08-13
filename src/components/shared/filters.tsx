"use client";

import React from "react";
import { CheckboxFilterGroup, Title } from ".";
import { Input } from "../ui/input";
import { RangeSlider } from "./range-slider";
import { useFilterIngredients } from "@/hooks/useFilterIngredients";
import { useSet } from "react-use";
import qs from "qs";
import { useRouter, useSearchParams } from "next/navigation";

interface Props {
  className?: string;
}

interface PriceRangeProps {
  priceFrom?: number;
  priceTo?: number;
}

interface QueryFilters extends PriceRangeProps {
  pizzaType: string;
  sizes: string;
  ingredients: string;
}

export const Filters: React.FC<Props> = ({ className }) => {
  const searchParams = useSearchParams() as unknown as Map<
    keyof QueryFilters,
    string
  >;
  const router = useRouter();
  const {  ingredients, isLoading, onAddId, selectedIngredients, setSelectedIngredients } =
    useFilterIngredients();

  const [sizes, { toggle: toggleSizes }] = useSet(
    new Set<string>(
      searchParams.get("sizes") ? searchParams.get("sizes")?.split(",") : []
    )
  );
  const [pizzaType, { toggle: togglePizzaType }] = useSet(
    new Set<string>(
      searchParams.get("pizzaType")
        ? searchParams.get("pizzaType")?.split(",")
        : []
    )
  );

  const [prices, setPrice] = React.useState<PriceRangeProps>({
    priceFrom: Number(searchParams.get("priceFrom")) || undefined,
    priceTo: Number(searchParams.get("priceTo")) || undefined,
  });

  const items = ingredients?.map((item) => ({
    value: String(item.id),
    text: item.name,
  }));

  const updatePrice = (name: keyof PriceRangeProps, value: number) => {
    setPrice({ ...prices, [name]: value });
  };

  React.useEffect(() => {
    const filters = {
      ...prices,
      pizzaType: Array.from(pizzaType),
      sizes: Array.from(sizes),
      ingredients: Array.from(selectedIngredients),
    };

    const query = qs.stringify(filters, { arrayFormat: "comma" });
    router.push(`?${query}`, { scroll: false });
  }, [prices, pizzaType, selectedIngredients, sizes]);

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
        onClickCheckbox={togglePizzaType}
        selected={pizzaType}
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
          value={[prices.priceFrom || 0, prices.priceTo || 1000]}
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
        selected={selectedIngredients}
      />
    </div>
  );
};
