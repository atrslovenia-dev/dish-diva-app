
CREATE POLICY "Public read event images" ON storage.objects
  FOR SELECT TO anon, authenticated
  USING (bucket_id = 'event-images');

CREATE POLICY "Staff upload event images" ON storage.objects
  FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'event-images' AND public.is_staff(auth.uid()));

CREATE POLICY "Staff update event images" ON storage.objects
  FOR UPDATE TO authenticated
  USING (bucket_id = 'event-images' AND public.is_staff(auth.uid()));

CREATE POLICY "Staff delete event images" ON storage.objects
  FOR DELETE TO authenticated
  USING (bucket_id = 'event-images' AND public.is_staff(auth.uid()));
