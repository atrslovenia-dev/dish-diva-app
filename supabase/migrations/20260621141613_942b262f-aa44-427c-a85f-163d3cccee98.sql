
CREATE POLICY "Public read gallery-assets" ON storage.objects FOR SELECT USING (bucket_id = 'gallery-assets');
CREATE POLICY "Staff upload gallery-assets" ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'gallery-assets' AND public.is_staff(auth.uid()));
CREATE POLICY "Staff update gallery-assets" ON storage.objects FOR UPDATE TO authenticated
  USING (bucket_id = 'gallery-assets' AND public.is_staff(auth.uid()));
CREATE POLICY "Staff delete gallery-assets" ON storage.objects FOR DELETE TO authenticated
  USING (bucket_id = 'gallery-assets' AND public.is_staff(auth.uid()));
