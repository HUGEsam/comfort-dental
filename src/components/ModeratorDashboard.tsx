'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import {
  ArrowLeft,
  ShieldCheck,
  CheckCircle,
  Clock,
  Phone,
  Mail,
  Share2,
  MessageSquare,
  Search,
  Filter,
} from 'lucide-react';

export default function ModeratorDashboard() {
  const { setCurrentView, inquiries, updateInquiryStatus } = useApp();
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
    <div className="min-h-screen bg-[#030712] text-white pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Top bar */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <button
            onClick={() => setCurrentView('home')}
            className="flex items-center gap-2 text-xs font-bold text-cyan-400 hover:text-white px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Homepage</span>
          </button>

          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wide">
              Moderator & Clinical Staff Session
            </span>
          </div>
        </div>

        {/* Header Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
            <span className="text-xs text-slate-400">Total Patient Inquiries</span>
            <div className="text-2xl font-bold text-white mt-1">{inquiries.length}</div>
          </div>
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
            <span className="text-xs text-slate-400">Pending Staff Review</span>
            <div className="text-2xl font-bold text-amber-400 mt-1">
              {inquiries.filter((i) => i.status === 'pending').length}
            </div>
          </div>
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
            <span className="text-xs text-slate-400">Verified & Forwarded</span>
            <div className="text-2xl font-bold text-emerald-400 mt-1">
              {inquiries.filter((i) => i.status === 'verified').length}
            </div>
          </div>
        </div>

        {/* Control Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search patient, phone, service..."
              className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white"
            />
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold ${filter === 'all' ? 'bg-[#00A8E8] text-white' : 'bg-slate-800 text-slate-400'}`}
            >
              All Inquiries
            </button>
            <button
              onClick={() => setFilter('pending')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold ${filter === 'pending' ? 'bg-[#00A8E8] text-white' : 'bg-slate-800 text-slate-400'}`}
            >
              Pending
            </button>
            <button
              onClick={() => setFilter('verified')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold ${filter === 'verified' ? 'bg-[#00A8E8] text-white' : 'bg-slate-800 text-slate-400'}`}
            >
              Verified
            </button>
          </div>
        </div>

        {/* Inquiries Table */}
        <div className="rounded-2xl bg-slate-900/90 border border-slate-800 overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950 text-slate-400 uppercase font-bold border-b border-slate-800">
                <tr>
                  <th className="p-4">Patient & Phone</th>
                  <th className="p-4">Requested Service</th>
                  <th className="p-4">Consultant</th>
                  <th className="p-4">Feedback / Notes</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80">
                {filteredInquiries.map((inq) => (
                  <tr key={inq.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="p-4">
                      <div className="font-bold text-white">{inq.patientName}</div>
                      <div className="text-slate-400 font-mono text-[11px]">{inq.phone}</div>
                    </td>
                    <td className="p-4">
                      <span className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700 font-medium">
                        {inq.service}
                      </span>
                    </td>
                    <td className="p-4 text-cyan-300 font-medium">
                      {inq.preferredDoctor}
                    </td>
                    <td className="p-4 text-slate-300 max-w-xs truncate">
                      {inq.notes || (inq.feedbackText ? `★${inq.feedbackRating}: ${inq.feedbackText}` : 'N/A')}
                    </td>
                    <td className="p-4">
                      <span
                        className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          inq.status === 'verified'
                            ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                            : 'bg-amber-950 text-amber-300 border border-amber-800'
                        }`}
                      >
                        {inq.status}
                      </span>
                    </td>
                    <td className="p-4 text-right space-x-2">
                      {inq.status === 'pending' && (
                        <button
                          onClick={() => updateInquiryStatus(inq.id, 'verified')}
                          className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[11px]"
                        >
                          Verify & Confirm
                        </button>
                      )}
                      <a
                        href={`https://wa.me/88${inq.phone.replace(/[^0-9]/g, '')}?text=Hello%20${encodeURIComponent(inq.patientName)},%20this%20is%20Comfort%20Dental%20Surgery%20regarding%20your%20consultation`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-300 font-bold text-[11px] inline-block"
                      >
                        WhatsApp
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
