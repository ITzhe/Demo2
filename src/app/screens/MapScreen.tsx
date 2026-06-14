import { MapPin, Search, Navigation, ChevronRight, Star, CloudSun, Droplets, Car, Bath } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

export function MapScreen() {
  return (
    <div className="flex flex-col h-full bg-slate-50 relative overflow-hidden">
      {/* Background Map Placeholder */}
      <div className="absolute inset-0 bg-slate-200 z-0">
        <ImageWithFallback 
          src="https://images.unsplash.com/photo-1600095355173-b970ea5ceb46?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0b3BvZ3JhcGhpY2FsJTIwbWFwJTIwdGV4dHVyZXxlbnwxfHx8fDE3ODExNzg3NzB8MA&ixlib=rb-4.1.0&q=80&w=1080" 
          alt="Map Background" 
          className="w-full h-full object-cover opacity-60 mix-blend-multiply"
        />
        
        {/* Map Markers */}
        <div className="absolute top-[30%] left-[20%] w-10 h-10 -ml-5 -mt-10 flex flex-col items-center">
          <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center text-white shadow-lg shadow-emerald-500/40 relative z-10">
            <MapPin size={18} fill="currentColor" className="text-white" />
          </div>
          <div className="w-2 h-2 bg-emerald-500 rotate-45 -mt-1.5" />
        </div>

        <div className="absolute top-[45%] left-[60%] w-10 h-10 -ml-5 -mt-10 flex flex-col items-center scale-110">
          <div className="w-9 h-9 bg-rose-500 rounded-full flex items-center justify-center text-white shadow-lg shadow-rose-500/40 relative z-10 animate-bounce">
            <MapPin size={20} fill="currentColor" className="text-white" />
          </div>
          <div className="w-2 h-2 bg-rose-500 rotate-45 -mt-1.5" />
        </div>
      </div>

      {/* Floating Header (Search + Locate) */}
      <div className="absolute top-safe left-0 right-0 p-4 pt-4 z-10 flex gap-3">
        <div className="flex-1 bg-white/95 backdrop-blur-xl h-12 rounded-2xl shadow-sm border border-white flex items-center px-4 gap-3">
          <Search size={20} className="text-slate-400 shrink-0" />
          <input 
            type="text" 
            placeholder="搜索附近露营地、装备店..." 
            className="flex-1 bg-transparent text-[15px] outline-none placeholder:text-slate-400 min-w-0"
          />
        </div>
        <button className="w-12 h-12 shrink-0 bg-white/95 backdrop-blur-xl rounded-2xl shadow-sm border border-white flex items-center justify-center text-slate-700 hover:text-emerald-600 transition-colors">
          <Navigation size={22} className="rotate-45 -ml-1 -mb-1" />
        </button>
      </div>

      {/* Bottom Sheet for Location Detail */}
      <div className="absolute bottom-4 left-4 right-4 bg-white rounded-3xl shadow-[0_-8px_30px_rgba(0,0,0,0.12)] p-4 z-20 flex flex-col transform transition-transform">
        <div className="w-10 h-1.5 bg-slate-200 rounded-full mx-auto mb-4" />
        
        <div className="flex gap-4">
          <ImageWithFallback 
            src="https://images.unsplash.com/photo-1762254970300-f1bc796c1ed8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBnbGFtcGluZyUyMHNpdGV8ZW58MXx8fHwxNzgxMTc4NzcxfDA&ixlib=rb-4.1.0&q=80&w=400" 
            alt="Campsite" 
            className="w-[100px] h-[100px] rounded-2xl object-cover"
          />
          <div className="flex-1 flex flex-col py-1 min-w-0">
            <h3 className="font-bold text-[17px] text-slate-900 mb-1 truncate">径山客野奢营地</h3>
            <div className="flex items-center gap-1 text-[13px] text-amber-500 font-medium mb-1">
              <Star size={14} fill="currentColor" />
              <span>4.9</span>
              <span className="text-slate-400 font-normal ml-1">(128条评价)</span>
            </div>
            <div className="flex flex-wrap gap-1.5 mt-1">
              <span className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded text-[11px] flex items-center gap-1">
                <Droplets size={10}/> 水源
              </span>
              <span className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded text-[11px] flex items-center gap-1">
                <Bath size={10}/> 公厕
              </span>
              <span className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded text-[11px] flex items-center gap-1">
                <Car size={10}/> 停车
              </span>
            </div>
          </div>
        </div>

        <div className="mt-3 bg-slate-50 p-2.5 rounded-xl border border-slate-100/50">
          <div className="flex items-center gap-1.5 mb-1.5">
            <ImageWithFallback 
              src="https://images.unsplash.com/photo-1615464670798-6e92fafa2a89?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3J0cmFpdCUyMHdvbWFuJTIwc21pbGluZyUyMG91dGRvb3JzfGVufDF8fHx8MTc4MTE3ODc3MHww&ixlib=rb-4.1.0&q=80&w=150" 
              alt="User"
              className="w-5 h-5 rounded-full object-cover" 
            />
            <span className="text-[12px] font-medium text-slate-700">Molly_Camping</span>
          </div>
          <p className="text-[12px] text-slate-500 line-clamp-2 leading-relaxed">
            "营地设施非常齐全，公厕很干净有热水，晚上还能看到绝美的星空，强烈推荐给大家！"
          </p>
        </div>

        <div className="flex items-center justify-between mt-3 p-3 bg-emerald-50/50 border border-emerald-50 rounded-xl">
          <div className="flex items-center gap-2">
            <CloudSun size={20} className="text-sky-500" />
            <div className="flex flex-col">
              <span className="text-[13px] font-medium text-slate-800">晴天 26°C</span>
              <span className="text-[11px] text-slate-500">微风 适宜露营</span>
            </div>
          </div>
          <button className="text-emerald-600 text-[13px] font-medium flex items-center gap-1">
            详情 <ChevronRight size={14} />
          </button>
        </div>

        <div className="flex gap-3 mt-4">
          <button className="flex-1 bg-emerald-600 text-white font-medium h-12 rounded-2xl flex items-center justify-center gap-2 hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-600/20">
            <Navigation size={18} className="rotate-45 -ml-1" />
            路线导航
          </button>
        </div>
      </div>
    </div>
  );
}
