import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { ALL_CATEGORIES, CATEGORY_GROUPS, categoryFieldHints, ItemCategory, ItemStatus, STATUS_OPTIONS } from "@/lib/crm-categories";
import { ArrowLeft, Trash2, Star, Upload, FileText, Video, Box, Image as ImageIcon } from "lucide-react";

interface Media {
  id: string;
  storage_path: string;
  file_name: string | null;
  mime_type: string | null;
  kind: "image" | "video" | "audio" | "document" | "model_3d" | "other";
  is_primary: boolean;
  position: number;
  alt_text: string | null;
  caption: string | null;
}

const newItem = {
  title: "",
  sku: "",
  category: "painting" as ItemCategory,
  subcategory: "",
  artist_id: null as string | null,
  description: "",
  short_description: "",
  technique: "",
  materials: "",
  year: "" as string | "",
  width_cm: "" as string | "",
  height_cm: "" as string | "",
  depth_cm: "" as string | "",
  weight_g: "" as string | "",
  is_unique: true,
  edition_size: "" as string | "",
  edition_number: "" as string | "",
  inventory_count: 1,
  price: "" as string | "",
  currency: "EUR",
  status: "draft" as ItemStatus,
  published: false,
  tags: [] as string[],
  notes: "",
  is_auction: false,
  auction_starting_price: "" as string | "",
  auction_current_bid: "" as string | "",
  auction_final_price: "" as string | "",
  auction_start_at: "" as string | "",
  auction_end_at: "" as string | "",
  show_in_vr: false,
};

const guessKind = (mime: string): Media["kind"] => {
  if (mime.startsWith("image/")) return "image";
  if (mime.startsWith("video/")) return "video";
  if (mime.startsWith("audio/")) return "audio";
  if (mime.includes("gltf") || mime.includes("glb") || mime.includes("model")) return "model_3d";
  if (mime === "application/pdf" || mime.includes("document") || mime.includes("text")) return "document";
  return "other";
};

const KindIcon = ({ kind }: { kind: Media["kind"] }) => {
  if (kind === "image") return <ImageIcon className="w-5 h-5" />;
  if (kind === "video") return <Video className="w-5 h-5" />;
  if (kind === "model_3d") return <Box className="w-5 h-5" />;
  return <FileText className="w-5 h-5" />;
};

