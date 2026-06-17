import { supabase } from './supabase';

export interface ContentItem {
  id: string;
  key: string;
  value: string;
  type: 'text' | 'textarea' | 'image';
  description: string;
  category: string;
  section: string;
  order_index: number;
  created_at: string;
  updated_at: string;
}

export interface Service {
  id: string;
  title: string;
  price: string;
  description: string;
  bullets: string[];
  href: string;
  image_url: string;
  icon_name: string;
  featured: boolean;
  order_index: number;
  created_at: string;
  updated_at: string;
}

class ContentService {
  private contentCache: Map<string, ContentItem> = new Map();
  private servicesCache: Service[] = [];
  private lastFetch: number = 0;
  private readonly CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

  async getContent(key?: string, category?: string, section?: string): Promise<ContentItem[] | ContentItem | null> {
    const now = Date.now();
    
    // Check if cache is valid
    if (now - this.lastFetch > this.CACHE_DURATION) {
      await this.refreshCache();
    }

    if (key) {
      const item = this.contentCache.get(key);
      return item || null;
    }

    let content = Array.from(this.contentCache.values());
    
    if (category) {
      content = content.filter(item => item.category === category);
    }
    
    if (section) {
      content = content.filter(item => item.section === section);
    }

    // Sort by order_index
    content.sort((a, b) => a.order_index - b.order_index);

    return content;
  }

  async getServices(featuredOnly: boolean = false): Promise<Service[]> {
    const now = Date.now();
    
    // Check if cache is valid
    if (now - this.lastFetch > this.CACHE_DURATION) {
      await this.refreshCache();
    }

    let services = [...this.servicesCache];
    
    if (featuredOnly) {
      services = services.filter(service => service.featured);
    }

    // Sort by order_index
    services.sort((a, b) => a.order_index - b.order_index);

    return services;
  }

  private async refreshCache() {
    try {
      // Fetch content
      const { data: contentData, error: contentError } = await supabase
        .from('website_content')
        .select('*')
        .order('order_index', { ascending: true });

      if (contentError) throw contentError;

      // Fetch services
      const { data: servicesData, error: servicesError } = await supabase
        .from('services')
        .select('*')
        .order('order_index', { ascending: true });

      if (servicesError) throw servicesError;

      // Update content cache
      this.contentCache.clear();
      contentData?.forEach(item => {
        this.contentCache.set(item.key, item);
      });

      // Update services cache
      this.servicesCache = servicesData || [];

      this.lastFetch = Date.now();
    } catch (error) {
      console.error('Error refreshing content cache:', error);
    }
  }

  async updateContent(id: string, updates: Partial<ContentItem>): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('website_content')
        .update(updates)
        .eq('id', id);

      if (error) throw error;

      // Refresh cache
      await this.refreshCache();
      return true;
    } catch (error) {
      console.error('Error updating content:', error);
      return false;
    }
  }

  async updateContentByKey(key: string, value: string): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('website_content')
        .update({ value, updated_at: new Date().toISOString() })
        .eq('key', key);

      if (error) throw error;

      // Refresh cache
      await this.refreshCache();
      return true;
    } catch (error) {
      console.error('Error updating content by key:', error);
      return false;
    }
  }

  async createContent(content: Omit<ContentItem, 'id' | 'created_at' | 'updated_at'>): Promise<ContentItem | null> {
    try {
      const { data, error } = await supabase
        .from('website_content')
        .insert(content)
        .select()
        .single();

      if (error) throw error;

      // Refresh cache
      await this.refreshCache();
      return data;
    } catch (error) {
      console.error('Error creating content:', error);
      return null;
    }
  }

  async deleteContent(id: string): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('website_content')
        .delete()
        .eq('id', id);

      if (error) throw error;

      // Refresh cache
      await this.refreshCache();
      return true;
    } catch (error) {
      console.error('Error deleting content:', error);
      return false;
    }
  }

  // Service management methods
  async updateService(id: string, updates: Partial<Service>): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('services')
        .update(updates)
        .eq('id', id);

      if (error) throw error;

      // Refresh cache
      await this.refreshCache();
      return true;
    } catch (error) {
      console.error('Error updating service:', error);
      return false;
    }
  }

  async createService(service: Omit<Service, 'id' | 'created_at' | 'updated_at'>): Promise<Service | null> {
    try {
      const { data, error } = await supabase
        .from('services')
        .insert(service)
        .select()
        .single();

      if (error) throw error;

      // Refresh cache
      await this.refreshCache();
      return data;
    } catch (error) {
      console.error('Error creating service:', error);
      return null;
    }
  }

  async deleteService(id: string): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('services')
        .delete()
        .eq('id', id);

      if (error) throw error;

      // Refresh cache
      await this.refreshCache();
      return true;
    } catch (error) {
      console.error('Error deleting service:', error);
      return false;
    }
  }
}

export const contentService = new ContentService();
