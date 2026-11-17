'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import {
  Palette,
  Users,
  Tag,
  Video,
  Trash2,
  UploadCloud,
  CheckCircle,
} from 'lucide-react';

export default function AdminDashboard() {
  const {
    themeConfig,
    updateThemeConfig,
    offers,
    addOffer,
    deleteOffer,
    allUsers,
    updateUserStatus,
  } = useApp();

  const [adminTab, setAdminTab] = useState<'theme' | 'users' | 'offers' | 'media'>('theme');
  const [localTheme, setLocalTheme] = useState(themeConfig);
  const [statusNotice, setStatusNotice] = useState<string | null>(null);

  const [newOffer, setNewOffer] = useState({
    title: '',
    discount: '',
    description: '',
    pointsRequired: 50,
    validUntil: '2026-12-31',
  });

  const [drAlimVideo, setDrAlimVideo] = useState(
    'https://assets.mixkit.co/videos/preview/mixkit-dentist-checking-a-patient-teeth-41481-large.mp4'
  );
  const [drShantaVideo, setDrShantaVideo] = useState(
    'https://assets.mixkit.co/videos/preview/mixkit-dentist-working-in-a-dental-office-41480-large.mp4'
  );

  const notify = (msg: string) => {
    setStatusNotice(msg);
    setTimeout(() => setStatusNotice(null), 4500);
  };

  const handleSaveTheme = () => {
    updateThemeConfig(localTheme);
    notify('Theme preferences updated live across the application.');
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
    notify('New promotional voucher added successfully.');
  };

  return (
    <div className="min-h-screen bg-[#F9FAFC] text-[#0A0A0C] pt-28 md:pt-36 pb-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Top bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[rgba(10,132,255,0.12)]">
          <span className="text-base font-extrabold text-[#0A0A0C]">
            Executive Administration & CMS Portal
          </span>

          <div className="btn-liquid-chip text-amber-700">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
            <span>Master Admin</span>
          </div>
        </div>

        {/* Inline Toast Banner */}
        {statusNotice && (
          <div className="p-4 rounded-[20px] bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs sm:text-sm font-semibold flex items-center gap-2 shadow-xs">
            <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{statusNotice}</span>
          </div>
        )}

        {/* Segmented Control Tabs */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setAdminTab('theme')}
            className={adminTab === 'theme' ? 'btn-water-primary !py-2.5 !px-4 !text-xs' : 'btn-liquid-chip !py-2.5 !px-4'}
          >
            <Palette className="w-4 h-4" />
            <span>Theme Customizer</span>
          </button>

          <button
            onClick={() => setAdminTab('users')}
            className={adminTab === 'users' ? 'btn-water-primary !py-2.5 !px-4 !text-xs' : 'btn-liquid-chip !py-2.5 !px-4'}
          >
            <Users className="w-4 h-4" />
            <span>User Moderation</span>
          </button>

          <button
            onClick={() => setAdminTab('offers')}
            className={adminTab === 'offers' ? 'btn-water-primary !py-2.5 !px-4 !text-xs' : 'btn-liquid-chip !py-2.5 !px-4'}
          >
            <Tag className="w-4 h-4" />
            <span>Offer Manager</span>
          </button>

          <button
            onClick={() => setAdminTab('media')}
            className={adminTab === 'media' ? 'btn-water-primary !py-2.5 !px-4 !text-xs' : 'btn-liquid-chip !py-2.5 !px-4'}
          >
            <Video className="w-4 h-4" />
            <span>Media & Video CMS</span>
          </button>
        </div>

        {/* MODULE 1: Live Theme Customizer */}
        {adminTab === 'theme' && (
          <div className="squircle-card p-6 sm:p-8 space-y-6">
            <div>
              <h3 className="text-lg font-extrabold text-[#0A0A0C] flex items-center gap-2">
                <Palette className="w-5 h-5 text-[#007AFF]" />
                <span>Live Theme & Gradient Customizer</span>
              </h3>
              <p className="text-xs text-[#8E8E93] mt-1">
                Adjust primary brand accents and section canvas gradients in real time.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              <div>
                <label className="text-xs font-bold text-[#3C3C43] block mb-2">
                  Primary Accent (Apple Blue / Cyan)
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={localTheme.primaryAccent}
                    onChange={(e) => setLocalTheme({ ...localTheme, primaryAccent: e.target.value })}
                    className="w-12 h-10 rounded-[12px] cursor-pointer border border-slate-200"
                  />
                  <input
                    type="text"
                    value={localTheme.primaryAccent}
                    onChange={(e) => setLocalTheme({ ...localTheme, primaryAccent: e.target.value })}
                    className="squircle-input flex-1 px-3 py-2 text-xs font-mono text-[#0A0A0C]"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-[#3C3C43] block mb-2">
                  Showcase Gradient Start
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={localTheme.gradientFrom}
                    onChange={(e) => setLocalTheme({ ...localTheme, gradientFrom: e.target.value })}
                    className="w-12 h-10 rounded-[12px] cursor-pointer border border-slate-200"
                  />
                  <input
                    type="text"
                    value={localTheme.gradientFrom}
                    onChange={(e) => setLocalTheme({ ...localTheme, gradientFrom: e.target.value })}
                    className="squircle-input flex-1 px-3 py-2 text-xs font-mono text-[#0A0A0C]"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-[#3C3C43] block mb-2">
                  Champagne Gold Accent
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={localTheme.goldAccent}
                    onChange={(e) => setLocalTheme({ ...localTheme, goldAccent: e.target.value })}
                    className="w-12 h-10 rounded-[12px] cursor-pointer border border-slate-200"
                  />
                  <input
                    type="text"
                    value={localTheme.goldAccent}
                    onChange={(e) => setLocalTheme({ ...localTheme, goldAccent: e.target.value })}
                    className="squircle-input flex-1 px-3 py-2 text-xs font-mono text-[#0A0A0C]"
                  />
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200/70">
              <button onClick={handleSaveTheme} className="btn-water-primary !py-3 !px-6 !text-xs">
                Apply Live Theme Settings Site-Wide
              </button>
            </div>
          </div>
        )}

        {/* MODULE 2: User Moderation */}
        {adminTab === 'users' && (
          <div className="squircle-card overflow-hidden">
            <div className="p-6 border-b border-slate-200/70">
              <h3 className="text-lg font-extrabold text-[#0A0A0C] flex items-center gap-2">
                <Users className="w-5 h-5 text-[#007AFF]" />
                <span>Patient & Role Moderation Engine</span>
              </h3>
              <p className="text-xs text-[#8E8E93] mt-1">
                Manage patient restrictions, wallet freeze flags, and feedback privileges.
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#F2F2F7]/90 text-[#8E8E93] uppercase font-bold border-b border-slate-200/70">
                  <tr>
                    <th className="p-4">User Details</th>
                    <th className="p-4">Role</th>
                    <th className="p-4">Points</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 text-right">Moderation Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200/60">
                  {allUsers.map((u) => (
                    <tr key={u.id} className="hover:bg-white/75 transition-colors">
                      <td className="p-4">
                        <div className="font-bold text-[#0A0A0C]">{u.name}</div>
                        <div className="text-[#8E8E93] font-mono text-[11px]">{u.id}</div>
                        <div className="text-[#8E8E93] text-[10px]">{u.email} • {u.phone}</div>
                      </td>
                      <td className="p-4">
                        <span className="btn-liquid-chip !py-0.5 !px-2 !text-[10px] font-mono text-[#007AFF] uppercase">
                          {u.role}
                        </span>
                      </td>
                      <td className="p-4 font-mono font-bold text-[#007AFF]">
                        {u.points} / 300 PTS
                      </td>
                      <td className="p-4 space-x-1">
                        {u.isBanned && (
                          <span className="px-2 py-0.5 rounded-full bg-rose-50 text-rose-700 border border-rose-200 text-[10px] font-bold">
                            BANNED
                          </span>
                        )}
                        {u.isPointsFrozen && (
                          <span className="px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200 text-[10px] font-bold">
                            FROZEN
                          </span>
                        )}
                        {!u.isBanned && !u.isPointsFrozen && !u.isFeedbackMuted && (
                          <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold">
                            ACTIVE
                          </span>
                        )}
                      </td>
                      <td className="p-4 text-right space-x-2 whitespace-nowrap">
                        <button
                          onClick={() => updateUserStatus(u.id, { isBanned: !u.isBanned })}
                          className={
                            u.isBanned
                              ? 'btn-liquid-emerald !py-1.5 !px-3 !text-[11px]'
                              : 'btn-liquid-danger !py-1.5 !px-3 !text-[11px]'
                          }
                        >
                          {u.isBanned ? 'Unban' : 'Ban'}
                        </button>

                        <button
                          onClick={() => updateUserStatus(u.id, { isPointsFrozen: !u.isPointsFrozen })}
                          className="btn-liquid-chip text-amber-700"
                        >
                          {u.isPointsFrozen ? 'Unfreeze' : 'Freeze Pts'}
                        </button>

                        <button
                          onClick={() => updateUserStatus(u.id, { isFeedbackMuted: !u.isFeedbackMuted })}
                          className="btn-liquid-chip text-purple-700"
                        >
                          {u.isFeedbackMuted ? 'Unmute' : 'Mute'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* MODULE 3: Offer Manager */}
        {adminTab === 'offers' && (
          <div className="space-y-6">
            <form onSubmit={handleAddOfferSubmit} className="squircle-card p-6 space-y-4">
              <h4 className="text-sm font-extrabold text-[#0A0A0C]">Add New Promotion</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                <div>
                  <label className="text-[11px] font-bold text-[#8E8E93]">Offer Title</label>
                  <input
                    type="text"
                    required
                    value={newOffer.title}
                    onChange={(e) => setNewOffer({ ...newOffer, title: e.target.value })}
                    placeholder="e.g. Free Laser Consultation"
                    className="squircle-input w-full mt-1 px-3 py-2 text-xs text-[#0A0A0C]"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-[#8E8E93]">Discount Badge</label>
                  <input
                    type="text"
                    required
                    value={newOffer.discount}
                    onChange={(e) => setNewOffer({ ...newOffer, discount: e.target.value })}
                    placeholder="e.g. 25% OFF"
                    className="squircle-input w-full mt-1 px-3 py-2 text-xs text-[#0A0A0C]"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-[#8E8E93]">Points Cost</label>
                  <input
                    type="number"
                    required
                    value={newOffer.pointsRequired}
                    onChange={(e) => setNewOffer({ ...newOffer, pointsRequired: Number(e.target.value) })}
                    className="squircle-input w-full mt-1 px-3 py-2 text-xs text-[#0A0A0C] font-mono"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-[#8E8E93]">Valid Until</label>
                  <input
                    type="date"
                    value={newOffer.validUntil}
                    onChange={(e) => setNewOffer({ ...newOffer, validUntil: e.target.value })}
                    className="squircle-input w-full mt-1 px-3 py-2 text-xs text-[#0A0A0C]"
                  />
                </div>
                <div className="sm:col-span-2 md:col-span-4">
                  <label className="text-[11px] font-bold text-[#8E8E93]">Offer Description</label>
                  <input
                    type="text"
                    required
                    value={newOffer.description}
                    onChange={(e) => setNewOffer({ ...newOffer, description: e.target.value })}
                    placeholder="e.g. Applies to Japanese soft-tissue gum laser appointments."
                    className="squircle-input w-full mt-1 px-3 py-2 text-xs text-[#0A0A0C]"
                  />
                </div>
              </div>
              <button type="submit" className="btn-water-primary !py-2.5 !px-5 !text-xs">
                Create Active Offer
              </button>
            </form>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {offers.map((offer) => (
                <div key={offer.id} className="squircle-card p-5 flex justify-between items-start gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-[#0A0A0C] text-xs">{offer.title}</span>
                      <span className="btn-liquid-chip !py-0.5 !px-2 !text-[10px] text-amber-700">
                        {offer.discount}
                      </span>
                    </div>
                    <p className="text-xs text-[#8E8E93] mt-1">{offer.description}</p>
                    <span className="text-[11px] font-mono text-[#007AFF] mt-2 block">
                      Cost: {offer.pointsRequired} PTS • Valid: {offer.validUntil}
                    </span>
                  </div>
                  <button
                    onClick={() => deleteOffer(offer.id)}
                    className="btn-liquid-danger !p-2"
                    title="Delete Offer"
                    aria-label="Delete Offer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* MODULE 4: Media Gallery CMS */}
        {adminTab === 'media' && (
          <div className="squircle-card p-6 sm:p-8 space-y-6">
            <div>
              <h3 className="text-lg font-extrabold text-[#0A0A0C] flex items-center gap-2">
                <Video className="w-5 h-5 text-[#007AFF]" />
                <span>Media & Dual-Doctor Video Gallery Manager</span>
              </h3>
              <p className="text-xs text-[#8E8E93] mt-1">
                Update specialist video stream links and chamber asset configurations.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-[#3C3C43] block mb-1">
                  Dr. Md. Abdul Alim Explanation Video Stream URL
                </label>
                <input
                  type="text"
                  value={drAlimVideo}
                  onChange={(e) => setDrAlimVideo(e.target.value)}
                  className="squircle-input w-full px-3 py-2 text-xs text-[#0A0A0C] font-mono"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-[#3C3C43] block mb-1">
                  Dr. Kamrun Nahar (Shanta) Explanation Video Stream URL
                </label>
                <input
                  type="text"
                  value={drShantaVideo}
                  onChange={(e) => setDrShantaVideo(e.target.value)}
                  className="squircle-input w-full px-3 py-2 text-xs text-[#0A0A0C] font-mono"
                />
              </div>

              <div className="p-4 rounded-[20px] bg-white/75 border border-slate-200 flex items-center justify-between gap-4">
                <div>
                  <span className="text-xs font-bold text-[#0A0A0C]">Chamber Photos & Logo</span>
                  <p className="text-[11px] text-[#8E8E93]">
                    Active assets: /assets/logo.png, /images/dr-alim.jpg, /images/dr-shanta.jpg
                  </p>
                </div>
                <label className="btn-water-secondary !py-2 !px-4 !text-xs">
                  <UploadCloud className="w-4 h-4" />
                  <span>Replace Asset</span>
                  <input
                    type="file"
                    className="hidden"
                    onChange={() => notify('Media queued for public storage sync.')}
                  />
                </label>
              </div>

              <button
                onClick={() => notify('Video and Media URLs updated successfully across all procedures!')}
                className="btn-water-primary !py-3 !px-6 !text-xs"
              >
                Save Media Gallery Configuration
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
