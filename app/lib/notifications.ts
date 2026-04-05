import nodemailer from "nodemailer";
import twilio from "twilio";
import { Lead } from "../types/lead";
import { sendWhatsAppLeadAlert } from "./twilio";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

// WhatsApp client now handled in twilio.ts

export async function sendLeadNotifications(lead: Lead) {
  // 1. Email Admin
  const mailOptions = {
    from: `"VEXA TECH System" <${process.env.GMAIL_USER}>`,
    to: process.env.GMAIL_USER,
    subject: `New Lead: ${lead.fullName} for ${lead.serviceRequired}`,
    html: `
      <div style="font-family: sans-serif; color: #333; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
        <h2 style="color: #0f62fe;">New Lead Alert</h2>
        <p><strong>Name:</strong> ${lead.fullName}</p>
        <p><strong>Email:</strong> ${lead.email}</p>
        <p><strong>Phone:</strong> ${lead.phone}</p>
        <p><strong>Service:</strong> ${lead.serviceRequired}</p>
        <p><strong>Budget:</strong> ${lead.projectBudget}</p>
        <p><strong>Message:</strong></p>
        <p style="background: #f4f4f4; padding: 10px; border-radius: 5px;">${lead.message}</p>
        <p style="font-size: 12px; color: #888; margin-top: 20px;">Received at: ${new Date(lead.createdAt).toLocaleString()}</p>
      </div>
    `,
  };

  // 2. Email User Confirmation
  const userMailOptions = {
    from: `"VEXA TECH" <${process.env.GMAIL_USER}>`,
    to: lead.email,
    subject: `We've received your inquiry - VEXA TECH`,
    html: `
      <div style="font-family: sans-serif; color: #333; padding: 30px; line-height: 1.6;">
        <h1 style="color: #0f62fe; margin-bottom: 20px;">Hi ${lead.fullName},</h1>
        <p>Thank you for reaching out to **VEXA TECH**. We've successfully received your inquiry for **${lead.serviceRequired}**.</p>
        <p>Our team is currently reviewing your details. You can expect to hear from one of our specialists within the next 24 business hours.</p>
        <br />
        <p>Best Regards,</p>
        <p><strong>VEXA TECH Team</strong></p>
        <hr style="border: none; border-top: 1px solid #eee; margin-top: 40px;" />
        <p style="font-size: 11px; color: #999;">This is an automated confirmation. Please do not reply directly to this email.</p>
      </div>
    `,
  };

  try {
    const notifications: Promise<any>[] = [
      transporter.sendMail(mailOptions),
      transporter.sendMail(userMailOptions),
    ];

    // 3. Trigger WhatsApp alert via new Twilio helper
    notifications.push(
      sendWhatsAppLeadAlert({
        name: lead.fullName,
        email: lead.email,
        phone: lead.phone,
        message: lead.message,
      })
    );

    await Promise.allSettled(notifications);
  } catch (error) {
    console.error("Error sending notifications", error);
  }
}
