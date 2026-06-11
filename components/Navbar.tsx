"use client";

import { Menu, Bell, Mail } from "lucide-react";
import Image from "next/image";

interface NavbarProps {
  onMenuClick: () => void;
}

export function Navbar({ onMenuClick }: NavbarProps) {
  return (
    <header className="fixed top-0 left-0 lg:left-[240px] right-0 h-[70px] bg-white border-b border-[#E5E7EB] px-4 sm:px-8 flex items-center justify-between z-40">
      <div className="flex items-center gap-4">
        <button 
          onClick={onMenuClick}
          className="p-2 text-gray-400 hover:bg-gray-50 rounded-lg transition-colors lg:hidden"
        >
          <Menu size={20} />
        </button>
      </div>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <button className="p-2 text-gray-400 hover:bg-gray-50 rounded-lg transition-colors relative">
            <Bell size={20} />
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 border-2 border-white rounded-full"></span>
          </button>
          <button className="p-2 text-gray-400 hover:bg-gray-50 rounded-lg transition-colors relative">
            <Mail size={20} />
            <span className="absolute top-2 right-2 w-2 h-2 bg-[#3B82F6] border-2 border-white rounded-full"></span>
          </button>
        </div>

        <div className="flex items-center gap-3 pl-6 border-l border-[#E5E7EB]">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-semibold text-gray-900 leading-none">John Doe</p>
            <p className="text-xs text-gray-500 mt-1">Administrator</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-gray-200 border border-gray-100 overflow-hidden relative">
            <Image 
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=John" 
              alt="User avatar"
              fill
              unoptimized
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </header>
  );
}
