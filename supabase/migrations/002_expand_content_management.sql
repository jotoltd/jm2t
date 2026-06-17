-- Add categories to website_content for better organization
ALTER TABLE website_content ADD COLUMN IF NOT EXISTS category TEXT DEFAULT 'general';
ALTER TABLE website_content ADD COLUMN IF NOT EXISTS section TEXT DEFAULT 'main';
ALTER TABLE website_content ADD COLUMN IF NOT EXISTS order_index INTEGER DEFAULT 0;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_website_content_category ON website_content(category);
CREATE INDEX IF NOT EXISTS idx_website_content_section ON website_content(section);
CREATE INDEX IF NOT EXISTS idx_website_content_order ON website_content(category, section, order_index);

-- Create services table for dynamic service management
CREATE TABLE IF NOT EXISTS services (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  price TEXT NOT NULL,
  description TEXT NOT NULL,
  bullets TEXT[] DEFAULT '{}',
  href TEXT,
  image_url TEXT,
  icon_name TEXT,
  featured BOOLEAN DEFAULT false,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for services
CREATE INDEX IF NOT EXISTS idx_services_featured ON services(featured);
CREATE INDEX IF NOT EXISTS idx_services_order ON services(order_index);

-- Enable RLS for services
ALTER TABLE services ENABLE ROW LEVEL SECURITY;

-- Policies for services
CREATE POLICY "Anyone can read services" ON services
  FOR SELECT USING (true);

CREATE POLICY "Service role can manage services" ON services
  FOR ALL USING (auth.role() = 'service_role');

-- Create trigger for services
CREATE TRIGGER update_services_updated_at
  BEFORE UPDATE ON services
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Insert default services
INSERT INTO services (title, price, description, bullets, href, image_url, icon_name, featured, order_index) VALUES
  ('Floor Tiling', '£80–95 / m²', 'Porcelain, ceramic and natural stone floors for homes and commercial spaces — straight-lay, herringbone and large-format, laid dead-level.', 
   ARRAY['Herringbone & large-format', 'Residential & commercial', 'Built to last decades'], 
   '/floor-tiling', '/images/luxe_kitchen02_floor_tiling.jpg', 'Grid3X3', true, 1),
  ('Bathroom Tiling', 'Full renovations', 'Full bathroom renovations, feature walls and custom shower enclosures — properly waterproofed and finished to a spa-quality standard.', 
   ARRAY['Wet rooms & showers', 'Waterproofing focus', 'Luxury, spa-inspired'], 
   '/bathroom-tiling', '/images/bathroom_tiling.jpeg', 'Bath', true, 2),
  ('Wall Tiling', '£50–60 / m²', 'Kitchen splashbacks, feature walls and full-height installs set out perfectly square — from contemporary to decorative patterns.', 
   ARRAY['Kitchen splashbacks', 'Feature walls', 'Flawless symmetry'], 
   '/wall-tiling', '/images/luxe_kitchen04wall_tiling.jpeg', 'LayoutGrid', true, 3),
  ('Re-grouting & Repair', '£200 / day', 'Discoloured, cracked or mouldy grout renewed and loose, chipped or broken tiles replaced — restoring tired surfaces and sealing out moisture.', 
   ARRAY['Tile repair & replacement', 'Mould & moisture sealing', 'A fresh, modern finish'], 
   '/regrouting', '/images/wall_tiling_4.jpeg', 'Brush', false, 4),
  ('Bespoke Tile Countertops', 'Bespoke quote', 'Made-to-measure tiled worktops and surfaces — a hard-wearing statement piece designed around your kitchen or bathroom.', 
   ARRAY['Custom worktops', 'Statement surfaces', 'Premium materials'], 
   '/quote', '/images/luxe_kitchen02_floor_tiling.jpg', 'Table2', false, 5),
  ('Renovation & Restoration', 'From £200 / day', 'Older tiled areas brought back to life with modern techniques and materials — from single-room refreshes to full property transformations.', 
   ARRAY['Full transformations', 'Modern techniques', 'Sympathetic restoration'], 
   '/quote', '/images/luxe_apartment_01.jpg', 'Hammer', false, 6)
ON CONFLICT DO NOTHING;

-- Insert comprehensive website content
INSERT INTO website_content (key, value, type, description, category, section, order_index) VALUES
  -- Hero section
  ('hero_title', 'Flawless Tiling, Perfect Finish', 'text', 'Main hero title', 'hero', 'main', 1),
  ('hero_subtitle', 'Expert tiling services across Surrey & West Sussex', 'text', 'Hero subtitle', 'hero', 'main', 2),
  ('hero_cta_text', 'Get Your Free Quote', 'text', 'Hero CTA button text', 'hero', 'main', 3),
  ('hero_cta_link', '/quote', 'text', 'Hero CTA button link', 'hero', 'main', 4),
  ('hero_image', '/images/hero.jpeg', 'image', 'Hero background image', 'hero', 'main', 5),
  
  -- Contact information
  ('phone', '07738 427208', 'text', 'Contact phone number', 'contact', 'main', 1),
  ('email', 'enquiries@jm2tilingco.com', 'text', 'Contact email', 'contact', 'main', 2),
  ('contact_form_success', 'Thank you! We will be in touch within 24 hours.', 'text', 'Contact form success message', 'contact', 'main', 3),
  
  -- About section
  ('about_title', 'The JM² Difference', 'text', 'About section title', 'about', 'main', 1),
  ('about_subtitle', 'Craftsmanship That Speaks for Itself', 'text', 'About section subtitle', 'about', 'main', 2),
  ('about_text', 'With over 15 years of experience, JM2 Tiling Co delivers premium tiling solutions for residential and commercial properties. Our commitment to quality and attention to detail ensures every project exceeds expectations.', 'textarea', 'About section text', 'about', 'main', 3),
  
  -- Stats section
  ('stats_years', '15+', 'text', 'Years experience stat', 'stats', 'main', 1),
  ('stats_projects', '500+', 'text', 'Projects completed stat', 'stats', 'main', 2),
  ('stats_clients', '300+', 'text', 'Happy clients stat', 'stats', 'main', 3),
  ('stats_areas', 'Surrey & West Sussex', 'text', 'Service areas stat', 'stats', 'main', 4),
  
  -- Process section
  ('process_title', 'Our Process', 'text', 'Process section title', 'process', 'main', 1),
  ('process_subtitle', 'From Concept to Completion', 'text', 'Process section subtitle', 'process', 'main', 2),
  
  -- Footer
  ('footer_company_name', 'JM² Tiling Co', 'text', 'Footer company name', 'footer', 'main', 1),
  ('footer_tagline', 'Flawless Tiling, Perfect Finish', 'text', 'Footer tagline', 'footer', 'main', 2),
  ('footer_address', 'Surrey & West Sussex', 'text', 'Footer address', 'footer', 'main', 3),
  
  -- Navigation
  ('nav_logo', '/images/logo_icon.png', 'image', 'Navigation logo', 'navigation', 'main', 1),
  ('nav_title', 'JM² Tiling Co', 'text', 'Navigation title', 'navigation', 'main', 2)
ON CONFLICT (key) DO UPDATE SET
  value = EXCLUDED.value,
  type = EXCLUDED.type,
  description = EXCLUDED.description,
  category = EXCLUDED.category,
  section = EXCLUDED.section,
  order_index = EXCLUDED.order_index;
