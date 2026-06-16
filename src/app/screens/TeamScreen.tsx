import { ShoppingBag, MapPin, Calendar, Users as UsersIcon, Search, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

export function TeamScreen() {
  const navigate = useNavigate();

  const teams = [
    {
      id: 1,
      title: "周末京郊野餐，寻3-5人同行",
      location: "北京·海淀区",
      date: "06月15日 出发",
      memberCount: 2,
      maxMembers: 5,
      organizer: {
        name: "山野行者",
        avatar: "https://images.unsplash.com/photo-1724118135600-35009a8d6a89?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3J0cmFpdCUyMHlvdW5nJTIwbWFuJTIwb3V0ZG9vcnN8ZW58MXx8fHwxNzgxMTI3NjkzfDA&ixlib=rb-4.1.0&q=80&w=150"
      },
      tags: ["AA制", "新手友好"]
    },
    {
      id: 2,
      title: "安吉云上草原2日露营，装备齐全",
      location: "浙江·湖州市",
      date: "06月20日 出发",
      memberCount: 4,
      maxMembers: 8,
      organizer: {
        name: "Molly_Camping",
        avatar: "https://images.unsplash.com/photo-1615464670798-6e92fafa2a89?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3J0cmFpdCUyMHdvbWFuJTIwc21pbGluZyUyMG91dGRvb3JzfGVufDF8fHx8MTc4MTE3ODc3MHww&ixlib=rb-4.1.0&q=80&w=150"
      },
      tags: ["摄影", "自带装备"]
    },
    {
      id: 3,
      title: "川西小环线自驾+露营，缺1名老司机",
      location: "四川·成都市",
      date: "07月01日 出发",
      memberCount: 3,
      maxMembers: 4,
      organizer: {
        name: "荒野求生熊",
        avatar: "https://images.unsplash.com/photo-1600968566723-9fcdf6fca8d8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3J0cmFpdCUyLW1hbiUyMGFkdmVudHVyZXxlbnwxfHx8fDE3ODExNzg3NzB8MA&ixlib=rb-4.1.0&q=80&w=150"
      },
      tags: ["老司机", "长线旅行", "高海拔"]
    }
  ];

  return (
    <div className="flex flex-col h-full bg-slate-50 relative">
      {/* Header */}
      <div className="bg-white px-4 pt-4 pb-3 sticky top-0 z-20 shadow-sm border-b border-slate-100">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-bold text-slate-800">队伍大厅</h1>
          <button 
            onClick={() => navigate("/shop")}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 text-emerald-600 rounded-full text-[13px] font-medium hover:bg-emerald-100 transition-colors"
          >
            <ShoppingBag size={16} />
            装备商城
            <ChevronRight size={14} className="-ml-0.5" />
          </button>
        </div>
        
        {/* Search */}
        <div className="h-10 bg-slate-100 rounded-full flex items-center px-4 gap-2">
          <Search size={18} className="text-slate-400" />
          <input 
            type="text" 
            placeholder="搜索目的地、队伍标签..." 
            className="flex-1 bg-transparent text-[14px] outline-none placeholder:text-slate-400"
          />
        </div>
      </div>

      {/* Categories */}
      <div className="px-4 py-3 bg-white flex items-center gap-3 overflow-x-auto no-scrollbar">
        {["全部", "同城", "即将出发", "新手局", "高阶硬核"].map((cat, idx) => (
          <button 
            key={cat}
            className={`whitespace-nowrap px-4 py-1.5 rounded-full text-[13px] font-medium transition-colors ${
              idx === 0 
                ? "bg-slate-800 text-white" 
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Team List */}
      <div className="flex flex-col gap-3 p-3">
        {teams.map((team) => (
          <div 
            key={team.id} 
            className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 cursor-pointer active:scale-[0.98] transition-transform"
            onClick={() => toast.success("正在进入队伍详情...")}
          >
            <div className="flex items-start justify-between mb-3">
              <h3 className="font-bold text-[16px] text-slate-800 leading-snug pr-4">
                {team.title}
              </h3>
              <div className="flex flex-col items-end">
                <span className="text-[12px] text-emerald-600 font-medium bg-emerald-50 px-2 py-0.5 rounded-md">
                  招募中
                </span>
              </div>
            </div>

            <div className="flex items-center gap-4 text-[13px] text-slate-500 mb-4">
              <div className="flex items-center gap-1">
                <MapPin size={14} className="text-slate-400" />
                {team.location}
              </div>
              <div className="flex items-center gap-1">
                <Calendar size={14} className="text-slate-400" />
                {team.date}
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
              {team.tags.map(tag => (
                <span key={tag} className="px-2 py-1 bg-slate-50 text-slate-500 text-[11px] rounded flex items-center">
                  #{tag}
                </span>
              ))}
            </div>

            <div className="flex items-center justify-between border-t border-slate-50 pt-3">
              <div className="flex items-center gap-2">
                <ImageWithFallback 
                  src={team.organizer.avatar} 
                  alt={team.organizer.name}
                  className="w-6 h-6 rounded-full object-cover"
                />
                <span className="text-[13px] text-slate-600">{team.organizer.name} 发起</span>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1 text-[13px]">
                  <UsersIcon size={14} className="text-slate-400" />
                  <span className="text-slate-700 font-medium">{team.memberCount}</span>
                  <span className="text-slate-400">/{team.maxMembers}</span>
                </div>
                <button 
                  className="px-4 py-1.5 bg-emerald-600 text-white text-[13px] font-medium rounded-full hover:bg-emerald-700 transition-colors"
                  onClick={(e) => { e.stopPropagation(); toast.success("正在进入报名页面..."); }}
                >
                  报名
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
