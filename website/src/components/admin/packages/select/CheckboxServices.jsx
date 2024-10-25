import { useState } from "react";
import { Controller } from "react-hook-form";
import { Checkbox } from "@/components/ui/Checkbox";
import { Input } from "@/components/ui/Input";
import { useQuery } from "@tanstack/react-query";
import { serviceApi } from "@/services/servicesApi";
import { useDebounce } from "use-debounce";

const CheckboxServices = ({ control, name, errors, onChange, index }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm] = useDebounce(searchTerm, 300);
  const {
    data: services,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["services"],
    queryFn: () => serviceApi.takeItAllServices(),
  });

  if (error) return <div></div>;
  if (isLoading) return <div>Loading...</div>;
  if (!services.length) return;

  const filteredServices = services.filter((service) =>
    service.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()),
  );

  return (
    <Controller
      control={ control }
      name={ name }
      render={ ({ field }) => (
        <div>
          <Input
            type="text"
            placeholder="Tìm dịch vụ..."
            value={ searchTerm }
            onChange={ (e) => setSearchTerm(e.target.value) }
            className="mb-5 ml-2 mt-2 w-[90%] border-primary-500"
          />
          <div className="scrollable-services">
            <div className="space-y-4">
              { filteredServices.length === 0 ? (
                <div className="text-center text-[14px] text-gray-600">
                  Không có dịch vụ phù hợp.
                </div>
              ) : (
                filteredServices.map((item) => (
                  <div
                    key={ `${index}${item._id}` }
                    className="flex items-center space-x-3"
                  >
                    <Checkbox
                      id={ `${index}${item._id}` }
                      checked={ field.value?.includes(item._id) }
                      onCheckedChange={ (checked) => {
                        const newValue = checked
                          ? [...(field.value || []), item._id]
                          : field.value?.filter(
                            (value) => value !== item._id,
                          ) || [];
                        field.onChange(newValue);
                        if (onChange) {
                          onChange(newValue);
                        }
                      } }
                    />
                    <label
                      htmlFor={ `${index}${item._id}` }
                      className="block cursor-pointer text-[14px] font-medium"
                    >
                      { item.name } -{ " " }
                      <span className="mt-0 font-semibold text-red-500">
                        { item.discountPrice.toLocaleString() } ₫
                      </span>
                    </label>
                  </div>
                ))
              ) }
            </div>
          </div>

          { errors[name] && (
            <span className="text-sm text-red-500">{ errors[name].message }</span>
          ) }
        </div>
      ) }
    />
  );
};

export default CheckboxServices;