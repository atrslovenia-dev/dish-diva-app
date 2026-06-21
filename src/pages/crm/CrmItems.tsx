import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ALL_CATEGORIES, categoryLabel, ItemCategory, ItemStatus, STATUS_OPTIONS } from "@/lib/crm-categories";
import { Plus, Image as ImageIcon } from "lucide-react";

interface Row {
  id: string;
  title: string;
  sku: string | null;
  category: ItemCategory;
  status: ItemStatus;
  published: boolean;
  price: number | null;
  currency: string;
  inventory_count: number;
  artist: { name: string } | null;
  primary_media: { storage_path: string }[] | null;
}

const CrmItems = () => {
  const [rows, setRows] = useState<Row[]>([]);
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<string>("all");
  const [status, setStatus] = useState<string>("all");
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    let query = supabase
      .from("items")
      .select("id, title, sku, category, status, published, price, currency, inventory_count, artist:artists(name), primary_media:item_media(storage_path)")
      .order("updated_at", { ascending: false });
    if (cat !== "all") query = query.eq("category", cat as any);
    if (status !== "all") query = query.eq("status", status as any);
    if (q) query = query.ilike("title", `%${q}%`);
    const { data } = await query;
    setRows((data ?? []) as any);
    setLoading(false);
  };

  useEffect(() => { load(); /* eslint-disable-next-line */ }, [cat, status]);

  const publicUrl = (path: string) => supabase.storage.from("gallery-assets").getPublicUrl(path).data.publicUrl;

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <h1 className="text-3xl font-serif">Artikli</h1>
        <Link to="/crm/items/new"><Button><Plus className="w-4 h-4 mr-2" />Nov artikel</Button></Link>
      </div>

      <Card className="p-4 flex gap-3 flex-wrap items-center">
        <Input placeholder="Iskanje po nazivu…" value={q} onChange={(e) => setQ(e.target.value)} onKeyDown={(e) => e.key === "Enter" && load()} className="max-w-xs" />
        <Select value={cat} onValueChange={setCat}>
          <SelectTrigger className="w-[260px]"><SelectValue placeholder="Kategorija" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Vse kategorije</SelectItem>
            {ALL_CATEGORIES.map((c) => <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>)}
          </SelectContent>
        </Select>
        <Select value={status} onValueChange={setStatus}>
          <SelectTrigger className="w-[160px]"><SelectValue placeholder="Status" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Vsi statusi</SelectItem>
            {STATUS_OPTIONS.map((s) => <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>)}
          </SelectContent>
        </Select>
        <Button variant="outline" onClick={load}>Filtriraj</Button>
      </Card>

      <Card>
        {loading ? (
          <div className="p-8 text-center text-muted-foreground">Nalaganje…</div>
        ) : rows.length === 0 ? (
          <div className="p-12 text-center">
            <p className="text-muted-foreground">Še ni artiklov.</p>
            <Link to="/crm/items/new"><Button className="mt-4"><Plus className="w-4 h-4 mr-2" />Dodaj prvega</Button></Link>
          </div>
        ) : (
          <div className="divide-y">
            {rows.map((r) => {
              const img = r.primary_media?.[0]?.storage_path;
              return (
                <Link key={r.id} to={`/crm/items/${r.id}`} className="flex gap-4 p-4 hover:bg-muted/40 transition-colors">
                  <div className="w-16 h-16 rounded bg-muted flex items-center justify-center overflow-hidden flex-shrink-0">
                    {img ? <img src={publicUrl(img)} className="w-full h-full object-cover" alt="" /> : <ImageIcon className="w-6 h-6 text-muted-foreground" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium truncate">{r.title}</div>
                    <div className="text-sm text-muted-foreground truncate">
                      {categoryLabel(r.category)} {r.artist?.name ? `· ${r.artist.name}` : ""} {r.sku ? `· ${r.sku}` : ""}
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Badge variant={r.published ? "default" : "secondary"}>{r.published ? "Objavljen" : "Skrit"}</Badge>
                    <Badge variant="outline">{STATUS_OPTIONS.find((s) => s.value === r.status)?.label}</Badge>
                    <div className="w-24 text-right font-medium">
                      {r.price != null ? `${r.price.toFixed(2)} ${r.currency}` : "—"}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </Card>
    </div>
  );
};

export default CrmItems;
