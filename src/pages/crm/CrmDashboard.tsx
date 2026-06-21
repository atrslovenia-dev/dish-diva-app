import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const CrmDashboard = () => {
  const [stats, setStats] = useState({ total: 0, published: 0, available: 0, sold: 0, artists: 0 });

  useEffect(() => {
    (async () => {
      const [{ count: total }, { count: pub }, { count: avail }, { count: sold }, { count: artists }] = await Promise.all([
        supabase.from("items").select("*", { count: "exact", head: true }),
        supabase.from("items").select("*", { count: "exact", head: true }).eq("published", true),
        supabase.from("items").select("*", { count: "exact", head: true }).eq("status", "available"),
        supabase.from("items").select("*", { count: "exact", head: true }).eq("status", "sold"),
        supabase.from("artists").select("*", { count: "exact", head: true }),
      ]);
      setStats({ total: total ?? 0, published: pub ?? 0, available: avail ?? 0, sold: sold ?? 0, artists: artists ?? 0 });
    })();
  }, []);

  const cards = [
    { label: "Vsi artikli", value: stats.total },
    { label: "Objavljeni", value: stats.published },
    { label: "Na voljo", value: stats.available },
    { label: "Prodano", value: stats.sold },
    { label: "Avtorji", value: stats.artists },
  ];

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-serif">Pregled</h1>
          <p className="text-muted-foreground mt-1">Hitri pregled stanja galerije</p>
        </div>
        <Link to="/crm/items/new"><Button><Plus className="w-4 h-4 mr-2" />Nov artikel</Button></Link>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {cards.map((c) => (
          <Card key={c.label} className="p-5">
            <div className="text-sm text-muted-foreground">{c.label}</div>
            <div className="text-3xl font-serif mt-2">{c.value}</div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CrmDashboard;
