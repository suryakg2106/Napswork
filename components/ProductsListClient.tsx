"use client";

import { Search, Filter, Plus, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { DeleteProductButton } from "@/components/DeleteProductButton";
import { ProductModal } from "@/components/ProductModal";
import { useState, useCallback, useEffect } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

interface ProductType {
  _id: string;
  name: string;
  price: number;
  images: string[];
  createdAt: string;
}

interface ProductsListClientProps {
  initialProducts: ProductType[];
}

export default function ProductsListClient({ initialProducts }: ProductsListClientProps) {
  const [selectedProduct, setSelectedProduct] = useState<ProductType | null>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Local states for inputs to avoid laggy typing
  const [searchValue, setSearchValue] = useState(searchParams.get("search") || "");

  // Update URL with search/filter params
  const createQueryString = useCallback(
    (params: Record<string, string | null>) => {
      const newParams = new URLSearchParams(searchParams.toString());
      
      for (const [key, value] of Object.entries(params)) {
        if (value === null || value === "") {
          newParams.delete(key);
        } else {
          newParams.set(key, value);
        }
      }
      
      return newParams.toString();
    },
    [searchParams]
  );

  // Debounced search update
  useEffect(() => {
    const timer = setTimeout(() => {
      router.push(`${pathname}?${createQueryString({ search: searchValue })}`, { scroll: false });
    }, 500);
    return () => clearTimeout(timer);
  }, [searchValue, pathname, router, createQueryString]);

  const handlePriceFilter = (min: string, max: string) => {
    router.push(`${pathname}?${createQueryString({ minPrice: min, maxPrice: max })}`, { scroll: false });
  };

  const handleSort = (sort: string) => {
    router.push(`${pathname}?${createQueryString({ sort })}`, { scroll: false });
  };

  const clearAllFilters = () => {
    setSearchValue("");
    router.push(pathname);
  };

  const hasActiveFilters = searchParams.has("minPrice") || searchParams.has("maxPrice") || searchParams.has("sort");

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <nav className="flex text-sm text-gray-500 mb-2">
            <span>Panel</span>
            <span className="mx-2">/</span>
            <span className="text-[#3B82F6] font-medium">Products</span>
          </nav>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Products</h1>
          <p className="text-gray-500 mt-1">Manage your inventory and product listings.</p>
        </div>
        <Link 
          href="/panel/product/add"
          className="bg-[#3B82F6] text-white px-5 py-2.5 rounded-xl flex items-center gap-2 hover:bg-blue-600 transition-all font-semibold shadow-sm shadow-blue-500/20 active:scale-95"
        >
          <Plus size={20} strokeWidth={3} />
          New Product
        </Link>
      </div>

      {/* Backend Control Bar */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gray-50/30">
          <div className="relative flex-1 max-w-md group">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#3B82F6] transition-colors" size={18} />
            <input 
              type="text" 
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Search products..." 
              className="w-full pl-11 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-[#3B82F6] focus:ring-4 focus:ring-[#3B82F6]/5 transition-all placeholder:text-gray-400 shadow-sm text-gray-900"
            />
          </div>
          
          <div className="flex items-center gap-4">
            {hasActiveFilters && (
              <button 
                onClick={clearAllFilters}
                className="text-sm font-bold text-red-500 hover:text-red-600 transition-colors"
              >
                Clear Filters
              </button>
            )}
            <div className="relative">
              <button 
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border transition-all font-semibold shadow-sm ${(isFilterOpen || hasActiveFilters) ? 'bg-[#3B82F6] border-[#3B82F6] text-white' : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'}`}
              >
                <Filter size={18} />
                Filters
                {hasActiveFilters && (
                  <span className="flex items-center justify-center w-5 h-5 bg-white text-[#3B82F6] rounded-full text-[10px] font-black">
                    !
                  </span>
                )}
              </button>

              {/* Advanced Filter Popover */}
              {isFilterOpen && (
                <div className="absolute right-0 mt-3 w-72 bg-white border border-gray-200 rounded-2xl shadow-xl z-50 p-6 animate-in fade-in zoom-in-95 duration-200">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-gray-900">Advanced Filters</h3>
                    <button onClick={() => setIsFilterOpen(false)} className="p-1 hover:bg-gray-100 rounded-md transition-colors"><X size={16} className="text-gray-500" /></button>
                  </div>
                  
                  <div className="space-y-6">
                    <div className="space-y-3">
                      <p className="text-xs font-bold uppercase tracking-widest text-gray-500">Sort By</p>
                      <div className="grid grid-cols-1 gap-2">
                        <button onClick={() => handleSort("newest")} className={`text-left px-3 py-2 rounded-lg border text-sm font-medium transition-all ${searchParams.get("sort") === "newest" ? "bg-blue-50 border-blue-100 text-[#3B82F6]" : "bg-gray-50 border-gray-100 text-gray-700 hover:bg-blue-50 hover:text-[#3B82F6] hover:border-blue-100"}`}>Newest First</button>
                        <button onClick={() => handleSort("price_asc")} className={`text-left px-3 py-2 rounded-lg border text-sm font-medium transition-all ${searchParams.get("sort") === "price_asc" ? "bg-blue-50 border-blue-100 text-[#3B82F6]" : "bg-gray-50 border-gray-100 text-gray-700 hover:bg-blue-50 hover:text-[#3B82F6] hover:border-blue-100"}`}>Price: Low to High</button>
                        <button onClick={() => handleSort("price_desc")} className={`text-left px-3 py-2 rounded-lg border text-sm font-medium transition-all ${searchParams.get("sort") === "price_desc" ? "bg-blue-50 border-blue-100 text-[#3B82F6]" : "bg-gray-50 border-gray-100 text-gray-700 hover:bg-blue-50 hover:text-[#3B82F6] hover:border-blue-100"}`}>Price: High to Low</button>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <p className="text-xs font-bold uppercase tracking-widest text-gray-500">Price Range</p>
                      <div className="flex items-center gap-2">
                        <input 
                          type="number" 
                          placeholder="Min" 
                          defaultValue={searchParams.get("minPrice") || ""}
                          className="w-full px-3 py-2 bg-white border border-gray-300 text-gray-900 rounded-lg text-sm focus:outline-none focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/10 placeholder:text-gray-400"
                          onChange={(e) => handlePriceFilter(e.target.value, searchParams.get("maxPrice") || "")}
                        />
                        <span className="text-gray-400 font-medium">-</span>
                        <input 
                          type="number" 
                          placeholder="Max" 
                          defaultValue={searchParams.get("maxPrice") || ""}
                          className="w-full px-3 py-2 bg-white border border-gray-300 text-gray-900 rounded-lg text-sm focus:outline-none focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/10 placeholder:text-gray-400"
                          onChange={(e) => handlePriceFilter(searchParams.get("minPrice") || "", e.target.value)}
                        />
                      </div>
                    </div>

                    <button 
                      onClick={clearAllFilters}
                      className="w-full py-2.5 text-sm font-bold text-red-600 hover:bg-red-50 rounded-xl transition-colors border border-dashed border-red-200"
                    >
                      Clear All Filters
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50/80 text-gray-900 text-xs font-bold uppercase tracking-wider border-b border-gray-100">
                <th className="px-8 py-4">Product Details</th>
                <th className="px-8 py-4">Price</th>
                <th className="px-8 py-4">Date Added</th>
                <th className="px-8 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {initialProducts.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-8 py-20 text-center">
                    <div className="flex flex-col items-center gap-3">
                      <div className="p-4 bg-gray-50 rounded-full text-gray-400">
                        <Search size={32} />
                      </div>
                      <p className="text-gray-500 font-medium">No results matching your backend criteria</p>
                      <button onClick={clearAllFilters} className="text-[#3B82F6] text-sm font-bold hover:underline">
                        Reset all filters &rarr;
                      </button>
                    </div>
                  </td>
                </tr>
              ) : (
                initialProducts.map((product) => (
                  <tr 
                    key={product._id} 
                    className="hover:bg-gray-50/50 transition-colors group cursor-pointer"
                    onClick={() => setSelectedProduct(product)}
                  >
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-xl bg-white flex-shrink-0 overflow-hidden relative border border-gray-200 shadow-sm group-hover:border-[#3B82F6]/30 transition-colors">
                          {product.images?.[0] ? (
                            <Image 
                              src={product.images[0]} 
                              alt={product.name} 
                              fill 
                              className="object-cover" 
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-[10px] text-gray-400 font-bold uppercase">
                              No Img
                            </div>
                          )}
                        </div>
                        <span className="font-bold text-gray-900 group-hover:text-[#3B82F6] transition-colors">{product.name}</span>
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <span className="text-lg font-bold text-gray-900">${product.price.toFixed(2)}</span>
                    </td>
                    <td className="px-8 py-5">
                      <div className="flex flex-col">
                        <span className="text-sm font-semibold text-gray-900">
                          {new Date(product.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </span>
                        <span className="text-xs text-gray-500 font-medium">
                          {new Date(product.createdAt).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                    </td>
                    <td className="px-8 py-5 text-right" onClick={(e) => e.stopPropagation()}>
                      <DeleteProductButton productId={product._id} />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-100 bg-gray-50/30 flex items-center justify-between">
          <span className="text-sm font-semibold text-gray-500">
            Showing <span className="text-gray-900">{initialProducts.length}</span> Results
          </span>
          <div className="flex items-center gap-2">
            <button className="px-4 py-2 text-xs font-bold text-gray-500 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 shadow-sm" disabled>Previous</button>
            <button className="px-4 py-2 text-xs font-bold text-[#3B82F6] bg-blue-50 border border-blue-100 rounded-lg shadow-sm">1</button>
            <button className="px-4 py-2 text-xs font-bold text-gray-500 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 shadow-sm" disabled>Next</button>
          </div>
        </div>
      </div>

      {/* Product Detail Modal */}
      <ProductModal 
        product={selectedProduct} 
        onClose={() => setSelectedProduct(null)} 
      />
    </div>
  );
}
