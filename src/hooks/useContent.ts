import { useState, useEffect } from 'react';
import { contentService, ContentItem, Service } from '../lib/contentService';

export function useContent(key?: string, category?: string, section?: string) {
  const [content, setContent] = useState<ContentItem[] | ContentItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        setLoading(true);
        setError(null);
        const result = await contentService.getContent(key, category, section);
        setContent(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch content');
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, [key, category, section]);

  return { content, loading, error };
}

export function useServices(featuredOnly: boolean = false) {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        setError(null);
        const result = await contentService.getServices(featuredOnly);
        setServices(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch services');
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, [featuredOnly]);

  return { services, loading, error };
}

// Helper hook for getting a single content value
export function useContentValue(key: string, fallback: string = '') {
  const { content, loading, error } = useContent(key);
  
  if (loading) return fallback;
  if (error || !content) return fallback;
  
  // If content is an array (multiple items), return the first value
  if (Array.isArray(content)) {
    return content.length > 0 ? content[0].value : fallback;
  }
  
  // If content is a single item, return its value
  return content.value || fallback;
}
