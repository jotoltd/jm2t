import React, { useState, useRef } from 'react';
import { Edit, Check, X, Upload } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { supabaseAdmin } from '../lib/supabase';

interface SimpleEditableImageProps {
  contentKey: string;
  fallback: string;
  alt: string;
  className?: string;
  isAdmin?: boolean;
}

export default function SimpleEditableImage({ 
  contentKey, 
  fallback, 
  alt,
  className = '', 
  isAdmin = false
}: SimpleEditableImageProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [imageUrl, setImageUrl] = useState(fallback);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Skip hero image
  const isHeroImage = contentKey === 'hero_image';

  const handleFileUpload = async (file: File) => {
    if (!file || !file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }

    setLoading(true);
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

      setImageUrl(publicUrl);
      
      // Save to database
      const { error: updateError } = await supabaseAdmin
        .from('website_content')
        .update({ value: publicUrl, updated_at: new Date().toISOString() })
        .eq('key', contentKey);

      if (updateError) throw updateError;
      
      alert('Image updated successfully!');
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Error uploading image');
    } finally {
      setLoading(false);
    }
  };

  const handleUrlChange = async (url: string) => {
    setImageUrl(url);
    
    // Save to database
    try {
      const { error } = await supabaseAdmin
        .from('website_content')
        .update({ value: url, updated_at: new Date().toISOString() })
        .eq('key', contentKey);

      if (error) throw error;
      
      alert('Image updated successfully!');
    } catch (error) {
      console.error('Error updating image:', error);
      alert('Error updating image');
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileUpload(e.target.files[0]);
    }
  };

  // For non-admin, just show the image
  if (!isAdmin) {
    return <img src={imageUrl} alt={alt} className={className} />;
  }

  // For hero image, only allow URL changes
  if (isHeroImage) {
    return (
      <div className="relative group">
        <img src={imageUrl} alt={alt} className={className} />
        <button
          onClick={() => setIsEditing(true)}
          className="absolute top-2 right-2 bg-blue-500 text-white p-2 rounded opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <Edit className="w-4 h-4" />
        </button>
        
        <AnimatePresence>
          {isEditing && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
              onClick={() => setIsEditing(false)}
            >
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.9 }}
                className="bg-white p-6 rounded-lg max-w-md w-full mx-4"
                onClick={(e) => e.stopPropagation()}
              >
                <h3 className="text-lg font-semibold mb-4">Edit Hero Image URL</h3>
                <input
                  type="url"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  className="w-full p-2 border rounded mb-4"
                  placeholder="Enter image URL"
                />
                <div className="flex gap-2">
                  <button
                    onClick={() => handleUrlChange(imageUrl)}
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                  >
                    <Check className="w-4 h-4 inline mr-1" />
                    Save
                  </button>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                  >
                    <X className="w-4 h-4 inline mr-1" />
                    Cancel
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  // For other images, allow both upload and URL changes
  return (
    <div className="relative group">
      <img src={imageUrl} alt={alt} className={className} />
      <button
        onClick={() => setIsEditing(true)}
        className="absolute top-2 right-2 bg-blue-500 text-white p-2 rounded opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <Edit className="w-4 h-4" />
      </button>
      
      <AnimatePresence>
        {isEditing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            onClick={() => setIsEditing(false)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="bg-white p-6 rounded-lg max-w-md w-full mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-lg font-semibold mb-4">Edit Image</h3>
              
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Upload New Image:</label>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="hidden"
                />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  disabled={loading}
                  className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
                >
                  <Upload className="w-4 h-4 inline mr-1" />
                  {loading ? 'Uploading...' : 'Choose File'}
                </button>
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Or Enter URL:</label>
                <input
                  type="url"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  className="w-full p-2 border rounded"
                  placeholder="Enter image URL"
                />
              </div>
              
              <div className="flex gap-2">
                <button
                  onClick={() => handleUrlChange(imageUrl)}
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                >
                  <Check className="w-4 h-4 inline mr-1" />
                  Save
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  <X className="w-4 h-4 inline mr-1" />
                  Cancel
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
