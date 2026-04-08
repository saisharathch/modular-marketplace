import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import PageContainer from "../components/PageContainer";

function MainLayout() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar />

      <main className="px-6 py-8">
        <PageContainer>
          <Outlet />
        </PageContainer>
      </main>
    </div>
  );
}

export default MainLayout;
