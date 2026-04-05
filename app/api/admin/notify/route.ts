import { NextRequest, NextResponse } from "next/server";
import { db } from "@/app/lib/firebase-admin";
import { sendLeadNotifications } from "@/app/lib/notifications";
import { Lead } from "@/app/types/lead";
import { verifyToken } from "@/app/lib/auth";

export async function POST(req: NextRequest) {
  try {
    // 1. Auth check
    const token = req.cookies.get("admin_token")?.value;
    if (!token || !verifyToken(token)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { leadId, action } = await req.json();

    // 2. Fetch Lead
    const leadDoc = await db.collection("leads").doc(leadId).get();
    if (!leadDoc.exists) {
      return NextResponse.json({ error: "Lead not found" }, { status: 404 });
    }

    const lead = { id: leadDoc.id, ...leadDoc.data() } as Lead;

    // 3. Perform Action
    if (action === "email" || action === "whatsapp") {
      // For now, we'll use the existing notification system which handles both.
      // In a real enterprise app, you'd have more granular templates here.
      await sendLeadNotifications(lead);
    }

    return NextResponse.json({ success: true, message: `Notification sent for ${lead.fullName}` });

  } catch (error: any) {
    console.error("Dashboard notification failure:", error);
    return NextResponse.json({ error: "Failed to send notification", details: error.message }, { status: 500 });
  }
}
