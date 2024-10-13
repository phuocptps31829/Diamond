import { Checkbox } from "@/components/ui/Checkbox";

const Package = ({ index, pkg }) => {
    return (
        <label>
            <div className="relative mb-3 rounded-lg border border-primary-500 px-4 py-3">
                <Checkbox
                    id={ `checkbox-gt-${index}` }
                    className="absolute right-5 top-1/2"
                />
                <div className="mb-2 flex">
                    <img
                        src={ pkg.image }
                        className="h-[51px] w-[98px]"
                        alt={ `Image of $ pkg.title}` }
                    />
                    <div className="ml-2">
                        <p className="text-[13px] font-bold md:text-[17px]">
                            { pkg.title }
                        </p>
                        <span className="text-[12px] md:text-sm">Tiêu chuẩn</span>
                    </div>
                </div>
                <div>
                    <p>
                        Giá: <span>{ pkg.price }</span>
                    </p>
                    <p className="w-full max-w-[330px] text-justify text-[12px] font-light md:text-[15px]">
                        { pkg.description }
                    </p>
                </div>
            </div>
        </label>
    );
};

export default Package;