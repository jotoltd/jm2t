import { supabase, supabaseAdmin } from './supabase';

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
  private readonly TIMEOUT = 30000; // 30 seconds timeout
  private isOnline = true;

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

  private async withTimeout<T>(promise: Promise<T>, timeoutMs: number = this.TIMEOUT): Promise<T> {
    const timeoutPromise = new Promise<never>((_, reject) => {
      setTimeout(() => reject(new Error('Operation timed out')), timeoutMs);
    });

    return Promise.race([promise, timeoutPromise]);
  }

  private async refreshCache() {
    if (!this.isOnline) return;

    try {
      console.log('ContentService: Starting refreshCache...');
      
      // Fetch content without timeout for now
      const { data: contentData, error: contentError } = await supabase
        .from('website_content')
        .select('*')
        .order('order_index', { ascending: true });

      console.log('ContentService: Content fetch result:', { contentData: contentData?.length, contentError });

      if (contentError) throw contentError;

      // Fetch services without timeout for now
      const { data: servicesData, error: servicesError } = await supabase
        .from('services')
        .select('*')
        .order('order_index', { ascending: true });

      console.log('ContentService: Services fetch result:', { servicesData: servicesData?.length, servicesError });

      if (servicesError) throw servicesError;

      // Update content cache
      this.contentCache.clear();
      contentData?.forEach(item => {
        this.contentCache.set(item.key, item);
      });

      // Update services cache
      this.servicesCache = servicesData || [];

      this.lastFetch = Date.now();
      this.isOnline = true;
    } catch (error) {
      console.error('Error refreshing content cache:', error);
      this.isOnline = false;
      
      // Set offline mode and use fallback data
      this.setFallbackData();
    }
  }

  private setFallbackData() {
    // Set fallback content if cache is empty
    if (this.contentCache.size === 0) {
      const fallbackContent = [
        { id: '1', key: 'hero_title_line1', value: 'Tiling crafted to a', type: 'text' as const, description: 'Hero title line 1', category: 'hero', section: 'main', order_index: 1, created_at: '', updated_at: '' },
        { id: '2', key: 'hero_title_line2', value: 'flawless', type: 'text' as const, description: 'Hero title line 2 (italic)', category: 'hero', section: 'main', order_index: 2, created_at: '', updated_at: '' },
        { id: '3', key: 'hero_title_line3', value: 'finish.', type: 'text' as const, description: 'Hero title line 3', category: 'hero', section: 'main', order_index: 3, created_at: '', updated_at: '' },
        { id: '4', key: 'hero_subtitle', value: 'Expert tiling services across Surrey & West Sussex', type: 'text' as const, description: 'Hero subtitle', category: 'hero', section: 'main', order_index: 4, created_at: '', updated_at: '' },
        { id: '5', key: 'hero_cta_text', value: 'Get Your Free Quote', type: 'text' as const, description: 'Hero CTA button text', category: 'hero', section: 'main', order_index: 5, created_at: '', updated_at: '' },
        { id: '6', key: 'hero_cta_link', value: '/quote', type: 'text' as const, description: 'Hero CTA button link', category: 'hero', section: 'main', order_index: 6, created_at: '', updated_at: '' },
        { id: '7', key: 'hero_image', value: '/images/hero.jpeg', type: 'image' as const, description: 'Hero background image', category: 'hero', section: 'main', order_index: 7, created_at: '', updated_at: '' },
        { id: '8', key: 'phone', value: '07738 427208', type: 'text' as const, description: 'Contact phone number', category: 'contact', section: 'main', order_index: 1, created_at: '', updated_at: '' },
        { id: '9', key: 'email', value: 'enquiries@jm2tilingco.com', type: 'text' as const, description: 'Contact email', category: 'contact', section: 'main', order_index: 2, created_at: '', updated_at: '' },
      ];

      fallbackContent.forEach(item => {
        this.contentCache.set(item.key, item);
      });
    }

    // Set fallback services if cache is empty
    if (this.servicesCache.length === 0) {
      this.servicesCache = [
        {
          id: '1',
          title: 'Floor Tiling',
          price: '£80–95 / m²',
          description: 'Porcelain, ceramic and natural stone floors for homes and commercial spaces.',
          bullets: ['Herringbone & large-format', 'Residential & commercial', 'Built to last decades'],
          href: '/floor-tiling',
          image_url: '/images/luxe_kitchen02_floor_tiling.jpg',
          icon_name: 'Grid3X3',
          featured: true,
          order_index: 1,
          created_at: '',
          updated_at: ''
        }
      ];
    }
  }

  async updateContent(id: string, updates: Partial<ContentItem>): Promise<boolean> {
    try {
      const { error } = await supabaseAdmin
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
    if (!this.isOnline) {
      // Update local cache when offline
      const cachedItem = this.contentCache.get(key);
      if (cachedItem) {
        cachedItem.value = value;
        this.contentCache.set(key, cachedItem);
      }
      return false; // Indicate offline mode
    }

    try {
      const { error } = await supabaseAdmin
        .from('website_content')
        .update({ value, updated_at: new Date().toISOString() })
        .eq('key', key);

      if (error) throw error;

      // Update local cache immediately
      const cachedItem = this.contentCache.get(key);
      if (cachedItem) {
        cachedItem.value = value;
        cachedItem.updated_at = new Date().toISOString();
        this.contentCache.set(key, cachedItem);
      }

      return true;
    } catch (error) {
      console.error('Error updating content by key:', error);
      this.isOnline = false;
      
      // Still update local cache as fallback
      const cachedItem = this.contentCache.get(key);
      if (cachedItem) {
        cachedItem.value = value;
        this.contentCache.set(key, cachedItem);
      }
      
      return false;
    }
  }

  async createContent(content: Omit<ContentItem, 'id' | 'created_at' | 'updated_at'>): Promise<ContentItem | null> {
    try {
      const { data, error } = await supabaseAdmin
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
      const { error } = await supabaseAdmin
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
      const { error } = await supabaseAdmin
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
      const { data, error } = await supabaseAdmin
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
      const { error } = await supabaseAdmin
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
