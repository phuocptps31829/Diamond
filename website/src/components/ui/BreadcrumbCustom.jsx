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
                <BreadcrumbItem>
                    Trang quản trị
                </BreadcrumbItem>
                { data.length > 0 && <BreadcrumbSeparator /> }
                { data.map((d, i) => <BreadcrumbItem key={ i }>
                    { d.href ? <Link to={ d.href }>{ d.title }</Link> : <BreadcrumbItem>
                        <BreadcrumbPage>{ d.title }</BreadcrumbPage>
                    </BreadcrumbItem> }
                    { i < data.length - 1 && <BreadcrumbSeparator /> }
                </BreadcrumbItem>) }
            </BreadcrumbList>
        </Breadcrumb>

    );
};

export default BreadcrumbCustom;