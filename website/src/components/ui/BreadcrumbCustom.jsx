import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/Breadcrumb";
import { Link } from "react-router-dom";

const BreadcrumbCustom = ({ data }) => {
  return (
    <Breadcrumb className="mb-4">
      <BreadcrumbList>
        {data.map((d, i) => (
          <React.Fragment key={i}>
            <BreadcrumbItem className="gap-2.5">
              {d.href ? (
                <Link
                  className={`text-base ${i === 0 ? "text-primary-500" : ""}`}
                  to={d.href}
                >
                  {d.title}
                </Link>
              ) : (
                <BreadcrumbPage
                  className={`text-base font-medium ${i === 0 ? "text-primary-500" : ""}`}
                >
                  {d.title}
                </BreadcrumbPage>
              )}
            </BreadcrumbItem>
            {i < data.length - 1 && <BreadcrumbSeparator />}
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default BreadcrumbCustom;
