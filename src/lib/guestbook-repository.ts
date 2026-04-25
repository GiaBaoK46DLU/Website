import { createClient } from "@supabase/supabase-js";
import {
  guestbookEntries as fallbackSeedEntries,
  GuestbookEntry,
} from "@/data/guestbook";

interface GuestbookRow {
  id: string;
  name: string;
  message: string;
  created_at: string;
}

export class GuestbookNotFoundError extends Error {
  constructor(message = "Guestbook entry not found") {
    super(message);
    this.name = "GuestbookNotFoundError";
  }
}

let fallbackEntries: GuestbookEntry[] = [...fallbackSeedEntries];

function hasSupabaseConfig() {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  );
}

function getSupabaseClient() {
  if (!hasSupabaseConfig()) {
    return null;
  }

  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    },
  );
}

function mapRowToEntry(row: GuestbookRow): GuestbookEntry {
  return {
    id: row.id,
    name: row.name,
    message: row.message,
    createdAt: row.created_at,
  };
}

export async function listGuestbookEntries(
  limit?: number,
): Promise<GuestbookEntry[]> {
  const supabase = getSupabaseClient();

  if (!supabase) {
    const entries = [...fallbackEntries];
    if (!limit) return entries;
    return entries.slice(0, limit);
  }

  let query = supabase
    .from("guestbook_entries")
    .select("id,name,message,created_at")
    .order("created_at", { ascending: false });

  if (limit) {
    query = query.limit(limit);
  }

  const { data, error } = await query;

  if (error) {
    throw new Error(error.message);
  }

  return (data ?? []).map(mapRowToEntry);
}

export async function createGuestbookEntryData(input: {
  name: string;
  message: string;
}): Promise<GuestbookEntry> {
  const supabase = getSupabaseClient();

  if (!supabase) {
    const newEntry: GuestbookEntry = {
      id: Date.now().toString(),
      name: input.name,
      message: input.message,
      createdAt: new Date().toISOString(),
    };
    fallbackEntries.unshift(newEntry);
    return newEntry;
  }

  const { data, error } = await supabase
    .from("guestbook_entries")
    .insert({
      name: input.name,
      message: input.message,
    })
    .select("id,name,message,created_at")
    .single();

  if (error || !data) {
    throw new Error(error?.message ?? "Failed to create guestbook entry");
  }

  return mapRowToEntry(data);
}

export async function updateGuestbookEntryData(
  id: string,
  input: { name: string; message: string },
): Promise<GuestbookEntry> {
  const supabase = getSupabaseClient();

  if (!supabase) {
    const entry = fallbackEntries.find((item) => item.id === id);
    if (!entry) {
      throw new GuestbookNotFoundError();
    }
    entry.name = input.name;
    entry.message = input.message;
    return entry;
  }

  const { data, error } = await supabase
    .from("guestbook_entries")
    .update({
      name: input.name,
      message: input.message,
    })
    .eq("id", id)
    .select("id,name,message,created_at")
    .single();

  if (error || !data) {
    if (error?.code === "PGRST116") {
      throw new GuestbookNotFoundError();
    }
    throw new Error(error?.message ?? "Failed to update guestbook entry");
  }

  return mapRowToEntry(data);
}

export async function deleteGuestbookEntryData(
  id: string,
): Promise<GuestbookEntry> {
  const supabase = getSupabaseClient();

  if (!supabase) {
    const index = fallbackEntries.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new GuestbookNotFoundError();
    }
    const deleted = fallbackEntries.splice(index, 1)[0];
    return deleted;
  }

  const { data, error } = await supabase
    .from("guestbook_entries")
    .delete()
    .eq("id", id)
    .select("id,name,message,created_at")
    .single();

  if (error || !data) {
    if (error?.code === "PGRST116") {
      throw new GuestbookNotFoundError();
    }
    throw new Error(error?.message ?? "Failed to delete guestbook entry");
  }

  return mapRowToEntry(data);
}

export async function findRecentDuplicateGuestbookEntry(input: {
  name: string;
  message: string;
  withinMs: number;
}): Promise<GuestbookEntry | null> {
  const supabase = getSupabaseClient();

  if (!supabase) {
    const now = Date.now();
    const duplicate = fallbackEntries.find((entry) => {
      const sameName =
        entry.name.trim().toLowerCase() === input.name.trim().toLowerCase();
      const sameMessage =
        entry.message.trim().toLowerCase() ===
        input.message.trim().toLowerCase();
      const withinWindow =
        now - new Date(entry.createdAt).getTime() < input.withinMs;

      return sameName && sameMessage && withinWindow;
    });

    return duplicate ?? null;
  }

  const { data, error } = await supabase
    .from("guestbook_entries")
    .select("id,name,message,created_at")
    .eq("name", input.name)
    .eq("message", input.message)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  if (!data) {
    return null;
  }

  const latest = mapRowToEntry(data);
  const createdAtMs = new Date(latest.createdAt).getTime();
  const isRecent = Date.now() - createdAtMs < input.withinMs;

  return isRecent ? latest : null;
}
