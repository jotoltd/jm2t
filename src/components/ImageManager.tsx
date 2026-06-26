import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Upload, X, Check, Image as ImageIcon, RefreshCw, AlertCircle, Grid3X3, FolderOpen, Trash2 } from 'lucide-react';
import { contentService, ContentItem, Service } from '../lib/contentService';
import { supabaseAdmin } from '../lib/supabase';

interface ImageItem extends ContentItem {
  sectionLabel: string;
  isService?: boolean;
  serviceId?: string;
  isStatic?: boolean;
}

// Initial available images in the public/images folder
const initialAvailableImages = [
  { path: '/images/hero.jpeg', name: 'Hero' },
  { path: '/images/logo_icon.png', name: 'Logo Icon' },
  { path: '/images/new_logo_trans.png', name: 'Full Logo' },
  { path: '/images/bathroom_tiling_2.jpeg', name: 'Bathroom Tiling' },
  { path: '/images/BATHROOM_TILING_WHAT_WE_DO.png', name: 'Bathroom What We Do' },
  { path: '/images/BATHROOM_TILING_SERVICES_LEFT.png', name: 'Bathroom Services Left' },
  { path: '/images/luxe_apartment_01.jpg', name: 'Luxe Apt 1' },
  { path: '/images/luxe_apartment_02.jpg', name: 'Luxe Apt 2' },
  { path: '/images/luxe_apartment_03.jpg', name: 'Luxe Apt 3' },
  { path: '/images/luxe_apartment_04.jpg', name: 'Luxe Apt 4' },
  { path: '/images/luxe_kitchen01.jpg', name: 'Kitchen 1' },
  { path: '/images/luxe_kitchen02_floor_tiling.jpg', name: 'Kitchen Floor' },
  { path: '/images/luxe_kitchen03.jpg', name: 'Kitchen 3' },
  { path: '/images/luxe_kitchen04.jpg', name: 'Kitchen 4' },
  { path: '/images/tiled_porch_before.jpeg', name: 'Porch Before' },
  { path: '/images/tiled_porch_during.jpeg', name: 'Porch During' },
  { path: '/images/tiled_porch_after.jpeg', name: 'Porch After' },
  { path: '/images/wall_tiling2.jpeg', name: 'Wall Tiling 2' },
  { path: '/images/wall_tiling_3.jpeg', name: 'Wall Tiling 3' },
  { path: '/images/wall_tiling_4.jpeg', name: 'Wall Tiling 4' },
  { path: '/images/wall_tiling_6.jpeg', name: 'Wall Tiling 6' },
  { path: '/images/WALL_TILING_WHAT_WE_DO.jpeg', name: 'Wall Tiling What We Do' },
  { path: '/images/wall_tiling_7.jpeg', name: 'Wall Tiling 7' },
  { path: '/images/regrouting_and_repair.jpeg', name: 'Regrouting & Repair' },
];

