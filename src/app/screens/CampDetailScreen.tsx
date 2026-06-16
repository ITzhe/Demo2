import { ArrowLeft, MapPin, Star, Heart, Share2, Phone, Navigation, Wifi, Car, Droplets, Flame, Trees, Baby } from "lucide-react";
import { useNavigate, useLocation } from "react-router";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { toast } from "sonner";
import { useState } from "react";

interface CampData {
  id: number;
  name: string;
  location: string;
  rating: number;
  tags: string[];
  cover: string;
}

const defaultCamps: CampData[] = [
  {
    id: 1,
    name: "径山客野奢营地",
    location: "浙江·杭州",
    rating: 4.9,
    tags: ["水源充足", "停车方便"],
    cover: "https://images.unsplash.com/photo-1470246973918-29a93221c455?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
  },
  {
    id: 2,
    name: "黄山云谷营地",
    location: "安徽·黄山",
    rating: 4.8,
    tags: ["云海绝景", "徒步路线"],
    cover: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
  },
  {
    id: 3,
    name: "安吉云上草原",
    location: "浙江·湖州",
    rating: 4.7,
    tags: ["亲子友好", "公厕完善"],
    cover: "https://images.unsplash.com/photo-1501854140801-50d01698950b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
  },
];

const galleryImages = [
  "https://images.unsplash.com/photo-1555488205-d5e67846cf40?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
  "https://images.unsplash.com/photo-1607462109225-6b64ae2dd3cb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
  "https://images.unsplash.com/photo-1629222247198-00b164054719?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
  "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
];

const facilities = [
  { icon: Droplets, label: "水源充足" },
  { icon: Car, label: "免费停车" },
  { icon: Wifi, label: "基站信号" },
  { icon: Flame, label: "允许生火" },
  { icon: Trees, label: "林间遮荫" },
  { icon: Baby, label: "亲子友好" },
];

const reviews = [
  {
    id: 1,
    author: "山野行者",
    avatar: "https://images.unsplash.com/photo-1724118135600-35009a8d6a89?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=150",
    rating: 5,
    date: "2026-05-28",
    text: "营地环境非常好，溪水清澈见底，晚上星空特别漂亮。营地工作人员也很热情，会主动帮忙指引最佳观景点。",
  },
  {
    id: 2,
    author: "Molly_Camping",
    avatar: "https://images.unsplash.com/photo-1615464670798-6e92fafa2a89?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=150",
    rating: 5,
    date: "2026-05-15",
    text: "距离城市近，适合周末短途。草坪平整，帐篷区和停车区分开，规划合理。建议带防蚊液。",
  },
  {
    id: 3,
    author: "荒野求生熊",
    avatar: "https://images.unsplash.com/photo-1600968566723-9fcdf6fca8d8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=150",
    rating: 4,
    date: "2026-04-30",
    text: "整体很满意，唯一遗憾是节假日人稍多。建议工作日前往体验更好，营地配套设施齐全。",
  },
];

