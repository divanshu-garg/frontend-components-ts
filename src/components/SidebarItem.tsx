import { ChevronDown, ChevronRight } from "lucide-react";
import { useState, type ReactNode } from "react";

export interface SidebarItemProps {
    icon:ReactNode,
    text:string,
    subItems?:SidebarItemProps[],
    active?:boolean,
    onClick?: ()=> void
}

const SidebarItem = ({ icon, text, active, subItems, onClick }:SidebarItemProps) => {
  const [expanded, setExpanded] = useState(false);
  const hasSubItems = subItems && subItems.length > 0;

  const handleClick = () => {
    if (hasSubItems) {
      setExpanded(!expanded);
    }
    if(onClick) {
      onClick();
    }
  };

  return (
    <li className="flex flex-col">
    <div
    onClick={handleClick}
      className={`relative justify-between flex items-center py-2 px-3 my-1
        font-medium rounded-md cursor-pointer transition-colors group ${
          active ? "bg-red-50 text-red-600" : "hover:bg-red-50 text-black"
        }`}
    >
      <div className="flex items-center">
        {icon}
        <span className="ml-3">{text}</span>
      </div>

        {/* ARROW FOR EXPANDABLE ITEMS */}
      {hasSubItems && (
        <div className="text-gray-400">
          {expanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
        </div>
      )}
    </div>

    {/* 3. The Dropdown List (Condition: Must have subItems AND be expanded) */}
      {hasSubItems && expanded && (
        <ul className="pl-4 space-y-1 overflow-y-auto py-2 text-gray-500 scrollbar-thin">
          {subItems.map((child) => (
                    <SidebarItem
                      text={child.text}
                      icon={child.icon}
                      active={child.active}
                      subItems={child.subItems}
                      key={child.text}
                      onClick={onClick}
                    />
          ))}
        </ul>
      )}
      </li>
  );
};

export default SidebarItem;