export default function ImageManager() {
  const [images, setImages] = useState<ImageItem[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [uploading, setUploading] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showGallery, setShowGallery] = useState(false);
  const [galleryForImage, setGalleryForImage] = useState<ImageItem | null>(null);
  const [availableImages, setAvailableImages] = useState(initialAvailableImages);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Page/section labels for organization
  const sectionLabels: { [key: string]: string } = {
    hero: 'Homepage - Hero',
    services: 'Homepage - Services',
    pricing: 'Homepage - Pricing',
    showcase: 'Homepage - Projects Showcase',
    projects: 'Projects Page',
    'floor-tiling': 'Floor Tiling Page',
    'bathroom-tiling': 'Bathroom Tiling Page',
    'wall-tiling': 'Wall Tiling Page',
    regrouting: 'Regrouting Page',
    process: 'Process Page',
    contact: 'Contact Page',
    quote: 'Quote Page',
    about: 'About',
    testimonials: 'Testimonials',
    locations: 'Locations',
    footer: 'Footer',
    global: 'Global Images'
  };

  useEffect(() => {
    loadImages();
  }, []);

  // Static page images that can be managed
  const staticPageImages = [
    // Logos
    { key: 'logo_icon', value: '/images/logo_icon.png', description: 'Header Logo (Icon)', category: 'global' },
    { key: 'logo_full', value: '/images/new_logo_trans.png', description: 'Full Logo (Transparent)', category: 'global' },
    // Service pages
    { key: 'floor_tiling_image_1', value: '/images/luxe_kitchen01.jpg', description: 'Floor Tiling - Image 1', category: 'floor-tiling' },
    { key: 'floor_tiling_image_2', value: '/images/luxe_kitchen02_floor_tiling.jpg', description: 'Floor Tiling - Image 2', category: 'floor-tiling' },
    { key: 'bathroom_tiling_image_1', value: '/images/BATHROOM_TILING_SERVICES_LEFT.png', description: 'Bathroom Tiling - Image 1', category: 'bathroom-tiling' },
    { key: 'bathroom_tiling_image_2', value: '/images/bathroom_tiling_2.jpeg', description: 'Bathroom Tiling - Image 2', category: 'bathroom-tiling' },
    { key: 'wall_tiling_image_1', value: '/images/WALL_TILING_SERVICES_LEFT_IMAGE.jpeg', description: 'Wall Tiling - Image 1', category: 'wall-tiling' },
    { key: 'wall_tiling_image_2', value: '/images/wall_tiling_3.jpeg', description: 'Wall Tiling - Image 2', category: 'wall-tiling' },
    { key: 'regrouting_image_1', value: '/images/regrouting_service.jpg', description: 'Regrouting - Image 1', category: 'regrouting' },
    { key: 'regrouting_image_2', value: '/images/regrouting_service_right.jpeg', description: 'Regrouting - Image 2', category: 'regrouting' },
    // Projects page
    { key: 'project_luxe_apt_1', value: '/images/luxe_apartment_01.jpg', description: 'Luxe Apartment - Image 1', category: 'projects' },
    { key: 'project_luxe_apt_2', value: '/images/luxe_apartment_02.jpg', description: 'Luxe Apartment - Image 2', category: 'projects' },
    { key: 'project_luxe_apt_3', value: '/images/luxe_apartment_03.jpg', description: 'Luxe Apartment - Image 3', category: 'projects' },
    { key: 'project_luxe_apt_4', value: '/images/luxe_apartment_04.jpg', description: 'Luxe Apartment - Image 4', category: 'projects' },
    { key: 'project_luxe_kitchen_1', value: '/images/luxe_kitchen01.jpg', description: 'Luxury Kitchen - Image 1', category: 'projects' },
    { key: 'project_luxe_kitchen_2', value: '/images/luxe_kitchen02_floor_tiling.jpg', description: 'Luxury Kitchen - Image 2', category: 'projects' },
    { key: 'project_luxe_kitchen_3', value: '/images/luxe_kitchen03.jpg', description: 'Luxury Kitchen - Image 3', category: 'projects' },
    { key: 'project_luxe_kitchen_4', value: '/images/luxe_kitchen04.jpg', description: 'Luxury Kitchen - Image 4', category: 'projects' },
    // Homepage Projects Showcase
    { key: 'showcase_bathroom', value: '/images/regrouting_and_repair.jpeg', description: 'Showcase - Crawley Bathroom', category: 'showcase' },
    { key: 'showcase_kitchen', value: '/images/luxe_kitchen02_floor_tiling.jpg', description: 'Showcase - Ifield Kitchen', category: 'showcase' },
    { key: 'showcase_wetroom', value: '/images/bathroom_tiling_2.jpeg', description: 'Showcase - Reigate Wet Room', category: 'showcase' },
    { key: 'showcase_feature', value: '/images/wall_tiling2.jpeg', description: 'Showcase - Redhill Feature Wall', category: 'showcase' },
    // Process Page
    { key: 'process_before', value: '/images/tiled_porch_before.jpeg', description: 'Process - Before', category: 'process' },
    { key: 'process_during', value: '/images/tiled_porch_during.jpeg', description: 'Process - During', category: 'process' },
    { key: 'process_after', value: '/images/tiled_porch_after.jpeg', description: 'Process - After', category: 'process' },
  ];

  const loadImages = async () => {
    setLoading(true);
    console.log('ImageManager: Loading images...');
    try {
      // Load content images from database
      const result = await contentService.getContent();
      console.log('ImageManager: Content result:', result);
      const allContent = Array.isArray(result) ? result : [];
      const contentImages = allContent
        .filter(item => item.type === 'image')
        .map(item => ({
          ...item,
          sectionLabel: sectionLabels[item.category] || item.category || 'Other'
        }));
      console.log('ImageManager: Content images from DB:', contentImages.length);
      
      // Create map of existing keys
      const existingKeys = new Set(contentImages.map(img => img.key));
      
      // Add static page images that aren't in database yet
      const staticImages: ImageItem[] = staticPageImages
        .filter(img => !existingKeys.has(img.key))
        .map((img, index) => ({
          id: `static_${img.key}`,
          key: img.key,
          value: img.value,
          type: 'image' as const,
          description: img.description,
          category: img.category,
          section: img.category,
          order_index: 100 + index,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          sectionLabel: sectionLabels[img.category] || img.category,
          isStatic: true
        }));
      console.log('ImageManager: Static page images:', staticImages.length);
      
      // Load services and convert to image items
      const servicesData = await contentService.getServices();
      console.log('ImageManager: Services data:', servicesData);
      setServices(servicesData);
      
      const serviceImages: ImageItem[] = servicesData.map(service => ({
        id: `service_${service.id}`,
        key: `service_${service.id}_image`,
        value: service.image_url,
        type: 'image' as const,
        description: `${service.title} - Service Image`,
        category: 'services',
        section: service.href.replace('/', ''),
        order_index: service.order_index,
        created_at: service.created_at,
        updated_at: service.updated_at,
        sectionLabel: 'Homepage - Services',
        isService: true,
        serviceId: service.id
      }));
      console.log('ImageManager: Service images:', serviceImages.length);
      
      // Combine and sort
      const allImages = [...contentImages, ...staticImages, ...serviceImages].sort((a, b) => {
        const catCompare = a.category.localeCompare(b.category);
        return catCompare !== 0 ? catCompare : (a.order_index - b.order_index);
      });
      
      console.log('ImageManager: Total images:', allImages.length);
      console.log('ImageManager: Grouped:', allImages.reduce((acc, img) => {
        acc[img.sectionLabel] = (acc[img.sectionLabel] || 0) + 1;
        return acc;
      }, {} as Record<string, number>));
      
      setImages(allImages);
    } catch (err) {
      setError('Failed to load images');
      console.error('ImageManager error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (file: File, imageId: string, contentKey: string) => {
    if (!file || !file.type.startsWith('image/')) {
      setError('Please select a valid image file');
      return;
    }

    setUploading(contentKey);
    setError(null);
    
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${contentKey}_${Date.now()}.${fileExt}`;
      
      // Upload to Supabase storage
      const { error: uploadError } = await supabaseAdmin.storage
        .from('service-images')
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: true
        });

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabaseAdmin.storage
        .from('service-images')
        .getPublicUrl(fileName);

      // Update local state
      setImages(images.map(img => 
        img.id === imageId ? { ...img, value: publicUrl } : img
      ));
      
      setPreviewUrl(publicUrl);
    } catch (err) {
      console.error('Upload error:', err);
      setError('Failed to upload image');
    } finally {
      setUploading(null);
    }
  };

  const handleSave = async (image: ImageItem) => {
    setSaving(image.id);
    setError(null);
    
    try {
      let success;
      
      if (image.isService && image.serviceId) {
        // Save to services table
        success = await contentService.updateService(image.serviceId, {
          image_url: image.value,
          updated_at: new Date().toISOString()
        });
      } else if (image.isStatic) {
        // Create new content item in database for static images
        const newContent = await contentService.createContent({
          key: image.key,
          value: image.value,
          type: 'image',
          description: image.description,
          category: image.category,
          section: image.section,
          order_index: image.order_index
        });
        success = !!newContent;
        if (success) {
          // Replace static image with database version
          setImages(images.map(img => 
            img.id === image.id ? { ...newContent!, sectionLabel: image.sectionLabel } : img
          ));
        }
      } else {
        // Save to website_content table
        success = await contentService.updateContent(image.id, {
          value: image.value,
          updated_at: new Date().toISOString()
        });
      }

      if (!success) {
        throw new Error('Failed to save');
      }

      setEditingId(null);
      setPreviewUrl(null);
    } catch (err) {
      console.error('Save error:', err);
      setError('Failed to save changes');
    } finally {
      setSaving(null);
    }
  };

  const handleCancel = (image: ImageItem) => {
    setImages(images.map(img => 
      img.id === image.id ? { ...img, value: img.value } : img
    ));
    setEditingId(null);
    setPreviewUrl(null);
    setError(null);
  };

  const groupedImages: Record<string, ImageItem[]> = images.reduce((acc, img) => {
    const section = img.sectionLabel;
    if (!acc[section]) acc[section] = [];
    acc[section].push(img);
    return acc;
  }, {} as Record<string, ImageItem[]>);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <RefreshCw className="w-8 h-8 text-[#c9a84c] animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {error && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 flex items-center gap-3 text-red-400">
          <AlertCircle className="w-5 h-5" />
          <span>{error}</span>
          <button onClick={() => setError(null)} className="ml-auto">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      <div className="flex items-center justify-between">
        <h2 className="text-lg sm:text-xl font-black text-white uppercase">Image Manager</h2>
        <button
          onClick={loadImages}
          className="flex items-center gap-1.5 sm:gap-2 text-[#c9a84c] hover:text-[#e2c97e] text-xs sm:text-sm"
        >
          <RefreshCw className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          Refresh
        </button>
      </div>

      {Object.entries(groupedImages).map(([section, sectionImages]) => (
        <div key={section} className="bg-neutral-900/50 border border-white/10 rounded-xl overflow-hidden">
          <div className="bg-neutral-800/50 px-3 sm:px-4 py-2.5 sm:py-3 border-b border-white/10">
            <h3 className="text-xs sm:text-sm font-bold text-[#c9a84c] uppercase tracking-wider">{section}</h3>
            <span className="text-[10px] sm:text-xs text-neutral-500">{sectionImages.length} image(s)</span>
          </div>
          
          <div className="p-3 sm:p-4 grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {sectionImages.map((image) => (
              <motion.div
                key={image.id}
                layout
                className={`bg-neutral-950/50 border rounded-lg overflow-hidden ${
                  editingId === image.id ? 'border-[#c9a84c]/50' : 'border-white/5'
                }`}
              >
                {/* Image Preview */}
                <div className="relative aspect-video bg-neutral-900">
                  <img
                    src={previewUrl && editingId === image.id ? previewUrl : image.value}
                    alt={image.description}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/images/placeholder.jpg';
                    }}
                  />
                  
                  {uploading === image.key && (
                    <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
                      <RefreshCw className="w-6 h-6 text-[#c9a84c] animate-spin" />
                    </div>
                  )}
                </div>

                {/* Image Info */}
                <div className="p-3 space-y-2">
                  <div>
                    <p className="text-xs text-neutral-500 font-mono">{image.key}</p>
                    <p className="text-sm text-white">{image.description}</p>
                  </div>

                  {editingId === image.id ? (
                    <div className="space-y-2">
                      <input
                        type="file"
                        ref={fileInputRef}
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          if (e.target.files?.[0]) {
                            handleFileUpload(e.target.files[0], image.id, image.key);
                          }
                        }}
                      />
                      
                      <button
                        onClick={() => fileInputRef.current?.click()}
                        disabled={uploading === image.key}
                        className="w-full flex items-center justify-center gap-2 bg-neutral-800 hover:bg-neutral-700 text-white text-xs py-2 rounded transition-colors"
                      >
                        <Upload className="w-3 h-3" />
                        {uploading === image.key ? 'Uploading...' : 'Upload New'}
                      </button>

                      <button
                        onClick={() => {
                          setGalleryForImage(image);
                          setShowGallery(true);
                        }}
                        className="w-full flex items-center justify-center gap-2 bg-neutral-800/50 hover:bg-neutral-700/50 text-neutral-300 text-xs py-2 rounded transition-colors"
                      >
                        <Grid3X3 className="w-3 h-3" />
                        Choose from Gallery
                      </button>

                      <div className="flex gap-2">
                        <input
                          type="url"
                          value={image.value}
                          onChange={(e) => {
                            setImages(images.map(img => 
                              img.id === image.id ? { ...img, value: e.target.value } : img
                            ));
                            setPreviewUrl(e.target.value);
                          }}
                          placeholder="Or enter image URL..."
                          className="flex-1 bg-neutral-900 border border-white/10 rounded px-2 py-1 text-xs text-white"
                        />
                      </div>

                      <div className="flex gap-2">
                        <button
                          onClick={() => handleSave(image)}
                          disabled={saving === image.id}
                          className="flex-1 flex items-center justify-center gap-1 bg-green-500/20 hover:bg-green-500/30 text-green-400 text-xs py-2 rounded transition-colors"
                        >
                          {saving === image.id ? (
                            <RefreshCw className="w-3 h-3 animate-spin" />
                          ) : (
                            <Check className="w-3 h-3" />
                          )}
                          Save
                        </button>
                        <button
                          onClick={() => handleCancel(image)}
                          className="flex-1 flex items-center justify-center gap-1 bg-red-500/20 hover:bg-red-500/30 text-red-400 text-xs py-2 rounded transition-colors"
                        >
                          <X className="w-3 h-3" />
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <button
                      onClick={() => {
                        setEditingId(image.id);
                        setPreviewUrl(null);
                      }}
                      className="w-full flex items-center justify-center gap-2 bg-[#c9a84c]/20 hover:bg-[#c9a84c]/30 text-[#c9a84c] text-xs py-2 rounded transition-colors"
                    >
                      <ImageIcon className="w-3 h-3" />
                      Change Image
                    </button>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      ))}

      {images.length === 0 && (
        <div className="text-center py-12 text-neutral-500">
          <ImageIcon className="w-12 h-12 mx-auto mb-3 opacity-50" />
          <p>No images found in the database.</p>
          <p className="text-sm mt-1">Images with type=&quot;image&quot; will appear here.</p>
        </div>
      )}

      {/* Gallery Picker Modal */}
      <AnimatePresence>
        {showGallery && galleryForImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setShowGallery(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-neutral-900 border border-white/10 rounded-xl w-full max-w-4xl max-h-[80vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <FolderOpen className="w-5 h-5 text-[#c9a84c]" />
                  <h3 className="text-lg font-bold text-white">Choose from Gallery</h3>
                </div>
                <button
                  onClick={() => setShowGallery(false)}
                  className="text-neutral-400 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Gallery Grid */}
              <div className="p-4 overflow-y-auto max-h-[60vh]">
                <p className="text-neutral-400 text-sm mb-4">
                  Click an image to select it for <span className="text-[#c9a84c]">{galleryForImage.description}</span>
                </p>
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
                  {availableImages.map((img, idx) => (
                    <div
                      key={idx}
                      className="relative aspect-square bg-neutral-800 rounded-lg overflow-hidden group"
                    >
                      <button
                        onClick={() => {
                          setImages(images.map(image => 
                            image.id === galleryForImage.id ? { ...image, value: img.path } : image
                          ));
                          setPreviewUrl(img.path);
                          setShowGallery(false);
                          setGalleryForImage(null);
                        }}
                        className="w-full h-full hover:ring-2 hover:ring-[#c9a84c] transition-all"
                      >
                        <img
                          src={img.path}
                          alt={img.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display = 'none';
                          }}
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all" />
                        <p className="absolute bottom-0 left-0 right-0 bg-black/70 text-white text-[10px] p-1 truncate opacity-0 group-hover:opacity-100 transition-opacity">
                          {img.name}
                        </p>
                      </button>
                      {/* Delete button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (confirm(`Remove "${img.name}" from gallery?`)) {
                            setAvailableImages(availableImages.filter((_, i) => i !== idx));
                          }
                        }}
                        className="absolute top-1 right-1 p-1 bg-red-500/80 hover:bg-red-500 text-white rounded opacity-0 group-hover:opacity-100 transition-opacity"
                        title="Remove from gallery"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Footer */}
              <div className="p-4 border-t border-white/10 bg-neutral-800/50 flex items-center justify-between">
                <p className="text-neutral-500 text-xs">
                  {availableImages.length} images in gallery
                </p>
                <button
                  onClick={() => {
                    if (confirm('Reset gallery to show all images?')) {
                      setAvailableImages(initialAvailableImages);
                    }
                  }}
                  className="text-xs text-[#c9a84c] hover:text-[#e2c97e] transition-colors"
                >
                  Reset Gallery
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
