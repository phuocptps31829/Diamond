import { RadioGroup, RadioGroupItem } from "@/components/ui/RadioGroup";
import { Label } from "@/components/ui/Label";
import { Controller } from "react-hook-form";

const RadioGroupField = ({ name, label, options, control }) => {
  return (
    <div className="flex h-full flex-col">
      <Label
        htmlFor={name}
        className="mb-5 block text-sm font-medium leading-none"
      >
        {label} <span className="text-red-500">*</span>
      </Label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <RadioGroup
            value={field.value}
            onValueChange={field.onChange}
            className="flex space-x-5"
          >
            {options.map((option) => (
              <div key={option.value} className="flex items-center">
                <RadioGroupItem
                  value={option.value}
                  id={`${name}-${option.value}`}
                />
                <Label
                  htmlFor={`${name}-${option.value}`}
                  className="ml-2 cursor-pointer text-sm text-[13px]"
                >
                  {option.label}
                </Label>
              </div>
            ))}
          </RadioGroup>
        )}
      />
    </div>
  );
};

export default RadioGroupField;
