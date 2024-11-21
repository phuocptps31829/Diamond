import { Controller } from "react-hook-form";
import { Input } from "@/components/ui/Input";

const AgeField = ({ control, errors }) => {
  return (
    <>
      <div className="h-full">
        <div className="flex space-x-4">
          <div className="flex flex-col">
            <label className="mb-3 block text-[14px]">
              Tuổi tối thiểu cho gói: <span className="text-red-500">*</span>
            </label>
            <Controller
              name="age.min"
              control={control}
              render={({ field }) => (
                <Input
                  type="number"
                  value={field.value}
                  onChange={(e) => field.onChange(parseInt(e.target.value, 10))}
                  className="w-full"
                  placeholder="Nhập tuổi tối thiểu"
                />
              )}
            />
            {errors.age?.min && (
              <p className="text-sm text-red-500">{errors.age.min.message}</p>
            )}
          </div>

          <div className="flex flex-col">
            <label className="mb-3 block text-[14px]">
              Tuổi tối đa cho gói: <span className="text-red-500">*</span>
            </label>
            <Controller
              name="age.max"
              control={control}
              render={({ field }) => (
                <Input
                  type="number"
                  value={field.value}
                  onChange={(e) => field.onChange(parseInt(e.target.value, 10))}
                  className="w-full"
                  placeholder="Nhập tuổi tối đa"
                />
              )}
            />
          </div>
        </div>
        {errors.age?.max && (
          <p className="mt-3 text-sm text-red-500">{errors.age.max.message}</p>
        )}
      </div>
    </>
  );
};

export default AgeField;
