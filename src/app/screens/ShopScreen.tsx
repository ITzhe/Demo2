import { Search, Filter, ShoppingCart, Star, ChevronLeft } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { useNavigate } from "react-router";

export function ShopScreen() {
  const navigate = useNavigate();
  const categories = ["全部", "帐篷天幕", "睡眠器材", "炊具水具", "户外收纳"];
  
  const products = [
    {
      id: 1,
      name: "Naturehike 挪客星河轻量化双人帐篷",
      price: "¥499",
      tags: ["热销", "轻量化"],
      image: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYW1waW5nJTIwdGVudCUyMHByb2R1Y3R8ZW58MXx8fHwxNzgxMTc4NzcxfDA&ixlib=rb-4.1.0&q=80&w=600",
      rating: 4.8,
    },
    {
      id: 2,
      name: "Snow Peak 钛金单层随行杯 450ml",
      price: "¥258",
      tags: ["钛合金", "极简"],
      image: "https://images.unsplash.com/photo-1555488205-d5e67846cf40?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYW1waW5nJTIwbGFudGVybiUyMGxpZ2h0fGVufDF8fHx8MTc4MTE3ODc3MXww&lib=rb-4.1.0&q=80&w=600",
      rating: 4.9,
    },
    {
      id: 3,
      name: "Kermit Chair 克米特折叠椅",
      price: "¥1,280",
      tags: ["实木", "经典"],
      image: "https://images.unsplash.com/photo-1660876633753-975a18cf78da?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYW1waW5nJTIwY2hhaXIlMjBvdXRkb29yfGVufDF8fHx8MTc4MTE3ODc3MXww&ixlib=rb-4.1.0&q=80&w=600",
      rating: 4.7,
    },
    {
      id: 4,
      name: "Osprey 小鹰户外徒步背包 48L",
      price: "¥1,599",
      tags: ["背负系统", "耐磨"],
      image: "https://images.unsplash.com/photo-1501555088652-021faa106b9b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoaWtpbmclMjBiYWNrcGFjayUyMG5hdHVyZXxlbnwxfHx8fDE3ODExNzg3NzF8MA&ixlib=rb-4.1.0&q=80&w=600",
      rating: 4.9,
    }
  ];

  return (
    <div className="flex flex-col h-full bg-slate-50 relative z-50 min-h-screen sm:min-h-full pb-safe">
      {/* Header */}
      <div className="bg-white px-4 pt-4 pb-2 sticky top-0 z-20 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <button 
            onClick={() => navigate(-1)}
            className="w-10 h-10 flex items-center justify-center text-slate-600 hover:text-slate-900 -ml-2"
          >
            <ChevronLeft size={24} />
          </button>
          <div className="flex-1 h-10 bg-slate-100 rounded-full flex items-center px-4 gap-2">
            <Search size={18} className="text-slate-400" />
            <input 
              type="text" 
              placeholder="搜索露营装备..." 
              className="flex-1 bg-transparent text-[14px] outline-none placeholder:text-slate-400"
            />
          </div>
          <button className="w-10 h-10 flex items-center justify-center text-slate-700 relative">
            <ShoppingCart size={22} />
            <div className="absolute top-1 right-0 w-4 h-4 bg-rose-500 rounded-full text-white text-[10px] font-bold flex items-center justify-center border border-white">
              3
            </div>
          </button>
        </div>
        
        {/* Categories */}
        <div className="flex items-center gap-6 overflow-x-auto no-scrollbar pb-2">
          {categories.map((cat, idx) => (
            <button 
              key={cat} 
              className={`whitespace-nowrap text-[15px] font-medium transition-colors relative ${
                idx === 0 ? "text-emerald-600" : "text-slate-500"
              }`}
            >
              {cat}
              {idx === 0 && (
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-[3px] bg-emerald-500 rounded-full" />
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="p-4 flex items-center justify-between">
        <h2 className="text-[17px] font-bold text-slate-800">热门推荐</h2>
        <button className="flex items-center gap-1 text-[13px] text-slate-500">
          <Filter size={14} /> 筛选
        </button>
      </div>

      {/* Product Grid */}
      <div className="px-4 pb-8 grid grid-cols-2 gap-3 overflow-y-auto">
        {products.map((product) => (
          <div key={product.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100/50 flex flex-col group">
            <div className="aspect-square bg-slate-50 relative">
              <ImageWithFallback 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-cover mix-blend-multiply group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-2 left-2 flex gap-1">
                {product.tags.map(tag => (
                  <span key={tag} className="px-2 py-0.5 bg-white/90 backdrop-blur text-[10px] font-medium text-slate-700 rounded shadow-sm">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="p-3 flex-1 flex flex-col">
              <h3 className="text-[13px] font-medium text-slate-800 line-clamp-2 leading-tight mb-2">
                {product.name}
              </h3>
              <div className="mt-auto flex items-center justify-between">
                <span className="text-[16px] font-bold text-emerald-600 tracking-tight">
                  {product.price}
                </span>
                <button className="w-7 h-7 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-600 hover:bg-emerald-600 hover:text-white transition-colors">
                  <ShoppingCart size={14} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
