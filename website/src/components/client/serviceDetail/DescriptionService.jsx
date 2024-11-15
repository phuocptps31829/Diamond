import { Skeleton } from "@/components/ui/Skeleton";
import PropTypes from "prop-types";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/Accordion";
const DescriptionService = ({ medicalPackage, isLoading, service }) => {
  if (isLoading) {
    return (
      <div className="mx-auto max-w-screen-2xl">
        <div className="mx-auto max-w-7xl py-0 md:py-4">
          <div className="container rounded-md bg-white p-5">
            <Skeleton className="mb-4 h-8 w-3/4" />
            <Skeleton className="mb-4 h-6 w-full" />
            <Skeleton className="mb-4 h-6 w-full" />
            <Skeleton className="mb-4 h-6 w-full" />
            <Skeleton className="mb-4 h-6 w-full" />
            <Skeleton className="mb-4 h-6 w-full" />
            <Skeleton className="mb-4 h-6 w-full" />
            <Skeleton className="mb-4 h-6 w-full" />
          </div>
        </div>
      </div>
    );
  }
  const { details, name } = service || medicalPackage || {};

  return (
    <div className="mx-auto max-w-screen-2xl">
      <div className="mx-auto max-w-7xl py-0 md:py-4">
        <div className="container rounded-md bg-white py-2">
          <Accordion type="single" collapsible>
            <AccordionItem value="details" className="border-none">
              <AccordionTrigger className="p-0" toggleLabel>
                <h2 className=" text-sm md:text-2xl font-bold">Chi tiết về {name}</h2>
              </AccordionTrigger>

              <AccordionContent>
                <div
                  dangerouslySetInnerHTML={{ __html: details }}
                  className="render-details"
                />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </div>
  );
};

DescriptionService.propTypes = {
  isLoading: PropTypes.bool,
  medicalPackage: PropTypes.object,
  service: PropTypes.object,
};

export default DescriptionService;
