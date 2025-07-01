/// src\app\blog\page.tsx
"use client";

import Link from "next/link";
import { blogPosts } from "@/lib/blogData";
import { useState } from "react";
import { Navbar } from "./../(home)/navbar"; 
import {Footer} from "../../components/ui/Footer";

const categories = ["All", ...Array.from(new Set(blogPosts.map((p) => p.category)))];

export default function BlogPage() {
  const [selected, setSelected] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 20;
  
  const filtered = selected === "All" ? blogPosts : blogPosts.filter((p) => p.category === selected);
  const recent = [...blogPosts].sort((a, b) => Date.parse(b.date) - Date.parse(a.date)).slice(0, 6);
  const random = [...blogPosts].sort(() => Math.random() - 0.5).slice(0, 6);
  
  // Pagination for all posts
  const allPosts = filtered.filter((p) => !p.highlight);
  const totalPages = Math.ceil(allPosts.length / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const paginatedPosts = allPosts.slice(startIndex, startIndex + postsPerPage);
  
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  const handleCategoryChange = (category: string) => {
    setSelected(category);
    setCurrentPage(1); // Reset to first page when category changes
  };

  return (
    <main className="max-w-screen-xl mx-auto px-4 py-10">
      {/* Header Content Section */}
      {/* Navbar Import */}
      {/* @ts-ignore */}
      <Navbar />

      <section className="mb-12">
        <div className="grid md:grid-cols-2 gap-8 items-center rounded-2xl overflow-hidden relative bg-gradient-to-br from-slate-50 to-blue-50 p-6 md:p-8">
          {/* Image Section */}
          <div className="relative flex items-center justify-center order-2 md:order-1">
            <div 
              className="relative group cursor-pointer transition-transform duration-300 hover:scale-105"
              style={{
                transform: "rotate(2deg)",
                filter: "drop-shadow(0 10px 20px rgba(0,0,0,0.15))"
              }}
            >
              <div className="absolute inset-0 bg-white rounded-xl transform rotate-1 opacity-80"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl transform -rotate-1 opacity-60"></div>
              <img
                src="https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=400&h=320&fit=crop&crop=entropy&auto=format&q=80"
                alt="Creative coding workspace with laptop and code"
                className="relative w-full h-64 md:h-80 object-cover rounded-xl border-4 border-white shadow-lg"
              />
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full animate-pulse shadow-lg"></div>
              <div className="absolute -bottom-3 -left-3 w-4 h-4 bg-gradient-to-br from-green-400 to-blue-500 rounded-full animate-bounce shadow-lg"></div>
            </div>
          </div>

          {/* Text Section */}
          <div className="flex flex-col justify-center space-y-6 order-1 md:order-2">
            <div className="space-y-4">
              <div className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-700 text-sm font-medium rounded-full">
                🔥 Today's Hot Pick
              </div>
              
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
                  Unlock Daily Winning
                </span>
                <br />
                <span className="text-slate-800">Bet Predictions</span>
              </h1>
              
              <p className="text-slate-600 text-lg leading-relaxed max-w-lg">
                Access expert betting tips, match previews, and high-accuracy predictions to help you make smarter bets and win big. Perfect for both newbies and pro punters.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button className="group inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                <span>Start Reading</span>
                <svg className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>
              
              <button className="inline-flex items-center px-6 py-3 border-2 border-slate-300 text-slate-700 font-semibold rounded-lg hover:border-blue-500 hover:text-blue-600 transition-all duration-200 hover:shadow-md">
                <svg className="mr-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Learn More
              </button>
            </div>

            {/* Stats */}
            <div className="flex items-center space-x-6 pt-4 border-t border-slate-200">
              <div className="text-center">
                <div className="text-2xl font-bold text-slate-800">50+</div>
                <div className="text-sm text-slate-500">Articles</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-slate-800">10K+</div>
                <div className="text-sm text-slate-500">Readers</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-slate-800">5★</div>
                <div className="text-sm text-slate-500">Rating</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-3 mb-10 justify-center">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => handleCategoryChange(cat)}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
              selected === cat 
                ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg transform scale-105" 
                : "bg-white text-gray-700 border border-gray-200 hover:border-blue-300 hover:text-blue-600 hover:shadow-md"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Featured Section */}
      {filtered.filter((p) => p.highlight).length > 0 && (
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1 h-8 bg-gradient-to-b from-blue-600 to-purple-600 rounded-full"></div>
            <h2 className="text-2xl font-bold text-gray-800">Featured Articles</h2>
            <div className="flex-1 h-px bg-gradient-to-r from-gray-300 to-transparent"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered
              .filter((p) => p.highlight)
              .slice(0, 6)
              .map((post) => (
                <Link 
                  key={post.id} 
                  href={`/blog/${post.slug}`} 
                  className="group bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100"
                >
                  <div className="relative overflow-hidden">
                    {post.image && (
                      <img 
                        src={post.image} 
                        alt={post.title} 
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" 
                      />
                    )}
                    <div className="absolute top-3 left-3">
                      <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                        Featured
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
                        {post.category}
                      </span>
                      <span className="text-xs text-gray-500">{post.date}</span>
                    </div>
                    <h3 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        {post.reactions && (
                          <>
                            <span className="flex items-center gap-1">
                              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
                              </svg>
                              {post.reactions.up}
                            </span>
                            <span className="flex items-center gap-1">
                              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
                              </svg>
                              {post.reactions.favorite}
                            </span>
                            <span className="flex items-center gap-1">
                              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
                              </svg>
                              {post.comments?.length || 0}
                            </span>
                          </>
                        )}
                      </div>
                      <span className="text-blue-600 text-sm font-medium group-hover:translate-x-1 transition-transform">
                        Read More →
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </section>
      )}

      {/* Recent Posts */}
      <section className="mb-12">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-1 h-8 bg-gradient-to-b from-green-500 to-blue-500 rounded-full"></div>
          <h2 className="text-2xl font-bold text-gray-800">Recent Posts</h2>
          <div className="flex-1 h-px bg-gradient-to-r from-gray-300 to-transparent"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recent.map((post) => (
            <Link 
              key={post.id} 
              href={`/blog/${post.slug}`} 
              className="group bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border border-gray-100"
            >
              <div className="relative">
                {post.image ? (
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300" 
                  />
                ) : (
                  <div className="w-full h-32 bg-gradient-to-br from-green-100 to-blue-100 flex items-center justify-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                      {post.title.charAt(0)}
                    </div>
                  </div>
                )}
                <div className="absolute top-2 left-2">
                  <span className="bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                    New
                  </span>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-gray-800 group-hover:text-green-600 transition-colors line-clamp-2 mb-2">
                  {post.title}
                </h3>
                <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                  <span>{post.category}</span>
                  <span>•</span>
                  <span>{post.date}</span>
                </div>
                <p className="text-gray-600 text-xs leading-relaxed line-clamp-2">
                  {post.excerpt}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Random Reads */}
      <section className="mb-12">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-1 h-8 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full"></div>
          <h2 className="text-2xl font-bold text-gray-800">Random Reads</h2>
          <div className="flex-1 h-px bg-gradient-to-r from-gray-300 to-transparent"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {random.map((post) => (
            <Link 
              key={post.id} 
              href={`/blog/${post.slug}`} 
              className="group bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border border-gray-100"
            >
              <div className="relative">
                {post.image ? (
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300" 
                  />
                ) : (
                  <div className="w-full h-32 bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                      {post.title.charAt(0)}
                    </div>
                  </div>
                )}
                <div className="absolute top-2 left-2">
                  <span className="bg-purple-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                    Random
                  </span>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-gray-800 group-hover:text-purple-600 transition-colors line-clamp-2 mb-2">
                  {post.title}
                </h3>
                <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                  <span>{post.category}</span>
                  <span>•</span>
                  <span>{post.date}</span>
                </div>
                <p className="text-gray-600 text-xs leading-relaxed line-clamp-2">
                  {post.excerpt}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* All Posts */}
      <section className="mb-12">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-1 h-8 bg-gradient-to-b from-gray-600 to-gray-800 rounded-full"></div>
          <h2 className="text-2xl font-bold text-gray-800">All Posts</h2>
          <div className="flex-1 h-px bg-gradient-to-r from-gray-300 to-transparent"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginatedPosts.map((post) => (
              <Link 
                key={post.id} 
                href={`/blog/${post.slug}`} 
                className="group bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100"
              >
                <div className="relative overflow-hidden">
                  {post.image ? (
                    <img 
                      src={post.image} 
                      alt={post.title} 
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" 
                    />
                  ) : (
                    <div className="w-full h-48 bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                        {post.title.charAt(0)}
                      </div>
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
                      {post.category}
                    </span>
                    <span className="text-xs text-gray-500">{post.date}</span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      {post.reactions && (
                        <>
                          <span className="flex items-center gap-1">
                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
                            </svg>
                            {post.reactions.up}
                          </span>
                          <span className="flex items-center gap-1">
                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
                            </svg>
                            {post.reactions.favorite}
                          </span>
                          <span className="flex items-center gap-1">
                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
                            </svg>
                            {post.comments?.length || 0}
                          </span>
                        </>
                      )}
                    </div>
                    <span className="text-blue-600 text-sm font-medium group-hover:translate-x-1 transition-transform">
                      Read More →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
        </div>
      </section>

      <Footer/>
    </main>
  );
}