export function CampDetailScreen() {
  const navigate = useNavigate();
  const location = useLocation();
  const [saved, setSaved] = useState(true);

  const stateCamp = location.state?.camp as CampData | undefined;
  const camp = stateCamp ?? defaultCamps[0];

  const toggleSave = () => {
    setSaved((s) => !s);
    toast.success(saved ? "已取消收藏" : "已收藏该营地");
  };

  return (
    <div className="flex flex-col h-full bg-slate-50 overflow-y-auto">
      {/* Cover */}
      <div className="relative h-[280px] shrink-0">
        <ImageWithFallback
          src={camp.cover}
          alt={camp.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 w-10 h-10 bg-black/30 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/20"
        >
          <ArrowLeft size={20} />
        </button>

        <div className="absolute top-4 right-4 flex gap-2">
          <button
            onClick={toggleSave}
            className="w-10 h-10 bg-black/30 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20"
          >
            <Heart size={18} className={saved ? "text-rose-400 fill-rose-400" : "text-white"} />
          </button>
          <button
            onClick={() => toast.success("已复制分享链接")}
            className="w-10 h-10 bg-black/30 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/20"
          >
            <Share2 size={18} />
          </button>
        </div>

        <div className="absolute bottom-4 left-5 right-5">
          <h1 className="text-[22px] font-bold text-white mb-1.5">{camp.name}</h1>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 text-white/80 text-[13px]">
              <MapPin size={13} />{camp.location}
            </div>
            <div className="flex items-center gap-1 text-amber-400 text-[13px]">
              <Star size={13} fill="currentColor" />
              <span className="font-semibold">{camp.rating}</span>
              <span className="text-white/60 text-[12px]">({reviews.length}条评价)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tags */}
      <div className="bg-white px-5 py-4 border-b border-slate-100">
        <div className="flex flex-wrap gap-2">
          {camp.tags.map((tag) => (
            <span key={tag} className="px-3 py-1.5 bg-emerald-50 text-emerald-700 rounded-full text-[13px] font-medium">
              {tag}
            </span>
          ))}
          <span className="px-3 py-1.5 bg-sky-50 text-sky-600 rounded-full text-[13px] font-medium">免费入场</span>
          <span className="px-3 py-1.5 bg-amber-50 text-amber-600 rounded-full text-[13px] font-medium">风景绝佳</span>
        </div>
      </div>

      {/* Description */}
      <div className="bg-white mt-2 px-5 py-4">
        <h2 className="text-[15px] font-semibold text-slate-800 mb-2">营地介绍</h2>
        <p className="text-[14px] text-slate-600 leading-relaxed">
          {camp.name}坐落于{camp.location}，四周群山环抱，空气清新。营地提供宽阔的草坪营位，溪流环绕，夜晚星空璀璨。距市区约2小时车程，交通便利，是周末短途露营的理想之地。营地全年开放，春秋两季景色最佳。
        </p>
      </div>

      {/* Facilities */}
      <div className="bg-white mt-2 px-5 py-4">
        <h2 className="text-[15px] font-semibold text-slate-800 mb-4">营地设施</h2>
        <div className="grid grid-cols-3 gap-3">
          {facilities.map(({ icon: Icon, label }) => (
            <div key={label} className="flex flex-col items-center gap-1.5 py-3 bg-slate-50 rounded-xl">
              <div className="w-9 h-9 bg-emerald-100 rounded-full flex items-center justify-center">
                <Icon size={18} className="text-emerald-600" />
              </div>
              <span className="text-[12px] text-slate-600 font-medium">{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Gallery */}
      <div className="bg-white mt-2 px-5 py-4">
        <h2 className="text-[15px] font-semibold text-slate-800 mb-3">实拍图片</h2>
        <div className="grid grid-cols-2 gap-2">
          {galleryImages.map((src, i) => (
            <div key={i} className="aspect-[4/3] rounded-xl overflow-hidden bg-slate-100">
              <ImageWithFallback src={src} alt={`Gallery ${i + 1}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
            </div>
          ))}
        </div>
      </div>

      {/* Reviews */}
      <div className="bg-white mt-2 px-5 py-4 mb-28">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-[15px] font-semibold text-slate-800">用户评价</h2>
          <button className="text-[13px] text-emerald-600 font-medium">全部 &gt;</button>
        </div>
        <div className="flex flex-col gap-5">
          {reviews.map((r) => (
            <div key={r.id} className="flex gap-3">
              <ImageWithFallback src={r.avatar} alt={r.author} className="w-9 h-9 rounded-full object-cover shrink-0" />
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[14px] font-medium text-slate-800">{r.author}</span>
                  <span className="text-[11px] text-slate-400">{r.date}</span>
                </div>
                <div className="flex items-center gap-0.5 mb-1.5">
                  {Array.from({ length: 5 }, (_, i) => (
                    <Star key={i} size={12} className={i < r.rating ? "text-amber-400 fill-amber-400" : "text-slate-200 fill-slate-200"} />
                  ))}
                </div>
                <p className="text-[13px] text-slate-600 leading-relaxed">{r.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[390px] bg-white border-t border-slate-100 px-4 py-4 flex gap-3">
        <button
          onClick={() => toast.success("正在调起导航...")}
          className="flex-1 h-12 rounded-full border border-emerald-500 text-emerald-600 font-semibold text-[15px] flex items-center justify-center gap-2 hover:bg-emerald-50 transition-colors"
        >
          <Navigation size={18} /> 导航前往
        </button>
        <button
          onClick={() => toast.success("正在拨打营地电话...")}
          className="flex-1 h-12 rounded-full bg-emerald-500 text-white font-semibold text-[15px] flex items-center justify-center gap-2 hover:bg-emerald-600 transition-colors active:scale-[0.98]"
        >
          <Phone size={18} /> 联系营地
        </button>
      </div>
    </div>
  );
}
