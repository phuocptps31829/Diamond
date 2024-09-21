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
                { data.map((d, i) => <BreadcrumbItem key={ i } className="gap-2.5">
                    { d.href ? <Link className={ `text-lg ${i === 0 ? 'text-primary-500' : ''}` } to={ d.href }>{ d.title }</Link> : <BreadcrumbItem className="text-lg">
                        <BreadcrumbPage className={ `text-lg font-medium ${i === 0 ? 'text-primary-500' : ''}` }>
                            { d.title }
                        </BreadcrumbPage>
                    </BreadcrumbItem> }
                    { i < data.length - 1 && <BreadcrumbSeparator /> }
                </BreadcrumbItem>) }
            </BreadcrumbList>
        </Breadcrumb>

    );
};

export default BreadcrumbCustom;