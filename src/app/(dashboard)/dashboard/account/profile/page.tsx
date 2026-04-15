"use client";

import { useAuth, useUser } from "@clerk/nextjs";
import Link from "next/link";
import { Briefcase, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";

export default function ProfilePage() {
  const { user, isLoaded, isSignedIn } = useUser();
  const { getToken } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
  });

  useEffect(() => {
    if (!isLoaded || !user) return;
    setForm({
      firstName: user.firstName || "",
      lastName: user.lastName || "",
      email: user.primaryEmailAddress?.emailAddress || "",
      phoneNumber: user.phoneNumbers?.[0]?.phoneNumber || "",
    });
  }, [isLoaded, user]);

  const onSave = async () => {
    if (!isSignedIn) return;
    setIsSaving(true);
    try {
      const token = await getToken();
      const res = await fetch("/api/dashboard/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        credentials: "include",
        body: JSON.stringify({
          firstName: form.firstName,
          lastName: form.lastName,
        }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err?.error || "Failed to update profile");
      }

      await user?.reload();
      setIsEditing(false);
    } catch (e) {
      console.error("[profile] update failed:", e);
      alert("Profile update failed. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="p-8 max-w-5xl mx-auto animate-in fade-in duration-500">
      
      {/* Breadcrumbs & Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 text-sm font-bold text-gray-600 mb-4">
          <Link href="/dashboard/account" className="hover:text-[#ff6b00] transition-colors">My Account</Link>
          <ChevronRight className="w-4 h-4 text-gray-400" />
          <span className="text-[#ff6b00]">Profile</span>
        </div>
        <h1 className="text-4xl font-black text-gray-900 tracking-tight">
          Profile
        </h1>
      </div>

      {/* Personal Information Box */}
      <div className="bg-gray-50/50 rounded-[2rem] p-10 mb-8 border border-gray-100">
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-2xl font-bold text-gray-900">Personal Information</h2>
          {isEditing ? (
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsEditing(false)}
                className="text-gray-600 font-bold text-sm hover:text-gray-900 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={onSave}
                disabled={isSaving}
                className="text-[#ff6b00] font-bold text-lg hover:opacity-80 transition-opacity border-b-2 border-dashed border-[#ff6b00] disabled:opacity-50"
              >
                {isSaving ? "Saving..." : "Save"}
              </button>
            </div>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="text-[#ff6b00] font-bold text-lg hover:opacity-80 transition-opacity border-b-2 border-dashed border-[#ff6b00]"
            >
              Edit
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-10 gap-x-12">
          
          <div>
            <p className="text-sm font-bold text-gray-400 mb-2">First Name</p>
            {isEditing ? (
              <input
                value={form.firstName}
                onChange={(e) => setForm((prev) => ({ ...prev, firstName: e.target.value }))}
                className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-base font-semibold text-gray-900 outline-none focus:border-[#ff6b00]"
              />
            ) : (
              <p className="text-lg font-semibold text-gray-900">{user?.firstName || "N/A"}</p>
            )}
          </div>
          
          <div>
            <p className="text-sm font-bold text-gray-400 mb-2">Last Name</p>
            {isEditing ? (
              <input
                value={form.lastName}
                onChange={(e) => setForm((prev) => ({ ...prev, lastName: e.target.value }))}
                className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-base font-semibold text-gray-900 outline-none focus:border-[#ff6b00]"
              />
            ) : (
              <p className="text-lg font-semibold text-gray-900">{user?.lastName || "N/A"}</p>
            )}
          </div>
          
          <div>
            <p className="text-sm font-bold text-gray-400 mb-2">E-mail address</p>
            <p className="text-lg font-semibold text-gray-900">{form.email || "N/A"}</p>
          </div>
          
          <div>
            <p className="text-sm font-bold text-gray-400 mb-2">Phone Number</p>
            <p className="text-lg font-semibold text-gray-900">{form.phoneNumber || "N/A"}</p>
          </div>

        </div>
      </div>

      {/* Business Account Banner */}
      <div className="bg-[#fff9f0] border border-[#ffe0b2] rounded-[2rem] p-6 md:p-8 flex flex-col md:flex-row items-center md:items-start text-center md:text-left gap-6">
        <div className="w-16 h-16 md:w-12 md:h-12 rounded-xl bg-[#2C303A] flex flex-shrink-0 items-center justify-center text-white md:mt-1 shadow-md">
          <Briefcase className="w-8 h-8 md:w-6 md:h-6" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-[#ff6b00] mb-2">Representing a Company?</h3>
          <p className="text-[15px] font-medium text-[#d97706] mb-3 leading-relaxed">
            Enterprise services such as Statement of Accounts(SOA/Ledger) and Payment Terms are only available through an approved 
            <br />
            <Link href="/dashboard/business" className="font-bold border-b-2 border-dashed border-[#ff6b00] ml-1 mt-1 inline-block">
              Business Account
            </Link>
          </p>
        </div>
      </div>

    </div>
  );
}
