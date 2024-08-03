import React from "react";
import { Title } from ".";
import { FilterCheckbox } from "./filter-checkbox";
import { Input } from "../ui/input";
import { RangeSlider } from "./range-slider";

interface Props {
  className?: string;
}

export const Filters: React.FC<Props> = ({ className }) => {
  return (
    <div className={className}>
      <Title text="Filters" size="sm" className="mb-5 font-bold" />
      <div className="flex flex-col gap-4">
        <FilterCheckbox text="Can create" value="1" />
        <FilterCheckbox text="New" value="2" />
      </div>
      <div className="mt-5 border-y border-neutral-100 py-6 pb-7">
        <p className="font-bold mb-3">Price range</p>
        <div className="flex gap-3 mb-5 ">
          <Input
            type="number"
            placeholder="0"
            min={0}
            max={40}
            defaultValue={0}
          />
          <Input type="number" min={100} max={40} placeholder="400" />
        </div>
        <RangeSlider min={0} max={40} step={1} value={[0,40]}/>
      </div>
      
    </div>
  );
};
