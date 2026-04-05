import Twilio from "twilio";

const client = Twilio(
  process.env.TWILIO_ACCOUNT_SID!,
  process.env.TWILIO_AUTH_TOKEN!
);

export async function sendWhatsAppLeadAlert(data: {
  name: string;
  email: string;
  phone?: string;
  message: string;
}) {
  const body =
    `🔥 New VEXA TECH Lead\n\n` +
    `Name: ${data.name}\n` +
    `Email: ${data.email}\n` +
    `Phone: ${data.phone || "Not provided"}\n` +
    `Message: ${data.message}`;

  const recipients = [
    process.env.TWILIO_WHATSAPP_TO_1,
    process.env.TWILIO_WHATSAPP_TO_2,
  ].filter(Boolean);

  console.log("Twilio recipients:", recipients);
  console.log("Twilio from:", process.env.TWILIO_WHATSAPP_FROM);
  console.log("Twilio body:", body);

  const results = await Promise.allSettled(
    recipients.map((to) =>
      client.messages.create({
        from: process.env.TWILIO_WHATSAPP_FROM!,
        to: to as string,
        body,
      })
    )
  );

  console.log("Twilio send results:", results);

  return results;
}
