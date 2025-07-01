// src/app/blog/[slug]/page.tsx
"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { blogPosts } from "@/lib/blogData";
import { useEffect, useState } from "react";
import { ThumbsUp, ThumbsDown, Star, Share2, Calendar, User, Tag, MessageCircle, Reply } from "lucide-react";
import { Navbar } from "../../(home)/navbar"; 
import type { BlogPost, BlogComment } from "@/lib/blogTypes";

export default function BlogSinglePage() {
  const { slug } = useParams<{ slug: string }>();
  const post: BlogPost | undefined = blogPosts.find((p) => p.slug === slug);

  const suggested = blogPosts.filter(
    (p) => p.category === post?.category && p.id !== post?.id
  ).slice(0, 6);

  const [viewed, setViewed] = useState<string[]>([]);
  const [reactions, setReactions] = useState({
    like: post?.reactions?.up || 0,
    dislike: post?.reactions?.down || 0,
  });
  const [favorites, setFavorites] = useState(false);
  const [comments, setComments] = useState<BlogComment[]>(post?.comments || []);
  const [newComment, setNewComment] = useState("");
  const [replyInputs, setReplyInputs] = useState<{ [key: string]: string }>({});
  const [showReplyInput, setShowReplyInput] = useState<{ [key: string]: boolean }>({});

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

  function handleAddComment(e: React.FormEvent) {
    e.preventDefault();
    if (!newComment.trim()) return;
    
    const comment: BlogComment = {
      id: Date.now().toString(),
      author: "You",
      content: newComment.trim(),
      date: new Date().toISOString().split('T')[0],
      reactions: { like: 0, dislike: 0 },
      replies: [],
    };
    
    setComments([...comments, comment]);
    setNewComment("");
  }

  function handleAddReply(commentId: string) {
    const replyContent = replyInputs[commentId];
    if (!replyContent?.trim()) return;
    
    const reply: BlogComment = {
      id: Date.now().toString(),
      author: "You",
      content: replyContent.trim(),
      date: new Date().toISOString().split('T')[0],
      reactions: { like: 0, dislike: 0 },
    };
    
    setComments(prev =>
      prev.map(comment =>
        comment.id === commentId
          ? { ...comment, replies: [...(comment.replies || []), reply] }
          : comment
      )
    );
    
    setReplyInputs(prev => ({ ...prev, [commentId]: "" }));
    setShowReplyInput(prev => ({ ...prev, [commentId]: false }));
  }

  function handleCommentReaction(commentId: string, type: "like" | "dislike") {
    setComments(prev =>
      prev.map(comment =>
        comment.id === commentId
          ? {
              ...comment,
              reactions: {
                ...comment.reactions,
                [type]: comment.reactions[type] + 1
              }
            }
          : comment
      )
    );
  }

  function handleReplyReaction(commentId: string, replyId: string, type: "like" | "dislike") {
    setComments(prev =>
      prev.map(comment =>
        comment.id === commentId
          ? {
              ...comment,
              replies: comment.replies?.map(reply =>
                reply.id === replyId
                  ? {
                      ...reply,
                      reactions: {
                        ...reply.reactions,
                        [type]: reply.reactions[type] + 1
                      }
                    }
                  : reply
              )
            }
          : comment
      )
    );
  }

  if (!post) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Post not found</h1>
        <Link href="/blog" className="text-blue-600 hover:text-blue-800 font-medium">
          ← Back to Blog
        </Link>
      </div>
    </div>
  );

  const previouslyViewed = blogPosts.filter((p) => viewed.includes(p.id) && p.id !== post.id).slice(0, 6);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <aside className="lg:col-span-1 order-2 lg:order-1">
            <div className="sticky top-8 space-y-6">
              {/* Navigation */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Explore</h2>
                <nav className="space-y-2">
                  <Link href="/blog" className="block text-gray-600 hover:text-blue-600 hover:bg-blue-50 px-3 py-2 rounded-lg transition-colors">
                    All Posts
                  </Link>
                  <Link href="/categories" className="block text-gray-600 hover:text-blue-600 hover:bg-blue-50 px-3 py-2 rounded-lg transition-colors">
                    Categories
                  </Link>
                  <Link href="/about" className="block text-gray-600 hover:text-blue-600 hover:bg-blue-50 px-3 py-2 rounded-lg transition-colors">
                    About
                  </Link>
                </nav>
              </div>

              {/* Post Stats */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-sm font-medium text-gray-900 mb-4">Post Engagement</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Likes</span>
                    <span className="text-sm font-medium text-gray-900">{reactions.like}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Comments</span>
                    <span className="text-sm font-medium text-gray-900">{comments.length}</span>
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="lg:col-span-3 order-1 lg:order-2">
            <article className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              {/* Header Image */}
              {post.image && (
                <div className="aspect-[16/9] md:aspect-[2/1] overflow-hidden">
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              {/* Content */}
              <div className="p-6 md:p-8">
                {/* Meta Information */}
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-6">
                  <div className="flex items-center gap-1">
                    <Tag className="w-4 h-4" />
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                      {post.category}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>{post.date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <User className="w-4 h-4" />
                    <span className="text-gray-700 font-medium">{post.author || "Admin"}</span>
                  </div>
                </div>

                {/* Title */}
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
                  {post.title}
                </h1>

                {/* Content */}
                <div 
                  className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-blue-600 prose-strong:text-gray-900"
                  dangerouslySetInnerHTML={{ __html: post.content }} 
                />

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-3 mt-8 pt-6 border-t border-gray-200">
                  <button 
                    onClick={() => handleReaction("like")} 
                    className="flex items-center gap-2 px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg transition-colors font-medium"
                  >
                    <ThumbsUp className="w-4 h-4" />
                    <span>{reactions.like}</span>
                  </button>
                  <button 
                    onClick={() => handleReaction("dislike")} 
                    className="flex items-center gap-2 px-4 py-2 bg-red-50 hover:bg-red-100 text-red-700 rounded-lg transition-colors font-medium"
                  >
                    <ThumbsDown className="w-4 h-4" />
                    <span>{reactions.dislike}</span>
                  </button>
                  <button 
                    onClick={() => setFavorites(!favorites)} 
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors font-medium ${
                      favorites 
                        ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <Star className="w-4 h-4" fill={favorites ? "currentColor" : "none"} />
                    <span>Favorite</span>
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 bg-green-50 hover:bg-green-100 text-green-700 rounded-lg transition-colors font-medium">
                    <Share2 className="w-4 h-4" />
                    <span>Share</span>
                  </button>
                </div>
              </div>
            </article>

            {/* Comments Section */}
            <section className="mt-8 bg-white rounded-xl shadow-sm border border-gray-200 p-6 md:p-8">
              <div className="flex items-center gap-2 mb-6">
                <MessageCircle className="w-5 h-5 text-gray-600" />
                <h2 className="text-xl font-bold text-gray-900">
                  Comments ({comments.length})
                </h2>
              </div>

              {/* Add Comment Form */}
              <form onSubmit={handleAddComment} className="mb-8">
                <div className="mb-4">
                  <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-2">
                    Add a comment
                  </label>
                  <textarea
                    id="comment"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                    rows={3}
                    placeholder="Share your thoughts..."
                  />
                </div>
                <button
                  type="submit"
                  disabled={!newComment.trim()}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors font-medium"
                >
                  Post Comment
                </button>
              </form>

              {/* Comments List */}
              <div className="space-y-6">
                {comments.map((comment) => (
                  <div key={comment.id} className="border-b border-gray-100 pb-6 last:border-b-0">
                    {/* Comment Header */}
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-blue-600 font-semibold text-sm">
                          {comment.author.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">{comment.author}</h4>
                        <p className="text-xs text-gray-500">{comment.date}</p>
                      </div>
                    </div>

                    {/* Comment Content */}
                    <p className="text-gray-700 mb-3 ml-11">{comment.content}</p>

                    {/* Comment Actions */}
                    <div className="flex items-center gap-4 ml-11">
                      <button
                        onClick={() => handleCommentReaction(comment.id, "like")}
                        className="flex items-center gap-1 text-sm text-gray-500 hover:text-blue-600 transition-colors"
                      >
                        <ThumbsUp className="w-3 h-3" />
                        <span>{comment.reactions.like}</span>
                      </button>
                      <button
                        onClick={() => handleCommentReaction(comment.id, "dislike")}
                        className="flex items-center gap-1 text-sm text-gray-500 hover:text-red-600 transition-colors"
                      >
                        <ThumbsDown className="w-3 h-3" />
                        <span>{comment.reactions.dislike}</span>
                      </button>
                      <button
                        onClick={() => setShowReplyInput(prev => ({ ...prev, [comment.id]: !prev[comment.id] }))}
                        className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 transition-colors"
                      >
                        <Reply className="w-3 h-3" />
                        <span>Reply</span>
                      </button>
                    </div>

                    {/* Reply Input */}
                    {showReplyInput[comment.id] && (
                      <div className="mt-4 ml-11">
                        <div className="flex gap-3">
                          <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                            <span className="text-gray-600 font-semibold text-xs">Y</span>
                          </div>
                          <div className="flex-1">
                            <textarea
                              value={replyInputs[comment.id] || ""}
                              onChange={(e) => setReplyInputs(prev => ({ ...prev, [comment.id]: e.target.value }))}
                              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none text-sm"
                              rows={2}
                              placeholder="Write a reply..."
                            />
                            <div className="flex gap-2 mt-2">
                              <button
                                onClick={() => handleAddReply(comment.id)}
                                disabled={!replyInputs[comment.id]?.trim()}
                                className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                              >
                                Reply
                              </button>
                              <button
                                onClick={() => setShowReplyInput(prev => ({ ...prev, [comment.id]: false }))}
                                className="px-3 py-1 text-gray-600 text-sm rounded hover:bg-gray-100 transition-colors"
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Replies */}
                    {comment.replies && comment.replies.length > 0 && (
                      <div className="mt-4 ml-11 space-y-4">
                        {comment.replies.map((reply) => (
                          <div key={reply.id} className="flex gap-3">
                            <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                              <span className="text-gray-600 font-semibold text-xs">
                                {reply.author.charAt(0).toUpperCase()}
                              </span>
                            </div>
                            <div className="flex-1">
                              <div className="bg-gray-50 rounded-lg p-3">
                                <div className="flex items-center gap-2 mb-1">
                                  <h5 className="font-semibold text-gray-900 text-sm">{reply.author}</h5>
                                  <span className="text-xs text-gray-500">{reply.date}</span>
                                </div>
                                <p className="text-gray-700 text-sm">{reply.content}</p>
                              </div>
                              <div className="flex items-center gap-3 mt-2">
                                <button
                                  onClick={() => handleReplyReaction(comment.id, reply.id, "like")}
                                  className="flex items-center gap-1 text-xs text-gray-500 hover:text-blue-600 transition-colors"
                                >
                                  <ThumbsUp className="w-3 h-3" />
                                  <span>{reply.reactions.like}</span>
                                </button>
                                <button
                                  onClick={() => handleReplyReaction(comment.id, reply.id, "dislike")}
                                  className="flex items-center gap-1 text-xs text-gray-500 hover:text-red-600 transition-colors"
                                >
                                  <ThumbsDown className="w-3 h-3" />
                                  <span>{reply.reactions.dislike}</span>
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}

                {comments.length === 0 && (
                  <div className="text-center py-8">
                    <MessageCircle className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500">No comments yet. Be the first to share your thoughts!</p>
                  </div>
                )}
              </div>
            </section>

            {/* Suggested Posts */}
            {suggested.length > 0 && (
              <section className="mt-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">You May Also Like</h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {suggested.map((s) => (
                    <Link
                      key={s.id}
                      href={`/blog/${s.slug}`}
                      className="group bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
                    >
                      {s.image && (
                        <div className="aspect-[16/10] overflow-hidden">
                          <img 
                            src={s.image} 
                            alt={s.title} 
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      )}
                      <div className="p-5">
                        <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                          {s.title}
                        </h3>
                        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{s.excerpt}</p>
                        <div className="text-xs text-gray-500">{s.date}</div>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {/* Previously Viewed */}
            {previouslyViewed.length > 0 && (
              <section className="mt-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Previously Viewed</h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {previouslyViewed.map((s) => (
                    <Link
                      key={s.id}
                      href={`/blog/${s.slug}`}
                      className="group bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow opacity-90"
                    >
                      {s.image && (
                        <div className="aspect-[16/10] overflow-hidden">
                          <img 
                            src={s.image} 
                            alt={s.title} 
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      )}
                      <div className="p-5">
                        <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                          {s.title}
                        </h3>
                        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{s.excerpt}</p>
                        <div className="text-xs text-gray-500">{s.date}</div>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}