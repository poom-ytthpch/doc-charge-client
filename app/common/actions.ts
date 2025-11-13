"use server";
import { cookies } from "next/headers";

export async function set(key: string, val: string): Promise<void> {
  (await cookies()).set(key, val, {
    secure: process.env.N_ENV === "production",
    maxAge: 60 * 60 * 24,
  });
}

export async function get(key: string): Promise<string> {
  return (await cookies()).get(key)?.value || "";
}

export async function remove(key: string): Promise<void> {
  await (await cookies()).delete(key);
}

export async function clear() {
  const getAll = await (await cookies()).getAll();
  for (const cookie of getAll) {
    await (await cookies()).delete(cookie.name);
  }
}
