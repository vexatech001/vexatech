"use client";

import Sidebar from "@/app/components/admin/Sidebar";
import { usePathname } from "next/navigation";
import { metadata } from "@/app/layout";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/admin/login";

  if (isLoginPage) {
    return (
      <div className="bg-gray-50 min-h-screen selection:bg-blue-100 selection:text-blue-700">
        <main>{children}</main>
      </div>
    );
  }

  return (
    <div className="bg-gray-50/50 min-h-screen selection:bg-blue-100 selection:text-blue-700">
      <Sidebar />
      <main className="pl-72 min-h-screen">
        <div className="p-12 max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
