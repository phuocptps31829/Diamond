import { useState } from "react";
import { useController } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function InputCustom({
  name,
  label,
  icon,
  autocomplete,
  placeholder,
  type,
  control,
  errors,
  min,
  max,
  disabled = false,
  required = false,
  value,
  className,
}) {
  const [showPassword, setShowPassword] = useState(false);
  const {
    field: { onChange, onBlur, value: fieldValue, ref },
  } = useController({
    name,
    control,
    defaultValue: value,
  });


  const error = errors[name];
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (e) => {
    const inputValue = e.target.value;
    if (type === "number") {
      const numericValue = inputValue === "" ? "" : Number(inputValue);
      onChange(numericValue);
    } else {
      onChange(inputValue);
    }
  };

  return (
    <div className={`w-full ${className}`}>
      <label
        className="mb-2 block text-sm font-medium text-black w-fit"
        htmlFor={`${name}Input`}
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div>
        <div className="relative">
          {icon && (
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <span className="text-gray-800 focus-within:text-gray-900 sm:text-base">
                {icon}
              </span>
            </div>
          )}
          <input
            onChange={handleChange}
            onBlur={onBlur}
            value={fieldValue}
            ref={ref}
            type={showPassword ? "text" : type}
            disabled={disabled}
            autoComplete={autocomplete || ""}
            id={`${name}Input`}
            placeholder={placeholder}
            min={min}
            max={max}
            className={`h-10 min-h-11 w-full appearance-none rounded-md border border-gray-300 bg-white py-2 text-sm placeholder-gray-600 opacity-75 transition duration-200 ease-in-out focus:border-primary-600 focus:outline-none focus:ring-0 md:h-auto ${
              icon ? "pl-10" : "pl-5"
            }`}
          />
          {type === "password" && (
            <div
              className="absolute inset-y-0 right-0 flex cursor-pointer items-center pr-3"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </div>
          )}
          {name === "authCode" && (
            <button
              type="button"
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-base font-bold text-primary-500 hover:text-blue-700 md:text-lg"
              style={{ paddingRight: "20px" }}
            >
              Nhận mã
            </button>
          )}
        </div>
        {error && (
          <small className="mt-1 block text-sm text-red-500">
            {error.message}
          </small>
        )}
      </div>
    </div>
  );
}

export default InputCustom;
