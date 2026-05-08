import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, Send, Trash2, User } from 'lucide-react';
import { contentService, Comment } from '../services/contentService';
import { auth } from '../lib/firebase';
import { cn } from '../lib/utils';

interface CommentSectionProps {
  articleId: string;
}

export const CommentSection: React.FC<CommentSectionProps> = ({ articleId }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(false);
  const user = auth.currentUser;

  useEffect(() => {
    const unsubscribe = contentService.getComments(articleId, (fetchedComments) => {
      setComments(fetchedComments);
    });
    return () => unsubscribe();
  }, [articleId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || !user) return;

    setLoading(true);
    try {
      await contentService.addComment(articleId, newComment.trim());
      setNewComment('');
    } catch (err) {
      console.error('Failed to add comment:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (commentId: string) => {
    if (window.confirm('Delete this comment?')) {
      try {
        await contentService.deleteComment(articleId, commentId);
      } catch (err) {
        console.error('Failed to delete comment:', err);
      }
    }
  };

  return (
    <div className="mt-24 pt-16 border-t border-zen-clay/30">
      <div className="flex items-center gap-4 mb-12">
        <div className="w-12 h-12 rounded-2xl bg-zen-forest/5 flex items-center justify-center text-zen-forest">
          <MessageSquare size={20} />
        </div>
        <div>
          <h3 className="text-xl font-display font-bold text-zen-forest">Movement Discussion</h3>
          <p className="text-xs text-zen-slate uppercase font-bold tracking-widest">{comments.length} Thoughts Shared</p>
        </div>
      </div>

      {user ? (
        <form onSubmit={handleSubmit} className="mb-16">
          <div className="relative group">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add your thought to the collective..."
              rows={3}
              className="w-full bg-white border border-zen-clay/50 rounded-[2rem] py-6 px-8 text-zen-forest focus:outline-none focus:ring-4 focus:ring-zen-forest/5 focus:border-zen-forest transition-all placeholder:text-zen-clay pr-20"
            />
            <button
              type="submit"
              disabled={loading || !newComment.trim()}
              className="absolute right-4 bottom-4 p-4 bg-zen-forest text-white rounded-2xl shadow-xl shadow-zen-forest/20 hover:bg-zen-slate transition-all disabled:opacity-50 active:scale-95"
            >
              <Send size={18} />
            </button>
          </div>
        </form>
      ) : (
        <div className="bg-zen-clay/10 border border-zen-clay/30 rounded-[2rem] p-8 mb-16 text-center">
          <p className="text-zen-slate text-sm font-medium">Join the movement to share your wisdom.</p>
        </div>
      )}

      <div className="space-y-10">
        <AnimatePresence initial={false}>
          {comments.map((comment) => (
            <motion.div
              key={comment.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="flex gap-6 items-start"
            >
              <div className="w-12 h-12 rounded-2xl overflow-hidden flex-shrink-0 bg-zen-clay/20">
                {comment.userPhoto ? (
                  <img src={comment.userPhoto} alt={comment.userName} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-zen-slate">
                    <User size={20} />
                  </div>
                )}
              </div>
              <div className="flex-grow">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-bold text-zen-forest font-display">{comment.userName}</span>
                    <span className="text-[10px] uppercase tracking-widest text-zen-clay font-bold">
                      {comment.timestamp?.toDate ? comment.timestamp.toDate().toLocaleDateString() : 'Just now'}
                    </span>
                  </div>
                  {user?.uid === comment.userId && (
                    <button
                      onClick={() => comment.id && handleDelete(comment.id)}
                      className="text-zen-clay hover:text-red-500 transition-colors p-1"
                    >
                      <Trash2 size={14} />
                    </button>
                  )}
                </div>
                <p className="text-sm text-zen-slate leading-relaxed bg-white/50 border border-zen-clay/20 p-6 rounded-[1.5rem] rounded-tl-none">
                  {comment.text}
                </p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        {comments.length === 0 && (
          <div className="text-center py-10 opacity-30 italic font-display text-zen-slate">
            The silence is thick. Be the first to break it.
          </div>
        )}
      </div>
    </div>
  );
};
