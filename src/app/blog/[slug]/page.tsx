// src/app/blog/[slug]/page.tsx
"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { blogPosts } from "@/lib/blogData";
import { useEffect, useState } from "react";
import { ThumbsUp, ThumbsDown, Star, Share2 } from "lucide-react";
import { Navbar } from "../../(home)/navbar"; 
import type { BlogPost, BlogComment } from "@/lib/blogTypes";

export default function BlogSinglePage() {
  const { slug } = useParams<{ slug: string }>();
  const post: BlogPost | undefined = blogPosts.find((p) => p.slug === slug);

  const suggested = blogPosts.filter(
    (p) => p.category === post?.category && p.id !== post?.id
  ).slice(0, 3);

  const [viewed, setViewed] = useState<string[]>([]);
  const [reactions, setReactions] = useState({
    like: post?.reactions?.up || 0,
    dislike: post?.reactions?.down || 0,
  });
  const [favorites, setFavorites] = useState(false);
  const [comments, setComments] = useState<BlogComment[]>(post?.comments || []);
  const [comment, setComment] = useState("");
  const [replyMap, setReplyMap] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (post?.id) {
      const stored = localStorage.getItem("viewedPosts");
      const viewedList = stored ? JSON.parse(stored) : [];
      if (!viewedList.includes(post.id)) {
        const updated = [post.id, ...viewedList];
        localStorage.setItem("viewedPosts", JSON.stringify(updated));
        setViewed(updated);
      } else {
        setViewed(viewedList);
      }
    }
  }, [post?.id]);

  function handleReaction(type: "like" | "dislike") {
    setReactions((r) => ({ ...r, [type]: (r[type] || 0) + 1 }));
  }

  function handleComment(e: React.FormEvent) {
    e.preventDefault();
    if (!comment.trim()) return;
    setComments([
      ...comments,
      {
        id: Math.random().toString(),
        author: "You",
        content: comment,
        date: new Date().toISOString().slice(0, 10),
        reactions: { like: 0, dislike: 0 },
        replies: [],
      },
    ]);
    setComment("");
  }

  function handleReply(commentId: string) {
    const replyContent = replyMap[commentId];
    if (!replyContent?.trim()) return;
    setComments((prev) =>
      prev.map((c) =>
        c.id === commentId
          ? {
              ...c,
              replies: [
                ...c.replies!,
                {
                  id: Math.random().toString(),
                  author: "You",
                  content: replyContent,
                  date: new Date().toISOString().slice(0, 10),
                  reactions: { like: 0, dislike: 0 },
                },
              ],
            }
          : c
      )
    );
    setReplyMap((prev) => ({ ...prev, [commentId]: "" }));
  }

  function handleCommentReaction(id: string, type: "like" | "dislike") {
    setComments((prev) =>
      prev.map((c) =>
        c.id === id ? { ...c, reactions: { ...c.reactions, [type]: c.reactions[type] + 1 } } : c
      )
    );
  }

  function handleReplyReaction(commentId: string, replyId: string, type: "like" | "dislike") {
    setComments((prev) =>
      prev.map((c) =>
        c.id === commentId
          ? {
              ...c,
              replies: c.replies!.map((r: BlogComment) =>
                r.id === replyId
                  ? { ...r, reactions: { ...r.reactions, [type]: r.reactions[type] + 1 } }
                  : r
              ),
            }
          : c
      )
    );
  }

  if (!post) return <div className="p-8 text-center">Post not found.</div>;

  const previouslyViewed = blogPosts.filter((p) => viewed.includes(p.id) && p.id !== post.id);

  return (
    <div className="flex bg-white text-black min-h-screen">
      <aside className="hidden md:block w-60 bg-gray-100 p-6 border-r border-gray-200">
        <h2 className="text-lg font-semibold mb-4">Explore</h2>
        <ul className="space-y-2 text-sm">
          <li><Link href="/blog" className="hover:underline">All Posts</Link></li>
          <li><Link href="/categories" className="hover:underline">Categories</Link></li>
          <li><Link href="/about" className="hover:underline">About</Link></li>
        </ul>
      </aside>
      <div className="flex-1">
        <Navbar />
        <main className="max-w-5xl mx-auto py-10 px-4">
          <article className="prose max-w-none">
            <h1 className="text-4xl font-bold mb-2">{post.title}</h1>
            <div className="text-sm text-gray-500 mb-4">
              {post.category} · {post.date} · by <span className="text-blue-600 font-medium">{post.author || "Admin"}</span>
            </div>
            {post.image && <img src={post.image} alt={post.title} className="rounded-lg w-full mb-6" />}

            <div dangerouslySetInnerHTML={{ __html: post.content }} />

            <div className="flex flex-wrap gap-4 mt-6 mb-10">
              <button onClick={() => handleReaction("like")} className="flex items-center gap-1 px-3 py-1 bg-gray-200 hover:bg-blue-200 rounded">
                <ThumbsUp className="w-4 h-4" /> {reactions.like}
              </button>
              <button onClick={() => handleReaction("dislike")} className="flex items-center gap-1 px-3 py-1 bg-gray-200 hover:bg-red-200 rounded">
                <ThumbsDown className="w-4 h-4" /> {reactions.dislike}
              </button>
              <button onClick={() => setFavorites(!favorites)} className="flex items-center gap-1 px-3 py-1 bg-yellow-100 hover:bg-yellow-300 text-yellow-700 rounded">
                <Star className="w-4 h-4" fill={favorites ? "yellow" : "none"} /> Favorite
              </button>
              <button className="flex items-center gap-1 px-3 py-1 bg-green-100 hover:bg-green-300 text-green-700 rounded">
                <Share2 className="w-4 h-4" /> Share
              </button>
            </div>

            {/* Suggested Posts */}
            {suggested.length > 0 && (
              <section className="mt-10">
                <h3 className="text-xl font-semibold mb-4">You May Also Like</h3>
                <div className="grid md:grid-cols-3 gap-4">
                  {suggested.map((s) => (
                    <Link
                      key={s.id}
                      href={`/blog/${s.slug}`}
                      className="block bg-gray-100 rounded-lg p-4 border border-gray-200 hover:shadow"
                    >
                      {s.image && <img src={s.image} alt={s.title} className="h-32 w-full object-cover rounded mb-2" />}
                      <div className="font-semibold text-blue-700 mb-1">{s.title}</div>
                      <div className="text-xs text-gray-500 mb-2">{s.date}</div>
                      <p className="text-sm text-gray-700 line-clamp-3">{s.excerpt}</p>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {/* Previously Viewed */}
            {previouslyViewed.length > 0 && (
              <section className="mt-12">
                <h3 className="text-xl font-semibold mb-4">Previously Viewed</h3>
                <div className="grid md:grid-cols-3 gap-4">
                  {previouslyViewed.map((s) => (
                    <Link
                      key={s.id}
                      href={`/blog/${s.slug}`}
                      className="block bg-gray-50 rounded-lg p-4 border border-gray-200 hover:shadow"
                    >
                      {s.image && <img src={s.image} alt={s.title} className="h-32 w-full object-cover rounded mb-2" />}
                      <div className="font-semibold text-blue-700 mb-1">{s.title}</div>
                      <div className="text-xs text-gray-500 mb-2">{s.date}</div>
                      <p className="text-sm text-gray-700 line-clamp-3">{s.excerpt}</p>
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </article>
        </main>
      </div>
    </div>
  );
}
