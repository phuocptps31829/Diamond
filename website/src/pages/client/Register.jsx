import RegisterComponent from "../../components/client/Account/register/Register";
import useScrollToTop from "@/hooks/useScrollToTop";
export default function Register() {
    useScrollToTop();
    return (
        <RegisterComponent />
    )
        ;
}