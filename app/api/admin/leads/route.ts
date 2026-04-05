import { NextResponse } from "next/server";
import { db } from "../../../lib/firebase-admin";
import { cookies } from "next/headers";
import { verifyToken } from "../../../lib/auth";

async function isAuthorized() {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_token")?.value;
  if (!token) return false;
  return verifyToken(token);
}

export async function GET() {
  if (!await isAuthorized()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const snapshot = await db.collection("leads").orderBy("createdAt", "desc").get();
    const leads = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return NextResponse.json(leads);
  } catch (e) {
    return NextResponse.json({ error: "Failed to fetch leads" }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  if (!await isAuthorized()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id, ...updates } = await req.json();
    if (!id) return NextResponse.json({ error: "Missing ID" }, { status: 400 });

    await db.collection("leads").doc(id).update({
      ...updates,
      updatedAt: Date.now(),
    });

    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json({ error: "Failed to update lead" }, { status: 500 });
  }
}
