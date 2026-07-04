// One-shot admin password reset. Reads email/password from env secrets.
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: cors });
  try {
    const email = Deno.env.get("RESET_TARGET_EMAIL");
    const password = Deno.env.get("RESET_TARGET_PASSWORD");
    if (!email || !password) {
      return new Response(JSON.stringify({ error: "RESET_TARGET_EMAIL/PASSWORD not set" }), { status: 500, headers: { ...cors, "content-type": "application/json" } });
    }
    const admin = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );
    const { data: list, error: listErr } = await admin.auth.admin.listUsers();
    if (listErr) throw listErr;
    const user = list.users.find((u) => u.email?.toLowerCase() === email.toLowerCase());
    if (!user) {
      return new Response(JSON.stringify({ error: "user not found", email }), { status: 404, headers: { ...cors, "content-type": "application/json" } });
    }
    const { error: updErr } = await admin.auth.admin.updateUserById(user.id, {
      password,
      email_confirm: true,
    });
    if (updErr) throw updErr;
    return new Response(JSON.stringify({ ok: true, email }), { headers: { ...cors, "content-type": "application/json" } });
  } catch (e) {
    return new Response(JSON.stringify({ error: (e as Error).message }), { status: 500, headers: { ...cors, "content-type": "application/json" } });
  }
});
