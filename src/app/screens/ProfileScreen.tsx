import { Settings, ChevronRight, Bookmark, Users, Clock, Image as ImageIcon } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

export function ProfileScreen() {
  return (
    <div className="flex flex-col h-full bg-slate-50 overflow-y-auto">
      {/* Header Background */}
      <div className="relative h-[220px]">
        <ImageWithFallback 
          src="https://images.unsplash.com/photo-1557311612-7227bf712063?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3VudGFpbiUyMGxhbmRzY2FwZSUyMHBhbm9yYW1hfGVufDF8fHx8MTc4MTEwNzAxM3ww&ixlib=rb-4.1.0&q=80&w=1080" 
          alt="Profile Background" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent" />
        
        <div className="absolute top-safe right-4 mt-4">
          <button className="w-10 h-10 bg-black/20 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/20">
            <Settings size={20} />
          </button>
        </div>

        {/* User Info Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-1/2 flex items-end justify-between">
          <div className="flex items-end gap-4">
            <div className="relative">
              <ImageWithFallback 
                src="https://images.unsplash.com/photo-1600968566723-9fcdf6fca8d8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3J0cmFpdCUyMG1hbiUyMGFkdmVudHVyZXxlbnwxfHx8fDE3ODExNzg3NzB8MA&ixlib=rb-4.1.0&q=80&w=300" 
                alt="Avatar" 
                className="w-20 h-20 rounded-full border-4 border-white object-cover bg-slate-100"
              />
              <div className="absolute bottom-0 right-0 bg-emerald-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full border-2 border-white">
                LV.3
              </div>
            </div>
            <div className="mb-2">
              <h1 className="text-xl font-bold text-slate-800">荒野求生熊</h1>
              <p className="text-[13px] text-slate-500 mt-1">越野 / 徒步 / 资深露营玩家</p>
            </div>
          </div>
        </div>
      </div>

      {/* Spacer for overlapping avatar */}
      <div className="h-14 bg-white" />

      {/* Stats Area */}
      <div className="bg-white px-6 pb-6 pt-2 flex items-center justify-between border-b border-slate-100">
        <div className="flex flex-col items-center flex-1">
          <span className="text-[18px] font-bold text-slate-800">128</span>
          <span className="text-[12px] text-slate-400 mt-0.5">获赞</span>
        </div>
        <div className="w-px h-8 bg-slate-100" />
        <div className="flex flex-col items-center flex-1">
          <span className="text-[18px] font-bold text-slate-800">45</span>
          <span className="text-[12px] text-slate-400 mt-0.5">关注</span>
        </div>
        <div className="w-px h-8 bg-slate-100" />
        <div className="flex flex-col items-center flex-1">
          <span className="text-[18px] font-bold text-slate-800">2.1k</span>
          <span className="text-[12px] text-slate-400 mt-0.5">粉丝</span>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white mt-2 sticky top-0 z-10 border-b border-slate-100">
        <div className="flex items-center justify-around h-12">
          <button className="flex flex-col items-center justify-center h-full relative px-4 text-emerald-600">
            <span className="text-[14px] font-medium">我的动态</span>
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-[3px] bg-emerald-500 rounded-t-full" />
          </button>
          <button className="flex flex-col items-center justify-center h-full relative px-4 text-slate-500 hover:text-slate-800">
            <span className="text-[14px] font-medium">我的组队</span>
          </button>
          <button className="flex flex-col items-center justify-center h-full relative px-4 text-slate-500 hover:text-slate-800">
            <span className="text-[14px] font-medium">收藏足迹</span>
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="p-1 grid grid-cols-3 gap-1 pb-8">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="aspect-square bg-slate-200 relative group overflow-hidden">
            <ImageWithFallback 
              src={`https://images.unsplash.com/photo-1629222247198-00b164054719?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYW1wZXIlMjB2YW4lMjBvdXRkb29yc3xlbnwxfHx8fDE3ODExNzg3NzB8MA&ixlib=rb-4.1.0&q=80&w=400&sig=${i}`} 
              alt="Post thumbnail" 
              className="w-full h-full object-cover"
            />
            {i % 3 === 0 && (
              <div className="absolute top-2 right-2 text-white drop-shadow-md">
                <ImageIcon size={16} />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
