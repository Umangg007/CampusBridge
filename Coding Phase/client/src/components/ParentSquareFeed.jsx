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

  // Form State
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
      setPostTitle(''); setPostContent('');
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
    <div className="ps-content-wrap">
      
      {/* 1. ParentSquare Hero Banner */}
      <div className="ps-hero-card">
        
        {/* Floating Tag Pills with Pastel Backgrounds */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '16px' }}>
          <span className="ps-hero-pill" style={{ backgroundColor: '#F3E8FF', color: '#7E22CE' }}>
            <Sparkles size={14} /> Intelligence
          </span>
          <span className="ps-hero-pill" style={{ backgroundColor: '#E0F2FE', color: '#0369A1' }}>
            <Globe size={14} /> Websites
          </span>
          <span className="ps-hero-pill" style={{ backgroundColor: '#D1FAE5', color: '#047857' }}>
            <MessageSquare size={14} /> Communication
          </span>
          <span className="ps-hero-pill" style={{ backgroundColor: '#FCE7F3', color: '#BE185D' }}>
            <HeartHandshake size={14} /> Engagement
          </span>
        </div>

        {/* Hero Headline & Subtitle */}
        <h2 style={{ fontSize: '28px', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: '8px', lineHeight: 1.25 }}>
          The K-12 family engagement platform built to reach every family
        </h2>
        <p style={{ fontSize: '14px', color: '#94A3B8', maxWidth: '640px', lineHeight: 1.6, marginBottom: '24px' }}>
          One unified platform for communication, websites, attendance, and payments—built to reach every family, without barriers.
        </p>

        {/* Action Buttons */}
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '14px' }}>
          <button className="ps-btn-primary" style={{ fontSize: '13px' }}>
            Explore the platform <ArrowRight size={16} />
          </button>
          <button style={{ backgroundColor: 'rgba(255,255,255,0.1)', color: '#FFFFFF', border: '1px solid rgba(255,255,255,0.2)', padding: '10px 20px', borderRadius: '20px', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>
            Get a demo
          </button>
          {(user?.role === 'ADMIN' || user?.role === 'TEACHER') && (
            <button onClick={() => setShowCreateModal(true)} className="ps-btn-primary" style={{ marginLeft: 'auto', backgroundColor: '#10B981' }}>
              <Plus size={16} /> Broadcast Announcement
            </button>
          )}
        </div>

      </div>

      {/* 2. Feed Header Title */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 4px' }}>
        <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#0F172A', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Megaphone size={20} style={{ color: '#00A884' }} /> Recent District & Class Announcements
        </h3>
        <span style={{ fontSize: '12px', color: '#64748B', fontWeight: 600 }}>{announcements.length} Posts Active</span>
      </div>

      {/* 3. Feed Posts Cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {announcements.length === 0 ? (
          <div className="ps-card-box" style={{ textAlign: 'center', padding: '48px', color: '#94A3B8', fontSize: '14px', fontStyle: 'italic' }}>
            No announcements currently in school feed.
          </div>
        ) : (
          announcements.map((post) => {
            const isLiked = likedPosts[post._id];
            const postComments = commentsMap[post._id] || [];

            return (
              <div key={post._id} className="ps-card-box" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                
                {/* Author Header */}
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '16px', paddingBottom: '14px', borderBottom: '1px solid #F1F5F9' }}>
                  
                  {/* Left: Avatar & Name */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ width: '42px', height: '42px', borderRadius: '50%', backgroundColor: '#00A884', color: '#FFFFFF', fontWeight: 800, fontSize: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 8px rgba(0, 168, 132, 0.25)' }}>
                      {post.authorName.charAt(0)}
                    </div>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontWeight: 800, fontSize: '15px', color: '#0F172A' }}>{post.authorName}</span>
                        <span className="badge badge-academic">{post.authorRole}</span>
                      </div>
                      <div style={{ fontSize: '12px', color: '#64748B', fontWeight: 500, marginTop: '2px' }}>
                        Target Audience: <span style={{ fontWeight: 700, color: '#334155' }}>{post.targetAudience || 'Greenwood High Parents'}</span> • {new Date(post.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                  </div>

                  {/* Right: Badges */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    {post.isPinned && (
                      <span style={{ backgroundColor: '#FEF3C7', color: '#92400E', fontWeight: 700, fontSize: '11px', padding: '4px 10px', borderRadius: '12px', border: '1px solid #FDE68A', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Pin size={12} style={{ color: '#D97706' }} /> Pinned
                      </span>
                    )}
                    <span className={`badge badge-${post.category.toLowerCase()}`}>{post.category}</span>
                  </div>

                </div>

                {/* Post Content */}
                <div>
                  <h4 style={{ fontSize: '17px', fontWeight: 800, color: '#0F172A', marginBottom: '8px', lineHeight: 1.3 }}>
                    {post.title}
                  </h4>
                  <p style={{ fontSize: '14px', color: '#334155', lineHeight: 1.6, whiteSpace: 'pre-line' }}>
                    {post.content}
                  </p>
                </div>

                {/* Comments List */}
                {postComments.length > 0 && (
                  <div style={{ paddingTop: '12px', borderTop: '1px solid #F1F5F9', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <div style={{ fontSize: '11px', fontWeight: 800, color: '#94A3B8', textTransform: 'uppercase' }}>
                      Comments ({postComments.length})
                    </div>
                    {postComments.map((c, idx) => (
                      <div key={idx} style={{ backgroundColor: '#F8FAFC', padding: '10px 14px', borderRadius: '12px', border: '1px solid #E2E8F0', fontSize: '12px' }}>
                        <div style={{ display: 'flex', justifyBetween: 'space-between', fontWeight: 700, color: '#0F172A', marginBottom: '4px' }}>
                          <span>{c.author}</span>
                          <span style={{ fontSize: '10px', color: '#94A3B8' }}>{c.time}</span>
                        </div>
                        <div style={{ color: '#475569' }}>{c.text}</div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Reaction Bar */}
                <div style={{ paddingTop: '12px', borderTop: '1px solid #F1F5F9', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    
                    <button
                      onClick={() => handleAppreciate(post._id)}
                      className={`ps-reaction-btn ${isLiked ? 'ps-reaction-btn-liked' : ''}`}
                    >
                      <Heart size={15} style={{ color: isLiked ? '#E11D48' : '#64748B', fill: isLiked ? '#E11D48' : 'none' }} />
                      <span>Appreciate ({(post.reactions?.like || 0) + (reactions[post._id] || 0)})</span>
                    </button>

                    <button
                      onClick={() => setActiveCommentId(activeCommentId === post._id ? null : post._id)}
                      className="ps-reaction-btn"
                    >
                      <MessageCircle size={15} style={{ color: '#00A884' }} />
                      <span>Reply / Comment</span>
                    </button>

                  </div>

                  <button className="ps-reaction-btn">
                    <Share2 size={14} /> Share
                  </button>
                </div>

                {/* Comment Input */}
                {activeCommentId === post._id && (
                  <div style={{ paddingTop: '12px', borderTop: '1px solid #F1F5F9', display: 'flex', gap: '8px' }}>
                    <input
                      type="text"
                      value={commentText[post._id] || ''}
                      onChange={(e) => setCommentText({ ...commentText, [post._id]: e.target.value })}
                      placeholder="Write your comment to post..."
                      style={{ flex: 1 }}
                    />
                    <button
                      onClick={() => handleAddComment(post._id)}
                      className="ps-btn-primary"
                      style={{ padding: '8px 16px', fontSize: '12px' }}
                    >
                      <Send size={14} /> Post
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
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(15, 23, 42, 0.5)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px', zIndex: 200 }}>
          <div className="ps-card-box" style={{ maxWidth: '500px', width: '100%', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #F1F5F9', paddingBottom: '12px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#0F172A' }}>Create New ParentSquare Post</h3>
              <button onClick={() => setShowCreateModal(false)} style={{ fontSize: '18px', color: '#94A3B8', fontWeight: 700 }}>✕</button>
            </div>

            <form onSubmit={handleCreatePost} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#475569', marginBottom: '4px' }}>Post Title</label>
                <input
                  type="text"
                  required
                  value={postTitle}
                  onChange={(e) => setPostTitle(e.target.value)}
                  placeholder="e.g. Science Fair Registration & Schedule"
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#475569', marginBottom: '4px' }}>Category</label>
                  <select
                    value={postCategory}
                    onChange={(e) => setPostCategory(e.target.value)}
                  >
                    <option value="ACADEMIC">ACADEMIC</option>
                    <option value="URGENT">URGENT</option>
                    <option value="EVENT">EVENT</option>
                    <option value="SPORTS">SPORTS</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#475569', marginBottom: '4px' }}>Target Audience</label>
                  <select
                    value={postTarget}
                    onChange={(e) => setPostTarget(e.target.value)}
                  >
                    <option value="ALL">ALL PARENTS & STUDENTS</option>
                    <option value="PARENTS">PARENTS ONLY</option>
                    <option value="STUDENTS">STUDENTS ONLY</option>
                  </select>
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#475569', marginBottom: '4px' }}>Post Description</label>
                <textarea
                  required
                  rows={4}
                  value={postContent}
                  onChange={(e) => setPostContent(e.target.value)}
                  placeholder="Share announcements, event details, or instructions..."
                />
              </div>

              <button type="submit" className="ps-btn-primary" style={{ width: '100%' }}>
                <Send size={16} /> Broadcast Announcement
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
