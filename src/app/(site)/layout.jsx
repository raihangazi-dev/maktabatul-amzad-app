import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

export default function SiteLayout({ children }) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
