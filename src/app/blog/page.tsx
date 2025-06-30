"use client";

import Link from "next/link";
import { blogPosts } from "@/lib/blogData";
import { useState } from "react";
import { Navbar } from "./../(home)/navbar"; 

const categories = ["All", ...Array.from(new Set(blogPosts.map((p) => p.category)))];

export default function BlogPage() {
  const [selected, setSelected] = useState("All");
  const filtered = selected === "All" ? blogPosts : blogPosts.filter((p) => p.category === selected);
  const recent = [...blogPosts].sort((a, b) => Date.parse(b.date) - Date.parse(a.date)).slice(0, 4);
  const random = [...blogPosts].sort(() => Math.random() - 0.5).slice(0, 4);

  return (
    <main className="max-w-screen-xl mx-auto px-4 py-10">
      {/* Header Content Section */}
      {/* Navbar Import */}
      {/* @ts-ignore */}
      <Navbar />

       <section className="mb-10">
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
              ✨ Featured Content
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


      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelected(cat)}
            className={`px-3 py-1 rounded-full text-xs font-semibold ${selected === cat ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"}`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Featured Section */}
      <section className="mb-10">
        <h3 className="text-xl font-semibold mb-4 text-white">Featured</h3>
        <div className="grid md:grid-cols-2 gap-6">
          {filtered
            .filter((p) => p.highlight)
            .map((post) => (
              <Link key={post.id} href={`/blog/${post.slug}`} className="bg-gray-900 rounded-lg overflow-hidden border border-gray-700">
                {post.image && <img src={post.image} alt={post.title} className="w-full h-48 object-cover" />}
                <div className="p-4">
                  <h4 className="text-xl font-bold text-blue-400 mb-1">{post.title}</h4>
                  <p className="text-xs text-gray-400 mb-2">{post.category} · {post.date}</p>
                  <p className="text-gray-300 text-sm">{post.excerpt}</p>
                </div>
              </Link>
            ))}
        </div>
      </section>

      {/* Recent Section */}
      <section className="mb-10">
        <h3 className="text-xl font-semibold mb-4 text-white">Recent Posts</h3>
        <div className="grid md:grid-cols-4 gap-4">
          {recent.map((post) => (
            <Link key={post.id} href={`/blog/${post.slug}`} className="bg-gray-800 rounded shadow p-4 hover:bg-gray-700">
              <h4 className="text-sm font-bold text-blue-400 mb-1">{post.title}</h4>
              <p className="text-xs text-gray-400">{post.date}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Random Section */}
      <section className="mb-10">
        <h3 className="text-xl font-semibold mb-4 text-white">Random Reads</h3>
        <div className="grid md:grid-cols-4 gap-4">
          {random.map((post) => (
            <Link key={post.id} href={`/blog/${post.slug}`} className="bg-gray-800 rounded shadow p-4 hover:bg-gray-700">
              <h4 className="text-sm font-bold text-blue-400 mb-1">{post.title}</h4>
              <p className="text-xs text-gray-400">{post.date}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* All Posts */}
      <section className="mb-10">
        <h3 className="text-xl font-semibold mb-4 text-white">All Posts</h3>
        <div className="grid md:grid-cols-2 gap-6">
          {filtered
            .filter((p) => !p.highlight)
            .map((post) => (
              <Link key={post.id} href={`/blog/${post.slug}`} className="bg-gray-900 rounded-lg border border-gray-700 overflow-hidden hover:shadow-lg">
                {post.image && <img src={post.image} alt={post.title} className="w-full h-48 object-cover" />}
                <div className="p-4">
                  <h4 className="text-xl font-bold text-blue-400 mb-1">{post.title}</h4>
                  <p className="text-xs text-gray-400 mb-2">{post.category} · {post.date}</p>
                  <p className="text-gray-300 text-sm">{post.excerpt}</p>
                </div>
              </Link>
            ))}
        </div>
      </section>
    </main>
  );
}