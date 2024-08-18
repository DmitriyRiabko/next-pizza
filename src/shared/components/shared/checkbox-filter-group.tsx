"use client";

import React from "react";
import { cn } from "@/shared/lib/utils";
import { FilterChecboxProps, FilterCheckbox } from "./filter-checkbox";
import { Input } from "../ui/input";
import { Skeleton } from "../ui/skeleton";

type Item = FilterChecboxProps;

interface Props {
  title: string;
  items: Item[];
  defaultItems?: Item[];
  limit?: number;
  searchInputPlaceholder?: string;
  defaultValue?: string[];
  className?: string;
  loading?: boolean;
  selected?: Set<string>;
  name?: string;
  onClickCheckbox?: (id: string) => void;
}

export const CheckboxFilterGroup: React.FC<Props> = ({
  title,
  items,
  defaultItems,
  limit = 5,
  searchInputPlaceholder,
  className,
  onClickCheckbox,
  selected,
  defaultValue,
  name,
  loading,
}) => {
  const [showAll, setShowAll] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState("");

  if (loading) {
    return (
      <div className={className}>
        <p className="font-bold mb-5">Loading...</p>

        {new Array(limit).map((item, index) => (
          <Skeleton key={index} className="h-6 mb-5 rounded-[8px]" />
        ))}
      </div>
    );
  }


  const list = showAll
    ? items.filter((item) =>
        item.text.toLowerCase().includes(searchValue.toLowerCase())
      )
    : (defaultItems || items).slice(0, limit);

  const handleSearchValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  return (
    <div className={cn(className)}>
      <p className="font-bold mb-3">{title}</p>
      <div className="mt-5">
        {showAll && (
          <Input
            placeholder={searchInputPlaceholder}
            className="bg-gray-50 border-none mb-2"
            onChange={handleSearchValue}
          />
        )}
      </div>
      <div className="flex flex-col gap-4 max-h-96 pr-2 overflow-auto scrollbar">
        {list?.map((item, index) => (
          <FilterCheckbox
            key={item.value}
            text={item.text}
            value={item.value}
            endAdornment={item.endAdornment}
            checked={selected?.has(item.value)}
            onCheckedChange={() => onClickCheckbox?.(item.value)}
            name={item.name}
          />
        ))}
      </div>

      {items?.length > limit && (
        <div className={showAll ? "border-t border-t-neutral-100 mt-4" : ""}>
          <button
            onClick={() => setShowAll(!showAll)}
            className="text-primary mt-3"
          >
            {showAll ? " Hide" : "+ Show all"}
          </button>
        </div>
      )}
    </div>
  );
};
