import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { format } from "date-fns";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Safely formats a date from various formats (Firestore Timestamp, number, Date object, etc.)
 */
export function formatDate(date: any, formatStr: string = "MMM dd, yyyy") {
  if (!date) return "N/A";
  
  try {
    let validDate: Date;
    
    // Handle Firestore Timestamp
    if (date && typeof date.toDate === "function") {
      validDate = date.toDate();
    } 
    // Handle milliseconds or date string
    else {
      validDate = new Date(date);
    }
    
    // Check if valid
    if (isNaN(validDate.getTime())) {
      return "Invalid Date";
    }
    
    return format(validDate, formatStr);
  } catch (error) {
    console.error("Error formatting date:", error);
    return "Invalid Date";
  }
}

/**
 * Generates a Gmail compose link for a recipient, subject, and body.
 */
export function getGmailLink(to: string, subject: string = "", body: string = "") {
  const baseUrl = "https://mail.google.com/mail/?view=cm&fs=1";
  const params = new URLSearchParams();
  params.append("to", to);
  if (subject) params.append("su", subject);
  if (body) params.append("body", body);
  return `${baseUrl}&${params.toString()}`;
}
