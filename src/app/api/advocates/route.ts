import db from "../../../db";
import { advocates } from "../../../db/schema";
import { Advocate } from "@/types/advocate";

export async function GET() {
  const data = await db.select().from(advocates) as Advocate[];

  return Response.json({ data });
}