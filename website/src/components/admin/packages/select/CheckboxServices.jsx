import { Controller } from "react-hook-form";
import { Checkbox } from "@/components/ui/Checkbox";
import { useQuery } from "@tanstack/react-query";
import { takeItAllServices } from "@/services/servicesApi";

const CheckboxServices = ({ control, name, errors }) => {
  const {
    data: services,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["services"],
    queryFn: () => takeItAllServices(),
  });

  if (error) {
    return <div>Error loading services</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!services.length) return;

  return (
    <Controller
      control={ control }
      name={ name }
      render={ ({ field }) => (
        <div className="mt-5">
          <div className="space-y-4">
            { services.map((item) => (
              <div key={ item._id } className="flex items-center space-x-3">
                <Checkbox
                  id={ item._id }
                  checked={ field.value?.includes(item._id) }
                  onCheckedChange={ (checked) => {
                    const newValue = checked
                      ? [...(field.value || []), item._id]
                      : field.value?.filter((value) => value !== item._id) ||
                      [];
                    field.onChange(newValue);
                  } }
                />
                <label
                  htmlFor={ item._id }
                  className="block cursor-pointer text-[14px] font-medium"
                >
                  { item.name } -{ " " }
                  <span className="mt-0 text-red-500 font-semibold">
                    { item.discountPrice.toLocaleString() } ₫
                  </span>
                </label>
              </div>
            )) }
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
