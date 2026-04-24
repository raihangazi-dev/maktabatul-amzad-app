import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

export default function UserLayout({ children }) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}