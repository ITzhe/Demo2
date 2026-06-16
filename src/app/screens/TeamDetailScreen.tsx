import { ArrowLeft, MapPin, Calendar, Users, CheckCircle2, MessageCircle, Share2, Shield, Clock, ChevronRight } from "lucide-react";
import { useNavigate, useLocation } from "react-router";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { toast } from "sonner";
import { useState } from "react";

interface TeamDetailData {
  id: number;
  title: string;
  date: string;
  location: string;
  members: number;
  maxMembers: number;
  status: string;
  cover: string;
}

const defaultTeams: TeamDetailData[] = [
  {
    id: 1,
    title: "黄山云谷三日野营",
    date: "2026-06-20",
    location: "黄山风景区",
    members: 3,
    maxMembers: 6,
    status: "recruiting",
    cover: "https://images.unsplash.com/photo-1501854140801-50d01698950b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
  },
  {
    id: 2,
    title: "安吉竹海摄影营",
    date: "2026-07-05",
    location: "安吉云上草原",
    members: 5,
    maxMembers: 5,
    status: "full",
    cover: "https://images.unsplash.com/photo-1555488205-d5e67846cf40?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
  },
];

const memberAvatars = [
  "https://images.unsplash.com/photo-1600968566723-9fcdf6fca8d8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=150",
  "https://images.unsplash.com/photo-1724118135600-35009a8d6a89?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=150",
  "https://images.unsplash.com/photo-1615464670798-6e92fafa2a89?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=150",
];

const memberNames = ["荒野求生熊（队长）", "山野行者", "Molly_Camping"];

const schedules = [
  { day: "D1", title: "集合 · 安营", desc: "下午抵达营地，安营扎寨，傍晚溪边篝火" },
  { day: "D2", title: "徒步 · 探索", desc: "前往云谷景区核心区域徒步，午餐自备" },
  { day: "D3", title: "撤营 · 返程", desc: "早餐后收帐，上午返回出发地" },
];

const requirements = [
  "需自备帐篷及睡袋",
  "具备一定徒步经验",
  "AA制费用，预计人均300元",
  "禁止携带宠物入营",
];

