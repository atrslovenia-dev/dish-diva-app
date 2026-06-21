import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Trash2 } from "lucide-react";

interface Artist { id: string; name: string; bio: string | null; slug: string | null; }

const CrmArtists = () => {
  const [list, setList] = useState<Artist[]>([]);
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");

  const load = async () => {
    const { data } = await supabase.from("artists").select("*").order("name");
    setList((data ?? []) as Artist[]);
  };
  useEffect(() => { load(); }, []);

  const add = async () => {
    if (!name.trim()) return;
    const slug = name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    const { error } = await supabase.from("artists").insert({ name: name.trim(), bio: bio.trim() || null, slug });
    if (error) toast.error(error.message); else { setName(""); setBio(""); toast.success("Avtor dodan"); load(); }
  };

  const remove = async (id: string) => {
    if (!confirm("Izbriši avtorja?")) return;
    const { error } = await supabase.from("artists").delete().eq("id", id);
    if (error) toast.error(error.message); else { toast.success("Izbrisano"); load(); }
  };

  return (
    <div className="p-8 space-y-6 max-w-4xl">
      <h1 className="text-3xl font-serif">Avtorji</h1>

      <Card className="p-5 space-y-3">
        <h2 className="font-medium">Nov avtor</h2>
        <div className="space-y-2"><Label>Ime in priimek</Label><Input value={name} onChange={(e) => setName(e.target.value)} /></div>
        <div className="space-y-2"><Label>Biografija (neobvezno)</Label><Textarea rows={3} value={bio} onChange={(e) => setBio(e.target.value)} /></div>
        <Button onClick={add}>Dodaj avtorja</Button>
      </Card>

      <Card className="divide-y">
        {list.length === 0 && <div className="p-6 text-muted-foreground text-sm">Ni avtorjev.</div>}
        {list.map((a) => (
          <div key={a.id} className="p-4 flex items-start justify-between gap-4">
            <div>
              <div className="font-medium">{a.name}</div>
              {a.bio && <div className="text-sm text-muted-foreground mt-1 whitespace-pre-line">{a.bio}</div>}
            </div>
            <Button variant="ghost" size="icon" onClick={() => remove(a.id)}><Trash2 className="w-4 h-4" /></Button>
          </div>
        ))}
      </Card>
    </div>
  );
};

export default CrmArtists;
