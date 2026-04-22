import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import FloatingBlobs from "./FloatingBlobs";
import CursorTrail from "./CursorTrail";
import PageTransition from "./PageTransition";
import UnderwaterScene from "./UnderwaterScene";
import { useIsMobile } from "@/hooks/use-mobile";

const Layout = () => {
  const isMobile = useIsMobile();
  return (
    <div className="min-h-screen flex flex-col relative overflow-x-hidden">
      {!isMobile && <div className="liquid-metal-bg" aria-hidden />}
      <FloatingBlobs />
      {!isMobile && <UnderwaterScene />}
      {!isMobile && <CursorTrail />}
      <Navbar />
      <main className="flex-1 pt-24">
        <PageTransition>
          <Outlet />
        </PageTransition>
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
