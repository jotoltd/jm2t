import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Phone, User, Calendar, CheckCircle2, Clock, X, Trash2, RefreshCw, Filter, Eye } from 'lucide-react';
import { supabaseAdmin } from '../lib/supabase';

interface Submission {
  id: string;
  type: 'contact' | 'quote';
  name: string;
  phone?: string;
  email: string;
  service?: string;
  message?: string;
  area?: string;
  description?: string;
  timeline?: string;
  budget?: string;
  created_at: string;
  status: 'new' | 'viewed' | 'responded';
}

export default function SubmissionsManager() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [filter, setFilter] = useState<'all' | 'contact' | 'quote'>('all');
  const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSubmissions();
  }, []);

  const loadSubmissions = async () => {
    setLoading(true);
    const { data, error } = await supabaseAdmin
      .from('submissions')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error loading submissions:', error);
    } else {
      setSubmissions(data || []);
    }
    setLoading(false);
  };

  const markAsViewed = async (id: string) => {
    const { error } = await supabaseAdmin
      .from('submissions')
      .update({ status: 'viewed' })
      .eq('id', id);
    
    if (!error) {
      setSubmissions(submissions.map(sub => 
        sub.id === id ? { ...sub, status: 'viewed' as const } : sub
      ));
    }
  };

  const markAsResponded = async (id: string) => {
    const { error } = await supabaseAdmin
      .from('submissions')
      .update({ status: 'responded' })
      .eq('id', id);
    
    if (!error) {
      setSubmissions(submissions.map(sub => 
        sub.id === id ? { ...sub, status: 'responded' as const } : sub
      ));
    }
  };

  const deleteSubmission = async (id: string) => {
    if (confirm('Delete this submission permanently?')) {
      const { error } = await supabaseAdmin
        .from('submissions')
        .delete()
        .eq('id', id);
      
      if (!error) {
        setSubmissions(submissions.filter(sub => sub.id !== id));
        if (selectedSubmission?.id === id) {
          setSelectedSubmission(null);
        }
      }
    }
  };

  const clearAll = async () => {
    if (confirm('Clear all submissions? This cannot be undone.')) {
      const { error } = await supabaseAdmin
        .from('submissions')
        .delete()
        .neq('id', '');
      
      if (!error) {
        setSubmissions([]);
        setSelectedSubmission(null);
      }
    }
  };

  const filteredSubmissions = filter === 'all' 
    ? submissions 
    : submissions.filter(sub => sub.type === filter);

  const newCount = submissions.filter(s => s.status === 'new').length;

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-3 gap-2 sm:gap-4">
        <div className="bg-[#111110] border border-white/5 rounded-lg p-2 sm:p-4">
          <p className="text-[#a8a39a] text-[10px] sm:text-xs uppercase tracking-wider">Total</p>
          <p className="text-lg sm:text-2xl font-bold text-[#f5f0e8]">{submissions.length}</p>
        </div>
        <div className="bg-[#111110] border border-white/5 rounded-lg p-2 sm:p-4">
          <p className="text-[#a8a39a] text-[10px] sm:text-xs uppercase tracking-wider">New</p>
          <p className="text-lg sm:text-2xl font-bold text-[#c9a84c]">{newCount}</p>
        </div>
        <div className="bg-[#111110] border border-white/5 rounded-lg p-2 sm:p-4">
          <p className="text-[#a8a39a] text-[10px] sm:text-xs uppercase tracking-wider">This Week</p>
          <p className="text-lg sm:text-2xl font-bold text-[#f5f0e8]">
            {submissions.filter(s => {
              const weekAgo = new Date();
              weekAgo.setDate(weekAgo.getDate() - 7);
              return new Date(s.created_at) > weekAgo;
            }).length}
          </p>
        </div>
      </div>

      {/* Filter & Actions */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1.5 text-xs uppercase tracking-wider rounded transition-colors ${
              filter === 'all' 
                ? 'bg-[#c9a84c] text-[#0c0b0a]' 
                : 'bg-[#111110] text-[#a8a39a] hover:text-[#f5f0e8]'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter('contact')}
            className={`px-3 py-1.5 text-xs uppercase tracking-wider rounded transition-colors ${
              filter === 'contact' 
                ? 'bg-[#c9a84c] text-[#0c0b0a]' 
                : 'bg-[#111110] text-[#a8a39a] hover:text-[#f5f0e8]'
            }`}
          >
            Contact
          </button>
          <button
            onClick={() => setFilter('quote')}
            className={`px-3 py-1.5 text-xs uppercase tracking-wider rounded transition-colors ${
              filter === 'quote' 
                ? 'bg-[#c9a84c] text-[#0c0b0a]' 
                : 'bg-[#111110] text-[#a8a39a] hover:text-[#f5f0e8]'
            }`}
          >
            Quotes
          </button>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={loadSubmissions}
            className="flex items-center gap-1 text-[#a8a39a] hover:text-[#c9a84c] text-xs transition-colors"
          >
            <RefreshCw className="w-3 h-3" />
            Refresh
          </button>
          {submissions.length > 0 && (
            <button
              onClick={clearAll}
              className="flex items-center gap-1 text-red-400 hover:text-red-300 text-xs transition-colors"
            >
              <Trash2 className="w-3 h-3" />
              Clear All
            </button>
          )}
        </div>
      </div>

      {/* Submissions List */}
      <div className="bg-[#111110] border border-white/5 rounded-lg overflow-hidden">
        {loading ? (
          <div className="p-12 text-center">
            <RefreshCw className="w-8 h-8 text-[#c9a84c] animate-spin mx-auto" />
            <p className="text-[#a8a39a] mt-4">Loading submissions...</p>
          </div>
        ) : filteredSubmissions.length === 0 ? (
          <div className="p-8 text-center">
            <Mail className="w-12 h-12 text-[#3a3730] mx-auto mb-3" />
            <p className="text-[#a8a39a]">No submissions yet</p>
            <p className="text-[#6b6560] text-sm mt-1">
              Contact form and quote requests will appear here
            </p>
          </div>
        ) : (
          <div className="divide-y divide-white/5">
            {filteredSubmissions.map((submission) => (
              <motion.div
                key={submission.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className={`p-4 hover:bg-white/5 transition-colors cursor-pointer ${
                  submission.status === 'new' ? 'bg-[#c9a84c]/5' : ''
                } ${selectedSubmission?.id === submission.id ? 'bg-white/10' : ''}`}
                onClick={() => {
                  setSelectedSubmission(submission);
                  if (submission.status === 'new') {
                    markAsViewed(submission.id);
                  }
                }}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded ${
                      submission.type === 'quote' 
                        ? 'bg-[#c9a84c]/20 text-[#c9a84c]' 
                        : 'bg-blue-500/20 text-blue-400'
                    }`}>
                      {submission.type === 'quote' ? <Filter className="w-4 h-4" /> : <Mail className="w-4 h-4" />}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="text-[#f5f0e8] font-medium">{submission.name}</p>
                        {submission.status === 'new' && (
                          <span className="px-1.5 py-0.5 bg-[#c9a84c] text-[#0c0b0a] text-[10px] font-bold uppercase rounded">
                            New
                          </span>
                        )}
                        {submission.status === 'responded' && (
                          <span className="px-1.5 py-0.5 bg-green-500/20 text-green-400 text-[10px] font-bold uppercase rounded">
                            Done
                          </span>
                        )}
                      </div>
                      <p className="text-[#a8a39a] text-sm">{submission.email}</p>
                      <p className="text-[#6b6560] text-xs mt-1">
                        {submission.service || submission.type} • {formatDate(submission.created_at)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedSubmission(submission);
                      }}
                      className="p-1.5 text-[#a8a39a] hover:text-[#c9a84c] hover:bg-[#c9a84c]/10 rounded transition-colors"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteSubmission(submission.id);
                      }}
                      className="p-1.5 text-[#a8a39a] hover:text-red-400 hover:bg-red-400/10 rounded transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedSubmission && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setSelectedSubmission(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-[#111110] border border-white/10 rounded-xl w-full max-w-2xl max-h-[80vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded ${
                    selectedSubmission.type === 'quote' 
                      ? 'bg-[#c9a84c]/20 text-[#c9a84c]' 
                      : 'bg-blue-500/20 text-blue-400'
                  }`}>
                    {selectedSubmission.type === 'quote' ? <Filter className="w-5 h-5" /> : <Mail className="w-5 h-5" />}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#f5f0e8]">
                      {selectedSubmission.type === 'quote' ? 'Quote Request' : 'Contact Form'}
                    </h3>
                    <p className="text-[#a8a39a] text-xs">{formatDate(selectedSubmission.created_at)}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedSubmission(null)}
                  className="text-[#a8a39a] hover:text-[#f5f0e8] transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Content */}
              <div className="p-4 overflow-y-auto max-h-[50vh] space-y-4">
                {/* Contact Info */}
                <div className="grid sm:grid-cols-2 gap-3">
                  <div className="bg-[#0c0b0a] border border-white/5 rounded-lg p-3">
                    <div className="flex items-center gap-2 text-[#c9a84c] mb-1">
                      <User className="w-4 h-4" />
                      <span className="text-xs uppercase tracking-wider">Name</span>
                    </div>
                    <p className="text-[#f5f0e8]">{selectedSubmission.name}</p>
                  </div>
                  <div className="bg-[#0c0b0a] border border-white/5 rounded-lg p-3">
                    <div className="flex items-center gap-2 text-[#c9a84c] mb-1">
                      <Mail className="w-4 h-4" />
                      <span className="text-xs uppercase tracking-wider">Email</span>
                    </div>
                    <p className="text-[#f5f0e8]">{selectedSubmission.email}</p>
                  </div>
                  {selectedSubmission.phone && (
                    <div className="bg-[#0c0b0a] border border-white/5 rounded-lg p-3">
                      <div className="flex items-center gap-2 text-[#c9a84c] mb-1">
                        <Phone className="w-4 h-4" />
                        <span className="text-xs uppercase tracking-wider">Phone</span>
                      </div>
                      <p className="text-[#f5f0e8]">{selectedSubmission.phone}</p>
                    </div>
                  )}
                  {selectedSubmission.service && (
                    <div className="bg-[#0c0b0a] border border-white/5 rounded-lg p-3">
                      <div className="flex items-center gap-2 text-[#c9a84c] mb-1">
                        <Filter className="w-4 h-4" />
                        <span className="text-xs uppercase tracking-wider">Service</span>
                      </div>
                      <p className="text-[#f5f0e8]">{selectedSubmission.service}</p>
                    </div>
                  )}
                </div>

                {/* Quote-specific fields */}
                {selectedSubmission.type === 'quote' && (
                  <div className="grid sm:grid-cols-3 gap-3">
                    {selectedSubmission.area && (
                      <div className="bg-[#0c0b0a] border border-white/5 rounded-lg p-3">
                        <span className="text-[#6b6560] text-xs uppercase">Area</span>
                        <p className="text-[#f5f0e8]">{selectedSubmission.area} m²</p>
                      </div>
                    )}
                    {selectedSubmission.timeline && (
                      <div className="bg-[#0c0b0a] border border-white/5 rounded-lg p-3">
                        <span className="text-[#6b6560] text-xs uppercase">Timeline</span>
                        <p className="text-[#f5f0e8]">{selectedSubmission.timeline}</p>
                      </div>
                    )}
                    {selectedSubmission.budget && (
                      <div className="bg-[#0c0b0a] border border-white/5 rounded-lg p-3">
                        <span className="text-[#6b6560] text-xs uppercase">Budget</span>
                        <p className="text-[#f5f0e8]">{selectedSubmission.budget}</p>
                      </div>
                    )}
                  </div>
                )}

                {/* Message / Description */}
                {(selectedSubmission.message || selectedSubmission.description) && (
                  <div className="bg-[#0c0b0a] border border-white/5 rounded-lg p-4">
                    <span className="text-[#c9a84c] text-xs uppercase tracking-wider">
                      {selectedSubmission.type === 'quote' ? 'Project Details' : 'Message'}
                    </span>
                    <p className="text-[#f5f0e8] mt-2 whitespace-pre-wrap">
                      {selectedSubmission.message || selectedSubmission.description}
                    </p>
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="p-4 border-t border-white/10 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                <button
                  onClick={() => deleteSubmission(selectedSubmission.id)}
                  className="flex items-center justify-center gap-2 text-red-400 hover:text-red-300 text-sm transition-colors sm:justify-start"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete
                </button>
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                  {selectedSubmission.status !== 'responded' && (
                    <button
                      onClick={() => {
                        markAsResponded(selectedSubmission.id);
                        setSelectedSubmission({ ...selectedSubmission, status: 'responded' });
                      }}
                      className="flex items-center justify-center gap-2 bg-green-500/20 hover:bg-green-500/30 text-green-400 px-4 py-2 rounded text-sm transition-colors"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      Mark Responded
                    </button>
                  )}
                  <a
                    href={`mailto:${selectedSubmission.email}?subject=Re: ${selectedSubmission.type === 'quote' ? 'Quote Request' : 'Contact Form'} - ${selectedSubmission.name}`}
                    className="flex items-center justify-center gap-2 bg-[#c9a84c] hover:bg-[#e2c97e] text-[#0c0b0a] px-4 py-2 rounded text-sm font-medium transition-colors"
                  >
                    <Mail className="w-4 h-4" />
                    Reply
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
