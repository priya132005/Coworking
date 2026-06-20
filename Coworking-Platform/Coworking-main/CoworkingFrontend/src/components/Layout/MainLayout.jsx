import Header from "../Headers/Headers";
import Footer from "../Footer/Footer";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function MainLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <ToastContainer position="top-right" autoClose={3000} />
      <Header />

      <main className="flex-grow">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
