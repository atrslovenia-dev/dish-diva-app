
ALTER TABLE public.items
  ADD COLUMN IF NOT EXISTS is_auction boolean NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS auction_starting_price numeric,
  ADD COLUMN IF NOT EXISTS auction_current_bid numeric,
  ADD COLUMN IF NOT EXISTS auction_final_price numeric,
  ADD COLUMN IF NOT EXISTS auction_start_at timestamptz,
  ADD COLUMN IF NOT EXISTS auction_end_at timestamptz,
  ADD COLUMN IF NOT EXISTS show_in_vr boolean NOT NULL DEFAULT false;
