import { type ReactNode } from "react";
import { X } from "lucide-react";

interface RightSidebarProps{
    children:ReactNode;
    isOpen:boolean;
    onClose: ()=> void
}

const RightSidebar = ({ isOpen, onClose, children }:RightSidebarProps) => {
  return (
    <>
      {/* 1. BACKDROP (Overlay)
        - Mobile & Tablet: Visible (bg-black/30)
        - Desktop (xl): Hidden (xl:hidden) because sidebar pushes content
      */}
      <div
        onClick={onClose}
        className={`
          fixed inset-0 z-50 bg-black/30 backdrop-blur-sm transition-opacity duration-300
          ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}
          xl:hidden 
        `}
      />

      <aside
        className={`
          /* ========================================= */
          /* MODE 1: MOBILE (Default) - BOTTOM SHEET  */
          /* ========================================= */
          fixed bottom-0 left-0 right-0 z-50
          bg-white border-t border-gray-200 flex flex-col 
          h-[85vh] rounded-t-2xl shadow-2xl
          transition-all duration-300 ease-in-out
          
          /* Mobile Animation: Slide Up (Y-axis) */
          ${isOpen ? "translate-y-0" : "translate-y-full"}


          /* ========================================= */
          /* MODE 2: TABLET/LAPTOP (md) - RIGHT DRAWER */
          /* ========================================= */
          /* Reset Mobile Styles */
          md:bottom-auto md:left-auto md:rounded-none md:border-t-0 
          
          /* New Styles: Fixed to Right, Full Height */
          md:top-0 md:right-0 md:h-screen md:w-80 md:border-l md:shadow-[-10px_0_15px_-3px_rgba(0,0,0,0.1)]
          
          /* Tablet Animation: Slide Left (X-axis) */
          /* We force Y-axis to 0 to cancel mobile animation, then handle X-axis */
          md:translate-y-0
          ${isOpen ? "md:translate-x-0" : "md:translate-x-full"}


          /* ========================================= */
          /* MODE 3: DESKTOP (xl) - PUSH COLUMN       */
          /* ========================================= */
          /* Reset Fixed Positioning -> Become Relative */
          xl:relative xl:top-auto xl:right-auto xl:shadow-none
          
          /* Animation: Animate Width (Push Effect) */
          /* We force X-axis to 0 to cancel tablet animation */
          xl:translate-x-0
          
          ${isOpen 
             ? "xl:w-80 xl:opacity-100" 
             : "xl:w-0 xl:opacity-0 xl:overflow-hidden xl:border-none"
          }
        `}
      >
        {/* INNER WRAPPER */}
        {/* Fixed width prevents text squashing during width animation */}
        <div className="w-full md:w-80 flex flex-col h-full">
            
            {/* HEADER */}
            <div className="flex items-center justify-between p-4 border-b border-gray-100 min-h-16">
              <h3 className="font-semibold text-gray-700">Filters</h3>
              
              {/* CLOSE BUTTON 
                  - Visible on Mobile/Tablet (Overlay modes)
                  - Hidden on Desktop? No, keep it visible so user can close the panel.
              */}
              <button 
                onClick={onClose} 
                className="p-2 bg-gray-50 rounded-full hover:bg-gray-100"
              >
                <X size={20} className="text-gray-500" />
              </button>
            </div>

            {/* CONTENT */}
            <div className="flex-1 overflow-y-auto p-4">
              {children}
            </div>

            {/* MOBILE/TABLET FOOTER (Apply Button) 
                - Hide on Desktop (xl:hidden)
            */}
            <div className="xl:hidden p-4 border-t border-gray-100">
              <button 
                onClick={onClose}
                className="w-full py-3 bg-indigo-600 text-white rounded-lg font-medium active:scale-95 transition-transform"
              >
                Apply Filters
              </button>
            </div>

        </div>
      </aside>
    </>
  );
};

export default RightSidebar;