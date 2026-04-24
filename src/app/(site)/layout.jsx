import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import Breadcrumb from "@/components/Breadcrumb";

export default function SiteLayout({ children }) {
  return (
    <>
      <Header />
      <div className="breadcrumb-bar">
        <div className="container py-2">
          <Breadcrumb />
        </div>
      </div>
      <main>{children}</main>
      <Footer />
    </>
  );
}
