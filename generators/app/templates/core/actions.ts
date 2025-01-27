"use server";

import { db } from "@/db";
import { responses } from "@/db/schemas";
import { SqliteError } from "better-sqlite3";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function contactUsAction(formData: FormData) {
  console.log("In actions.ts... saving data allegedly");
  try {
    await db.insert(responses).values({
      id: crypto.randomUUID(),
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      message: formData.get("message") as string,
    });
  } catch (err) {
    if (err instanceof SqliteError) {
      return {
        success: false,
        error: err.message,
      };
    }
  }
  redirect("/responses");
}

export async function removeResponse(id: string) {
  try {
    await db.delete(responses).where(eq(responses.id, id));
    revalidatePath("/responses");
  } catch (err) {
    if (err instanceof SqliteError) {
      return {
        success: false,
        error: err.message,
      };
    }
  }
}
