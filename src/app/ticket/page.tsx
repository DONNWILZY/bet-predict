"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, MapPin, Clock, Trophy, Star, ThumbsUp, MessageCircle, Share2, Copy, Check, Heart, TrendingUp } from "lucide-react";

interface TicketDetailsProps {
  params: { id: string };
}

export default function TicketDetailsPage({ params }: TicketDetailsProps) {
  const router = useRouter();
  const [showPayMessage, setShowPayMessage] = useState(false);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [liked, setLiked] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyText, setReplyText] = useState("");

  // Mock data - replace with API call
  const ticket = {
    id: "066632cc-6ee7-40bc-acb0-7dffb39d6935",
    predictionCode: "1EOO99",
    title: "SUNDAY 5TH",
    description: "EMERIA League fixtures",
    premium: false,
    price: 100,
    locked: false,
    views: 245,
    likes: 42,
    confidence: 85,
    rating: 4.5,
    totalPoints: 0,
    isSettled: false,
    timestamp: "2025-10-05T22:14:03.633Z",
    games: [
      {
        id: "1",
        team1: "Arsenal",
        team2: "Chelsea",
        logo1: null,
        logo2: null,
        market: "Over 2.5",
        odds: 2.8,
        status: null,
        date: "2025-09-20T12:00:00.000Z",
        stadium: "Emirates Stadium",
        league: "UEFA Champions League"
      },
      {
        id: "2",
        team1: "Real Madrid",
        team2: "Bayern Munich",
        logo1: null,
        logo2: null,
        market: "GG",
        odds: 1.9,
        status: null,
        date: "2025-09-20T15:00:00.000Z",
        stadium: "Santiago Bernabéu",
        league: "UEFA Champions League"
      },
    ],
    bookingCodes: [
      { id: "1", code: "ET122q", platform: "9JABET" },
      { id: "2", code: "CODE4001q", platform: "BetKING" }
    ],
    comments: [
      {
        id: "1",
        user: "John Doe",
        avatar: null,
        text: "Great predictions! Following this ticket 🔥",
        timestamp: "2 hours ago",
        likes: 8,
        replies: [
          {
            id: "1-1",
            user: "Creator",
            avatar: null,
            text: "Thanks for the support!",
            timestamp: "1 hour ago",
            likes: 3
          }
        ]
      }
    ]
  };

  const copyBookingCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const handleLike = () => {
    setLiked(!liked);
  };

  const handleComment = () => {
    if (!commentText.trim()) return;
    // API call to post comment
    console.log("Comment:", commentText);
    setCommentText("");
  };

  const handleReply = (commentId: string) => {
    if (!replyText.trim()) return;
    // API call to post reply
    console.log("Reply to:", commentId, replyText);
    setReplyText("");
    setReplyingTo(null);
  };

  const totalOdds = ticket.games.reduce((acc, game) => acc * game.odds, 1).toFixed(2);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50">
      <div className="max-w-5xl mx-auto p-4 lg:p-8">
        {/* Header */}
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Tickets
        </button>

        {/* Ticket Header */}
        <div className="bg-gradient-to-br from-purple-600 to-purple-800 rounded-2xl p-6 lg:p-8 shadow-lg mb-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl font-bold text-white">{ticket.title}</h1>
                {ticket.premium && (
                  <span className="px-3 py-1 bg-amber-400 text-amber-900 rounded-full text-xs font-bold">
                    PREMIUM
                  </span>
                )}
              </div>
              <p className="text-purple-200">{ticket.description}</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-white mb-1">₦{ticket.price}</div>
              <div className="text-purple-200 text-sm">Ticket Code: {ticket.predictionCode}</div>
            </div>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
            <div className="bg-white/10 backdrop-blur rounded-xl p-3 text-center">
              <div className="text-2xl font-bold text-white">{ticket.views}</div>
              <div className="text-purple-200 text-sm">Views</div>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-xl p-3 text-center">
              <div className="text-2xl font-bold text-white">{ticket.likes}</div>
              <div className="text-purple-200 text-sm">Likes</div>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-xl p-3 text-center">
              <div className="text-2xl font-bold text-white">{ticket.confidence}%</div>
              <div className="text-purple-200 text-sm">Confidence</div>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-xl p-3 text-center">
              <div className="text-2xl font-bold text-white">{totalOdds}</div>
              <div className="text-purple-200 text-sm">Total Odds</div>
            </div>
          </div>
        </div>

        {/* Games List */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Trophy className="w-6 h-6 text-purple-600" />
            Games ({ticket.games.length})
          </h2>
          
          <div className="space-y-4">
            {ticket.games.map((game, index) => (
              <div key={game.id} className="border border-gray-200 rounded-xl overflow-hidden hover:border-purple-300 transition-colors">
                <div className="bg-gray-50 px-4 py-2 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-purple-700 bg-purple-50 px-3 py-1 rounded-full">
                      {game.league}
                    </span>
                    <span className="text-xs text-gray-500">
                      {new Date(game.date).toLocaleDateString()}
                    </span>
                  </div>
                  {game.status && (
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                      game.status === "correct" ? "bg-emerald-500" : "bg-red-500"
                    }`}>
                      <span className="text-white text-xs font-bold">
                        {game.status === "correct" ? "✓" : "✗"}
                      </span>
                    </div>
                  )}
                </div>
               
                <div className="p-4">
                  <div className="flex items-center justify-center gap-4 mb-4">
                    <div className="flex items-center gap-2 flex-1">
                      <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                        <span className="text-xs font-bold text-gray-400">
                          {game.team1.substring(0, 3).toUpperCase()}
                        </span>
                      </div>
                      <span className="font-semibold text-gray-800 text-sm truncate">{game.team1}</span>
                    </div>
                   
                    <div className="px-3 py-1 bg-gray-100 rounded-full">
                      <span className="text-gray-600 font-medium text-sm">VS</span>
                    </div>
                   
                    <div className="flex items-center gap-2 flex-1 justify-end">
                      <span className="font-semibold text-gray-800 text-sm truncate">{game.team2}</span>
                      <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                        <span className="text-xs font-bold text-gray-400">
                          {game.team2.substring(0, 3).toUpperCase()}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-600">Prediction:</span>
                      <span className="font-bold text-purple-700 bg-purple-50 px-3 py-1 rounded-full text-sm">
                        {game.market}
                      </span>
                    </div>
                   
                    <div className="bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full text-sm font-bold">
                      @{game.odds}
                    </div>
                  </div>

                  <div className="mt-3 pt-3 border-t border-gray-200 flex items-center justify-between text-xs text-gray-500">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      <span className="truncate">{game.stadium}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{new Date(game.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Booking Codes */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Booking Codes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {ticket.bookingCodes.map((code) => (
              <div key={code.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div>
                  <div className="font-semibold text-gray-900">{code.platform}</div>
                  <div className="text-2xl font-mono font-bold text-purple-600">{code.code}</div>
                </div>
                <button
                  onClick={() => copyBookingCode(code.code)}
                  className="p-2 hover:bg-white rounded-lg transition-colors"
                >
                  {copiedCode === code.code ? (
                    <Check className="w-5 h-5 text-emerald-600" />
                  ) : (
                    <Copy className="w-5 h-5 text-gray-600" />
                  )}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Engagement Section */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm mb-6">
          <div className="flex items-center gap-4 pb-6 border-b border-gray-200">
            <button
              onClick={handleLike}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${
                liked
                  ? "bg-red-50 text-red-600 border-2 border-red-200"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              <Heart className={`w-5 h-5 ${liked ? "fill-current" : ""}`} />
              <span className="font-medium">{liked ? ticket.likes + 1 : ticket.likes}</span>
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-600 hover:bg-gray-200 rounded-xl transition-colors">
              <MessageCircle className="w-5 h-5" />
              <span className="font-medium">{ticket.comments.length}</span>
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-600 hover:bg-gray-200 rounded-xl transition-colors">
              <Share2 className="w-5 h-5" />
              <span className="font-medium">Share</span>
            </button>
          </div>

          {/* Comments Section */}
          <div className="mt-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Comments</h3>
            
            {/* Add Comment */}
            <div className="mb-6">
              <textarea
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Add a comment..."
                rows={3}
                className="w-full p-4 border border-gray-300 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all resize-none"
              />
              <button
                onClick={handleComment}
                disabled={!commentText.trim()}
                className="mt-2 px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Post Comment
              </button>
            </div>

            {/* Comments List */}
            <div className="space-y-4">
              {ticket.comments.map((comment) => (
                <div key={comment.id} className="border-l-2 border-purple-200 pl-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="font-bold text-purple-600">
                        {comment.user.charAt(0)}
                      </span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold text-gray-900">{comment.user}</span>
                        <span className="text-xs text-gray-500">{comment.timestamp}</span>
                      </div>
                      <p className="text-gray-700 mb-2">{comment.text}</p>
                      <div className="flex items-center gap-3">
                        <button className="flex items-center gap-1 text-sm text-gray-600 hover:text-purple-600">
                          <ThumbsUp className="w-4 h-4" />
                          <span>{comment.likes}</span>
                        </button>
                        <button
                          onClick={() => setReplyingTo(comment.id)}
                          className="text-sm text-gray-600 hover:text-purple-600"
                        >
                          Reply
                        </button>
                      </div>

                      {/* Reply Form */}
                      {replyingTo === comment.id && (
                        <div className="mt-3">
                          <textarea
                            value={replyText}
                            onChange={(e) => setReplyText(e.target.value)}
                            placeholder="Write a reply..."
                            rows={2}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all resize-none text-sm"
                          />
                          <div className="flex gap-2 mt-2">
                            <button
                              onClick={() => handleReply(comment.id)}
                              className="px-4 py-1 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-sm font-medium transition-colors"
                            >
                              Reply
                            </button>
                            <button
                              onClick={() => setReplyingTo(null)}
                              className="px-4 py-1 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg text-sm font-medium transition-colors"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      )}

                      {/* Replies */}
                      {comment.replies && comment.replies.length > 0 && (
                        <div className="mt-4 space-y-3 ml-6">
                          {comment.replies.map((reply) => (
                            <div key={reply.id} className="flex items-start gap-2">
                              <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                                <span className="text-xs font-bold text-gray-600">
                                  {reply.user.charAt(0)}
                                </span>
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="font-semibold text-gray-900 text-sm">{reply.user}</span>
                                  <span className="text-xs text-gray-500">{reply.timestamp}</span>
                                </div>
                                <p className="text-gray-700 text-sm">{reply.text}</p>
                                <button className="flex items-center gap-1 text-xs text-gray-600 hover:text-purple-600 mt-1">
                                  <ThumbsUp className="w-3 h-3" />
                                  <span>{reply.likes}</span>
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}