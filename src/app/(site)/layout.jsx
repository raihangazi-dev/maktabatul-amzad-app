import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import Breadcrumb from "@/components/Breadcrumb";
import { BreadcrumbProvider } from "@/context/BreadcrumbContext";

export default function SiteLayout({ children }) {
  return (
    <BreadcrumbProvider>
      <Header />
      <div className="breadcrumb-bar">
        <div className="container py-2">
          <Breadcrumb />
        </div>
      </div>
      <main>{children}</main>
      <Footer />
    </BreadcrumbProvider>
  );
}
