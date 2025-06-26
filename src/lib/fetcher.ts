export async function postJSON<T = unknown>(
    url: string,
    payload: unknown,
  ): Promise<T> {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  
    // Read the body ONCE
    const body = await res.text();
    // ─────────────────────────────────────────────────────────
    // Parse it only if it looks like JSON.
    // (Edge/API routes in Next.js always send JSON in our codebase.)
    // ─────────────────────────────────────────────────────────
    const parsed = body ? JSON.parse(body) : null;
  
    if (!res.ok) {
      // Server already sent { success:false, message:"…" }
      const msg = parsed?.message ?? `HTTP ${res.status}`;
      throw new Error(msg);
    }
  
    return parsed as T;
  }
  