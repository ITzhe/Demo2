import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import * as kv from "./kv_store.tsx";

const app = new Hono();

app.use('*', logger(console.log));
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

app.get("/make-server-48f65fe4/health", (c) => c.json({ status: "ok" }));

// Seed initial posts if none exist
async function ensureSeeded() {
  const index = await kv.get("posts:index");
  if (index) return;

  const initialPosts = [
    {
      id: "p1",
      user: { name: "山野行者", avatar: "https://images.unsplash.com/photo-1724118135600-35009a8d6a89?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=150", time: "2小时前" },
      content: "逃离城市计划成功！在径山深处找到了这个绝佳的避世小营地，夜晚的星空太惊艳了。🌟⛺️",
      images: ["https://images.unsplash.com/photo-1470246973918-29a93221c455?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"],
      location: "径山客野奢营地",
      weather: "晴 26°C",
      humidity: "60%",
      uv: "高",
      likes: 128,
      comments: 32,
      createdAt: Date.now() - 2 * 3600 * 1000,
    },
    {
      id: "p2",
      user: { name: "Molly_Camping", avatar: "https://images.unsplash.com/photo-1615464670798-6e92fafa2a89?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=150", time: "5小时前" },
      content: "新入手的复古煤油灯，氛围感直接拉满～ 准备在这个周末好好躺平两天☕️",
      images: ["https://images.unsplash.com/photo-1555488205-d5e67846cf40?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"],
      location: "安吉云上草原",
      weather: "多云 22°C",
      humidity: "75%",
      uv: "低",
      likes: 85,
      comments: 12,
      createdAt: Date.now() - 5 * 3600 * 1000,
    },
    {
      id: "p3",
      user: { name: "峰顶追云人", avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=150", time: "昨天" },
      content: "独自驱车三小时，终于抵达黄山脚下的秘密营地。云海翻腾的清晨值得所有辛苦🏔️",
      images: [
        "https://images.unsplash.com/photo-1501854140801-50d01698950b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
        "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      ],
      location: "黄山云谷营地",
      weather: "薄雾 18°C",
      humidity: "90%",
      uv: "中",
      likes: 256,
      comments: 45,
      createdAt: Date.now() - 24 * 3600 * 1000,
    },
  ];

  const ids = initialPosts.map((p) => p.id);
  await kv.set("posts:index", ids);
  for (const post of initialPosts) {
    await kv.set(`post:${post.id}`, post);
    const sampleComments: any[] = post.id === "p1"
      ? [{ id: "c1", author: "露营小白", text: "太美了！请问营地预订方式？", createdAt: Date.now() - 1800000 }]
      : post.id === "p3"
      ? [{ id: "c2", author: "云端旅行者", text: "云海绝了！下次一定要去", createdAt: Date.now() - 3600000 }]
      : [];
    await kv.set(`comments:${post.id}`, sampleComments);
  }
  console.log("Seeded initial posts.");
}

ensureSeeded().catch(console.error);

// GET /posts — list all posts
app.get("/make-server-48f65fe4/posts", async (c) => {
  try {
    const ids: string[] = (await kv.get("posts:index")) ?? [];
    const posts = await Promise.all(ids.map((id) => kv.get(`post:${id}`)));
    return c.json(posts.filter(Boolean));
  } catch (e) {
    console.log("Error GET /posts:", e);
    return c.json({ error: String(e) }, 500);
  }
});

// POST /posts — create a post
app.post("/make-server-48f65fe4/posts", async (c) => {
  try {
    const body = await c.req.json();
    const id = `p${Date.now()}`;
    const post = { id, ...body, likes: 0, comments: 0, createdAt: Date.now() };
    await kv.set(`post:${id}`, post);
    await kv.set(`comments:${id}`, []);

    const ids: string[] = (await kv.get("posts:index")) ?? [];
    ids.unshift(id);
    await kv.set("posts:index", ids);

    return c.json(post, 201);
  } catch (e) {
    console.log("Error POST /posts:", e);
    return c.json({ error: String(e) }, 500);
  }
});

// POST /posts/:id/like — toggle like
app.post("/make-server-48f65fe4/posts/:id/like", async (c) => {
  try {
    const postId = c.req.param("id");
    const { deviceId } = await c.req.json();
    const likeKey = `like:${postId}:${deviceId}`;
    const alreadyLiked = await kv.get(likeKey);

    const post = await kv.get(`post:${postId}`);
    if (!post) return c.json({ error: "Post not found" }, 404);

    if (alreadyLiked) {
      await kv.del(likeKey);
      post.likes = Math.max(0, post.likes - 1);
    } else {
      await kv.set(likeKey, "1");
      post.likes = post.likes + 1;
    }
    await kv.set(`post:${postId}`, post);
    return c.json({ liked: !alreadyLiked, likes: post.likes });
  } catch (e) {
    console.log("Error POST /posts/:id/like:", e);
    return c.json({ error: String(e) }, 500);
  }
});

// GET /posts/:id/like-status
app.get("/make-server-48f65fe4/posts/:id/like-status", async (c) => {
  try {
    const postId = c.req.param("id");
    const deviceId = c.req.query("deviceId") || "";
    const liked = !!(await kv.get(`like:${postId}:${deviceId}`));
    return c.json({ liked });
  } catch (e) {
    return c.json({ liked: false });
  }
});

// GET /posts/:id/comments
app.get("/make-server-48f65fe4/posts/:id/comments", async (c) => {
  try {
    const postId = c.req.param("id");
    const list = (await kv.get(`comments:${postId}`)) ?? [];
    return c.json(list);
  } catch (e) {
    console.log("Error GET /posts/:id/comments:", e);
    return c.json({ error: String(e) }, 500);
  }
});

// POST /posts/:id/comments
app.post("/make-server-48f65fe4/posts/:id/comments", async (c) => {
  try {
    const postId = c.req.param("id");
    const body = await c.req.json();
    const comment = { id: `c${Date.now()}`, ...body, createdAt: Date.now() };

    const list = (await kv.get(`comments:${postId}`)) ?? [];
    list.push(comment);
    await kv.set(`comments:${postId}`, list);

    const post = await kv.get(`post:${postId}`);
    if (post) {
      post.comments = list.length;
      await kv.set(`post:${postId}`, post);
    }

    return c.json(comment, 201);
  } catch (e) {
    console.log("Error POST /posts/:id/comments:", e);
    return c.json({ error: String(e) }, 500);
  }
});

Deno.serve(app.fetch);
