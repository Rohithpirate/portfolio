import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import FloatingBlobs from "./FloatingBlobs";
import CursorTrail from "./CursorTrail";
import PageTransition from "./PageTransition";
import UnderwaterScene from "./UnderwaterScene";

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col relative overflow-x-hidden">
      <div className="liquid-metal-bg" aria-hidden />
      <FloatingBlobs />
      <UnderwaterScene />
      <CursorTrail />
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
