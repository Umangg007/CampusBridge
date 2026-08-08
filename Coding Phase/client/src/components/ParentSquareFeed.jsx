import React, { useState, useEffect } from 'react';
import { Megaphone, Heart, MessageCircle, Pin, Share2, Plus, Send, ArrowRight, Sparkles, Globe, MessageSquare, HeartHandshake } from 'lucide-react';
import { fetchAnnouncements, createAnnouncement } from '../services/api';
import { useAuth } from '../context/AuthContext';

export const ParentSquareFeed = () => {
  const { user } = useAuth();
  const [announcements, setAnnouncements] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [reactions, setReactions] = useState({});
  const [likedPosts, setLikedPosts] = useState({});
  const [activeCommentId, setActiveCommentId] = useState(null);
  const [commentText, setCommentText] = useState({});
  const [commentsMap, setCommentsMap] = useState({});

  // New Post Form State
  const [postTitle, setPostTitle] = useState('');
  const [postContent, setPostContent] = useState('');
  const [postCategory, setPostCategory] = useState('ACADEMIC');
  const [postTarget, setPostTarget] = useState('ALL');

  useEffect(() => {
    loadFeed();
  }, []);

  const loadFeed = async () => {
    try {
      const res = await fetchAnnouncements();
      setAnnouncements(res.data || []);
    } catch (err) {
      console.warn('Error loading announcements feed:', err);
    }
  };

  const handleCreatePost = async (e) => {
    e.preventDefault();
    try {
      await createAnnouncement({
        title: postTitle,
        content: postContent,
        category: postCategory,
        targetAudience: postTarget,
        isPinned: true
      });
      setShowCreateModal(false);
      setPostTitle('');
      setPostContent('');
      loadFeed();
    } catch (err) {
      console.error('Error creating post:', err);
    }
  };

  const handleAppreciate = (id) => {
    setLikedPosts((prev) => ({ ...prev, [id]: !prev[id] }));
    setReactions((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + (likedPosts[id] ? -1 : 1)
    }));
  };

  const handleAddComment = (postId) => {
    const text = commentText[postId];
    if (!text || !text.trim()) return;

    setCommentsMap((prev) => ({
      ...prev,
      [postId]: [...(prev[postId] || []), { author: user?.name || 'Parent', text, time: 'Just now' }]
    }));
    setCommentText((prev) => ({ ...prev, [postId]: '' }));
  };

  return (
    <div className="space-y-6">
      {/* ParentSquare Official Marketing Hero Banner */}
      <div className="ps-card p-8 bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-950 text-white border-none shadow-xl relative overflow-hidden">
        
        {/* Floating Tag Pills from ParentSquare */}
        <div className="flex flex-wrap gap-2 mb-4">
          <span className="ps-tag-pill bg-purple-500/20 text-purple-300 border border-purple-400/30">
            <Sparkles className="w-3.5 h-3.5" /> Intelligence
          </span>
          <span className="ps-tag-pill bg-sky-500/20 text-sky-300 border border-sky-400/30">
            <Globe className="w-3.5 h-3.5" /> Websites
          </span>
          <span className="ps-tag-pill bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
            <MessageSquare className="w-3.5 h-3.5" /> Communication
          </span>
          <span className="ps-tag-pill bg-pink-500/20 text-pink-300 border border-pink-400/30">
            <HeartHandshake className="w-3.5 h-3.5" /> Engagement
          </span>
        </div>

        {/* Hero Title & Subtitle */}
        <h2 className="text-3xl lg:text-4xl font-extrabold tracking-tight leading-tight max-w-3xl mb-3">
          The K-12 family engagement platform built to reach every family
        </h2>
        <p className="text-slate-300 text-sm max-w-2xl leading-relaxed mb-6 font-medium">
          One unified platform for communication, websites, attendance, and payments—built to reach every family, without barriers.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-4">
          <button className="ps-btn-green text-sm bg-emerald-600 hover:bg-emerald-500">
            Explore the platform <ArrowRight className="w-4 h-4" />
          </button>
          <button className="ps-btn-outline text-sm bg-white/10 text-white border-white/20 hover:bg-white/20">
            Get a demo
          </button>
          {(user?.role === 'ADMIN' || user?.role === 'TEACHER') && (
            <button onClick={() => setShowCreateModal(true)} className="ps-btn-primary ml-auto text-xs bg-emerald-500 text-white">
              <Plus className="w-4 h-4" /> Broadcast Announcement
            </button>
          )}
        </div>

      </div>

      {/* Feed Posts List Header */}
      <div className="flex items-center justify-between px-1">
        <h3 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
          <Megaphone className="w-5 h-5 text-emerald-700" /> Recent District & Class Announcements
        </h3>
        <span className="text-xs text-slate-500 font-semibold">{announcements.length} Posts Active</span>
      </div>

      {/* Feed Posts List */}
      <div className="space-y-4">
        {announcements.length === 0 ? (
          <div className="ps-card p-12 text-center text-slate-400 text-sm italic">
            No announcements currently in school feed.
          </div>
        ) : (
          announcements.map((post) => {
            const isLiked = likedPosts[post._id];
            const postComments = commentsMap[post._id] || [];

            return (
              <div key={post._id} className="ps-card p-6 space-y-4">
                
                {/* Post Author Header */}
                <div className="flex items-start justify-between gap-4 pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-emerald-700 text-white font-bold flex items-center justify-center text-sm shadow-sm">
                      {post.authorName.charAt(0)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900 text-sm">{post.authorName}</span>
                        <span className="badge badge-academic">{post.authorRole}</span>
                      </div>
                      <div className="text-[11px] text-slate-400 font-medium">
                        Target Audience: <span className="font-semibold text-slate-700">{post.targetAudience || 'Greenwood High Parents'}</span> • {new Date(post.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {post.isPinned && (
                      <span className="text-xs bg-amber-50 text-amber-800 font-bold px-2.5 py-1 rounded-full border border-amber-200 flex items-center gap-1">
                        <Pin className="w-3.5 h-3.5 text-amber-600" /> Pinned
                      </span>
                    )}
                    <span className={`badge badge-${post.category.toLowerCase()}`}>{post.category}</span>
                  </div>
                </div>

                {/* Post Title & Content */}
                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-slate-900 leading-snug">{post.title}</h3>
                  <p className="text-slate-700 text-sm leading-relaxed whitespace-pre-line">{post.content}</p>
                </div>

                {/* Inline Comments List */}
                {postComments.length > 0 && (
                  <div className="space-y-2 pt-2 border-t border-slate-100">
                    <div className="text-[11px] font-bold text-slate-400 uppercase">Comments ({postComments.length})</div>
                    {postComments.map((c, idx) => (
                      <div key={idx} className="bg-slate-50 p-2.5 rounded-xl border border-slate-200 text-xs space-y-1">
                        <div className="flex justify-between font-bold text-slate-800">
                          <span>{c.author}</span>
                          <span className="text-[10px] text-slate-400">{c.time}</span>
                        </div>
                        <div className="text-slate-600">{c.text}</div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Reaction Bar (ParentSquare Signature ❤️ Appreciate) */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-semibold">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => handleAppreciate(post._id)}
                      className={`flex items-center gap-1.5 transition-all ${
                        isLiked ? 'text-rose-600 font-bold' : 'hover:text-rose-600'
                      }`}
                    >
                      <Heart className={`w-4 h-4 ${isLiked ? 'fill-rose-500 text-rose-500' : ''}`} />
                      <span>Appreciate ({(post.reactions?.like || 0) + (reactions[post._id] || 0)})</span>
                    </button>
                    <button
                      onClick={() => setActiveCommentId(activeCommentId === post._id ? null : post._id)}
                      className="flex items-center gap-1.5 hover:text-emerald-700 transition-colors"
                    >
                      <MessageCircle className="w-4 h-4 text-emerald-700" />
                      <span>Reply / Comment</span>
                    </button>
                  </div>

                  <button className="flex items-center gap-1 hover:text-slate-800">
                    <Share2 className="w-3.5 h-3.5" /> Share
                  </button>
                </div>

                {/* Expandable Comment Input */}
                {activeCommentId === post._id && (
                  <div className="pt-3 border-t border-slate-100 flex gap-2">
                    <input
                      type="text"
                      value={commentText[post._id] || ''}
                      onChange={(e) => setCommentText({ ...commentText, [post._id]: e.target.value })}
                      placeholder="Write your comment to post..."
                      className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                    <button
                      onClick={() => handleAddComment(post._id)}
                      className="ps-btn-green px-3 py-1.5 text-xs"
                    >
                      <Send className="w-3.5 h-3.5" /> Post
                    </button>
                  </div>
                )}

              </div>
            );
          })
        )}
      </div>

      {/* New Post Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="ps-card p-6 max-w-lg w-full space-y-4">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <h3 className="font-extrabold text-slate-900 text-lg">Create New ParentSquare Post</h3>
              <button onClick={() => setShowCreateModal(false)} className="text-slate-400 hover:text-slate-700">✕</button>
            </div>

            <form onSubmit={handleCreatePost} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Post Title</label>
                <input
                  type="text"
                  required
                  value={postTitle}
                  onChange={(e) => setPostTitle(e.target.value)}
                  placeholder="e.g. Science Fair Registration & Schedule"
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">Category</label>
                  <select
                    value={postCategory}
                    onChange={(e) => setPostCategory(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-sm text-slate-800"
                  >
                    <option value="ACADEMIC">ACADEMIC</option>
                    <option value="URGENT">URGENT</option>
                    <option value="EVENT">EVENT</option>
                    <option value="SPORTS">SPORTS</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">Target Audience</label>
                  <select
                    value={postTarget}
                    onChange={(e) => setPostTarget(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-sm text-slate-800"
                  >
                    <option value="ALL">ALL PARENTS & STUDENTS</option>
                    <option value="PARENTS">PARENTS ONLY</option>
                    <option value="STUDENTS">STUDENTS ONLY</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Post Description</label>
                <textarea
                  required
                  rows={4}
                  value={postContent}
                  onChange={(e) => setPostContent(e.target.value)}
                  placeholder="Share announcements, event details, or instructions..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <button type="submit" className="ps-btn-green w-full">
                <Send className="w-4 h-4" /> Broadcast Announcement to School Feed
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
