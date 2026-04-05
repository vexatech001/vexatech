export type LeadStatus = "new" | "contacted" | "in_progress" | "closed";

export interface Lead {
  id?: string;
  fullName: string;
  email: string;
  phone: string;
  serviceRequired: string;
  projectBudget: string;
  message: string;
  createdAt: number;
  updatedAt: number;
  status: LeadStatus;
  source: string;
  adminNotes?: string;
}