export function TeamDetailScreen() {
  const navigate = useNavigate();
  const location = useLocation();
  const [joined, setJoined] = useState(false);

  const stateTeam = location.state?.team as TeamDetailData | undefined;
  const team = stateTeam ?? defaultTeams[0];
  const isFull = team.status === "full";

  const handleJoin = () => {
    if (isFull) return;
    setJoined(true);
    toast.success("申请已发送，等待队长确认！");
  };

  return (
    <div className="flex flex-col h-full bg-slate-50 overflow-y-auto">
      {/* Cover */}
      <div className="relative h-[260px] shrink-0">
        <ImageWithFallback
          src={team.cover}
          alt={team.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        {/* Back button */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 w-10 h-10 bg-black/30 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/20"
        >
          <ArrowLeft size={20} />
        </button>

        <button
          onClick={() => toast.success("已复制分享链接")}
          className="absolute top-4 right-4 w-10 h-10 bg-black/30 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/20"
        >
          <Share2 size={18} />
        </button>

        {/* Status Badge */}
        <span className={`absolute top-4 left-1/2 -translate-x-1/2 text-[12px] font-semibold px-3 py-1 rounded-full ${isFull ? "bg-slate-600 text-white" : "bg-emerald-500 text-white"}`}>
          {isFull ? "已满员" : "招募中"}
        </span>

        <div className="absolute bottom-4 left-5 right-5">
          <h1 className="text-[20px] font-bold text-white leading-snug mb-2">{team.title}</h1>
          <div className="flex items-center gap-4 text-white/80 text-[13px]">
            <div className="flex items-center gap-1"><MapPin size={13} />{team.location}</div>
            <div className="flex items-center gap-1"><Calendar size={13} />{team.date}</div>
          </div>
        </div>
      </div>

      {/* Member Count */}
      <div className="bg-white px-5 py-4 flex items-center justify-between border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="flex -space-x-2">
            {memberAvatars.slice(0, team.members).map((av, i) => (
              <ImageWithFallback key={i} src={av} alt="member" className="w-9 h-9 rounded-full border-2 border-white object-cover" />
            ))}
            {team.maxMembers > team.members && (
              <div className="w-9 h-9 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center text-[11px] text-slate-500 font-medium">
                +{team.maxMembers - team.members}
              </div>
            )}
          </div>
          <div>
            <p className="text-[14px] font-semibold text-slate-800">{team.members} 人已加入</p>
            <p className="text-[12px] text-slate-400">还差 {team.maxMembers - team.members} 人满员</p>
          </div>
        </div>
        <div className="flex items-center gap-1.5 text-slate-500">
          <Users size={16} className="text-emerald-500" />
          <span className="text-[14px] font-semibold">{team.members}<span className="text-slate-400 font-normal">/{team.maxMembers}</span></span>
        </div>
      </div>

      {/* Members */}
      <div className="bg-white mt-2 px-5 py-4">
        <h2 className="text-[15px] font-semibold text-slate-800 mb-4">队员列表</h2>
        <div className="flex flex-col gap-3">
          {memberAvatars.slice(0, team.members).map((av, i) => (
            <div key={i} className="flex items-center gap-3">
              <ImageWithFallback src={av} alt="member" className="w-10 h-10 rounded-full object-cover" />
              <div className="flex-1">
                <p className="text-[14px] font-medium text-slate-800">{memberNames[i] ?? `队员${i + 1}`}</p>
                <p className="text-[12px] text-slate-400">{i === 0 ? "队长" : "队员"} · 已确认</p>
              </div>
              {i === 0 && (
                <span className="text-[11px] px-2 py-0.5 bg-amber-50 text-amber-600 rounded-full font-medium flex items-center gap-1">
                  <Shield size={10} /> 队长
                </span>
              )}
              {i > 0 && (
                <CheckCircle2 size={18} className="text-emerald-500" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Schedule */}
      <div className="bg-white mt-2 px-5 py-4">
        <h2 className="text-[15px] font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <Clock size={16} className="text-emerald-500" />行程安排
        </h2>
        <div className="flex flex-col gap-4 relative">
          <div className="absolute left-5 top-2 bottom-2 w-px bg-emerald-100" />
          {schedules.map((s, i) => (
            <div key={i} className="flex gap-4 relative">
              <div className="w-10 h-10 shrink-0 rounded-full bg-emerald-500 flex items-center justify-center text-white text-[12px] font-bold z-10">
                {s.day}
              </div>
              <div className="flex-1 pb-2">
                <p className="text-[14px] font-semibold text-slate-800 mb-0.5">{s.title}</p>
                <p className="text-[13px] text-slate-500 leading-relaxed">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Requirements */}
      <div className="bg-white mt-2 px-5 py-4 mb-24">
        <h2 className="text-[15px] font-semibold text-slate-800 mb-3">参与要求</h2>
        <div className="flex flex-col gap-2">
          {requirements.map((r, i) => (
            <div key={i} className="flex items-start gap-2 text-[13px] text-slate-600">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
              {r}
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[390px] bg-white border-t border-slate-100 px-4 py-4 flex gap-3">
        <button
          onClick={() => toast.success("消息功能即将上线")}
          className="w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50 transition-colors shrink-0"
        >
          <MessageCircle size={20} />
        </button>
        <button
          onClick={handleJoin}
          disabled={isFull || joined}
          className={`flex-1 h-12 rounded-full font-semibold text-[16px] transition-all
            ${joined ? "bg-emerald-100 text-emerald-600" : isFull ? "bg-slate-200 text-slate-400" : "bg-emerald-500 text-white hover:bg-emerald-600 active:scale-[0.98]"}`}
        >
          {joined ? "✓ 申请已发送" : isFull ? "队伍已满员" : "申请加入队伍"}
        </button>
      </div>
    </div>
  );
}
