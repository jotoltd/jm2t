import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Save, LogOut, Edit2, Check, X, Plus, Trash2 } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface ContentItem {
  id: string;
  key: string;
  value: string;
  type: 'text' | 'textarea' | 'image';
  description: string;
}

export default function AdminDashboard() {
  const [content, setContent] = useState<ContentItem[]>([]);
  const [editing, setEditing] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadContent();
  }, []);

  const loadContent = async () => {
    try {
      const { data, error } = await supabase
        .from('website_content')
        .select('*')
        .order('created_at', { ascending: true });

      if (error) throw error;

      if (data && data.length > 0) {
        setContent(data.map(item => ({
          id: item.id,
          key: item.key,
          value: item.value,
          type: item.type,
          description: item.description || ''
        })));
      } else {
        // Initialize with default content if table is empty
        const defaultContent = [
          { key: 'hero_title', value: 'Flawless Tiling, Perfect Finish', type: 'text', description: 'Main hero title' },
          { key: 'hero_subtitle', value: 'Expert tiling services across Surrey & West Sussex', type: 'text', description: 'Hero subtitle' },
          { key: 'phone', value: '07738 427208', type: 'text', description: 'Contact phone number' },
          { key: 'email', value: 'enquiries@jm2tilingco.com', type: 'text', description: 'Contact email' },
          { key: 'about_text', value: 'With over 15 years of experience, JM² Tiling Co delivers premium tiling solutions for residential and commercial properties.', type: 'textarea', description: 'About section text' },
        ];

        const { data: insertedData, error: insertError } = await supabase
          .from('website_content')
          .insert(defaultContent)
          .select();

        if (insertError) throw insertError;

        setContent(insertedData.map(item => ({
          id: item.id,
          key: item.key,
          value: item.value,
          type: item.type,
          description: item.description || ''
        })));
      }
    } catch (error) {
      console.error('Error loading content:', error);
      // Fallback to localStorage if Supabase fails
      const storedContent = localStorage.getItem('websiteContent');
      if (storedContent) {
        setContent(JSON.parse(storedContent));
      }
    } finally {
      setLoading(false);
    }
  };

  const saveContent = async () => {
    setSaving(true);
    try {
      // Save all content to Supabase
      const promises = content.map(item => 
        supabase
          .from('website_content')
          .upsert({
            id: item.id,
            key: item.key,
            value: item.value,
            type: item.type,
            description: item.description
          })
          .select()
      );

      const results = await Promise.all(promises);
      
      // Check if any operations failed
      const hasErrors = results.some(result => result.error);
      if (hasErrors) {
        throw new Error('Some items failed to save');
      }

      // Also save to localStorage as backup
      localStorage.setItem('websiteContent', JSON.stringify(content));
      
      alert('Content saved successfully to Supabase!');
    } catch (error) {
      console.error('Error saving content:', error);
      alert('Error saving content. Changes saved locally as backup.');
      // Fallback to localStorage
      localStorage.setItem('websiteContent', JSON.stringify(content));
    } finally {
      setSaving(false);
    }
  };

  const updateContent = (id: string, value: string) => {
    setContent(content.map(item => 
      item.id === id ? { ...item, value } : item
    ));
  };

  const addContentItem = async () => {
    try {
      const newItem = {
        key: `new_item_${Date.now()}`,
        value: '',
        type: 'text' as const,
        description: 'New content item'
      };

      const { data, error } = await supabase
        .from('website_content')
        .insert(newItem)
        .select()
        .single();

      if (error) throw error;

      setContent([...content, {
        id: data.id,
        key: data.key,
        value: data.value,
        type: data.type,
        description: data.description || ''
      }]);
    } catch (error) {
      console.error('Error adding content:', error);
      // Fallback to local state
      const newItem: ContentItem = {
        id: Date.now().toString(),
        key: `new_item_${Date.now()}`,
        value: '',
        type: 'text',
        description: 'New content item'
      };
      setContent([...content, newItem]);
    }
  };

  const deleteContentItem = async (id: string) => {
    try {
      const { error } = await supabase
        .from('website_content')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setContent(content.filter(item => item.id !== id));
    } catch (error) {
      console.error('Error deleting content:', error);
      // Still remove from local state even if Supabase fails
      setContent(content.filter(item => item.id !== id));
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminLoggedIn');
    localStorage.removeItem('adminLoginTime');
    window.location.reload();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#09090b] flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#09090b]">
      {/* Header */}
      <div className="bg-neutral-900/50 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-black text-white uppercase">Admin Dashboard</h1>
              <p className="text-neutral-500 text-sm">JM² Tiling Co - Content Management</p>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={saveContent}
                disabled={saving}
                className="bg-cyan-500 hover:bg-cyan-400 disabled:bg-neutral-700 text-black font-black uppercase tracking-[0.2em] px-4 py-2 text-sm transition-all duration-300 flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                {saving ? 'Saving...' : 'Save All'}
              </button>
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-400 text-white font-black uppercase tracking-[0.2em] px-4 py-2 text-sm transition-all duration-300 flex items-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Content Editor */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        <div className="bg-neutral-900/50 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-black text-white uppercase">Website Content</h2>
            <button
              onClick={addContentItem}
              className="bg-green-500 hover:bg-green-400 text-black font-black uppercase tracking-[0.2em] px-3 py-1 text-xs transition-all duration-300 flex items-center gap-1"
            >
              <Plus className="w-3 h-3" />
              Add Item
            </button>
          </div>

          <div className="space-y-6">
            {content.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-neutral-950/50 border border-white/5 rounded-lg p-4"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <input
                        type="text"
                        value={item.key}
                        onChange={(e) => setContent(content.map(c => 
                          c.id === item.id ? { ...c, key: e.target.value } : c
                        ))}
                        className="bg-transparent text-cyan-400 font-mono text-xs uppercase tracking-[0.2em] border-none outline-none"
                        placeholder="Content key"
                      />
                      <select
                        value={item.type}
                        onChange={(e) => setContent(content.map(c => 
                          c.id === item.id ? { ...c, type: e.target.value as 'text' | 'textarea' | 'image' } : c
                        ))}
                        className="bg-neutral-800 text-white text-xs px-2 py-1 rounded border border-white/10"
                      >
                        <option value="text">Text</option>
                        <option value="textarea">Textarea</option>
                        <option value="image">Image URL</option>
                      </select>
                    </div>
                    <p className="text-neutral-500 text-xs">{item.description}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    {editing === item.id ? (
                      <button
                        onClick={() => setEditing(null)}
                        className="text-green-500 hover:text-green-400 transition-colors"
                      >
                        <Check className="w-4 h-4" />
                      </button>
                    ) : (
                      <button
                        onClick={() => setEditing(item.id)}
                        className="text-cyan-500 hover:text-cyan-400 transition-colors"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                    )}
                    <button
                      onClick={() => deleteContentItem(item.id)}
                      className="text-red-500 hover:text-red-400 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div>
                  {item.type === 'textarea' ? (
                    <textarea
                      value={item.value}
                      onChange={(e) => updateContent(item.id, e.target.value)}
                      onFocus={() => setEditing(item.id)}
                      className="w-full bg-neutral-900 border border-white/10 text-white placeholder-neutral-600 px-3 py-2 rounded focus:outline-none focus:border-cyan-400 transition-all resize-none"
                      rows={4}
                      placeholder="Enter content..."
                    />
                  ) : (
                    <input
                      type={item.type === 'image' ? 'url' : 'text'}
                      value={item.value}
                      onChange={(e) => updateContent(item.id, e.target.value)}
                      onFocus={() => setEditing(item.id)}
                      className="w-full bg-neutral-900 border border-white/10 text-white placeholder-neutral-600 px-3 py-2 rounded focus:outline-none focus:border-cyan-400 transition-all"
                      placeholder={item.type === 'image' ? 'Enter image URL...' : 'Enter content...'}
                    />
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-8 bg-neutral-900/50 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
          <h3 className="text-lg font-black text-white uppercase mb-4">How to Use</h3>
          <div className="space-y-2 text-neutral-400 text-sm">
            <p>• Click on any content field to start editing</p>
            <p>• Use the content key to reference this content in your website code</p>
            <p>• Choose between Text, Textarea, or Image URL types</p>
            <p>• Click "Save All" to persist your changes</p>
            <p>• Add new content items using the "Add Item" button</p>
          </div>
        </div>
      </div>
    </div>
  );
}
