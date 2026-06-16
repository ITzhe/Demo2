import { Heart, MessageCircle, Share2, MapPin, CloudSun, MoreHorizontal, ChevronDown, Download, X, Sun, Send, Loader2 } from "lucide-react";
import { useState, useEffect, useCallback, useRef } from "react";
import { toast } from "sonner";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { projectId, publicAnonKey } from "/utils/supabase/info";

const BASE = `https://${projectId}.supabase.co/functions/v1/make-server-48f65fe4`;
const headers = { "Content-Type": "application/json", Authorization: `Bearer ${publicAnonKey}` };

function getDeviceId(): string {
  let id = localStorage.getItem("camping_device_id");
  if (!id) {
    id = `dev_${Math.random().toString(36).slice(2)}`;
    localStorage.setItem("camping_device_id", id);
  }
  return id;
}

interface Post {
  id: string;
  user: { name: string; avatar: string; time: string };
  content: string;
  images: string[];
  location: string;
  weather: string;
  humidity: string;
  uv: string;
  likes: number;
  comments: number;
}

interface Comment {
  id: string;
  author: string;
  text: string;
  createdAt: number;
}

function PostImages({ images, onClick }: { images: string[]; onClick: (idx: number) => void }) {
  const [current, setCurrent] = useState(0);
  if (!images || images.length === 0) return null;
  if (images.length === 1) {
    return (
      <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden mb-3 bg-slate-100 cursor-pointer" onClick={(e) => { e.stopPropagation(); onClick(0); }}>
        <ImageWithFallback src={images[0]} alt="Post" className="w-full h-full object-cover hover:scale-[1.02] transition-transform duration-300" />
      </div>
    );
  }
  return (
    <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden mb-3 bg-slate-100 cursor-pointer" onClick={(e) => { e.stopPropagation(); onClick(current); }}>
      <ImageWithFallback src={images[current]} alt="Post" className="w-full h-full object-cover" />
      <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1.5">
        {images.map((_, i) => (
          <button
            key={i}
            className={`h-1.5 rounded-full transition-all ${i === current ? "bg-white w-4" : "bg-white/60 w-1.5"}`}
            onClick={(e) => { e.stopPropagation(); setCurrent(i); }}
          />
        ))}
      </div>
    </div>
  );
}

