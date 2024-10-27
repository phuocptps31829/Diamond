import { useState } from "react";
import { Controller } from "react-hook-form";
import { Input } from "@/components/ui/Input";
import { useDebounce } from "use-debounce";
import { RadioGroup, RadioGroupItem } from "@/components/ui/RadioGroup";

const RadioServices = ({
  control,
  name,
  errors,
  onChange,
  index,
  services,
  defaultValue, // Thêm defaultValue vào props
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm] = useDebounce(searchTerm, 300);

  if (!services.length) return null;

  const filteredServices = services.filter((service) =>
    service.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
  );

  return (
    <Controller
      control={control}
      name={name}
      defaultValue={defaultValue}
      render={({ field }) => (
        <div>
          <Input
            type="text"
            placeholder="Tìm dịch vụ..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="mb-5 w-full border-primary-500"
          />
          <div className="scrollable-services">
            <RadioGroup
              value={field.value || defaultValue} // Thiết lập giá trị mặc định cho RadioGroup
              onValueChange={(newValue) => {
                field.onChange(newValue);
                if (onChange) {
                  onChange(newValue);
                }
              }}
            >
              <div className="space-y-4">
                {filteredServices.length === 0 ? (
                  <div className="text-center text-[14px] text-gray-600">
                    Không có dịch vụ phù hợp.
                  </div>
                ) : (
                  filteredServices.map((item) => (
                    <div
                      key={`${index}${item._id}`}
                      className="flex items-center space-x-3"
                    >
                      <RadioGroupItem
                        className="h-5 w-5 bg-white"
                        id={`${index}${item._id}`}
                        value={item._id}
                      />
                      <label
                        htmlFor={`${index}${item._id}`}
                        className="block cursor-pointer text-[14px] font-medium"
                      >
                        {item.name} -{" "}
                        <span className="mt-0 font-semibold text-red-500">
                          {item.discountPrice.toLocaleString()} ₫
                        </span>
                      </label>
                    </div>
                  ))
                )}
              </div>
            </RadioGroup>
          </div>

          {errors && errors[name] && (
            <span className="text-sm text-red-500">{errors[name].message}</span>
          )}
        </div>
      )}
    />
  );
};

export default RadioServices;