import db from "../../../db";
import { sql, asc } from "drizzle-orm";
import { advocates } from "../../../db/schema";
import { Advocate } from "@/types/advocate";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const page = Number(searchParams.get("page") ?? 0);
  const limit = Number(searchParams.get("limit") ?? 5);
  const offset = page * limit;

  const data = (await db
    .select()
    .from(advocates)
    .orderBy(asc(advocates.id))
    .limit(limit)
    .offset(offset)) as Advocate[];

  const [{ count }] = (await db.execute(
    sql<{ count: number }[]>`
        SELECT COUNT(*) as count FROM ${advocates}
      `
  )) as { count: number }[];

  return Response.json({ data, total: count });
}
