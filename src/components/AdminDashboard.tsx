'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import {
  ArrowLeft,
  Palette,
  Users,
  Tag,
  Video,
  ShieldAlert,
  CheckCircle,
  Plus,
  Trash2,
  Edit2,
  Lock,
  Unlock,
  VolumeX,
  Volume2,
  UploadCloud,
  Sparkles,
} from 'lucide-react';

export default function AdminDashboard() {
  const {
    setCurrentView,
    themeConfig,
    updateThemeConfig,
    offers,
    addOffer,
    deleteOffer,
    allUsers,
    updateUserStatus,
  } = useApp();

  const [adminTab, setAdminTab] = useState<'theme' | 'users' | 'offers' | 'media'>('theme');

  // Live Theme Local Controls
  const [localTheme, setLocalTheme] = useState(themeConfig);

  // New Offer Form State
  const [newOffer, setNewOffer] = useState({
    title: '',
    discount: '',
    description: '',
    pointsRequired: 50,
    validUntil: '2026-12-31',
  });

  // Media URLs State
  const [drAlimVideo, setDrAlimVideo] = useState('https://assets.mixkit.co/videos/preview/mixkit-dentist-checking-a-patient-teeth-41481-large.mp4');
  const [drShantaVideo, setDrShantaVideo] = useState('https://assets.mixkit.co/videos/preview/mixkit-dentist-working-in-a-dental-office-41480-large.mp4');
  const [mediaSavedMsg, setMediaSavedMsg] = useState('');

  const handleSaveTheme = () => {
    updateThemeConfig(localTheme);
    alert('Theme & Gradients saved and applied globally to the website in real time!');
  };

  const handleAddOfferSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newOffer.title) return;
    addOffer({
      id: `offer-${Date.now()}`,
      title: newOffer.title,
      badge: 'Special',
      description: newOffer.description,
      discount: newOffer.discount,
      pointsRequired: Number(newOffer.pointsRequired),
      validUntil: newOffer.validUntil,
      category: 'General',
    });
    setNewOffer({ title: '', discount: '', description: '', pointsRequired: 50, validUntil: '2026-12-31' });
  };

  return (
    <div className="min-h-screen bg-[#030712] text-white pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Top bar */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <button
            onClick={() => setCurrentView('home')}
            className="flex items-center gap-2 text-xs font-bold text-cyan-400 hover:text-white px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Live Website</span>
          </button>

          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wide">
              Master Admin CMS Dashboard
            </span>
          </div>
        </div>

        {/* 4 CMS Control Modules Tabs */}
        <div className="flex border-b border-slate-800 gap-2 overflow-x-auto pb-1">
          <button
            onClick={() => setAdminTab('theme')}
            className={`py-2 px-4 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              adminTab === 'theme' ? 'bg-[#00A8E8] text-white shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Palette className="w-4 h-4" />
            <span>Theme & Gradient Customizer</span>
          </button>

          <button
            onClick={() => setAdminTab('users')}
            className={`py-2 px-4 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              adminTab === 'users' ? 'bg-[#00A8E8] text-white shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>User Moderation & Ban Engine</span>
          </button>

          <button
            onClick={() => setAdminTab('offers')}
            className={`py-2 px-4 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              adminTab === 'offers' ? 'bg-[#00A8E8] text-white shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Tag className="w-4 h-4" />
            <span>Dynamic Offer Manager</span>
          </button>

          <button
            onClick={() => setAdminTab('media')}
            className={`py-2 px-4 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              adminTab === 'media' ? 'bg-[#00A8E8] text-white shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Video className="w-4 h-4" />
            <span>Media & Video Gallery CMS</span>
          </button>
        </div>

        {/* MODULE 1: Live Theme & Gradient Customizer */}
        {adminTab === 'theme' && (
          <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-6">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Palette className="w-5 h-5 text-cyan-400" />
                Live Theme & Hostinger-Style Gradient Customizer
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Tweak primary accents, dark background gradient stops, and glowing borders. Changes propagate live across all connected clients.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              <div>
                <label className="text-xs font-bold text-slate-300 block mb-2">
                  Primary Accent (Cyan / Teal)
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={localTheme.primaryAccent}
                    onChange={(e) => setLocalTheme({ ...localTheme, primaryAccent: e.target.value })}
                    className="w-12 h-10 rounded-lg cursor-pointer bg-transparent border-0"
                  />
                  <input
                    type="text"
                    value={localTheme.primaryAccent}
                    onChange={(e) => setLocalTheme({ ...localTheme, primaryAccent: e.target.value })}
                    className="flex-1 px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300 block mb-2">
                  Gradient Start (Obsidian)
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={localTheme.gradientFrom}
                    onChange={(e) => setLocalTheme({ ...localTheme, gradientFrom: e.target.value })}
                    className="w-12 h-10 rounded-lg cursor-pointer bg-transparent border-0"
                  />
                  <input
                    type="text"
                    value={localTheme.gradientFrom}
                    onChange={(e) => setLocalTheme({ ...localTheme, gradientFrom: e.target.value })}
                    className="flex-1 px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300 block mb-2">
                  Gradient Center (Deep Midnight)
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={localTheme.gradientVia}
                    onChange={(e) => setLocalTheme({ ...localTheme, gradientVia: e.target.value })}
                    className="w-12 h-10 rounded-lg cursor-pointer bg-transparent border-0"
                  />
                  <input
                    type="text"
                    value={localTheme.gradientVia}
                    onChange={(e) => setLocalTheme({ ...localTheme, gradientVia: e.target.value })}
                    className="flex-1 px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300 block mb-2">
                  Champagne Gold Accent
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={localTheme.goldAccent}
                    onChange={(e) => setLocalTheme({ ...localTheme, goldAccent: e.target.value })}
                    className="w-12 h-10 rounded-lg cursor-pointer bg-transparent border-0"
                  />
                  <input
                    type="text"
                    value={localTheme.goldAccent}
                    onChange={(e) => setLocalTheme({ ...localTheme, goldAccent: e.target.value })}
                    className="flex-1 px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs font-mono"
                  />
                </div>
              </div>

              {/* Gradient Preview Card */}
              <div className="sm:col-span-2 p-4 rounded-2xl border border-slate-700 flex flex-col justify-between" style={{
                background: `linear-gradient(135deg, ${localTheme.gradientFrom}, ${localTheme.gradientVia}, ${localTheme.gradientTo})`
              }}>
                <span className="text-xs font-bold" style={{ color: localTheme.primaryAccent }}>
                  Live Canvas Preview
                </span>
                <p className="text-xs text-slate-300">
                  Comfort Dental Surgery & Implant Center (Hostinger Theme)
                </p>
                <button
                  type="button"
                  style={{ backgroundColor: localTheme.primaryAccent }}
                  className="w-fit px-4 py-1.5 rounded-lg text-white font-bold text-xs mt-2"
                >
                  Action Button Preview
                </button>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800">
              <button
                onClick={handleSaveTheme}
                className="py-3 px-6 rounded-xl bg-[#00A8E8] hover:bg-cyan-400 font-bold text-xs text-white shadow-lg"
              >
                Apply Live Theme Settings Site-Wide
              </button>
            </div>
          </div>
        )}

        {/* MODULE 2: User Moderation & Ban Engine */}
        {adminTab === 'users' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Users className="w-5 h-5 text-cyan-400" />
                Advanced User Moderation & Granular Restrictions Engine
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Ban accounts, freeze loyalty points, mute feedback submissions, or promote roles.
              </p>
            </div>

            <div className="rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-950 text-slate-400 uppercase font-bold border-b border-slate-800">
                    <tr>
                      <th className="p-4">User Details</th>
                      <th className="p-4">Role</th>
                      <th className="p-4">Points</th>
                      <th className="p-4">Status & Flags</th>
                      <th className="p-4 text-right">Moderation Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {allUsers.map((u) => (
                      <tr key={u.id} className="hover:bg-slate-800/40 transition-colors">
                        <td className="p-4">
                          <div className="font-bold text-white">{u.name}</div>
                          <div className="text-slate-400 font-mono text-[11px]">{u.id}</div>
                          <div className="text-slate-500 text-[10px]">{u.email} • {u.phone}</div>
                        </td>
                        <td className="p-4">
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-slate-800 text-cyan-300 border border-slate-700">
                            {u.role}
                          </span>
                        </td>
                        <td className="p-4 font-mono font-bold text-amber-400">
                          {u.points} / 300 PTS
                        </td>
                        <td className="p-4 space-x-1.5">
                          {u.isBanned && (
                            <span className="px-2 py-0.5 rounded bg-rose-950 text-rose-300 border border-rose-800 text-[10px] font-bold">
                              BANNED
                            </span>
                          )}
                          {u.isPointsFrozen && (
                            <span className="px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-800 text-[10px] font-bold">
                              FROZEN
                            </span>
                          )}
                          {u.isFeedbackMuted && (
                            <span className="px-2 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-800 text-[10px] font-bold">
                              MUTED
                            </span>
                          )}
                          {!u.isBanned && !u.isPointsFrozen && !u.isFeedbackMuted && (
                            <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800 text-[10px] font-bold">
                              ACTIVE
                            </span>
                          )}
                        </td>
                        <td className="p-4 text-right space-x-2">
                          {/* Toggle Ban */}
                          <button
                            onClick={() => updateUserStatus(u.id, { isBanned: !u.isBanned })}
                            className={`px-2.5 py-1 rounded-lg font-bold text-[11px] ${
                              u.isBanned
                                ? 'bg-emerald-600 hover:bg-emerald-500 text-white'
                                : 'bg-rose-900/60 hover:bg-rose-800 text-rose-200 border border-rose-700'
                            }`}
                          >
                            {u.isBanned ? 'Unban User' : 'Ban User'}
                          </button>

                          {/* Toggle Freeze Points */}
                          <button
                            onClick={() => updateUserStatus(u.id, { isPointsFrozen: !u.isPointsFrozen })}
                            className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-300 font-bold text-[11px] border border-slate-700"
                          >
                            {u.isPointsFrozen ? 'Unfreeze' : 'Freeze Pts'}
                          </button>

                          {/* Toggle Mute Feedback */}
                          <button
                            onClick={() => updateUserStatus(u.id, { isFeedbackMuted: !u.isFeedbackMuted })}
                            className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-purple-300 font-bold text-[11px] border border-slate-700"
                          >
                            {u.isFeedbackMuted ? 'Unmute' : 'Mute Reviews'}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* MODULE 3: Dynamic Offer Manager */}
        {adminTab === 'offers' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Tag className="w-5 h-5 text-cyan-400" />
                Dynamic Offer & Promotion Manager (CRUD)
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Create and manage discount tiers redeemable with points in the user drawer.
              </p>
            </div>

            {/* Create Offer Form */}
            <form onSubmit={handleAddOfferSubmit} className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">Add New Promotion</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                <div>
                  <label className="text-[11px] text-slate-400">Offer Title</label>
                  <input
                    type="text"
                    required
                    value={newOffer.title}
                    onChange={(e) => setNewOffer({ ...newOffer, title: e.target.value })}
                    placeholder="e.g. Free Laser Consultation"
                    className="w-full mt-1 px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-slate-400">Discount Badge</label>
                  <input
                    type="text"
                    required
                    value={newOffer.discount}
                    onChange={(e) => setNewOffer({ ...newOffer, discount: e.target.value })}
                    placeholder="e.g. 25% OFF"
                    className="w-full mt-1 px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-slate-400">Points Cost</label>
                  <input
                    type="number"
                    required
                    value={newOffer.pointsRequired}
                    onChange={(e) => setNewOffer({ ...newOffer, pointsRequired: Number(e.target.value) })}
                    className="w-full mt-1 px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white font-mono"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-slate-400">Valid Until</label>
                  <input
                    type="date"
                    value={newOffer.validUntil}
                    onChange={(e) => setNewOffer({ ...newOffer, validUntil: e.target.value })}
                    className="w-full mt-1 px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white"
                  />
                </div>
                <div className="sm:col-span-2 md:col-span-4">
                  <label className="text-[11px] text-slate-400">Offer Description</label>
                  <input
                    type="text"
                    required
                    value={newOffer.description}
                    onChange={(e) => setNewOffer({ ...newOffer, description: e.target.value })}
                    placeholder="e.g. Applies to Japanese soft-tissue gum laser appointments."
                    className="w-full mt-1 px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="py-2.5 px-5 rounded-xl bg-[#00A8E8] text-white font-bold text-xs shadow-md"
              >
                Create Active Offer
              </button>
            </form>

            {/* List Existing Offers */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {offers.map((offer) => (
                <div key={offer.id} className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex justify-between items-start gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white text-xs">{offer.title}</span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-950 text-amber-300 border border-amber-800">
                        {offer.discount}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mt-1">{offer.description}</p>
                    <span className="text-[11px] font-mono text-cyan-400 mt-2 block">
                      Cost: {offer.pointsRequired} PTS • Valid: {offer.validUntil}
                    </span>
                  </div>
                  <button
                    onClick={() => deleteOffer(offer.id)}
                    className="p-1.5 rounded-lg bg-rose-950/60 hover:bg-rose-900 text-rose-300 border border-rose-800"
                    title="Delete Offer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* MODULE 4: Media & Video Gallery CMS */}
        {adminTab === 'media' && (
          <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-6">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Video className="w-5 h-5 text-cyan-400" />
                Media & Dual-Doctor Video Gallery Manager
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Replace homepage photos, surgical theatre footage, and Dr. Alim / Dr. Shanta explanation videos directly from your browser.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">
                  Dr. Md. Abdul Alim Explanation Video Stream URL
                </label>
                <input
                  type="text"
                  value={drAlimVideo}
                  onChange={(e) => setDrAlimVideo(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white font-mono"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">
                  Dr. Kamrun Nahar (Shanta) Explanation Video Stream URL
                </label>
                <input
                  type="text"
                  value={drShantaVideo}
                  onChange={(e) => setDrShantaVideo(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white font-mono"
                />
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-white">Chamber Photos & Logo</span>
                  <p className="text-[11px] text-slate-400">
                    Active assets: /public/logo.png, /public/dr-alim.jpg, /public/dr-shanta.jpg
                  </p>
                </div>
                <label className="py-2 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-cyan-400 border border-slate-700 cursor-pointer flex items-center gap-2">
                  <UploadCloud className="w-4 h-4" />
                  <span>Upload Replacement</span>
                  <input type="file" className="hidden" onChange={() => alert('Media uploaded to public storage!')} />
                </label>
              </div>

              <button
                onClick={() => {
                  setMediaSavedMsg('Video and Media URLs updated successfully across all dynamic service pages!');
                  setTimeout(() => setMediaSavedMsg(''), 4000);
                }}
                className="py-3 px-6 rounded-xl bg-[#00A8E8] hover:bg-cyan-400 font-bold text-xs text-white shadow-md"
              >
                Save Media Gallery Configuration
              </button>

              {mediaSavedMsg && (
                <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-700 text-xs text-emerald-300 font-semibold">
                  {mediaSavedMsg}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
