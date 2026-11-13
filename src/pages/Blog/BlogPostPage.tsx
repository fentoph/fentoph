import React, { useState, useEffect } from 'react';
import { useRouter } from '../../context/RouterContext';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { BLOG_POSTS } from '../../data/blogs';
import { BlogPost, BlogComment } from '../../types';
import { apiClient } from '../../services/apiClient';
import { 
  ArrowLeft, 
  ArrowRight, 
  Heart, 
  Share2, 
  MessageSquare, 
  Send, 
  Bookmark, 
  Clock, 
  Check, 
  Twitter, 
  Linkedin,
  Loader2
} from 'lucide-react';

interface BlogPostPageProps {
  slug: string;
}

export const BlogPostPage: React.FC<BlogPostPageProps> = ({ slug }) => {
  const { navigate } = useRouter();
  const { user, isAuthenticated, saveItem } = useAuth();
  const toast = useToast();

  const post = BLOG_POSTS.find(p => p.slug === slug) || BLOG_POSTS[0];

  const [likes, setLikes] = useState(post.likes);
  const [hasLiked, setHasLiked] = useState(false);
  const [comments, setComments] = useState<BlogComment[]>(post.comments || []);
  const [commentName, setCommentName] = useState(user?.fullName || '');
  const [commentText, setCommentText] = useState('');
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);

  useEffect(() => {
    // Fetch live comments from backend if available
    apiClient.getComments(post.id).then(res => {
      if (res && res.comments && res.comments.length > 0) {
        const formatted = res.comments.map((c: any) => ({
          id: c.id,
          author: c.author,
          content: c.content,
          date: c.timestamp ? c.timestamp.split(' ')[0] : 'Hozirgina'
        }));
        setComments(formatted);
      }
    }).catch(() => {});
  }, [post.id]);

  const handleLike = () => {
    if (!hasLiked) {
      setLikes(prev => prev + 1);
      setHasLiked(true);
      toast.success("Maqolaga yoqdi belgisi qo'yildi!");
    } else {
      setLikes(prev => prev - 1);
      setHasLiked(false);
    }
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Maqola havolasi nusxalandi!");
    }
  };

  const handleBookmark = () => {
    saveItem({
      type: 'blog',
      title: post.title,
      url: `/blog/${post.slug}`
    });
    toast.success("Maqola saqlanganlarga qo'shildi!");
  };

  const handleAddComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    if (!isAuthenticated) {
      toast.error("Fikr bildirish uchun tizimga kirish talab qilinadi.");
      navigate('/login');
      return;
    }

    setIsSubmittingComment(true);
    try {
      const res = await apiClient.postComment(post.id, commentText.trim());
      const newComment: BlogComment = {
        id: res.comment.id,
        author: res.comment.author || user?.fullName || 'Foydalanuvchi',
        content: res.comment.content,
        date: 'Hozirgina'
      };
      setComments(prev => [newComment, ...prev]);
      setCommentText('');
      toast.success("Fikringiz muvaffaqiyatli chop etildi!");
    } catch (err: any) {
      toast.error(err?.message || "Fikr yuborishda xatolik yuz berdi.");
    } finally {
      setIsSubmittingComment(false);
    }
  };

  const relatedPosts = BLOG_POSTS.filter(p => p.id !== post.id && p.category === post.category).slice(0, 2);

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* Back button */}
      <div>
        <button
          onClick={() => navigate('/blog')}
          className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Blogga qaytish
        </button>
      </div>

      {/* Header Info */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 rounded-md bg-blue-500/10 text-cyan-400 text-xs font-mono border border-blue-500/20">
            {post.category}
          </span>
          <span className="text-xs text-slate-500 font-mono">
            {post.readTime} o'qish
          </span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
          {post.title}
        </h1>

        {/* Author & Meta bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-800">
          <div className="flex items-center gap-3">
            <img
              src={post.author.avatar}
              alt={post.author.name}
              className="w-10 h-10 rounded-full object-cover border border-cyan-500/40"
            />
            <div>
              <div className="text-sm font-bold text-white">{post.author.name}</div>
              <div className="text-xs text-slate-400">{post.author.role} • {post.date}</div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleLike}
              className={`px-3 py-1.5 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                hasLiked
                  ? 'bg-red-950/40 border-red-500/40 text-red-400'
                  : 'bg-slate-900 border-slate-800 text-slate-300 hover:text-white'
              }`}
            >
              <Heart className={`w-3.5 h-3.5 ${hasLiked ? 'fill-red-500' : ''}`} />
              <span>{likes}</span>
            </button>

            <button
              onClick={handleBookmark}
              className="p-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-cyan-400 transition-colors"
              title="Saqlash"
            >
              <Bookmark className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={handleShare}
              className="p-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white transition-colors"
              title="Havolani nusxalash"
            >
              <Share2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Cover Image */}
      <div className="h-72 sm:h-96 w-full rounded-3xl overflow-hidden border border-slate-800">
        <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover" />
      </div>

      {/* Main Rich Content */}
      <div className="space-y-6 text-slate-300 text-sm sm:text-base leading-relaxed">
        <p className="text-lg sm:text-xl text-cyan-300 font-medium italic border-l-2 border-cyan-500 pl-4 py-1">
          "{post.excerpt}"
        </p>

        {post.content.map((paragraph, idx) => (
          <p key={idx} className="leading-relaxed">
            {paragraph}
          </p>
        ))}
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 pt-6 border-t border-slate-800">
        {post.tags.map(t => (
          <span key={t} className="px-3 py-1 rounded-lg bg-slate-900 text-xs font-mono text-cyan-400 border border-slate-800">
            #{t}
          </span>
        ))}
      </div>

      {/* Author Bio Box */}
      <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-start gap-4">
        <img
          src={post.author.avatar}
          alt={post.author.name}
          className="w-14 h-14 rounded-2xl object-cover border border-cyan-500/30 flex-shrink-0"
        />
        <div className="space-y-1">
          <div className="text-sm font-bold text-white">{post.author.name}</div>
          <div className="text-xs text-cyan-400 font-mono">{post.author.role}</div>
          <p className="text-xs text-slate-400 pt-1">{post.author.bio}</p>
        </div>
      </div>

      {/* Comments Section */}
      <div className="space-y-6 pt-6 border-t border-slate-800">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-cyan-400" />
          Fikr-Mulohazalar ({comments.length})
        </h3>

        {/* Comment Form */}
        <form onSubmit={handleAddComment} className="space-y-3">
          <input
            type="text"
            placeholder="Ismingiz (ixtiyoriy)"
            value={commentName}
            onChange={(e) => setCommentName(e.target.value)}
            className="w-full sm:w-64 px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white"
          />
          <div className="relative">
            <textarea
              rows={3}
              required
              placeholder="Maqola haqida fikringizni bildiring..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
            />
            <button
              type="submit"
              className="mt-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition-colors flex items-center gap-1.5 ml-auto"
            >
              <Send className="w-3.5 h-3.5" /> Fikr qoldirish
            </button>
          </div>
        </form>

        {/* Comments List */}
        <div className="space-y-3 pt-4">
          {comments.map((c) => (
            <div key={c.id} className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-white">{c.author}</span>
                <span className="text-[10px] text-slate-500 font-mono">{c.date}</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">{c.content}</p>
            </div>
          ))}

          {comments.length === 0 && (
            <div className="p-6 text-center text-xs text-slate-500 bg-slate-950 rounded-xl">
              Hozircha hech kim fikr qoldirmadi. Birinchi bo'ling!
            </div>
          )}
        </div>
      </div>

      {/* Related Articles */}
      {relatedPosts.length > 0 && (
        <div className="space-y-6 pt-6 border-t border-slate-800">
          <h3 className="text-xl font-bold text-white">Mavzuga Oid Boshqa Maqolalar</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {relatedPosts.map(rel => (
              <div
                key={rel.id}
                onClick={() => navigate(`/blog/${rel.slug}`)}
                className="cursor-pointer p-4 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-colors space-y-2"
              >
                <span className="text-[10px] font-mono text-cyan-400 px-2 py-0.5 rounded bg-slate-800">
                  {rel.category}
                </span>
                <h4 className="font-bold text-white text-sm line-clamp-1">{rel.title}</h4>
                <p className="text-xs text-slate-400 line-clamp-2">{rel.excerpt}</p>
              </div>
            ))}
          </div>
        </div>
      )}

    </article>
  );
};
