import React, { useState, useRef, useEffect } from 'react';
import { Edit, Check, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { contentService } from '../lib/contentService';

interface EditableTextProps {
  contentKey: string;
  fallback: string;
  className?: string;
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div';
  isAdmin?: boolean;
  onSave?: (value: string) => void;
}

export default function EditableText({ 
  contentKey, 
  fallback, 
  className = '', 
  tag = 'span',
  isAdmin = false,
  onSave
}: EditableTextProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(fallback);
  const [originalValue, setOriginalValue] = useState(fallback);
  const [loading, setLoading] = useState(false);
  const [showEditIcon, setShowEditIcon] = useState(false);
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Load content from Supabase
  useEffect(() => {
    const loadContent = async () => {
      try {
        const content = await contentService.getContent(contentKey);
        if (content && !Array.isArray(content)) {
          setValue(content.value);
          setOriginalValue(content.value);
        }
      } catch (error) {
        console.error('Error loading content:', error);
      }
    };
    loadContent();
  }, [contentKey]);

  // Focus input when editing starts
  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const handleSave = async () => {
    if (value === originalValue) {
      setIsEditing(false);
      return;
    }

    setLoading(true);
    try {
      const success = await contentService.updateContentByKey(contentKey, value);
      if (success) {
        setOriginalValue(value);
        onSave?.(value);
        setIsEditing(false);
      } else {
        // Still update locally even if offline/failed
        setOriginalValue(value);
        onSave?.(value);
        setIsEditing(false);
        // Show subtle notification that it's saved locally
        console.log('Content saved locally (offline mode)');
      }
    } catch (error) {
      console.error('Error saving content:', error);
      // Still accept the change locally
      setOriginalValue(value);
      onSave?.(value);
      setIsEditing(false);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setValue(originalValue);
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSave();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  const Tag = tag;

  if (!isAdmin) {
    return <Tag className={className}>{value}</Tag>;
  }

  return (
    <div 
      ref={containerRef}
      className="relative inline-block group"
      onMouseEnter={() => !isEditing && setShowEditIcon(true)}
      onMouseLeave={() => !isEditing && setShowEditIcon(false)}
    >
      <AnimatePresence mode="wait">
        {isEditing ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="inline-block w-full"
          >
            {tag === 'p' || tag === 'div' ? (
              <textarea
                ref={inputRef as React.RefObject<HTMLTextAreaElement>}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onKeyDown={handleKeyDown}
                className="w-full bg-white text-black px-3 py-2 rounded border-2 border-cyan-500 focus:outline-none focus:border-cyan-600 resize-none"
                rows={3}
                disabled={loading}
              />
            ) : (
              <input
                ref={inputRef as React.RefObject<HTMLInputElement>}
                type="text"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onKeyDown={handleKeyDown}
                className="w-full bg-white text-black px-3 py-2 rounded border-2 border-cyan-500 focus:outline-none focus:border-cyan-600"
                disabled={loading}
              />
            )}
            
            <div className="flex gap-2 mt-2">
              <button
                onClick={handleSave}
                disabled={loading}
                className="flex items-center gap-1 bg-green-500 hover:bg-green-600 disabled:bg-gray-400 text-white px-3 py-1 rounded text-sm transition-colors"
              >
                <Check className="w-4 h-4" />
                Save
              </button>
              <button
                onClick={handleCancel}
                disabled={loading}
                className="flex items-center gap-1 bg-red-500 hover:bg-red-600 disabled:bg-gray-400 text-white px-3 py-1 rounded text-sm transition-colors"
              >
                <X className="w-4 h-4" />
                Cancel
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="inline-block"
          >
            <Tag 
              className={`${className} cursor-text hover:bg-cyan-500/10 px-1 rounded transition-colors`}
              onClick={() => setIsEditing(true)}
            >
              {value}
            </Tag>
            
            {/* Edit icon */}
            <AnimatePresence>
              {showEditIcon && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="absolute -top-2 -right-2 bg-cyan-500 text-white p-1 rounded-full shadow-lg cursor-pointer"
                  onClick={() => setIsEditing(true)}
                >
                  <Edit className="w-3 h-3" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
