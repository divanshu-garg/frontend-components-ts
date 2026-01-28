//import React from "react";
import logo from "../assets/logo.png";
import {
  Box,
  Code,
  Database,
  LayoutDashboardIcon,
  Server,
  Settings,
  Table,
  User,
  X,
} from "lucide-react";
import SidebarItem, {type SidebarItemProps} from "./SidebarItem";
import { useNavigate } from "react-router-dom";

// const items: SidebarItemProps[] = [
const getSidebarItems = (navigate:(path:string)=> void):SidebarItemProps[] => [
  // LEVEL 1
  { text: "Dashboard", icon: <LayoutDashboardIcon size={20} />, onClick: ()=> navigate("/") },
  { text: "Data Table", icon: <Table size={20} />, onClick: ()=> navigate("/data") },
  // LEVEL 1
  {
    text: "Teams",
    icon: <User size={20} />,
    subItems: [
      // LEVEL 2
      { text: "Marketing", icon: <User size={20} /> },
      {
        text: "Engineering",
        icon: <Code size={20} />,
        subItems: [
          // LEVEL 3
          { text: "Frontend", icon: <Box size={20} /> },
          {
            text: "Backend",
            icon: <Server size={20} />,
            subItems: [
              // LEVEL 4!
              { text: "Database Team", icon: <Database size={20} /> },
              { text: "DevOps Team", icon: <Settings size={20} /> },
            ],
          },
        ],
      },
    ],
  },

  // LEVEL 1
  { text: "Settings", icon: <Settings size={20} /> },
];

interface LeftSidebarProps {
    isOpen: boolean;
    onClose: () => void
}

const LeftSidebar = ({ isOpen, onClose }:LeftSidebarProps) => {
  const navigate = useNavigate();
  const items = getSidebarItems(navigate);
  return (
    <aside
      className={`fixed inset-y-0 left-0 z-40 flex w-64 bg-white border-r h-screen flex-col transition-transform duration-300 ${isOpen ? "translate-x-0" : "-translate-x-full"} md:relative md:translate-x-0`}
    >
      {/* LOGO */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
        <img
          src={logo}
          alt="gigmedia logo"
          className="w-auto h-12 object-contain"
        />

        <button onClick={onClose} className="md:hidden text-gray-500">
          <X size={24} />
        </button>
      </div>

      {/* SIDEBAR CONTENT */}
      <ul className="flex-1 px-3 py-4 space-y-1">
        {items.map((item) => (
          <SidebarItem
            text={item.text}
            icon={item.icon}
            active={item.active}
            subItems={item.subItems}
            key={item.text}
            onClick={item.onClick}
          />
        ))}
      </ul>
      {/* SIDEBAR BOTTOM: PROFILE SECTION */}
      <div className="border-t p-3 flex items-center">
        <div className="w-10 h-10 rounded-full bg-red-100"></div>
        <div className="ml-3">
          <p className="text-sm font-medium text-gray-700">Celebrity</p>
          <p className="text-xs text-gray-500">celebrity@gigmedia.com</p>
        </div>
      </div>
    </aside>
  );
};

export default LeftSidebar;