const CrmItemEdit = () => {
  const { id } = useParams();
  const isNew = !id || id === "new";
  const navigate = useNavigate();
  const [form, setForm] = useState(newItem);
  const [artists, setArtists] = useState<{ id: string; name: string }[]>([]);
  const [media, setMedia] = useState<Media[]>([]);
  const [saving, setSaving] = useState(false);
  const [tagInput, setTagInput] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    supabase.from("artists").select("id, name").order("name").then(({ data }) => setArtists(data ?? []));
    if (!isNew) {
      supabase.from("items").select("*").eq("id", id).maybeSingle().then(({ data }) => {
        if (!data) return;
        setForm({
          ...newItem,
          ...data,
          year: data.year?.toString() ?? "",
          width_cm: data.width_cm?.toString() ?? "",
          height_cm: data.height_cm?.toString() ?? "",
          depth_cm: data.depth_cm?.toString() ?? "",
          weight_g: data.weight_g?.toString() ?? "",
          edition_size: data.edition_size?.toString() ?? "",
          edition_number: data.edition_number?.toString() ?? "",
          price: data.price?.toString() ?? "",
          sku: data.sku ?? "",
          subcategory: data.subcategory ?? "",
          description: data.description ?? "",
          short_description: data.short_description ?? "",
          technique: data.technique ?? "",
          materials: data.materials ?? "",
          notes: data.notes ?? "",
          tags: data.tags ?? [],
        });
      });
      loadMedia();
    }
    // eslint-disable-next-line
  }, [id]);

  const loadMedia = async () => {
    if (isNew) return;
    const { data } = await supabase.from("item_media").select("*").eq("item_id", id).order("position");
    setMedia((data ?? []) as Media[]);
  };

  const hints = categoryFieldHints(form.category);

  const set = (k: keyof typeof form, v: any) => setForm((p) => ({ ...p, [k]: v }));

  const buildPayload = () => {
    const numOrNull = (v: string | number | "") => (v === "" || v === null ? null : Number(v));
    return {
      title: form.title.trim(),
      sku: form.sku.trim() || null,
      category: form.category,
      subcategory: form.subcategory.trim() || null,
      artist_id: form.artist_id || null,
      description: form.description.trim() || null,
      short_description: form.short_description.trim() || null,
      technique: form.technique.trim() || null,
      materials: form.materials.trim() || null,
      year: numOrNull(form.year),
      width_cm: numOrNull(form.width_cm),
      height_cm: numOrNull(form.height_cm),
      depth_cm: numOrNull(form.depth_cm),
      weight_g: numOrNull(form.weight_g),
      is_unique: form.is_unique,
      edition_size: numOrNull(form.edition_size),
      edition_number: numOrNull(form.edition_number),
      inventory_count: Number(form.inventory_count) || 0,
      price: numOrNull(form.price),
      currency: form.currency || "EUR",
      status: form.status,
      published: form.published,
      tags: form.tags,
      notes: form.notes.trim() || null,
    };
  };

  const save = async () => {
    if (!form.title.trim()) { toast.error("Naziv je obvezen"); return; }
    setSaving(true);
    try {
      const payload = buildPayload();
      if (isNew) {
        const { data: u } = await supabase.auth.getUser();
        const { data, error } = await supabase.from("items").insert({ ...payload, created_by: u.user?.id }).select("id").single();
        if (error) throw error;
        toast.success("Artikel ustvarjen");
        navigate(`/crm/items/${data.id}`, { replace: true });
      } else {
        const { error } = await supabase.from("items").update(payload).eq("id", id);
        if (error) throw error;
        toast.success("Shranjeno");
      }
    } catch (e: any) {
      toast.error(e.message ?? "Napaka pri shranjevanju");
    } finally {
      setSaving(false);
    }
  };

  const remove = async () => {
    if (!confirm("Trajno izbriši artikel in vse pripete datoteke?")) return;
    const { error } = await supabase.from("items").delete().eq("id", id);
    if (error) toast.error(error.message);
    else { toast.success("Izbrisano"); navigate("/crm/items"); }
  };

  const uploadFiles = async (files: FileList) => {
    if (isNew) { toast.error("Najprej shrani artikel"); return; }
    for (const file of Array.from(files)) {
      const ext = file.name.split(".").pop() ?? "bin";
      const path = `${id}/${crypto.randomUUID()}.${ext}`;
      const { error: upErr } = await supabase.storage.from("gallery-assets").upload(path, file, { upsert: false, contentType: file.type });
      if (upErr) { toast.error(`${file.name}: ${upErr.message}`); continue; }
      const kind = guessKind(file.type || "");
      const isPrimary = media.length === 0 && kind === "image";
      const { error: insErr } = await supabase.from("item_media").insert({
        item_id: id,
        storage_path: path,
        file_name: file.name,
        mime_type: file.type,
        size_bytes: file.size,
        kind,
        is_primary: isPrimary,
        position: media.length,
      });
      if (insErr) toast.error(insErr.message);
    }
    toast.success("Naloženo");
    loadMedia();
  };

  const setPrimary = async (mediaId: string) => {
    await supabase.from("item_media").update({ is_primary: false }).eq("item_id", id);
    await supabase.from("item_media").update({ is_primary: true }).eq("id", mediaId);
    loadMedia();
  };

  const deleteMedia = async (m: Media) => {
    if (!confirm("Izbriši datoteko?")) return;
    await supabase.storage.from("gallery-assets").remove([m.storage_path]);
    await supabase.from("item_media").delete().eq("id", m.id);
    loadMedia();
  };

  const publicUrl = (p: string) => supabase.storage.from("gallery-assets").getPublicUrl(p).data.publicUrl;

  const addTag = () => {
    const t = tagInput.trim();
    if (!t) return;
    if (!form.tags.includes(t)) set("tags", [...form.tags, t]);
    setTagInput("");
  };

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-6">
      <div className="flex items-center justify-between gap-4">
        <Button variant="ghost" onClick={() => navigate("/crm/items")}><ArrowLeft className="w-4 h-4 mr-2" />Nazaj</Button>
        <div className="flex gap-2">
          {!isNew && <Button variant="ghost" size="icon" onClick={remove}><Trash2 className="w-4 h-4" /></Button>}
          <Button onClick={save} disabled={saving}>{saving ? "..." : "Shrani"}</Button>
        </div>
      </div>

      <h1 className="text-3xl font-serif">{isNew ? "Nov artikel" : form.title || "Artikel"}</h1>

      <Card className="p-6 space-y-5">
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2"><Label>Naziv *</Label><Input value={form.title} onChange={(e) => set("title", e.target.value)} /></div>
          <div className="space-y-2"><Label>Šifra / SKU</Label><Input value={form.sku} onChange={(e) => set("sku", e.target.value)} /></div>

          <div className="space-y-2">
            <Label>Kategorija</Label>
            <Select value={form.category} onValueChange={(v) => set("category", v as ItemCategory)}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {CATEGORY_GROUPS.map((g) => (
                  <div key={g.label}>
                    <div className="px-2 py-1.5 text-xs uppercase tracking-wider text-muted-foreground">{g.label}</div>
                    {g.items.map((i) => <SelectItem key={i.value} value={i.value}>{i.label}{i.hint ? ` — ${i.hint}` : ""}</SelectItem>)}
                  </div>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2"><Label>Podkategorija</Label><Input placeholder="npr. skodelica, vaza, srce-magnet" value={form.subcategory} onChange={(e) => set("subcategory", e.target.value)} /></div>

          <div className="space-y-2">
            <Label>Avtor</Label>
            <Select value={form.artist_id ?? "none"} onValueChange={(v) => set("artist_id", v === "none" ? null : v)}>
              <SelectTrigger><SelectValue placeholder="—" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="none">— brez —</SelectItem>
                {artists.map((a) => <SelectItem key={a.id} value={a.id}>{a.name}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Status</Label>
            <Select value={form.status} onValueChange={(v) => set("status", v as ItemStatus)}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>{STATUS_OPTIONS.map((s) => <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>)}</SelectContent>
            </Select>
          </div>

          <div className="space-y-2"><Label>Tehnika</Label><Input placeholder={hints.techniqueHint} value={form.technique} onChange={(e) => set("technique", e.target.value)} /></div>
          <div className="space-y-2"><Label>Material / podlaga</Label><Input placeholder={hints.materialsHint} value={form.materials} onChange={(e) => set("materials", e.target.value)} /></div>

          <div className="space-y-2"><Label>Leto nastanka</Label><Input type="number" value={form.year} onChange={(e) => set("year", e.target.value)} /></div>
          <div className="flex items-center gap-3 pt-7">
            <Switch checked={form.is_unique} onCheckedChange={(v) => set("is_unique", v)} />
            <Label>Unikat</Label>
          </div>

          {hints.showDimensions && (
            <>
              <div className="space-y-2"><Label>Širina (cm)</Label><Input type="number" step="0.1" value={form.width_cm} onChange={(e) => set("width_cm", e.target.value)} /></div>
              <div className="space-y-2"><Label>Višina (cm)</Label><Input type="number" step="0.1" value={form.height_cm} onChange={(e) => set("height_cm", e.target.value)} /></div>
              <div className="space-y-2"><Label>Globina (cm)</Label><Input type="number" step="0.1" value={form.depth_cm} onChange={(e) => set("depth_cm", e.target.value)} /></div>
              <div className="space-y-2"><Label>Teža (g)</Label><Input type="number" step="1" value={form.weight_g} onChange={(e) => set("weight_g", e.target.value)} /></div>
            </>
          )}

          {hints.showEdition && (
            <>
              <div className="space-y-2"><Label>Velikost edicije</Label><Input type="number" value={form.edition_size} onChange={(e) => set("edition_size", e.target.value)} /></div>
              <div className="space-y-2"><Label>Številka odtisa</Label><Input type="number" value={form.edition_number} onChange={(e) => set("edition_number", e.target.value)} /></div>
            </>
          )}

          <div className="space-y-2"><Label>Cena</Label><Input type="number" step="0.01" value={form.price} onChange={(e) => set("price", e.target.value)} /></div>
          <div className="space-y-2"><Label>Valuta</Label><Input value={form.currency} onChange={(e) => set("currency", e.target.value)} /></div>
          <div className="space-y-2"><Label>Zaloga</Label><Input type="number" value={form.inventory_count} onChange={(e) => set("inventory_count", Number(e.target.value))} /></div>
          <div className="flex items-center gap-3 pt-7">
            <Switch checked={form.published} onCheckedChange={(v) => set("published", v)} />
            <Label>Objavljeno na spletu</Label>
          </div>
        </div>

        <div className="space-y-2"><Label>Kratek opis</Label><Textarea rows={2} value={form.short_description} onChange={(e) => set("short_description", e.target.value)} /></div>
        <div className="space-y-2"><Label>Opis</Label><Textarea rows={5} value={form.description} onChange={(e) => set("description", e.target.value)} /></div>

        <div className="space-y-2">
          <Label>Oznake</Label>
          <div className="flex flex-wrap gap-2">
            {form.tags.map((t) => (
              <span key={t} className="bg-muted px-2 py-1 rounded text-xs flex items-center gap-2">
                {t}<button onClick={() => set("tags", form.tags.filter((x) => x !== t))} className="opacity-60 hover:opacity-100">×</button>
              </span>
            ))}
          </div>
          <div className="flex gap-2"><Input value={tagInput} onChange={(e) => setTagInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addTag())} placeholder="Dodaj oznako in pritisni Enter" /><Button type="button" variant="outline" onClick={addTag}>Dodaj</Button></div>
        </div>

        <div className="space-y-2"><Label>Interne opombe</Label><Textarea rows={3} value={form.notes} onChange={(e) => set("notes", e.target.value)} /></div>
      </Card>

      <Card className="p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-medium">Mediji</h2>
            <p className="text-sm text-muted-foreground">Slike, videoposnetki, 3D modeli, PDF dokumenti — vse oblike datotek.</p>
          </div>
          <div>
            <input ref={fileRef} type="file" multiple className="hidden" onChange={(e) => e.target.files && uploadFiles(e.target.files)} />
            <Button onClick={() => fileRef.current?.click()} disabled={isNew}><Upload className="w-4 h-4 mr-2" />Naloži datoteke</Button>
          </div>
        </div>
        {isNew && <p className="text-sm text-amber-700 bg-amber-50 border border-amber-200 rounded p-3">Najprej shrani artikel, nato lahko naložiš datoteke.</p>}
        {!isNew && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {media.length === 0 && <div className="col-span-full text-sm text-muted-foreground text-center py-8">Še ni datotek.</div>}
            {media.map((m) => (
              <div key={m.id} className="border rounded-lg overflow-hidden bg-card">
                <div className="aspect-square bg-muted flex items-center justify-center relative">
                  {m.kind === "image" ? (
                    <img src={publicUrl(m.storage_path)} className="w-full h-full object-cover" alt={m.alt_text ?? ""} />
                  ) : m.kind === "video" ? (
                    <video src={publicUrl(m.storage_path)} className="w-full h-full object-cover" />
                  ) : (
                    <div className="flex flex-col items-center text-muted-foreground gap-2"><KindIcon kind={m.kind} /><span className="text-xs">{m.kind}</span></div>
                  )}
                  {m.is_primary && <span className="absolute top-1 left-1 bg-primary text-primary-foreground text-[10px] px-1.5 py-0.5 rounded">Glavna</span>}
                </div>
                <div className="p-2 space-y-2">
                  <div className="text-xs truncate" title={m.file_name ?? ""}>{m.file_name}</div>
                  <div className="flex gap-1">
                    <Button size="icon" variant="ghost" className="h-7 w-7" onClick={() => setPrimary(m.id)} title="Nastavi za glavno"><Star className={`w-3.5 h-3.5 ${m.is_primary ? "fill-current" : ""}`} /></Button>
                    <a href={publicUrl(m.storage_path)} target="_blank" rel="noreferrer" className="text-xs underline self-center ml-1">Odpri</a>
                    <Button size="icon" variant="ghost" className="h-7 w-7 ml-auto" onClick={() => deleteMedia(m)}><Trash2 className="w-3.5 h-3.5" /></Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
};

export default CrmItemEdit;
