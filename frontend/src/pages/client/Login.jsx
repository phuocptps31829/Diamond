import LoginComponent from "../../components/client/Account/login/Login";
import useScrollToTop from "@/hooks/useScrollToTop";
export default function Login() {
  useScrollToTop();
  return <LoginComponent />;
}
