import React, { useState, useRef, useEffect } from 'react';
import { Edit, Check, X, Image as ImageIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { contentService } from '../lib/contentService';

interface EditableImageProps {
  contentKey: string;
  fallback: string;
  alt: string;
  className?: string;
  isAdmin?: boolean;
  onSave?: (value: string) => void;
}

export default function EditableImage({ 
  contentKey, 
  fallback, 
  alt,
  className = '', 
  isAdmin = false,
  onSave
}: EditableImageProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(fallback);
  const [originalValue, setOriginalValue] = useState(fallback);
  const [loading, setLoading] = useState(false);
  const [showEditIcon, setShowEditIcon] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
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
        setValue(originalValue); // Revert on failure
      }
    } catch (error) {
      console.error('Error saving content:', error);
      setValue(originalValue); // Revert on failure
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setValue(originalValue);
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSave();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  if (!isAdmin) {
    return <img src={value} alt={alt} className={className} />;
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
            className="bg-white p-4 rounded-lg shadow-xl border-2 border-cyan-500"
          >
            <div className="mb-3">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Image URL:
              </label>
              <input
                ref={inputRef}
                type="url"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onKeyDown={handleKeyDown}
                className="w-full bg-gray-50 text-black px-3 py-2 rounded border border-gray-300 focus:outline-none focus:border-cyan-500"
                placeholder="https://example.com/image.jpg"
                disabled={loading}
              />
            </div>
            
            {/* Image preview */}
            <div className="mb-3">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Preview:
              </label>
              <div className="border border-gray-300 rounded p-2 bg-gray-50">
                {value ? (
                  <img 
                    src={value} 
                    alt="Preview" 
                    className="max-w-full h-32 object-cover rounded"
                    onError={(e) => {
                      e.currentTarget.src = '';
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                ) : (
                  <div className="flex items-center justify-center h-32 text-gray-400">
                    <ImageIcon className="w-8 h-8" />
                  </div>
                )}
              </div>
            </div>
            
            <div className="flex gap-2">
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
            <div className="relative cursor-pointer group" onClick={() => setIsEditing(true)}>
              <img 
                src={value} 
                alt={alt} 
                className={`${className} hover:opacity-90 transition-opacity`}
              />
              <div className="absolute inset-0 bg-cyan-500/20 opacity-0 group-hover:opacity-100 transition-opacity rounded" />
            </div>
            
            {/* Edit icon */}
            <AnimatePresence>
              {showEditIcon && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="absolute top-2 right-2 bg-cyan-500 text-white p-2 rounded-full shadow-lg cursor-pointer"
                  onClick={() => setIsEditing(true)}
                >
                  <Edit className="w-4 h-4" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
