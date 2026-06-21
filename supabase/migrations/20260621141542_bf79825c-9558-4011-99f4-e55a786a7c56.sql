
-- Roles
CREATE TYPE public.app_role AS ENUM ('admin', 'editor');

CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id, role)
);
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role)
$$;

CREATE OR REPLACE FUNCTION public.is_staff(_user_id uuid)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role IN ('admin','editor'))
$$;

CREATE POLICY "Users see own roles" ON public.user_roles FOR SELECT TO authenticated USING (user_id = auth.uid());
CREATE POLICY "Admins manage roles" ON public.user_roles FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- updated_at helper
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS trigger LANGUAGE plpgsql SET search_path = public AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END; $$;

-- Item categories
CREATE TYPE public.item_category AS ENUM (
  'painting',          -- slike na platnu (olje/akril)
  'work_on_paper',     -- akvareli, risbe
  'graphic',           -- grafike (več odtisov)
  'illustration',      -- ilustracije
  'art_print',         -- art print / giclée / multimedija
  'sculpture',         -- skulpture
  'ceramic_utility',   -- uporabna keramika (skodelice, vaze, ...)
  'stone_product',     -- izdelki iz kraškega kamna
  'wine',              -- vina z avtorskimi etiketami
  'juice',             -- teranov sok
  'praline',           -- pralineji
  'magnet',            -- kraški magneti
  'card',              -- voščilnice / vizitke
  'notebook',          -- notesniki / rokovniki
  'other_gift'         -- ostala unikatna darila
);

CREATE TYPE public.item_status AS ENUM ('draft','available','reserved','sold','archived');

-- Artists / authors
CREATE TABLE public.artists (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE,
  bio TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.artists TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.artists TO authenticated;
GRANT ALL ON public.artists TO service_role;
ALTER TABLE public.artists ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read artists" ON public.artists FOR SELECT USING (true);
CREATE POLICY "Staff write artists" ON public.artists FOR ALL TO authenticated
  USING (public.is_staff(auth.uid())) WITH CHECK (public.is_staff(auth.uid()));
CREATE TRIGGER trg_artists_updated BEFORE UPDATE ON public.artists FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- Items (master catalog)
CREATE TABLE public.items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sku TEXT UNIQUE,
  title TEXT NOT NULL,
  slug TEXT UNIQUE,
  category public.item_category NOT NULL,
  subcategory TEXT,                       -- npr. "skodelica", "vaza", "magnet srce"
  artist_id UUID REFERENCES public.artists(id) ON DELETE SET NULL,
  description TEXT,
  short_description TEXT,
  technique TEXT,                         -- olje, akril, akvarel, giclée, ...
  materials TEXT,                         -- platno, papir, keramika, kraški kamen, ...
  year INTEGER,
  width_cm NUMERIC(8,2),
  height_cm NUMERIC(8,2),
  depth_cm NUMERIC(8,2),
  weight_g NUMERIC(10,2),
  is_unique BOOLEAN NOT NULL DEFAULT true,
  edition_size INTEGER,                   -- za grafike / art print
  edition_number INTEGER,
  inventory_count INTEGER NOT NULL DEFAULT 1,
  price NUMERIC(10,2),
  currency TEXT NOT NULL DEFAULT 'EUR',
  status public.item_status NOT NULL DEFAULT 'draft',
  published BOOLEAN NOT NULL DEFAULT false,
  tags TEXT[] NOT NULL DEFAULT '{}',
  attributes JSONB NOT NULL DEFAULT '{}'::jsonb,  -- prosta polja po kategoriji
  notes TEXT,                             -- interne opombe
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.items TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.items TO authenticated;
GRANT ALL ON public.items TO service_role;
ALTER TABLE public.items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read published items" ON public.items FOR SELECT USING (published = true);
CREATE POLICY "Staff read all items" ON public.items FOR SELECT TO authenticated USING (public.is_staff(auth.uid()));
CREATE POLICY "Staff write items" ON public.items FOR ALL TO authenticated
  USING (public.is_staff(auth.uid())) WITH CHECK (public.is_staff(auth.uid()));
CREATE TRIGGER trg_items_updated BEFORE UPDATE ON public.items FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE INDEX idx_items_category ON public.items(category);
CREATE INDEX idx_items_artist ON public.items(artist_id);
CREATE INDEX idx_items_status ON public.items(status);

-- Media (slike, videoposnetki, 3D, dokumenti)
CREATE TYPE public.media_kind AS ENUM ('image','video','audio','document','model_3d','other');

CREATE TABLE public.item_media (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  item_id UUID NOT NULL REFERENCES public.items(id) ON DELETE CASCADE,
  kind public.media_kind NOT NULL DEFAULT 'image',
  storage_path TEXT NOT NULL,             -- pot v 'gallery-assets'
  file_name TEXT,
  mime_type TEXT,
  size_bytes BIGINT,
  width INTEGER,
  height INTEGER,
  alt_text TEXT,
  caption TEXT,
  is_primary BOOLEAN NOT NULL DEFAULT false,
  position INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.item_media TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.item_media TO authenticated;
GRANT ALL ON public.item_media TO service_role;
ALTER TABLE public.item_media ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read media of published items" ON public.item_media FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.items i WHERE i.id = item_id AND i.published = true)
);
CREATE POLICY "Staff read all media" ON public.item_media FOR SELECT TO authenticated USING (public.is_staff(auth.uid()));
CREATE POLICY "Staff write media" ON public.item_media FOR ALL TO authenticated
  USING (public.is_staff(auth.uid())) WITH CHECK (public.is_staff(auth.uid()));
CREATE INDEX idx_media_item ON public.item_media(item_id);
