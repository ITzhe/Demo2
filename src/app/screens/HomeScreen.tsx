import { Heart, MessageCircle, Share2, MapPin, CloudSun, MoreHorizontal, ChevronDown, Download, X, Sun } from "lucide-react";
import { useState } from "react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

export function HomeScreen() {
  const [selectedPost, setSelectedPost] = useState<any>(null);

  const posts = [
    {
      id: 1,
      user: {
        name: "山野行者",
        avatar: "https://images.unsplash.com/photo-1724118135600-35009a8d6a89?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3J0cmFpdCUyMHlvdW5nJTIwbWFuJTIwb3V0ZG9vcnN8ZW58MXx8fHwxNzgxMTI3NjkzfDA&ixlib=rb-4.1.0&q=80&w=150",
        time: "2小时前",
      },
      content: "逃离城市计划成功！在径山深处找到了这个绝佳的避世小营地，夜晚的星空太惊艳了。🌟⛺️",
      images: [
        "https://images.unsplash.com/photo-1470246973918-29a93221c455?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYW1waW5nJTIwdGVudCUyMGZvcmVzdHxlbnwxfHx8fDE3ODExNzg3NzB8MA&ixlib=rb-4.1.0&q=80&w=1080",
      ],
      location: "径山客野奢营地",
      weather: "晴 26°C",
      humidity: "60%",
      uv: "高",
      likes: 128,
      comments: 32,
    },
    {
      id: 2,
      user: {
        name: "Molly_Camping",
        avatar: "https://images.unsplash.com/photo-1615464670798-6e92fafa2a89?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3J0cmFpdCUyMHdvbWFuJTIwc21pbGluZyUyMG91dGRvb3JzfGVufDF8fHx8MTc4MTE3ODc3MHww&ixlib=rb-4.1.0&q=80&w=150",
        time: "5小时前",
      },
      content: "新入手的复古煤油灯，氛围感直接拉满～ 准备在这个周末好好躺平两天☕️",
      images: [
        "https://images.unsplash.com/photo-1555488205-d5e67846cf40?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYW1waW5nJTIwbGFudGVybiUyMGxpZ2h0fGVufDF8fHx8MTc4MTE3ODc3MXww&ixlib=rb-4.1.0&q=80&w=1080",
      ],
      location: "安吉云上草原",
      weather: "多云 22°C",
      humidity: "75%",
      uv: "低",
      likes: 85,
      comments: 12,
    }
  ];

  return (
    <div className="flex flex-col h-full bg-slate-50 relative">
      {/* Top Bar */}
      <div className="h-14 flex items-center justify-between px-4 bg-white/80 backdrop-blur-md sticky top-0 z-20 border-b border-slate-100">
        <div className="flex items-center">
          <button className="flex items-center gap-0.5 text-[15px] font-medium text-slate-700 hover:text-emerald-600 transition-colors">
            北京 <ChevronDown size={16} className="text-slate-400" />
          </button>
        </div>
        <div className="flex items-center gap-6 text-[16px] font-medium absolute left-1/2 -translate-x-1/2">
          <button className="text-emerald-600 relative">
            推荐
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-4 h-[3px] bg-emerald-500 rounded-full" />
          </button>
          <button className="text-slate-400 hover:text-slate-600 transition-colors">
            关注
          </button>
        </div>
        <button className="text-slate-600">
          <MoreHorizontal size={24} />
        </button>
      </div>

      {/* Feed List */}
      <div className="flex flex-col gap-3 pb-6">
        {posts.map((post) => (
          <div key={post.id} className="bg-white p-4">
            {/* User Info */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <ImageWithFallback 
                  src={post.user.avatar} 
                  alt={post.user.name}
                  className="w-10 h-10 rounded-full object-cover border border-slate-100"
                />
                <div className="flex flex-col">
                  <span className="text-[15px] font-medium text-slate-800">{post.user.name}</span>
                  <span className="text-[12px] text-slate-400">{post.user.time}</span>
                </div>
              </div>
              <button className="px-3 py-1 rounded-full border border-emerald-500 text-emerald-600 text-[12px] font-medium hover:bg-emerald-50 transition-colors">
                关注
              </button>
            </div>

            {/* Content Text */}
            <p className="text-[15px] text-slate-700 leading-relaxed mb-3">
              {post.content}
            </p>

            {/* Media */}
            <div 
              className="w-full aspect-[4/3] rounded-2xl overflow-hidden mb-3 bg-slate-100 cursor-pointer"
              onClick={() => setSelectedPost(post)}
            >
              <ImageWithFallback 
                src={post.images[0]} 
                alt="Post Media"
                className="w-full h-full object-cover hover:scale-[1.02] transition-transform duration-300"
              />
            </div>

            {/* Location & Env Info */}
            <div className="flex flex-col gap-2 mb-4">
              <div className="self-start flex items-center gap-1.5 px-2.5 py-1.5 bg-emerald-50 text-emerald-700 rounded-lg text-[12px] font-medium">
                <MapPin size={14} />
                <span className="max-w-[200px] truncate">{post.location}</span>
              </div>
              <div className="self-start flex items-center flex-wrap gap-1.5 px-2.5 py-1.5 bg-slate-50 text-slate-600 rounded-lg text-[12px] font-medium">
                <CloudSun size={14} className="text-sky-500" />
                <span>{post.weather}</span>
                <span className="text-slate-300 mx-0.5">|</span>
                <span>湿度 {post.humidity}</span>
                <span className="text-slate-300 mx-0.5">|</span>
                <Sun size={14} className="text-amber-500 ml-0.5" />
                <span>紫外线 {post.uv}</span>
              </div>
            </div>

            {/* Action Bar */}
            <div className="flex items-center justify-between border-t border-slate-50 pt-3 px-2">
              <button className="flex items-center gap-1.5 text-slate-500 hover:text-rose-500 transition-colors">
                <Heart size={20} />
                <span className="text-[13px] font-medium">{post.likes}</span>
              </button>
              <button className="flex items-center gap-1.5 text-slate-500 hover:text-blue-500 transition-colors">
                <MessageCircle size={20} />
                <span className="text-[13px] font-medium">{post.comments}</span>
              </button>
              <button className="flex items-center gap-1.5 text-slate-500 hover:text-emerald-500 transition-colors">
                <Share2 size={20} />
                <span className="text-[13px] font-medium">分享</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Fullscreen Image Modal */}
      {selectedPost && (
        <div className="fixed inset-0 z-[100] bg-black flex flex-col animate-in fade-in duration-200">
          <div className="absolute top-safe pt-4 left-4 right-4 flex justify-between z-10">
            <button 
              className="w-10 h-10 bg-black/40 rounded-full flex items-center justify-center text-white backdrop-blur-md hover:bg-black/60 transition-colors"
              onClick={() => setSelectedPost(null)}
            >
              <X size={20} />
            </button>
            <button 
              className="w-10 h-10 bg-black/40 rounded-full flex items-center justify-center text-white backdrop-blur-md hover:bg-black/60 transition-colors"
            >
              <Download size={20} />
            </button>
          </div>
          
          <div className="flex-1 flex items-center justify-center overflow-hidden">
            <ImageWithFallback 
              src={selectedPost.images[0]} 
              alt="Fullscreen" 
              className="w-full max-h-full object-contain"
            />
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-6 pt-12 bg-gradient-to-t from-black/90 via-black/50 to-transparent">
            <div className="flex items-center gap-2 mb-3">
              <ImageWithFallback 
                src={selectedPost.user.avatar} 
                alt={selectedPost.user.name}
                className="w-8 h-8 rounded-full border border-white/20 object-cover" 
              />
              <span className="text-white font-medium text-[15px] shadow-sm">{selectedPost.user.name}</span>
            </div>
            <p className="text-white/90 text-[15px] leading-relaxed line-clamp-4 drop-shadow-md">
              {selectedPost.content}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
