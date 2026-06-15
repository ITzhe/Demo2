import { Settings, Image as ImageIcon, Users, Bookmark, MapPin, Calendar, ChevronRight } from "lucide-react";
import { useState } from "react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

type Tab = "posts" | "teams" | "favorites";

const myPosts = [
  { id: 1, src: "https://images.unsplash.com/photo-1470246973918-29a93221c455?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400", multi: false },
  { id: 2, src: "https://images.unsplash.com/photo-1501854140801-50d01698950b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400", multi: true },
  { id: 3, src: "https://images.unsplash.com/photo-1555488205-d5e67846cf40?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400", multi: false },
  { id: 4, src: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400", multi: false },
  { id: 5, src: "https://images.unsplash.com/photo-1629222247198-00b164054719?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400", multi: true },
  { id: 6, src: "https://images.unsplash.com/photo-1607462109225-6b64ae2dd3cb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400", multi: false },
];

const myTeams = [
  {
    id: 1,
    title: "黄山云谷三日野营",
    date: "2026-06-20",
    location: "黄山风景区",
    members: 3,
    maxMembers: 6,
    status: "recruiting",
    cover: "https://images.unsplash.com/photo-1501854140801-50d01698950b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
  },
  {
    id: 2,
    title: "安吉竹海摄影营",
    date: "2026-07-05",
    location: "安吉云上草原",
    members: 5,
    maxMembers: 5,
    status: "full",
    cover: "https://images.unsplash.com/photo-1555488205-d5e67846cf40?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
  },
];

const myFavorites = [
  {
    id: 1,
    name: "径山客野奢营地",
    location: "浙江·杭州",
    rating: 4.9,
    tags: ["水源充足", "停车方便"],
    cover: "https://images.unsplash.com/photo-1470246973918-29a93221c455?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
  },
  {
    id: 2,
    name: "黄山云谷营地",
    location: "安徽·黄山",
    rating: 4.8,
    tags: ["云海绝景", "徒步路线"],
    cover: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
  },
  {
    id: 3,
    name: "安吉云上草原",
    location: "浙江·湖州",
    rating: 4.7,
    tags: ["亲子友好", "公厕完善"],
    cover: "https://images.unsplash.com/photo-1501854140801-50d01698950b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
  },
];

export function ProfileScreen() {
  const [tab, setTab] = useState<Tab>("posts");

  return (
    <div className="flex flex-col h-full bg-slate-50 overflow-y-auto">
      {/* Header Background */}
      <div className="relative h-[220px] shrink-0">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1557311612-7227bf712063?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
          alt="Profile Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent" />

        <div className="absolute top-4 right-4">
          <button className="w-10 h-10 bg-black/20 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/20">
            <Settings size={20} />
          </button>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-1/2 flex items-end gap-4">
          <div className="relative">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1600968566723-9fcdf6fca8d8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=300"
              alt="Avatar"
              className="w-20 h-20 rounded-full border-4 border-white object-cover bg-slate-100"
            />
            <div className="absolute bottom-0 right-0 bg-emerald-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full border-2 border-white">
              LV.3
            </div>
          </div>
          <div className="mb-2">
            <h1 className="text-xl font-bold text-slate-800">荒野求生熊</h1>
            <p className="text-[13px] text-slate-500 mt-0.5">越野 / 徒步 / 资深露营玩家</p>
          </div>
        </div>
      </div>

      <div className="h-14 bg-white shrink-0" />

      {/* Stats */}
      <div className="bg-white px-6 pb-5 pt-2 flex items-center justify-between border-b border-slate-100 shrink-0">
        {[["128", "获赞"], ["45", "关注"], ["2.1k", "粉丝"]].map(([val, label], i, arr) => (
          <div key={label} className="flex items-center flex-1">
            <div className="flex flex-col items-center flex-1">
              <span className="text-[18px] font-bold text-slate-800">{val}</span>
              <span className="text-[12px] text-slate-400 mt-0.5">{label}</span>
            </div>
            {i < arr.length - 1 && <div className="w-px h-8 bg-slate-100" />}
          </div>
        ))}
      </div>

      {/* Tab Bar */}
      <div className="bg-white mt-2 sticky top-0 z-10 border-b border-slate-100 shrink-0">
        <div className="flex items-center justify-around h-12">
          {([["posts", "我的动态"], ["teams", "我的组队"], ["favorites", "收藏足迹"]] as [Tab, string][]).map(([key, label]) => (
            <button
              key={key}
              onClick={() => setTab(key)}
              className={`flex flex-col items-center justify-center h-full relative px-4 transition-colors ${tab === key ? "text-emerald-600" : "text-slate-500"}`}
            >
              <span className="text-[14px] font-medium">{label}</span>
              {tab === key && (
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-[3px] bg-emerald-500 rounded-t-full" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      {tab === "posts" && (
        <div className="p-1 grid grid-cols-3 gap-1 pb-8">
          {myPosts.map((p) => (
            <div key={p.id} className="aspect-square bg-slate-200 relative overflow-hidden">
              <ImageWithFallback src={p.src} alt="Post" className="w-full h-full object-cover" />
              {p.multi && (
                <div className="absolute top-2 right-2 text-white drop-shadow-md">
                  <ImageIcon size={16} />
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {tab === "teams" && (
        <div className="flex flex-col gap-3 p-4 pb-8">
          {myTeams.map((team) => (
            <div key={team.id} className="bg-white rounded-2xl overflow-hidden shadow-sm">
              <div className="relative h-32">
                <ImageWithFallback src={team.cover} alt={team.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <span className={`absolute top-3 right-3 text-[11px] font-semibold px-2.5 py-1 rounded-full ${team.status === "full" ? "bg-slate-500 text-white" : "bg-emerald-500 text-white"}`}>
                  {team.status === "full" ? "已满员" : "招募中"}
                </span>
                <h3 className="absolute bottom-3 left-3 text-white font-semibold text-[15px]">{team.title}</h3>
              </div>
              <div className="px-4 py-3 flex items-center justify-between">
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-1.5 text-[12px] text-slate-500">
                    <MapPin size={12} />
                    <span>{team.location}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[12px] text-slate-500">
                    <Calendar size={12} />
                    <span>{team.date}</span>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 text-[13px] text-slate-600">
                  <Users size={15} className="text-emerald-500" />
                  <span className="font-medium">{team.members}/{team.maxMembers}</span>
                </div>
              </div>
            </div>
          ))}
          {myTeams.length === 0 && (
            <div className="flex flex-col items-center py-16 text-slate-400 gap-2">
              <Users size={40} className="text-slate-300" />
              <p className="text-[14px]">还没有参加过组队活动</p>
            </div>
          )}
        </div>
      )}

      {tab === "favorites" && (
        <div className="flex flex-col gap-3 p-4 pb-8">
          {myFavorites.map((camp) => (
            <div key={camp.id} className="bg-white rounded-2xl overflow-hidden shadow-sm flex">
              <ImageWithFallback src={camp.cover} alt={camp.name} className="w-24 h-24 object-cover shrink-0" />
              <div className="flex-1 px-3 py-3 flex flex-col justify-between">
                <div>
                  <h3 className="text-[15px] font-semibold text-slate-800">{camp.name}</h3>
                  <div className="flex items-center gap-1 mt-1 text-[12px] text-slate-400">
                    <MapPin size={11} />
                    <span>{camp.location}</span>
                    <span className="ml-2 text-amber-500 font-medium">★ {camp.rating}</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {camp.tags.map((tag) => (
                    <span key={tag} className="text-[11px] px-2 py-0.5 bg-emerald-50 text-emerald-600 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex items-center pr-3">
                <ChevronRight size={16} className="text-slate-300" />
              </div>
            </div>
          ))}
          {myFavorites.length === 0 && (
            <div className="flex flex-col items-center py-16 text-slate-400 gap-2">
              <Bookmark size={40} className="text-slate-300" />
              <p className="text-[14px]">还没有收藏任何营地</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
