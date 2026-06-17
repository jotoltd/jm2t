import React, { useState, useRef, useEffect } from 'react';
import { Edit, Check, X, Image as ImageIcon, Upload } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { contentService } from '../lib/contentService';
import { supabaseAdmin } from '../lib/supabase';

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
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Skip hero image from upload functionality
  const isHeroImage = contentKey === 'hero_image';

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
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSave();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  const handleFileUpload = async (file: File) => {
    if (!file || !file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }

    setUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${contentKey}_${Date.now()}.${fileExt}`;
      
      // Upload file to Supabase storage
      const { data, error } = await supabaseAdmin.storage
        .from('service-images')
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: true
        });

      if (error) throw error;

      // Get public URL
      const { data: { publicUrl } } = supabaseAdmin.storage
        .from('service-images')
        .getPublicUrl(fileName);

      setValue(publicUrl);
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Error uploading image');
    } finally {
      setUploading(false);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileUpload(e.target.files[0]);
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
            className="bg-white p-4 rounded-lg shadow-xl border-2 border-cyan-500 max-w-md"
          >
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Edit Image</h3>
            
            {!isHeroImage && (
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Upload New Image:
                </label>
                <div
                  className={`border-2 border-dashed rounded-lg p-4 text-center transition-colors ${
                    dragActive ? 'border-cyan-500 bg-cyan-50' : 'border-gray-300 hover:border-gray-400'
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600 mb-2">
                    Drag & drop an image here, or click to browse
                  </p>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploading}
                    className="px-3 py-1 bg-cyan-500 hover:bg-cyan-600 disabled:bg-gray-400 text-white text-sm rounded transition-colors"
                  >
                    {uploading ? 'Uploading...' : 'Choose File'}
                  </button>
                </div>
              </div>
            )}
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {isHeroImage ? 'Image URL:' : 'Or enter image URL:'}
              </label>
              <input
                ref={inputRef}
                type="url"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onKeyDown={handleKeyDown}
                className="w-full bg-gray-50 text-black px-3 py-2 rounded border border-gray-300 focus:outline-none focus:border-cyan-500"
                placeholder="https://example.com/image.jpg"
                disabled={loading || uploading}
              />
            </div>
            
            {/* Image preview */}
            <div className="mb-4">
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
                disabled={loading || uploading}
                className="flex items-center gap-1 bg-green-500 hover:bg-green-600 disabled:bg-gray-400 text-white px-3 py-1 rounded text-sm transition-colors"
              >
                <Check className="w-4 h-4" />
                Save
              </button>
              <button
                onClick={handleCancel}
                disabled={loading || uploading}
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
