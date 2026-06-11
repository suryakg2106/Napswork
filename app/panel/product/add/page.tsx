"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, Plus, X, Loader2, Image as ImageIcon, DollarSign, Type } from "lucide-react";
import Link from "next/link";
import { createProduct } from "@/actions/productActions";
import Image from "next/image";

export default function AddProductPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState<(File | null)[]>([null, null, null, null]);
  const [previews, setPreviews] = useState<(string | null)[]>([null, null, null, null]);
  const fileInputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleImageChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 4 * 1024 * 1024) {
        alert("Image size must be less than 4MB");
        return;
      }

      const newImages = [...images];
      newImages[index] = file;
      setImages(newImages);

      const reader = new FileReader();
      reader.onloadend = () => {
        const newPreviews = [...previews];
        newPreviews[index] = reader.result as string;
        setPreviews(newPreviews);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = (index: number) => {
    const newImages = [...images];
    newImages[index] = null;
    setImages(newImages);

    const newPreviews = [...previews];
    newPreviews[index] = null;
    setPreviews(newPreviews);

    if (fileInputRefs.current[index]) {
      fileInputRefs.current[index]!.value = "";
    }
  };

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    formData.delete("images");
    images.forEach((file) => {
      if (file) formData.append("images", file);
    });

    const result = await createProduct(formData);

    if (result.success) {
      router.push("/panel/product");
      router.refresh();
    } else {
      alert(result.error || "Something went wrong");
      setLoading(false);
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-10 pb-20">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <Link 
            href="/panel/product" 
            className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-900 transition-colors group mb-2"
          >
            <ChevronLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" />
            Back to Products
          </Link>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Create new product</h1>
          <p className="text-gray-500">Fill in the details below to launch your new product.</p>
        </div>
      </div>

      <form id="product-form" onSubmit={onSubmit} className="space-y-8">
        {/* Basic Info Section */}
        <section className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-100 bg-gray-50/80">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-4 bg-[#3B82F6] rounded-full"></div>
              <h2 className="text-sm font-bold uppercase tracking-wider text-gray-900">Basic Information</h2>
            </div>
          </div>
          <div className="p-8 space-y-8 bg-gray-50/30">
            {/* Product Name */}
            <div className="space-y-3">
              <label htmlFor="name" className="flex items-center gap-2 text-sm font-bold text-gray-900">
                <div className="p-1.5 bg-blue-50 rounded-md text-[#3B82F6]">
                  <Type size={14} />
                </div>
                Product Name
              </label>
              <div className="relative group">
                <input 
                  required
                  type="text" 
                  id="name"
                  name="name"
                  placeholder="e.g. Premium Wireless Headphones" 
                  className="w-full px-4 py-3 bg-white border-2 border-gray-200 text-gray-900 rounded-xl focus:outline-none focus:border-[#3B82F6] focus:ring-4 focus:ring-[#3B82F6]/10 transition-all placeholder:text-gray-400 text-lg font-medium shadow-sm group-hover:border-gray-300"
                />
              </div>
            </div>

            {/* Price */}
            <div className="space-y-3">
              <label htmlFor="price" className="flex items-center gap-2 text-sm font-bold text-gray-900">
                <div className="p-1.5 bg-green-50 rounded-md text-green-600">
                  <DollarSign size={14} />
                </div>
                Price (USD)
              </label>
              <div className="relative group max-w-[240px]">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-bold">$</span>
                <input 
                  required
                  type="number" 
                  id="price"
                  name="price"
                  step="0.01"
                  placeholder="0.00" 
                  className="w-full pl-9 pr-4 py-3 bg-white border-2 border-gray-200 text-gray-900 rounded-xl focus:outline-none focus:border-[#3B82F6] focus:ring-4 focus:ring-[#3B82F6]/10 transition-all placeholder:text-gray-400 text-lg font-bold shadow-sm group-hover:border-gray-300"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Media Section */}
        <section className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-100 bg-gray-50/80 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-4 bg-[#3B82F6] rounded-full"></div>
              <h2 className="text-sm font-bold uppercase tracking-wider text-gray-900">Product Gallery</h2>
            </div>
            <span className="text-xs font-bold px-2 py-1 bg-gray-100 rounded-md text-gray-600">
              {images.filter(i => i).length} / 4 Images
            </span>
          </div>
          <div className="p-8 bg-gray-50/30">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {images.map((_, index) => (
                <div key={index} className="space-y-2">
                  <div className="relative aspect-[4/5] group">
                    {previews[index] ? (
                      <div className="relative w-full h-full rounded-2xl overflow-hidden border-2 border-gray-200 shadow-md ring-1 ring-black/5 bg-white">
                        <Image 
                          src={previews[index]!} 
                          alt={`Preview ${index + 1}`} 
                          fill
                          unoptimized
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <button 
                            type="button"
                            onClick={() => removeImage(index)}
                            className="p-2.5 bg-red-500 text-white rounded-full hover:bg-red-600 transform scale-90 group-hover:scale-100 transition-all shadow-lg"
                            title="Remove image"
                          >
                            <X size={20} />
                          </button>
                        </div>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => fileInputRefs.current[index]?.click()}
                        className="w-full h-full flex flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-gray-300 bg-white hover:border-[#3B82F6] hover:bg-blue-50 transition-all group/btn relative overflow-hidden shadow-sm"
                      >
                        <div className="p-3.5 rounded-xl bg-gray-50 border border-gray-100 text-gray-400 group-hover/btn:text-[#3B82F6] group-hover/btn:bg-white group-hover/btn:border-blue-100 group-hover/btn:shadow-sm transition-all">
                          <ImageIcon size={24} />
                        </div>
                        <div className="text-center">
                          <span className="block text-xs font-bold text-gray-900 group-hover/btn:text-[#3B82F6]">Add Image</span>
                          <span className="block text-[10px] text-gray-500 font-medium mt-1 tracking-wide">JPG, PNG up to 4MB</span>
                        </div>
                      </button>
                    )}
                    <input 
                      type="file"
                      ref={(el) => { fileInputRefs.current[index] = el; }}
                      onChange={(e) => handleImageChange(index, e)}
                      accept="image/*"
                      className="hidden"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Form Actions */}
        <div className="flex items-center justify-end gap-4 pt-4">
          <Link 
            href="/panel/product"
            className="px-6 py-3 text-sm font-bold text-gray-700 bg-white border-2 border-gray-200 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm active:scale-95"
          >
            Cancel and Discard
          </Link>
          <button 
            disabled={loading}
            type="submit"
            className="px-8 py-3 text-sm font-bold text-white bg-[#3B82F6] rounded-xl hover:bg-blue-600 transition-all shadow-md shadow-blue-500/20 flex items-center gap-2 disabled:opacity-70 active:scale-95"
          >
            {loading ? <Loader2 className="animate-spin" size={20} /> : <Plus size={20} strokeWidth={3} />}
            {loading ? "Publishing Product..." : "Publish Product"}
          </button>
        </div>
      </form>
    </div>
  );
}
