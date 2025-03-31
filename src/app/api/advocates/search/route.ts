import db from "@/db";
import { sql, asc } from "drizzle-orm";
import { advocates } from "@/db/schema";
import { Advocate } from "@/types/advocate";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const page = Number(searchParams.get("page") ?? 0);
  const limit = Number(searchParams.get("limit") ?? 5);
  const offset = page * limit;
  const search = searchParams.get("search")?.toLowerCase() ?? "";

  if (!search) {
    return Response.json({ data: [], total: 0 });
  }

  const query = sql`
    ${advocates.firstName} ILIKE ${`%${search}%`} OR 
    ${advocates.lastName} ILIKE ${`%${search}%`} OR 
    ${advocates.city} ILIKE ${`%${search}%`} OR 
    ${advocates.degree} ILIKE ${`%${search}%`} OR 
    (${advocates.specialties})::text ILIKE ${`%${search}%`}
  `;

  const data = (await db
    .select()
    .from(advocates)
    .where(query)
    .orderBy(asc(advocates.id))
    .limit(limit)
    .offset(offset)) as Advocate[];

  const [{ count }] = await db
    .select({ count: sql<number>`COUNT(*)` })
    .from(advocates)
    .where(query);

  return Response.json({ data, total: count });
}
