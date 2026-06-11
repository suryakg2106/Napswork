"use client";

import { X, Calendar, DollarSign, Package } from "lucide-react";
import Image from "next/image";
import { useEffect } from "react";

interface ProductModalProps {
  product: {
    _id: string;
    name: string;
    price: number;
    images: string[];
    createdAt: string;
  } | null;
  onClose: () => void;
}

export function ProductModal({ product, onClose }: ProductModalProps) {
  // Prevent scrolling when modal is open
  useEffect(() => {
    if (product) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [product]);

  if (!product) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm transition-opacity animate-in fade-in duration-300" 
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 fade-in duration-300">
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-5 right-5 z-10 p-2 bg-white/80 backdrop-blur-md border border-gray-200 rounded-full text-gray-500 hover:text-gray-900 transition-all hover:scale-110 active:scale-95 shadow-sm"
        >
          <X size={20} />
        </button>

        <div className="flex flex-col md:flex-row h-full max-h-[90vh] md:max-h-[600px]">
          {/* Image Gallery Side */}
          <div className="w-full md:w-1/2 bg-gray-50 p-6 flex flex-col gap-4 overflow-y-auto custom-scrollbar">
            <div className="grid grid-cols-1 gap-4">
              {product.images.map((img, i) => (
                <div key={i} className="relative aspect-[4/5] rounded-2xl overflow-hidden border-2 border-white shadow-sm ring-1 ring-black/5 bg-white">
                  <Image 
                    src={img} 
                    alt={`${product.name} ${i + 1}`} 
                    fill 
                    className="object-cover"
                  />
                </div>
              ))}
              {product.images.length === 0 && (
                <div className="aspect-[4/5] bg-gray-200 rounded-2xl flex items-center justify-center text-gray-400">
                  <Package size={48} strokeWidth={1} />
                </div>
              )}
            </div>
          </div>

          {/* Details Side */}
          <div className="w-full md:w-1/2 p-8 flex flex-col justify-between bg-white">
            <div className="space-y-6">
              <div>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-50 text-[#3B82F6] uppercase tracking-wider mb-2">
                  Product Details
                </span>
                <h2 className="text-2xl font-black text-gray-900 leading-tight">{product.name}</h2>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50 border border-gray-100 transition-colors hover:bg-gray-100/50">
                  <div className="p-2.5 bg-green-50 rounded-xl text-green-600">
                    <DollarSign size={20} strokeWidth={3} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Price</p>
                    <p className="text-xl font-black text-gray-900">${product.price.toFixed(2)}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50 border border-gray-100 transition-colors hover:bg-gray-100/50">
                  <div className="p-2.5 bg-blue-50 rounded-xl text-[#3B82F6]">
                    <Calendar size={20} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Date Created</p>
                    <p className="text-sm font-bold text-gray-900">
                      {new Date(product.createdAt).toLocaleDateString('en-US', { 
                        month: 'long', 
                        day: 'numeric', 
                        year: 'numeric' 
                      })}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-100">
              <button 
                onClick={onClose}
                className="w-full py-4 bg-gray-900 text-white rounded-2xl font-bold hover:bg-black transition-all active:scale-[0.98] shadow-lg shadow-black/10"
              >
                Close View
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
