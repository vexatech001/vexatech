import { NextResponse } from "next/server";
import { sendLeadNotifications } from "../../lib/notifications";
import { Lead } from "../../types/lead";

export async function POST(req: Request) {
  console.log("API route started");
  try {
    const data = await req.json();
    console.log("Lead data received:", data);
    
    // Basic validation
    if (!data.fullName || !data.email || !data.serviceRequired || !data.message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Prepare lead object for notifications (consistent with database record)
    const notificationLead: Lead = {
      ...data,
      status: "new",
      createdAt: Date.now(),
      updatedAt: Date.now(),
      source: "website_contact_form",
      adminNotes: "",
    };

    // Trigger Notifications (Email/WhatsApp)
    // We catch errors here to ensure the API still returns a 200 if the notification 
    // part fails but lead was saved on client.
    try {
      await sendLeadNotifications(notificationLead);
    } catch (notificationError) {
      console.error("Notification system error:", notificationError);
    }

    return NextResponse.json({ 
      success: true, 
      message: "Notification trigger complete" 
    }, { status: 200 });

  } catch (error: any) {
    console.error("Notification API failure:", error);
    return NextResponse.json({ 
      error: "Internal Server Error", 
      details: error.message || "Unknown error occurred" 
    }, { status: 500 });
  }
}
