import { Outlet } from "react-router-dom";
import Navbar from "../landing/Navbar";

function PublicLayout() {
  return (
    <>
      <Navbar />

      <main className="pt-10">
        <Outlet />
      </main>
    </>
  );
}

export default PublicLayout;