'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import {
  Search,
  CheckCircle,
  MessageCircle,
} from 'lucide-react';

export default function ModeratorDashboard() {
  const { inquiries, updateInquiryStatus } = useApp();
  const [filter, setFilter] = useState<'all' | 'pending' | 'verified'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredInquiries = inquiries.filter((inq) => {
    const matchesFilter = filter === 'all' || inq.status === filter;
    const matchesSearch =
      inq.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inq.phone.includes(searchTerm) ||
      inq.service.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#F9FAFC] text-[#0A0A0C] pt-28 md:pt-36 pb-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Top Navigation Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[rgba(10,132,255,0.12)]">
          <span className="text-base font-extrabold text-[#0A0A0C]">
            Clinical Moderation Queue
          </span>

          <div className="btn-liquid-chip text-[#059669]">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Active Queue</span>
          </div>
        </div>

        {/* Summary Metrics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="squircle-card p-5">
            <span className="text-xs font-semibold text-[#8E8E93]">Total Patient Inquiries</span>
            <div className="text-3xl font-extrabold text-[#0A0A0C] mt-1">{inquiries.length}</div>
          </div>
          <div className="squircle-card p-5">
            <span className="text-xs font-semibold text-[#8E8E93]">Pending Staff Review</span>
            <div className="text-3xl font-extrabold text-amber-500 mt-1">
              {inquiries.filter((i) => i.status === 'pending').length}
            </div>
          </div>
          <div className="squircle-card p-5">
            <span className="text-xs font-semibold text-[#8E8E93]">Verified & Forwarded</span>
            <div className="text-3xl font-extrabold text-[#059669] mt-1">
              {inquiries.filter((i) => i.status === 'verified').length}
            </div>
          </div>
        </div>

        {/* Search & Filter Control Pill Bar */}
        <div className="squircle-card p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-[#8E8E93] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search patient, phone, service..."
              className="squircle-input w-full pl-10 pr-4 py-2.5 text-xs text-[#0A0A0C]"
            />
          </div>

          <div className="flex gap-2 flex-wrap">
            {(['all', 'pending', 'verified'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setFilter(tab)}
                className={
                  filter === tab
                    ? 'btn-water-primary !py-2 !px-4 !text-xs capitalize'
                    : 'btn-liquid-chip capitalize'
                }
              >
                {tab === 'all' ? 'All Inquiries' : tab}
              </button>
            ))}
          </div>
        </div>

        {/* Inquiries Queue (Apple Frosted Glass Table) */}
        <div className="squircle-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#F2F2F7]/90 text-[#8E8E93] uppercase font-bold border-b border-slate-200/70">
                <tr>
                  <th className="p-4">Patient & Phone</th>
                  <th className="p-4">Requested Service</th>
                  <th className="p-4">Consultant</th>
                  <th className="p-4">Notes</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200/60">
                {filteredInquiries.map((inq) => (
                  <tr key={inq.id} className="hover:bg-white/75 transition-colors">
                    <td className="p-4">
                      <div className="font-bold text-[#0A0A0C]">{inq.patientName}</div>
                      <div className="text-[#8E8E93] font-mono text-[11px]">{inq.phone}</div>
                    </td>
                    <td className="p-4">
                      <span className="btn-liquid-chip !py-1 !px-2.5 !text-[11px] text-[#007AFF]">
                        {inq.service}
                      </span>
                    </td>
                    <td className="p-4 text-[#007AFF] font-semibold">
                      {inq.preferredDoctor}
                    </td>
                    <td className="p-4 text-[#3C3C43] max-w-xs truncate">
                      {inq.notes || (inq.feedbackText ? `★${inq.feedbackRating}: ${inq.feedbackText}` : 'N/A')}
                    </td>
                    <td className="p-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          inq.status === 'verified'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : 'bg-amber-50 text-amber-700 border border-amber-200'
                        }`}
                      >
                        {inq.status}
                      </span>
                    </td>
                    <td className="p-4 text-right space-x-2 whitespace-nowrap">
                      {inq.status === 'pending' && (
                        <button
                          onClick={() => updateInquiryStatus(inq.id, 'verified')}
                          className="btn-liquid-emerald !py-1.5 !px-3 !text-[11px]"
                        >
                          <CheckCircle className="w-3.5 h-3.5" />
                          <span>Verify</span>
                        </button>
                      )}
                      <a
                        href={`https://wa.me/88${inq.phone.replace(/[^0-9]/g, '')}?text=Hello%20${encodeURIComponent(
                          inq.patientName
                        )},%20this%20is%20Comfort%20Dental%20Surgery%20regarding%20your%20consultation`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-water-secondary !py-1.5 !px-3 !text-[11px]"
                      >
                        <MessageCircle className="w-3.5 h-3.5 text-[#059669]" />
                        <span>WhatsApp</span>
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
