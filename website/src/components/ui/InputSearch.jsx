import * as React from "react";

const InputSearch = React.forwardRef(({ className, icon, type, ...props }, ref) => {
  return (
    <div className={`w-full ${className}`}>
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
            type={type}
            className={ `h-10 min-h-11 w-full appearance-none rounded-md border border-gray-200 bg-white py-2 text-sm placeholder-gray-600 opacity-75 transition duration-200 ease-in-out focus:border-primary-600 focus:outline-none focus:ring-0 md:h-auto ${icon ? "pl-10" : "pl-5"
            }` }
            ref={ref}
            {...props}
          />
        </div>
      </div>
    </div>
  );
});
InputSearch.displayName = "Input";

export { InputSearch };
