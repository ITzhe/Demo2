import { MapPin, Hash, Plus, Image as ImageIcon, Video, Calendar, Users, ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router";
import { useState } from "react";

export function PublishScreen() {
  const navigate = useNavigate();
  const [publishType, setPublishType] = useState<"post" | "team">("post");

  return (
    <div className="flex flex-col h-full bg-white relative z-10 min-h-screen sm:min-h-full">
      {/* Top Bar */}
      <div className="h-14 flex items-center justify-between px-4 bg-white border-b border-slate-100 sticky top-0 z-20">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center text-slate-600 hover:text-slate-900 -ml-2 p-2"
        >
          <ChevronLeft size={24} />
          <span className="text-[15px]">取消</span>
        </button>
        
        <div className="flex items-center bg-slate-100 rounded-full p-1">
          <button 
            className={`px-4 py-1.5 rounded-full text-[13px] font-medium transition-colors ${
              publishType === "post" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500"
            }`}
            onClick={() => setPublishType("post")}
          >
            发图文
          </button>
          <button 
            className={`px-4 py-1.5 rounded-full text-[13px] font-medium transition-colors ${
              publishType === "team" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500"
            }`}
            onClick={() => setPublishType("team")}
          >
            发起组队
          </button>
        </div>

        <button className="bg-emerald-600 text-white px-4 py-1.5 rounded-full text-[14px] font-medium hover:bg-emerald-700 transition-colors">
          发布
        </button>
      </div>

      <div className="flex-1 overflow-y-auto pb-24">
        {publishType === "post" ? (
          <>
            {/* Photo Uploader */}
            <div className="p-4">
              <div className="flex flex-wrap gap-2">
                <button className="w-[110px] h-[110px] bg-slate-50 border border-slate-200 border-dashed rounded-2xl flex flex-col items-center justify-center text-slate-400 hover:bg-slate-100 transition-colors">
                  <ImageIcon size={28} className="mb-2 opacity-50" />
                  <span className="text-[12px] font-medium">添加照片/视频</span>
                  <span className="text-[10px] opacity-70 mt-1">(最多九格)</span>
                </button>
              </div>
            </div>

            {/* Text Area */}
            <div className="px-4 py-2">
              <textarea 
                className="w-full h-32 text-[16px] placeholder:text-slate-400 resize-none outline-none bg-transparent"
                placeholder="这一刻的想法... (或者新发现的宝藏地点！)"
              />
            </div>

            {/* Action Cells */}
            <div className="mt-4 border-t border-slate-50">
              <button className="w-full flex items-center justify-between p-4 bg-white hover:bg-slate-50 transition-colors active:bg-slate-100 border-b border-slate-50 group">
                <div className="flex items-center gap-3 text-slate-700">
                  <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600">
                    <MapPin size={18} strokeWidth={2.5} />
                  </div>
                  <div className="flex flex-col items-start">
                    <span className="text-[15px] font-medium">添加定位（点击跳转地图选择）</span>
                    <span className="text-[12px] text-slate-400 mt-0.5">↳ 选择后会自动获取当时天气状态(温度/湿度等)</span>
                  </div>
                </div>
                <ChevronLeft size={20} className="text-slate-300 rotate-180 group-hover:text-slate-400" />
              </button>

              <button className="w-full flex items-center justify-between p-4 bg-white hover:bg-slate-50 transition-colors active:bg-slate-100 border-b border-slate-50 group">
                <div className="flex items-center gap-3 text-slate-700">
                  <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-500">
                    <Hash size={18} strokeWidth={2.5} />
                  </div>
                  <span className="text-[15px] font-medium">添加相关话题</span>
                </div>
                <ChevronLeft size={20} className="text-slate-300 rotate-180 group-hover:text-slate-400" />
              </button>
            </div>
          </>
        ) : (
          <div className="p-4 flex flex-col gap-4">
            <input 
              type="text" 
              placeholder="一句话标题 (如: 周末去京郊野餐组队)" 
              className="w-full text-[18px] font-medium placeholder:text-slate-400 outline-none border-b border-slate-100 pb-4 bg-transparent"
            />
            <textarea 
              className="w-full h-24 text-[15px] placeholder:text-slate-400 resize-none outline-none bg-transparent"
              placeholder="详细描述一下你的计划..."
            />
            
            <div className="flex flex-col gap-3 mt-4">
              <button className="w-full flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <div className="flex items-center gap-3 text-slate-700">
                  <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-emerald-600 shadow-sm">
                    <MapPin size={16} strokeWidth={2.5} />
                  </div>
                  <span className="text-[15px] font-medium">目的地指派</span>
                </div>
                <span className="text-[13px] text-slate-400">去地图点选</span>
              </button>

              <button className="w-full flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <div className="flex items-center gap-3 text-slate-700">
                  <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-amber-500 shadow-sm">
                    <Calendar size={16} strokeWidth={2.5} />
                  </div>
                  <span className="text-[15px] font-medium">出发时间</span>
                </div>
                <span className="text-[13px] text-slate-400">选择日期</span>
              </button>

              <button className="w-full flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <div className="flex items-center gap-3 text-slate-700">
                  <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-indigo-500 shadow-sm">
                    <Users size={16} strokeWidth={2.5} />
                  </div>
                  <span className="text-[15px] font-medium">规模配置</span>
                </div>
                <span className="text-[13px] text-slate-400">5-10人</span>
              </button>
            </div>
            
            <button className="mt-8 w-full bg-emerald-600 text-white font-medium h-12 rounded-full flex items-center justify-center shadow-lg shadow-emerald-600/30">
              生成组队邀请并发布
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
