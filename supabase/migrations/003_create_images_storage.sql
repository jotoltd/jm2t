-- Create storage bucket for service images
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'service-images',
  'service-images',
  true,
  5242880, -- 5MB limit
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif']
) ON CONFLICT (id) DO NOTHING;

-- RLS policies for service-images bucket
CREATE POLICY "Anyone can view service images" ON storage.objects
FOR SELECT USING (bucket_id = 'service-images');

CREATE POLICY "Admins can upload service images" ON storage.objects
FOR INSERT WITH CHECK (
  bucket_id = 'service-images' AND 
  auth.role() = 'service_role'
);

CREATE POLICY "Admins can update service images" ON storage.objects
FOR UPDATE USING (
  bucket_id = 'service-images' AND 
  auth.role() = 'service_role'
);

CREATE POLICY "Admins can delete service images" ON storage.objects
FOR DELETE USING (
  bucket_id = 'service-images' AND 
  auth.role() = 'service_role'
);
