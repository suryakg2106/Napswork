"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Package, 
  ArrowLeftRight, 
  Users, 
  BarChart3, 
  ChevronRight,
  X
} from "lucide-react";
import { cn } from "@/components/utils";
import { useEffect, useState } from "react";
import { getProductCount } from "@/actions/sidebarActions";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/panel/dashboard" },
  { icon: Package, label: "Products", href: "/panel/product" },
  { icon: ArrowLeftRight, label: "Transactions", href: "/panel/transaction" },
  { icon: Users, label: "Customers", href: "/panel/customers" },
  { icon: BarChart3, label: "Sales Report", href: "/panel/salesreport" },
];

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();
  const [productCount, setProductCount] = useState<number | null>(null);

  useEffect(() => {
    async function fetchCount() {
      const count = await getProductCount();
      setProductCount(count);
    }
    fetchCount();
  }, [pathname]); // Refresh count on navigation

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-[60] lg:hidden animate-in fade-in duration-300" 
          onClick={onClose}
        />
      )}

      <aside className={cn(
        "fixed left-0 top-0 h-full w-[240px] bg-white border-r border-[#E5E7EB] flex flex-col z-[70] transition-transform duration-300 lg:translate-x-0",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        {/* Company Logo Card */}
        <div className="p-6 flex items-center justify-between">
          <div className="bg-[#3B82F6] rounded-xl p-3 flex items-center gap-3 text-white">
            <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center font-bold text-xl">
              N
            </div>
            <span className="font-bold text-lg tracking-tight">Napworks</span>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-gray-400 hover:bg-gray-50 rounded-lg lg:hidden"
          >
            <X size={20} />
          </button>
        </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-4 space-y-1">
        {menuItems.map((item) => {
          const isActive = pathname === item.href || (item.label === "Products" && pathname.startsWith("/panel/product"));
          const isProducts = item.label === "Products";
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center justify-between px-4 py-3 rounded-xl transition-colors group",
                isActive 
                  ? "bg-[#EFF6FF] text-[#3B82F6]" 
                  : "text-[#6B7280] hover:bg-gray-50 hover:text-gray-900"
              )}
            >
              <div className="flex items-center gap-3">
                <item.icon size={20} className={cn(isActive ? "text-[#3B82F6]" : "text-[#9CA3AF]")} />
                <span className="font-medium">
                  {item.label}
                  {isProducts && productCount !== null && (
                    <span className={cn(
                      "ml-1.5 text-xs font-bold px-1.5 py-0.5 rounded-full transition-colors",
                      isActive ? "bg-blue-100 text-[#3B82F6]" : "bg-gray-100 text-gray-500"
                    )}>
                      {productCount}
                    </span>
                  )}
                </span>
              </div>
              {isActive && <ChevronRight size={16} className="text-[#3B82F6]" />}
            </Link>
          );
        })}
      </nav>
    </aside>
    </>
  );
}
