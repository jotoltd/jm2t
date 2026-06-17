-- Create website content table
CREATE TABLE IF NOT EXISTS website_content (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  key TEXT UNIQUE NOT NULL,
  value TEXT NOT NULL,
  type TEXT NOT NULL DEFAULT 'text' CHECK (type IN ('text', 'textarea', 'image')),
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_website_content_key ON website_content(key);

-- Enable RLS (Row Level Security)
ALTER TABLE website_content ENABLE ROW LEVEL SECURITY;

-- Create policy for authenticated users to read all content
CREATE POLICY "Anyone can read content" ON website_content
  FOR SELECT USING (true);

-- Create policy for service role to insert/update/delete content
CREATE POLICY "Service role can manage content" ON website_content
  FOR ALL USING (auth.role() = 'service_role');

-- Insert default content
INSERT INTO website_content (key, value, type, description) VALUES
  ('hero_title', 'Flawless Tiling, Perfect Finish', 'text', 'Main hero title'),
  ('hero_subtitle', 'Expert tiling services across Surrey & West Sussex', 'text', 'Hero subtitle'),
  ('phone', '07738 427208', 'text', 'Contact phone number'),
  ('email', 'enquiries@jm2tilingco.com', 'text', 'Contact email'),
  ('about_text', 'With over 15 years of experience, JM² Tiling Co delivers premium tiling solutions for residential and commercial properties.', 'textarea', 'About section text'),
  ('contact_form_success', 'Thank you! We'll be in touch within 24 hours.', 'text', 'Contact form success message')
ON CONFLICT (key) DO NOTHING;

-- Create function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_website_content_updated_at
  BEFORE UPDATE ON website_content
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