function CommentDrawer({ postId, onClose }: { postId: string; onClose: () => void }) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [text, setText] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetch(`${BASE}/posts/${postId}/comments`, { headers })
      .then((r) => r.json())
      .then(setComments)
      .catch(console.error)
      .finally(() => setLoading(false));
    setTimeout(() => inputRef.current?.focus(), 300);
  }, [postId]);

  const submit = async () => {
    if (!text.trim() || submitting) return;
    setSubmitting(true);
    try {
      const res = await fetch(`${BASE}/posts/${postId}/comments`, {
        method: "POST",
        headers,
        body: JSON.stringify({ author: "我", text: text.trim() }),
      });
      const comment = await res.json();
      setComments((prev) => [...prev, comment]);
      setText("");
    } catch (e) {
      console.error("Error posting comment:", e);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[200] flex flex-col justify-end" onClick={onClose}>
      <div className="absolute inset-0 bg-black/40" />
      <div
        className="relative bg-white rounded-t-3xl flex flex-col max-h-[75vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
          <span className="text-[16px] font-semibold text-slate-800">
            评论{comments.length > 0 ? ` ${comments.length}` : ""}
          </span>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-3 flex flex-col gap-4">
          {loading && (
            <div className="flex justify-center py-8">
              <Loader2 size={24} className="animate-spin text-slate-400" />
            </div>
          )}
          {!loading && comments.length === 0 && (
            <p className="text-center text-slate-400 text-[14px] py-8">还没有评论，来抢沙发吧！</p>
          )}
          {comments.map((c) => (
            <div key={c.id} className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 text-[13px] font-bold shrink-0">
                {c.author[0]}
              </div>
              <div className="flex flex-col flex-1">
                <span className="text-[13px] font-medium text-slate-700 mb-0.5">{c.author}</span>
                <p className="text-[14px] text-slate-600 leading-relaxed">{c.text}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="px-4 py-3 border-t border-slate-100 flex items-center gap-3">
          <input
            ref={inputRef}
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && submit()}
            placeholder="说点什么..."
            className="flex-1 bg-slate-100 rounded-full px-4 py-2.5 text-[14px] text-slate-800 placeholder:text-slate-400 outline-none"
          />
          <button
            onClick={submit}
            disabled={!text.trim() || submitting}
            className="w-9 h-9 bg-emerald-500 rounded-full flex items-center justify-center text-white disabled:opacity-40 shrink-0"
          >
            {submitting ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
          </button>
        </div>
      </div>
    </div>
  );
}

export function HomeScreen() {
  const [posts, setPosts] = useState<Post[]>([{ id: "fallback-1", user: { name: "Cai Bob", avatar: "C", time: "2h" }, content: "今天先用离线兜底内容，接口暂时不可用时也能正常展示。", images: ["data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600'><rect width='800' height='600' fill='lightblue'/><circle cx='640' cy='120' r='90' fill='khaki'/><path d='M0 500 Q150 430 320 500 T640 490 T800 460 V600 H0 Z' fill='seagreen'/></svg>"], location: "北京 · 密云", weather: "晴", humidity: "48%", uv: "紫外线 中", likes: 18, comments: 3 }]);
  const [loading, setLoading] = useState(false);
  const [likedMap, setLikedMap] = useState<Record<string, boolean>>({});
  const [selectedPost, setSelectedPost] = useState<{ post: Post; imgIdx: number } | null>(null);
  const [commentPostId, setCommentPostId] = useState<string | null>(null);
  const deviceId = getDeviceId();

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`${BASE}/posts`, { headers });
      const payload = await res.json();
      const data = Array.isArray(payload)
        ? payload
        : Array.isArray(payload?.posts)
          ? payload.posts
          : Array.isArray(payload?.data)
            ? payload.data
            : [];
      if (data.length > 0) setPosts(data);

      const likeStatuses = await Promise.all(
        data.map(async (p) => {
          const r = await fetch(`${BASE}/posts/${p.id}/like-status?deviceId=${deviceId}`, { headers });
          const { liked } = await r.json();
          return [p.id, liked] as [string, boolean];
        })
      );
      setLikedMap(Object.fromEntries(likeStatuses));
    } catch (e) {
      console.error("Error fetching posts:", e);
      setPosts([
        {
          id: "fallback-1",
          user: { name: "Cai Bob", avatar: "C", time: "2h" },
          content: "今天先用离线兜底内容，接口暂时不可用时也能正常展示。",
          images: ["data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600'><rect width='800' height='600' fill='lightblue'/><circle cx='640' cy='120' r='90' fill='khaki'/><path d='M0 500 Q150 430 320 500 T640 490 T800 460 V600 H0 Z' fill='seagreen'/></svg>"],
          location: "北京 · 密云",
          weather: "晴",
          humidity: "48%",
          uv: "紫外线 中",
          likes: 18,
          comments: 3,
        },
        {
          id: "fallback-2",
          user: { name: "阿野", avatar: "A", time: "5h" },
          content: "山里风很舒服，适合周末露营和拍照。",
          images: ["data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600'><rect width='800' height='600' fill='peachpuff'/><rect y='450' width='800' height='150' fill='olivedrab'/><circle cx='150' cy='110' r='70' fill='gold'/></svg>"],
          location: "河北 · 承德",
          weather: "多云",
          humidity: "55%",
          uv: "紫外线 低",
          likes: 26,
          comments: 6,
        },
        {
          id: "fallback-3",
          user: { name: "小鹿", avatar: "L", time: "8h" },
          content: "补给区和帐篷区分开之后，动线更清晰了。",
          images: ["data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600'><rect width='800' height='600' fill='lavender'/><rect y='470' width='800' height='130' fill='mediumseagreen'/><circle cx='610' cy='160' r='80' fill='plum'/></svg>"],
          location: "浙江 · 安吉",
          weather: "晴",
          humidity: "42%",
          uv: "紫外线 高",
          likes: 34,
          comments: 8,
        },
      ]);
      setLikedMap({});
    } finally {
      setLoading(false);
    }
  }, [deviceId]);

  useEffect(() => { fetchPosts(); }, [fetchPosts]);

  const toggleLike = async (postId: string) => {
    const wasLiked = likedMap[postId] || false;
    setLikedMap((prev) => ({ ...prev, [postId]: !wasLiked }));
    setPosts((prev) =>
      prev.map((p) => p.id === postId ? { ...p, likes: wasLiked ? p.likes - 1 : p.likes + 1 } : p)
    );

    try {
      const res = await fetch(`${BASE}/posts/${postId}/like`, {
        method: "POST",
        headers,
        body: JSON.stringify({ deviceId }),
      });
      const { liked, likes } = await res.json();
      setLikedMap((prev) => ({ ...prev, [postId]: liked }));
      setPosts((prev) => prev.map((p) => p.id === postId ? { ...p, likes } : p));
    } catch (e) {
      console.error("Error toggling like:", e);
      setLikedMap((prev) => ({ ...prev, [postId]: wasLiked }));
      setPosts((prev) =>
        prev.map((p) => p.id === postId ? { ...p, likes: wasLiked ? p.likes + 1 : p.likes - 1 } : p)
      );
    }
  };

  return (
    <div className="flex flex-col h-full bg-slate-50 relative overflow-y-auto">
      <div className="h-14 flex items-center justify-between px-4 bg-white/80 backdrop-blur-md sticky top-0 z-20 border-b border-slate-100">
        <button className="flex items-center gap-0.5 text-[15px] font-medium text-slate-700 hover:text-emerald-600 transition-colors">
          北京 <ChevronDown size={16} className="text-slate-400" />
        </button>
        <div className="flex items-center gap-6 text-[16px] font-medium absolute left-1/2 -translate-x-1/2">
          <button className="text-emerald-600 relative">
            推荐
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-4 h-[3px] bg-emerald-500 rounded-full" />
          </button>
          <button className="text-slate-400 hover:text-slate-600 transition-colors">关注</button>
        </div>
        <button className="text-slate-600"><MoreHorizontal size={24} /></button>
      </div>

      <div className="flex flex-col gap-3 pb-6">
        {loading && (
          <div className="flex justify-center items-center py-16">
            <Loader2 size={28} className="animate-spin text-emerald-500" />
          </div>
        )}
        {!loading && posts.map((post) => (
          <div 
            key={post.id} 
            className="bg-white p-4 cursor-pointer active:bg-slate-50 transition-colors"
            onClick={() => toast.success("正在进入动态详情...")}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <ImageWithFallback src={post.user.avatar} alt={post.user.name} className="w-10 h-10 rounded-full object-cover border border-slate-100" />
                <div className="flex flex-col">
                  <span className="text-[15px] font-medium text-slate-800">{post.user.name}</span>
                  <span className="text-[12px] text-slate-400">{post.user.time}</span>
                </div>
              </div>
              <button 
                className="px-3 py-1 rounded-full border border-emerald-500 text-emerald-600 text-[12px] font-medium hover:bg-emerald-50 transition-colors"
                onClick={(e) => { e.stopPropagation(); toast.success("关注成功"); }}
              >
                关注
              </button>
            </div>

            <p className="text-[15px] text-slate-700 leading-relaxed mb-3">{post.content}</p>

            <PostImages images={post.images} onClick={(idx) => setSelectedPost({ post, imgIdx: idx })} />

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

            <div className="flex items-center justify-between border-t border-slate-50 pt-3 px-2">
              <button
                className={`flex items-center gap-1.5 transition-all active:scale-110 ${likedMap[post.id] ? "text-rose-500" : "text-slate-500 hover:text-rose-500"}`}
                onClick={(e) => { e.stopPropagation(); toggleLike(post.id); }}
              >
                <Heart size={20} fill={likedMap[post.id] ? "currentColor" : "none"} />
                <span className="text-[13px] font-medium">{post.likes}</span>
              </button>
              <button
                className="flex items-center gap-1.5 text-slate-500 hover:text-blue-500 transition-colors"
                onClick={(e) => { e.stopPropagation(); setCommentPostId(post.id); }}
              >
                <MessageCircle size={20} />
                <span className="text-[13px] font-medium">{post.comments}</span>
              </button>
              <button 
                className="flex items-center gap-1.5 text-slate-500 hover:text-emerald-500 transition-colors"
                onClick={(e) => { e.stopPropagation(); toast.success("正在调起分享..."); }}
              >
                <Share2 size={20} />
                <span className="text-[13px] font-medium">分享</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedPost && (
        <div className="fixed inset-0 z-[100] bg-black flex flex-col animate-in fade-in duration-200">
          <div className="absolute top-4 left-4 right-4 flex justify-between z-10">
            <button
              className="w-10 h-10 bg-black/40 rounded-full flex items-center justify-center text-white backdrop-blur-md hover:bg-black/60 transition-colors"
              onClick={() => setSelectedPost(null)}
            >
              <X size={20} />
            </button>
            <button className="w-10 h-10 bg-black/40 rounded-full flex items-center justify-center text-white backdrop-blur-md hover:bg-black/60 transition-colors">
              <Download size={20} />
            </button>
          </div>
          <div className="flex-1 flex items-center justify-center overflow-hidden">
            <ImageWithFallback
              src={selectedPost.post.images[selectedPost.imgIdx]}
              alt="Fullscreen"
              className="w-full max-h-full object-contain"
            />
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-6 pt-12 bg-gradient-to-t from-black/90 via-black/50 to-transparent">
            <div className="flex items-center gap-2 mb-3">
              <ImageWithFallback src={selectedPost.post.user.avatar} alt={selectedPost.post.user.name} className="w-8 h-8 rounded-full border border-white/20 object-cover" />
              <span className="text-white font-medium text-[15px]">{selectedPost.post.user.name}</span>
            </div>
            <p className="text-white/90 text-[15px] leading-relaxed line-clamp-4">{selectedPost.post.content}</p>
          </div>
        </div>
      )}

      {commentPostId && (
        <CommentDrawer
          postId={commentPostId}
          onClose={() => {
            setCommentPostId(null);
            fetchPosts();
          }}
        />
      )}
    </div>
  );
}
