import { branchApi } from "@/services/branchesApi";
import BannerContact from "../../components/client/contact/Banner";
import ContactForm from "../../components/client/contact/ContactForm";
import useScrollToTop from "@/hooks/useScrollToTop";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/Skeleton";
import Loading from "@/components/ui/Loading";
import NotFound from "@/components/ui/NotFound";
export default function Contact() {

  return (
    <div className="bg-[#E8F2F7]">
      <BannerContact />
      <ContactForm  />
    </div>
  );
}
