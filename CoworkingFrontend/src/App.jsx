import React from "react";
import { Outlet } from "react-router-dom";
import Headers from "./components/Headers/Headers";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <>
      <Headers />
      <Outlet />   {/* Routes will render here */}
      <Footer />
    </>
  );
}

export default App;
