import { useState, useEffect } from 'react';
import { contentService } from '../lib/contentService';

export function useContentImage(contentKey: string, fallback: string) {
  const [imageUrl, setImageUrl] = useState(fallback);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadImage = async () => {
      try {
        const content = await contentService.getContent(contentKey);
        if (content && !Array.isArray(content) && content.value) {
          setImageUrl(content.value);
        }
      } catch (error) {
        console.error('Error loading image:', error);
      } finally {
        setLoading(false);
      }
    };

    loadImage();
  }, [contentKey, fallback]);

  return { imageUrl, loading };
}
