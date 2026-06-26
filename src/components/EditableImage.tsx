import React, { useState, useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Edit, Check, X, Upload } from 'lucide-react';
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
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Skip hero image from upload functionality
  const isHeroImage = contentKey === 'hero_image';

  // Debug: Log admin state
  React.useEffect(() => {
    console.log(`EditableImage (${contentKey}) - isAdmin:`, isAdmin);
  }, [isAdmin, contentKey]);

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

  const modal = isEditing ? ReactDOM.createPortal(
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-[200] px-4"
        onClick={handleCancel}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          className="bg-[#111110] border border-white/10 p-6 w-full max-w-md relative"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-display text-xl text-[#f5f0e8]">Edit Image</h3>
            <button onClick={handleCancel} className="text-white/30 hover:text-white/70 transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          {!isHeroImage && (
            <div className="mb-4">
              <label className="block text-[10px] font-mono uppercase tracking-[0.25em] text-[#6b6560] mb-2">Upload Image</label>
              <div
                className={`border-2 border-dashed p-4 text-center transition-colors cursor-pointer ${
                  dragActive ? 'border-[#c9a84c] bg-[#c9a84c]/10' : 'border-white/20 hover:border-white/40'
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload className="w-6 h-6 text-white/30 mx-auto mb-2" />
                <p className="text-sm text-white/50 mb-2">Drag & drop or click to browse</p>
                <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileSelect} className="hidden" />
                {uploading && <p className="text-[#c9a84c] text-xs mt-1">Uploading...</p>}
              </div>
            </div>
          )}

          <div className="mb-4">
            <label className="block text-[10px] font-mono uppercase tracking-[0.25em] text-[#6b6560] mb-2">
              {isHeroImage ? 'Image URL' : 'Or paste URL'}
            </label>
            <input
              ref={inputRef}
              type="url"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full bg-[#0c0b0a] border-b-2 border-white/20 text-[#f5f0e8] placeholder-[#3a3730] px-0 py-2.5 focus:outline-none focus:border-[#c9a84c] transition-all text-sm"
              placeholder="https://example.com/image.jpg"
              disabled={loading || uploading}
            />
          </div>

          {value && (
            <div className="mb-4 border border-white/10 p-2 bg-[#0c0b0a]">
              <img
                src={value}
                alt="Preview"
                className="max-w-full h-32 object-cover w-full"
                onError={(e) => { e.currentTarget.style.display = 'none'; }}
              />
            </div>
          )}

          <div className="flex gap-3">
            <button
              onClick={handleSave}
              disabled={loading || uploading}
              className="flex-1 flex items-center justify-center gap-2 bg-[#c9a84c] hover:bg-[#e2c97e] disabled:opacity-50 text-[#0c0b0a] text-xs font-bold uppercase tracking-[0.2em] py-3 transition-all"
            >
              <Check className="w-4 h-4" />
              {loading ? 'Saving...' : 'Save'}
            </button>
            <button
              onClick={handleCancel}
              disabled={loading || uploading}
              className="flex items-center justify-center gap-2 border border-white/20 hover:border-white/40 text-white/50 hover:text-white/80 px-4 py-3 text-xs uppercase tracking-widest transition-all"
            >
              Cancel
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>,
    document.body
  ) : null;

  if (!isAdmin) {
    return <img src={value} alt={alt} className={className} />;
  }

  return (
    <>
      <div
        ref={containerRef}
        className="relative block w-full group"
      >
        <img src={value} alt={alt} className={className} />
        <button
          className="absolute top-2 right-2 bg-[#c9a84c] text-[#0c0b0a] p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10"
          onClick={(e) => { e.preventDefault(); e.stopPropagation(); setIsEditing(true); }}
        >
          <Edit className="w-4 h-4" />
        </button>
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
      </div>
      {modal}
    </>
  );
}
