import { Input } from "antd";
import React, { useEffect, useState } from "react";

interface SliderRangeProps {
  value: [number, number];
  onChange: (value: [number, number]) => void;
  min: number;
  max: number;
}

const PriceRange: React.FC<SliderRangeProps> = ({
  value,
  onChange,
  min,
  max,
}) => {
  const [minPrice, setMinPrice] = useState(value[0] ?? min);
  const [maxPrice, setMaxPrice] = useState(value[1] ?? max);

  useEffect(() => {
    setMinPrice(value[0]);
    setMaxPrice(value[1]);
  }, [value]);

  const handleMinPriceChange = (v: string) => {
    const newMin = Math.max(min, Math.min(Number(v), max));
    setMinPrice(newMin);
    onChange([newMin, maxPrice]);
  };

  const handleMaxPriceChange = (v: string) => {
    const newMax = Math.min(max, Math.max(Number(v), min));
    setMaxPrice(newMax);
    onChange([minPrice, newMax]);
  };

  return (
    <div className="bg-white">
      <div className="flex gap-4">
        <div className="flex-1 relative">
          <span className="absolute left-2 top-1/2 transform -translate-y-1/2">
            от
          </span>
          <Input
            type="number"
            value={minPrice?.toString()}
            onChange={(e) => handleMinPriceChange(e.target.value)}
            placeholder="Минимальная цена"
            className="border rounded-lg p-2 pl-8 w-full"
          />
        </div>
        <div className="flex-1 relative">
          <span className="absolute left-2 top-1/2 transform -translate-y-1/2">
            до
          </span>
          <Input
            type="number"
            value={maxPrice?.toString()}
            onChange={(e) => handleMaxPriceChange(e.target.value)}
            placeholder="Максимальная цена"
            className="border rounded-lg p-2 pl-8 w-full"
          />
        </div>
      </div>
    </div>
  );
};

export default PriceRange;
