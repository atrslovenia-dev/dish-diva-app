import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";

const CrmLogin = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  if (!loading && user) return <Navigate to="/crm" replace />;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    try {
      if (mode === "login") {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        toast.success("Prijava uspešna");
        navigate("/crm");
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: `${window.location.origin}/crm` },
        });
        if (error) throw error;
        toast.success("Račun ustvarjen. Skrbnik vam mora dodeliti pravice.");
      }
    } catch (err: any) {
      toast.error(err.message ?? "Napaka pri prijavi");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md p-8 space-y-6">
        <div>
          <h1 className="text-2xl font-serif">Atelje CRM</h1>
          <p className="text-sm text-muted-foreground mt-1">
            {mode === "login" ? "Prijava v interno galerijsko vodenje" : "Ustvari nov račun"}
          </p>
        </div>
        <form onSubmit={submit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">E-pošta</Label>
            <Input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="pw">Geslo</Label>
            <Input id="pw" type="password" required minLength={8} value={password} onChange={(e) => setPassword(e.target.value)} autoComplete={mode === "login" ? "current-password" : "new-password"} />
          </div>
          <Button type="submit" disabled={busy} className="w-full">
            {busy ? "..." : mode === "login" ? "Prijava" : "Ustvari račun"}
          </Button>
        </form>
        <button type="button" className="text-sm text-muted-foreground underline" onClick={() => setMode(mode === "login" ? "signup" : "login")}>
          {mode === "login" ? "Nimaš računa? Registracija" : "Že imaš račun? Prijava"}
        </button>
      </Card>
    </div>
  );
};

export default CrmLogin;
