// import React from "react";
import { LogOut, Menu } from "lucide-react";
import { useAuth } from "../context/AuthContext";

// It receives 'onMenuClick' because the Layout owns the Sidebar state, 
// but the Navbar owns the Button that triggers it.

interface NavbarProps {
    onMenuClick: () => void,
    sidebarOpen: boolean
}
const Navbar = ({ onMenuClick, sidebarOpen }:NavbarProps) => {
    const {user, logout} = useAuth()
    const onLogout = ()=> {
        logout();
    }
  return (
    <nav className="flex items-center justify-between p-4 bg-white border-b border-gray-200">
      {/* LEFT: Menu Trigger + Title */}
      <div className="flex items-center gap-3">
        <button 
          onClick={onMenuClick} 
          className={`p-1 -ml-1 text-gray-700 hover:bg-gray-100 rounded-md ${sidebarOpen ? "hidden" : ""}`}
        >
          <Menu size={24} />
        </button>
        <span className="font-semibold text-gray-700">Dashboard</span>
      </div>

      {/* RIGHT: (Future Slot) */}
      {/* You can add Search, Bell Icon, or User Profile here later */}
      <div className="flex items-center">
        {user && <button 
          onClick={onLogout}
          className="
            flex items-center gap-2 px-3 py-2 
            text-sm font-medium text-gray-600 
            rounded-lg transition-all duration-200
            hover:text-red-600 hover:bg-red-50 active:scale-95
          "
        >
          <LogOut size={18} />
          <span>Logout</span>
        </button>}
      </div>
    </nav>
  );
};

export default Navbar;