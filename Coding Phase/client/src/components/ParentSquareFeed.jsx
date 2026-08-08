import React, { useState, useEffect } from 'react';
import { Megaphone, Heart, MessageCircle, Pin, Share2, Plus, Send } from 'lucide-react';
import { fetchAnnouncements, createAnnouncement } from '../services/api';
import { useAuth } from '../context/AuthContext';

export const ParentSquareFeed = () => {
  const { user } = useAuth();
  const [announcements, setAnnouncements] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [reactions, setReactions] = useState({});

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
    setReactions((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1
    }));
  };

  return (
    <div className="space-y-6">
      {/* Feed Header Banner */}
      <div className="ps-card p-6 flex flex-wrap items-center justify-between gap-4 border-l-4 border-l-teal-600">
        <div>
          <span className="badge badge-event mb-2">School & Community Feed</span>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">ParentSquare Posts & Bulletins</h2>
          <p className="text-slate-500 text-xs mt-1 font-medium">
            Stay connected with real-time updates from teachers, principals, and school administrators.
          </p>
        </div>

        {(user?.role === 'ADMIN' || user?.role === 'TEACHER') && (
          <button onClick={() => setShowCreateModal(true)} className="ps-btn-primary">
            <Plus className="w-4 h-4" /> Create New Post
          </button>
        )}
      </div>

      {/* Feed Posts List */}
      <div className="space-y-4">
        {announcements.length === 0 ? (
          <div className="ps-card p-12 text-center text-slate-400 text-sm italic">
            No announcements currently in school feed.
          </div>
        ) : (
          announcements.map((post) => (
            <div key={post._id} className="ps-card p-6 space-y-4">
              
              {/* Post Author Header */}
              <div className="flex items-start justify-between gap-4 pb-3 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-teal-600 text-white font-bold flex items-center justify-center text-sm shadow-sm">
                    {post.authorName.charAt(0)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900 text-sm">{post.authorName}</span>
                      <span className="badge badge-academic">{post.authorRole}</span>
                    </div>
                    <div className="text-[11px] text-slate-400 font-medium">
                      Posted to: <span className="font-semibold text-slate-600">{post.targetAudience || 'Greenwood High Parents'}</span> • {new Date(post.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {post.isPinned && (
                    <span className="text-xs bg-amber-50 text-amber-700 font-bold px-2 py-1 rounded border border-amber-200 flex items-center gap-1">
                      <Pin className="w-3 h-3 text-amber-600" /> Pinned
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

              {/* Reaction Bar (ParentSquare Signature ❤️ Appreciate) */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-semibold">
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => handleAppreciate(post._id)}
                    className="flex items-center gap-1.5 hover:text-rose-600 transition-colors"
                  >
                    <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
                    <span>Appreciate ({post.reactions?.like || 0} + {reactions[post._id] || 0})</span>
                  </button>
                  <button className="flex items-center gap-1.5 hover:text-teal-600 transition-colors">
                    <MessageCircle className="w-4 h-4 text-teal-600" />
                    <span>Reply / Comment</span>
                  </button>
                </div>

                <button className="flex items-center gap-1 hover:text-slate-800">
                  <Share2 className="w-3.5 h-3.5" /> Share
                </button>
              </div>

            </div>
          ))
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
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500"
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
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <button type="submit" className="ps-btn-primary w-full">
                <Send className="w-4 h-4" /> Broadcast Announcement to School Feed
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
