// import {
//   LayoutDashboardIcon,
//   Menu,
//   Settings,
//   User,
//   X,
//   Box,
//   Database,
//   Server,
//   Code,
//   Filter,
// } from "lucide-react";
import { useState, type ReactNode } from "react";
import LeftSidebar from "./LeftSidebar";
import Navbar from "./Navbar";

interface MainLayoutProps {
    children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  const [isLeftSidebarOpen, setIsLeftSidebarOpen] = useState(false);
  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* MAIN SIDEBAR */}
        <LeftSidebar
          isOpen={isLeftSidebarOpen}
          onClose={() =>
            setIsLeftSidebarOpen((isLeftSidebarOpen) => !isLeftSidebarOpen)
          }
        />
        <div className="flex-1 flex flex-col h-screen relative">
          <Navbar onMenuClick={() => setIsLeftSidebarOpen(true)} />
        {/* PAGE CONTENT SLOT */}
        <main className="flex-1 overflow-y-auto">{children}</main>

        {/* <Footer /> */}
      </div>
      </div>
  );
};

export default MainLayout;
