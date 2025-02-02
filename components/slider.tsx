import { Slider } from "@heroui/react";
import { SliderLoadProps } from "@/types";

export default function SliderLoad({ name, value, onChange }: SliderLoadProps) {
  const handleChange = (value: number | number[]) => {
    if (typeof value === "number" && onChange) {
      onChange(value); // Pass the number to the parent handler
    }
  };

  return (
    <Slider
      className="max-w-md"
      defaultValue={value}
      label={name}
      maxValue={100}
      minValue={0}
      step={10}
      onChange={handleChange}
    />
  );
}
