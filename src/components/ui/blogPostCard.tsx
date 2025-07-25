import React from "react";
import Image from "next/image";

type Post = {
  image: string;
  title: string;
  // Add other fields as needed
};

interface PostCardProps {
  post: Post;
  featured?: boolean;
}

const PostCard: React.FC<PostCardProps> = ({ post, featured = false }) => {
  return (
    <div
      className={`group relative bg-white rounded-xl overflow-hidden border-2 border-gray-200 hover:border-blue-400 transition-all duration-300 hover:shadow-xl ${
        featured ? "lg:col-span-2 border-red-300 shadow-lg" : ""
      }`}
    >
      {/* Image Section */}
      <div className="relative overflow-hidden">
        <Image
          src={post.image}
          alt={post.title}
          width={800} // Set a width for optimization
          height={featured ? 400 : 300} // Different height for featured cards
          className={`w-full object-cover transition-transform duration-300 group-hover:scale-105 ${
            featured ? "h-64" : "h-48"
          }`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
      </div>
    </div>
  );
};

export default PostCard;
