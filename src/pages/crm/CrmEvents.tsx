import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/hooks/use-toast";
import { Plus, Pencil, Trash2, Upload, X } from "lucide-react";

const BUCKET = "event-images";
const SIGNED_URL_TTL = 60 * 60 * 24 * 365 * 10; // 10 years


type EventRow = {
  id: string;
  title: string;
  description: string | null;
  location: string | null;
  leader: string | null;
  starts_at: string;
  ends_at: string | null;
  price: number | null;
  currency: string;
  image_url: string | null;
  map_url: string | null;
  published: boolean;
};

const emptyForm = {
  title: "",
  description: "",
  location: "",
  leader: "",
  starts_at: "",
  ends_at: "",
  price: "",
  currency: "EUR",
  image_url: "",
  map_url: "",
  published: true,
};

const toLocalInput = (iso?: string | null) => {
  if (!iso) return "";
  const d = new Date(iso);
  const off = d.getTimezoneOffset();
  const local = new Date(d.getTime() - off * 60000);
  return local.toISOString().slice(0, 16);
};

const CrmEvents = () => {
  const [rows, setRows] = useState<EventRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  const load = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("events")
      .select("*")
      .order("starts_at", { ascending: false });
    if (error) toast({ title: "Napaka", description: error.message, variant: "destructive" });
    setRows((data as EventRow[]) ?? []);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const openNew = () => {
    setEditingId(null);
    setForm(emptyForm);
    setOpen(true);
  };

  const openEdit = (r: EventRow) => {
    setEditingId(r.id);
    setForm({
      title: r.title,
      description: r.description ?? "",
      location: r.location ?? "",
      leader: r.leader ?? "",
      starts_at: toLocalInput(r.starts_at),
      ends_at: toLocalInput(r.ends_at),
      price: r.price?.toString() ?? "",
      currency: r.currency ?? "EUR",
      image_url: r.image_url ?? "",
      map_url: r.map_url ?? "",
      published: r.published,
    });
    setOpen(true);
  };

  const save = async () => {
    if (!form.title.trim() || !form.starts_at) {
      toast({ title: "Manjkajo podatki", description: "Naslov in datum sta obvezna.", variant: "destructive" });
      return;
    }
    setSaving(true);
    const payload = {
      title: form.title.trim(),
      description: form.description.trim() || null,
      location: form.location.trim() || null,
      leader: form.leader.trim() || null,
      starts_at: new Date(form.starts_at).toISOString(),
      ends_at: form.ends_at ? new Date(form.ends_at).toISOString() : null,
      price: form.price ? Number(form.price) : null,
      currency: form.currency || "EUR",
      image_url: form.image_url.trim() || null,
      map_url: form.map_url.trim() || null,
      published: form.published,
    };
    const { error } = editingId
      ? await supabase.from("events").update(payload).eq("id", editingId)
      : await supabase.from("events").insert(payload);
    setSaving(false);
    if (error) {
      toast({ title: "Napaka pri shranjevanju", description: error.message, variant: "destructive" });
      return;
    }
    toast({ title: editingId ? "Dogodek posodobljen" : "Dogodek dodan" });
    setOpen(false);
    load();
  };

  const remove = async (id: string) => {
    const { error } = await supabase.from("events").delete().eq("id", id);
    if (error) {
      toast({ title: "Napaka pri brisanju", description: error.message, variant: "destructive" });
      return;
    }
    toast({ title: "Dogodek izbrisan" });
    load();
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-2xl">Dogodki</h1>
          <p className="text-sm text-muted-foreground">Upravljanje delavnic in dogodkov</p>
        </div>
        <Button onClick={openNew}>
          <Plus className="w-4 h-4 mr-2" /> Nov dogodek
        </Button>
      </div>

      <div className="bg-card rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Naslov</TableHead>
              <TableHead>Datum</TableHead>
              <TableHead>Lokacija</TableHead>
              <TableHead>Cena</TableHead>
              <TableHead>Objavljeno</TableHead>
              <TableHead className="text-right">Dejanja</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow><TableCell colSpan={6} className="text-center text-muted-foreground">Nalaganje…</TableCell></TableRow>
            ) : rows.length === 0 ? (
              <TableRow><TableCell colSpan={6} className="text-center text-muted-foreground">Ni dogodkov. Dodajte prvega.</TableCell></TableRow>
            ) : (
              rows.map((r) => (
                <TableRow key={r.id}>
                  <TableCell className="font-medium">{r.title}</TableCell>
                  <TableCell>{new Date(r.starts_at).toLocaleString("sl-SI", { dateStyle: "medium", timeStyle: "short" })}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{r.location ?? "—"}</TableCell>
                  <TableCell>{r.price != null ? `${r.price} ${r.currency}` : "—"}</TableCell>
                  <TableCell>{r.published ? "Da" : "Ne"}</TableCell>
                  <TableCell className="text-right">
                    <Button size="sm" variant="ghost" onClick={() => openEdit(r)}><Pencil className="w-4 h-4" /></Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button size="sm" variant="ghost" className="text-destructive"><Trash2 className="w-4 h-4" /></Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Izbriši dogodek?</AlertDialogTitle>
                          <AlertDialogDescription>"{r.title}" bo trajno izbrisan.</AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Prekliči</AlertDialogCancel>
                          <AlertDialogAction onClick={() => remove(r.id)}>Izbriši</AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingId ? "Uredi dogodek" : "Nov dogodek"}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-2">
            <div>
              <Label>Naslov *</Label>
              <Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} maxLength={200} />
            </div>
            <div>
              <Label>Opis</Label>
              <Textarea rows={4} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} maxLength={2000} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Začetek *</Label>
                <Input type="datetime-local" value={form.starts_at} onChange={(e) => setForm({ ...form, starts_at: e.target.value })} />
              </div>
              <div>
                <Label>Konec</Label>
                <Input type="datetime-local" value={form.ends_at} onChange={(e) => setForm({ ...form, ends_at: e.target.value })} />
              </div>
            </div>
            <div>
              <Label>Lokacija</Label>
              <Input value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} maxLength={200} />
            </div>
            <div>
              <Label>Vodja / izvajalec</Label>
              <Input value={form.leader} onChange={(e) => setForm({ ...form, leader: e.target.value })} maxLength={150} />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-2">
                <Label>Cena</Label>
                <Input type="number" step="0.01" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} />
              </div>
              <div>
                <Label>Valuta</Label>
                <Input value={form.currency} onChange={(e) => setForm({ ...form, currency: e.target.value })} maxLength={5} />
              </div>
            </div>
            <div>
              <Label>URL slike</Label>
              <Input value={form.image_url} onChange={(e) => setForm({ ...form, image_url: e.target.value })} placeholder="https://…" />
            </div>
            <div>
              <Label>Povezava do zemljevida</Label>
              <Input value={form.map_url} onChange={(e) => setForm({ ...form, map_url: e.target.value })} placeholder="https://maps.google.com/…" />
            </div>
            <div className="flex items-center justify-between border-t pt-4">
              <Label htmlFor="pub">Objavljeno na spletni strani</Label>
              <Switch id="pub" checked={form.published} onCheckedChange={(v) => setForm({ ...form, published: v })} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>Prekliči</Button>
            <Button onClick={save} disabled={saving}>{saving ? "Shranjevanje…" : "Shrani"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CrmEvents;
