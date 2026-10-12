import React, { useState, useEffect, useCallback } from 'react';
import {
  X,
  Search,
  Download,
  RefreshCw,
  Phone,
  MessageCircle,
  FileText,
  Settings,
  ChevronRight,
  TrendingUp,
  SlidersHorizontal,
  Clock,
  Sparkles,
  Send,
  Loader2,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import type { Application, ApplicationStatus, CourseName, TrainingMode, AcademySettings, ApplicationStats } from '../types/index.ts';

interface AdminDashboardProps {
  isOpen: boolean;
  onClose: () => void;
  token: string;
  onLogout: () => void;
  onSettingsUpdated: (newSettings: AcademySettings) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  isOpen,
  onClose,
  token,
  onLogout,
  onSettingsUpdated
}) => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [stats, setStats] = useState<ApplicationStats | null>(null);
  const [settings, setSettings] = useState<AcademySettings | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Filters
  const [search, setSearch] = useState('');
  const [selectedCourse, setSelectedCourse] = useState<string>('All');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [selectedMode, setSelectedMode] = useState<string>('All');

  // Selected Detail Modal
  const [activeApp, setActiveApp] = useState<Application | null>(null);
  const [newNoteText, setNewNoteText] = useState('');
  const [noteAuthor, setNoteAuthor] = useState('Staff Admissions');
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);

  // Settings Tab
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [settingsForm, setSettingsForm] = useState<Partial<AcademySettings>>({});
  const [isSavingSettings, setIsSavingSettings] = useState(false);
  const [settingsSaveSuccess, setSettingsSaveSuccess] = useState(false);

  // Fetch applications & stats
  const fetchData = useCallback(async () => {
    if (!token) return;
    setLoading(true);
    setError(null);

    try {
      // 1. Fetch applications with query params
      const queryParams = new URLSearchParams();
      if (selectedCourse !== 'All') queryParams.append('course', selectedCourse);
      if (selectedStatus !== 'All') queryParams.append('status', selectedStatus);
      if (selectedMode !== 'All') queryParams.append('mode', selectedMode);
      if (search.trim()) queryParams.append('search', search.trim());

      const resApps = await fetch(`/api/admin/applications?${queryParams.toString()}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (!resApps.ok) {
        if (resApps.status === 401) {
          onLogout();
          throw new Error('Session expired. Please sign in again.');
        }
        throw new Error('Failed to load applications.');
      }

      const appsData = await resApps.json();
      setApplications(appsData.applications);

      // 2. Fetch stats
      const resStats = await fetch('/api/admin/stats', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (resStats.ok) {
        const statsData = await resStats.json();
        setStats(statsData);
      }

      // 3. Fetch settings
      const resSettings = await fetch('/api/settings');
      if (resSettings.ok) {
        const setts = await resSettings.json();
        setSettings(setts);
        setSettingsForm(setts);
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Error fetching CRM data');
    } finally {
      setLoading(false);
    }
  }, [token, selectedCourse, selectedStatus, selectedMode, search, onLogout]);

  useEffect(() => {
    if (isOpen) {
      fetchData();
    }
  }, [isOpen, fetchData]);

  if (!isOpen) return null;

  // Handle status update
  const handleUpdateStatus = async (appId: string, newStatus: ApplicationStatus) => {
    setIsUpdatingStatus(true);
    try {
      const res = await fetch(`/api/admin/applications/${appId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          status: newStatus,
          author: noteAuthor
        })
      });

      if (!res.ok) throw new Error('Failed to update status');
      const data = await res.json();

      // Update state locally
      setApplications(prev => prev.map(a => a.id === appId ? data.application : a));
      if (activeApp && activeApp.id === appId) {
        setActiveApp(data.application);
      }

      // Re-fetch stats
      const resStats = await fetch('/api/admin/stats', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (resStats.ok) {
        setStats(await resStats.json());
      }
    } catch (err) {
      console.error(err);
      alert('Could not update status. Please try again.');
    } finally {
      setIsUpdatingStatus(false);
    }
  };

  // Add note
  const handleAddNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeApp || !newNoteText.trim()) return;

    try {
      const res = await fetch(`/api/admin/applications/${activeApp.id}/notes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          text: newNoteText.trim(),
          author: noteAuthor.trim()
        })
      });

      if (!res.ok) throw new Error('Failed to add note');
      const data = await res.json();

      const updatedApp: Application = {
        ...activeApp,
        notes: [data.note, ...activeApp.notes]
      };

      setActiveApp(updatedApp);
      setApplications(prev => prev.map(a => a.id === activeApp.id ? updatedApp : a));
      setNewNoteText('');
    } catch (err) {
      console.error(err);
      alert('Could not save note.');
    }
  };

  // Handle CSV export
  const handleExportCSV = () => {
    window.location.href = `/api/admin/export?token=${token}`;
  };

  // Handle settings save
  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingSettings(true);
    setSettingsSaveSuccess(false);

    try {
      const res = await fetch('/api/admin/settings', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(settingsForm)
      });

      if (!res.ok) throw new Error('Failed to save settings');
      const data = await res.json();
      setSettings(data.settings);
      onSettingsUpdated(data.settings);
      setSettingsSaveSuccess(true);
      setTimeout(() => setSettingsSaveSuccess(false), 3000);
    } catch (err) {
      console.error(err);
      alert('Could not update settings.');
    } finally {
      setIsSavingSettings(false);
    }
  };

  // WhatsApp generator helper for CRM staff
  const getWhatsAppStaffUrl = (app: Application) => {
    const cleanPhone = app.phone.replace(/[^\d]/g, '');
    const greeting = `Hello ${app.fullName}! This is ${noteAuthor} from Artist Launchpad Academy regarding your application (Ref: ${app.code}) for our ${app.course} program. We would love to discuss your batch schedule!`;
    return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(greeting)}`;
  };

  const getStatusBadgeStyle = (status: ApplicationStatus) => {
    switch (status) {
      case 'New':
        return 'bg-blue-500/15 text-blue-300 border-blue-500/30';
      case 'Contacted':
        return 'bg-amber-500/15 text-amber-300 border-amber-500/30';
      case 'Interested':
        return 'bg-purple-500/15 text-purple-300 border-purple-500/30';
      case 'Trial Scheduled':
        return 'bg-cyan-500/15 text-cyan-300 border-cyan-500/30';
      case 'Enrolled':
        return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 font-bold';
      case 'Not Interested':
        return 'bg-neutral-800 text-neutral-400 border-neutral-700';
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-[#09070f] text-white overflow-hidden flex flex-col"
      role="dialog"
      aria-modal="true"
    >
      {/* Top Navigation Bar */}
      <header className="h-16 px-4 sm:px-6 bg-[#110c22] border-b border-white/10 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <span className="font-extrabold text-base sm:text-lg bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Artist Launchpad
          </span>
          <span className="text-neutral-500">|</span>
          <span className="text-xs font-semibold bg-purple-950 px-2.5 py-1 rounded-md text-purple-200 border border-purple-500/30">
            Admissions CRM
          </span>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={() => setShowSettingsModal(true)}
            className="p-2 sm:px-3 sm:py-1.5 rounded-lg text-xs font-medium bg-white/5 hover:bg-white/10 text-neutral-300 flex items-center gap-1.5 transition-colors cursor-pointer"
            title="Academy Contact & Fee Settings"
          >
            <Settings className="w-4 h-4 text-purple-400" />
            <span className="hidden sm:inline">Settings</span>
          </button>

          <button
            onClick={handleExportCSV}
            className="p-2 sm:px-3 sm:py-1.5 rounded-lg text-xs font-medium bg-white/5 hover:bg-white/10 text-neutral-300 flex items-center gap-1.5 transition-colors cursor-pointer"
            title="Download CSV Spreadsheet"
          >
            <Download className="w-4 h-4 text-emerald-400" />
            <span className="hidden sm:inline">Export CSV</span>
          </button>

          <button
            onClick={fetchData}
            disabled={loading}
            className="p-2 rounded-lg text-neutral-400 hover:text-white hover:bg-white/10 transition-colors"
            title="Refresh applications"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>

          <button
            onClick={onLogout}
            className="px-3 py-1.5 rounded-lg text-xs font-medium text-neutral-400 hover:text-red-300 hover:bg-red-950/20 transition-colors"
          >
            Logout
          </button>

          <button
            onClick={onClose}
            className="p-2 rounded-lg text-neutral-400 hover:text-white hover:bg-white/10"
            aria-label="Exit Dashboard view"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Main CRM Workspace Area */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
        
        {/* Statistics Cards Row */}
        {stats && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10">
              <div className="text-[11px] uppercase tracking-wider text-neutral-400 font-semibold">Total Applications</div>
              <div className="text-2xl font-black text-white mt-1 tabular-nums">{stats.total}</div>
            </div>

            <div className="p-4 rounded-xl bg-blue-950/20 border border-blue-500/20">
              <div className="text-[11px] uppercase tracking-wider text-blue-300 font-semibold">New Enquiries</div>
              <div className="text-2xl font-black text-blue-400 mt-1 tabular-nums">{stats.newCount}</div>
            </div>

            <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-500/20">
              <div className="text-[11px] uppercase tracking-wider text-amber-300 font-semibold">Contacted</div>
              <div className="text-2xl font-black text-amber-400 mt-1 tabular-nums">{stats.contactedCount}</div>
            </div>

            <div className="p-4 rounded-xl bg-cyan-950/20 border border-cyan-500/20">
              <div className="text-[11px] uppercase tracking-wider text-cyan-300 font-semibold">Trial Scheduled</div>
              <div className="text-2xl font-black text-cyan-400 mt-1 tabular-nums">{stats.trialCount}</div>
            </div>

            <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/30">
              <div className="text-[11px] uppercase tracking-wider text-emerald-300 font-semibold">Enrolled Students</div>
              <div className="text-2xl font-black text-emerald-400 mt-1 tabular-nums">{stats.enrolledCount}</div>
            </div>

            <div className="p-4 rounded-xl bg-purple-950/20 border border-purple-500/20">
              <div className="text-[11px] uppercase tracking-wider text-purple-300 font-semibold">Conversion Rate</div>
              <div className="text-2xl font-black text-purple-400 mt-1 tabular-nums">
                {stats.total > 0 ? `${Math.round((stats.enrolledCount / stats.total) * 100)}%` : '0%'}
              </div>
            </div>
          </div>
        )}

        {/* Filter and Search Bar */}
        <div className="p-4 rounded-xl bg-[#130e26] border border-white/10 flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
          
          {/* Search input */}
          <div className="relative flex-1">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by applicant name, phone, code or city..."
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-white/[0.04] border border-white/10 text-white placeholder-neutral-500 text-xs sm:text-sm focus:outline-none focus:border-purple-400"
            />
            <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-2.5" />
          </div>

          {/* Filter Dropdowns */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-1.5 text-xs text-neutral-400 mr-1">
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Filter:</span>
            </div>

            {/* Course Filter */}
            <select
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
              className="px-3 py-2 rounded-lg bg-white/[0.04] border border-white/10 text-neutral-200 text-xs focus:outline-none focus:border-purple-400"
            >
              <option value="All">All Courses</option>
              <option value="Acting">Acting</option>
              <option value="Dancing">Dancing</option>
              <option value="Singing">Singing</option>
              <option value="Music Production">Music Production</option>
              <option value="Multiple Skills">Multiple Skills</option>
            </select>

            {/* Status Filter */}
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-3 py-2 rounded-lg bg-white/[0.04] border border-white/10 text-neutral-200 text-xs focus:outline-none focus:border-purple-400"
            >
              <option value="All">All Statuses</option>
              <option value="New">New</option>
              <option value="Contacted">Contacted</option>
              <option value="Interested">Interested</option>
              <option value="Trial Scheduled">Trial Scheduled</option>
              <option value="Enrolled">Enrolled</option>
              <option value="Not Interested">Not Interested</option>
            </select>

            {/* Mode Filter */}
            <select
              value={selectedMode}
              onChange={(e) => setSelectedMode(e.target.value)}
              className="px-3 py-2 rounded-lg bg-white/[0.04] border border-white/10 text-neutral-200 text-xs focus:outline-none focus:border-purple-400"
            >
              <option value="All">All Modes</option>
              <option value="Offline">Offline</option>
              <option value="Online">Online</option>
              <option value="Hybrid">Hybrid</option>
            </select>
          </div>
        </div>

        {/* Applications Data Table */}
        <div className="rounded-xl border border-white/10 bg-[#100b20] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-white/[0.03] border-b border-white/10 text-neutral-400 font-semibold uppercase tracking-wider text-[11px]">
                  <th className="py-3 px-4">Ref Code</th>
                  <th className="py-3 px-4">Applicant</th>
                  <th className="py-3 px-4">Phone / WhatsApp</th>
                  <th className="py-3 px-4">Course</th>
                  <th className="py-3 px-4">Level & Mode</th>
                  <th className="py-3 px-4">City</th>
                  <th className="py-3 px-4">Applied</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {applications.length === 0 ? (
                  <tr>
                    <td colSpan={9} className="py-12 text-center text-neutral-500">
                      No applications found matching the selected filters.
                    </td>
                  </tr>
                ) : (
                  applications.map((app) => (
                    <tr
                      key={app.id}
                      className="hover:bg-white/[0.02] transition-colors cursor-pointer group"
                      onClick={() => setActiveApp(app)}
                    >
                      <td className="py-3 px-4 font-mono text-purple-300 font-semibold">
                        {app.code}
                      </td>
                      <td className="py-3 px-4">
                        <div className="font-bold text-white text-sm">{app.fullName}</div>
                        {app.email && (
                          <div className="text-[11px] text-neutral-500">{app.email}</div>
                        )}
                      </td>
                      <td className="py-3 px-4 text-neutral-300 whitespace-nowrap font-mono">
                        {app.phone}
                      </td>
                      <td className="py-3 px-4 font-medium text-neutral-200">
                        {app.course}
                      </td>
                      <td className="py-3 px-4 text-neutral-400">
                        <div>{app.skillLevel}</div>
                        <div className="text-[11px] text-purple-400 font-medium">{app.trainingMode}</div>
                      </td>
                      <td className="py-3 px-4 text-neutral-300">
                        {app.cityDistrict}
                      </td>
                      <td className="py-3 px-4 text-neutral-400 whitespace-nowrap">
                        {new Date(app.createdAt).toLocaleDateString()}
                      </td>
                      <td className="py-3 px-4">
                        <span className={`inline-block px-2.5 py-1 rounded-full text-[11px] border ${getStatusBadgeStyle(app.status)}`}>
                          {app.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-end gap-1.5">
                          <a
                            href={getWhatsAppStaffUrl(app)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 rounded-lg bg-[#25D366]/20 text-[#25D366] hover:bg-[#25D366]/30 transition-colors"
                            title="Open WhatsApp with follow-up message"
                          >
                            <MessageCircle className="w-3.5 h-3.5" />
                          </a>

                          <a
                            href={`tel:${app.phone.replace(/[^\d+]/g, '')}`}
                            className="p-1.5 rounded-lg bg-purple-900/40 text-purple-300 hover:bg-purple-900/60 transition-colors"
                            title="Call applicant"
                          >
                            <Phone className="w-3.5 h-3.5" />
                          </a>

                          <button
                            onClick={() => setActiveApp(app)}
                            className="p-1.5 rounded-lg bg-white/5 text-neutral-300 hover:bg-white/10 transition-colors"
                            title="View Full Profile & Notes"
                          >
                            <ChevronRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>

      {/* Detail Slide-over / Modal for Single Application */}
      {activeApp && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-end bg-black/70 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
        >
          <div className="relative w-full max-w-xl h-full bg-[#120c24] border-l border-white/10 shadow-2xl p-6 overflow-y-auto flex flex-col justify-between">
            
            {/* Top Bar */}
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs text-purple-400 font-bold">{activeApp.code}</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] border ${getStatusBadgeStyle(activeApp.status)}`}>
                      {activeApp.status}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-white mt-1">{activeApp.fullName}</h3>
                </div>

                <button
                  onClick={() => setActiveApp(null)}
                  className="p-2 rounded-lg text-neutral-400 hover:text-white hover:bg-white/10"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Status Update Dropdown */}
              <div className="p-4 rounded-xl bg-purple-950/30 border border-purple-500/20 mb-6">
                <label className="block text-xs font-semibold text-purple-300 mb-2">
                  Update Application Status:
                </label>
                <div className="flex items-center gap-2">
                  <select
                    value={activeApp.status}
                    onChange={(e) => handleUpdateStatus(activeApp.id, e.target.value as ApplicationStatus)}
                    disabled={isUpdatingStatus}
                    className="flex-1 px-3 py-2 rounded-lg bg-[#1a1233] border border-purple-500/30 text-white text-xs font-semibold focus:outline-none"
                  >
                    <option value="New">New</option>
                    <option value="Contacted">Contacted</option>
                    <option value="Interested">Interested</option>
                    <option value="Trial Scheduled">Trial Scheduled</option>
                    <option value="Enrolled">Enrolled</option>
                    <option value="Not Interested">Not Interested</option>
                  </select>

                  <a
                    href={getWhatsAppStaffUrl(activeApp)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-2 rounded-lg bg-[#25D366] text-black font-bold text-xs flex items-center gap-1.5 shrink-0"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>WhatsApp Follow-up</span>
                  </a>
                </div>
              </div>

              {/* Applicant Profile Information */}
              <div className="space-y-4 mb-6 text-xs">
                <h4 className="text-xs uppercase tracking-wider font-bold text-neutral-400">
                  Applicant Profile
                </h4>

                <div className="grid grid-cols-2 gap-3 p-4 rounded-xl bg-white/[0.02] border border-white/5">
                  <div>
                    <span className="text-neutral-500 block">Phone</span>
                    <span className="font-semibold text-white">{activeApp.phone}</span>
                  </div>
                  <div>
                    <span className="text-neutral-500 block">Email</span>
                    <span className="font-semibold text-white">{activeApp.email || 'Not provided'}</span>
                  </div>
                  <div>
                    <span className="text-neutral-500 block">City & District</span>
                    <span className="font-semibold text-white">{activeApp.cityDistrict}</span>
                  </div>
                  <div>
                    <span className="text-neutral-500 block">Age Group</span>
                    <span className="font-semibold text-white">{activeApp.ageGroup || '18-24'}</span>
                  </div>
                  <div>
                    <span className="text-neutral-500 block">Selected Course</span>
                    <span className="font-semibold text-purple-300">{activeApp.course}</span>
                  </div>
                  <div>
                    <span className="text-neutral-500 block">Current Level</span>
                    <span className="font-semibold text-white">{activeApp.skillLevel}</span>
                  </div>
                  <div>
                    <span className="text-neutral-500 block">Training Mode</span>
                    <span className="font-semibold text-pink-300">{activeApp.trainingMode}</span>
                  </div>
                  <div>
                    <span className="text-neutral-500 block">Preferred Schedule</span>
                    <span className="font-semibold text-white">{activeApp.schedule}</span>
                  </div>
                </div>

                {activeApp.learningGoals && (
                  <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                    <span className="text-neutral-500 block mb-1">Learning Goals & Message:</span>
                    <p className="text-neutral-200 leading-relaxed italic">
                      "{activeApp.learningGoals}"
                    </p>
                  </div>
                )}
              </div>

              {/* Notes Timeline */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs uppercase tracking-wider font-bold text-neutral-400">
                    Internal Follow-Up Notes ({activeApp.notes.length})
                  </h4>
                  <span className="text-[11px] text-neutral-500">Confidential</span>
                </div>

                {activeApp.notes.length === 0 ? (
                  <p className="text-xs text-neutral-500 italic p-3 bg-white/[0.01] rounded-lg">
                    No notes recorded yet. Add your first consultation summary below.
                  </p>
                ) : (
                  <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                    {activeApp.notes.map((note) => (
                      <div key={note.id} className="p-3 rounded-lg bg-white/[0.03] border border-white/5 text-xs">
                        <p className="text-neutral-200 mb-1">{note.text}</p>
                        <div className="flex items-center justify-between text-[10px] text-neutral-500">
                          <span>{note.author}</span>
                          <span>{new Date(note.createdAt).toLocaleString()}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Add Note Form */}
            <form onSubmit={handleAddNote} className="pt-4 border-t border-white/10 space-y-2">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={noteAuthor}
                  onChange={(e) => setNoteAuthor(e.target.value)}
                  placeholder="Staff Name..."
                  className="w-1/3 px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/10 text-xs text-white"
                />
                <span className="text-[11px] text-neutral-500">Logging as caller</span>
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newNoteText}
                  onChange={(e) => setNewNoteText(e.target.value)}
                  placeholder="Type internal note (e.g. Called, interested in weekend slot)..."
                  className="flex-1 px-3 py-2 rounded-lg bg-white/[0.04] border border-white/10 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-purple-400"
                />
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold flex items-center gap-1.5 cursor-pointer shrink-0"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Add</span>
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

      {/* Academy Settings Modal */}
      {showSettingsModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
        >
          <div className="relative w-full max-w-lg bg-[#140e26] border border-purple-500/30 rounded-2xl p-6 sm:p-8 space-y-6">
            
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <Settings className="w-5 h-5 text-purple-400" />
                <h3 className="text-base font-bold text-white">Academy Contact & Pricing Settings</h3>
              </div>
              <button
                onClick={() => setShowSettingsModal(false)}
                className="p-1 text-neutral-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {settingsSaveSuccess && (
              <div className="p-3 rounded-lg bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>Settings updated successfully across website!</span>
              </div>
            )}

            <form onSubmit={handleSaveSettings} className="space-y-4 text-xs">
              <div>
                <label className="block text-neutral-300 font-medium mb-1">WhatsApp Number (For instant chat)</label>
                <input
                  type="text"
                  value={settingsForm.whatsappNumber || ''}
                  onChange={(e) => setSettingsForm({ ...settingsForm, whatsappNumber: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-white/[0.04] border border-white/15 text-white"
                />
              </div>

              <div>
                <label className="block text-neutral-300 font-medium mb-1">Telephone Number</label>
                <input
                  type="text"
                  value={settingsForm.phoneNumber || ''}
                  onChange={(e) => setSettingsForm({ ...settingsForm, phoneNumber: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-white/[0.04] border border-white/15 text-white"
                />
              </div>

              <div>
                <label className="block text-neutral-300 font-medium mb-1">Official Admissions Email</label>
                <input
                  type="email"
                  value={settingsForm.email || ''}
                  onChange={(e) => setSettingsForm({ ...settingsForm, email: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-white/[0.04] border border-white/15 text-white"
                />
              </div>

              <div>
                <label className="block text-neutral-300 font-medium mb-1">Studio Location Hubs</label>
                <input
                  type="text"
                  value={settingsForm.location || ''}
                  onChange={(e) => setSettingsForm({ ...settingsForm, location: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-white/[0.04] border border-white/15 text-white"
                />
              </div>

              {/* Pricing Display Toggle */}
              <div className="pt-2 border-t border-white/10">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settingsForm.showPricing || false}
                    onChange={(e) => setSettingsForm({ ...settingsForm, showPricing: e.target.checked })}
                    className="w-4 h-4 rounded text-purple-600 border-white/30 bg-white/10"
                  />
                  <div>
                    <span className="font-semibold text-white block">Display Tuition Fees on Course Cards</span>
                    <span className="text-[11px] text-neutral-400">When disabled, courses invite users to apply for custom fee plans.</span>
                  </div>
                </label>
              </div>

              {settingsForm.showPricing && (
                <div className="grid grid-cols-2 gap-3 p-3 rounded-lg bg-purple-950/20 border border-purple-500/20">
                  <div>
                    <label className="block text-neutral-400 text-[11px] mb-1">Acting Fee</label>
                    <input
                      type="text"
                      value={settingsForm.actingPrice || ''}
                      onChange={(e) => setSettingsForm({ ...settingsForm, actingPrice: e.target.value })}
                      className="w-full px-2.5 py-1.5 rounded bg-black/40 border border-white/15 text-white text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-neutral-400 text-[11px] mb-1">Dancing Fee</label>
                    <input
                      type="text"
                      value={settingsForm.dancingPrice || ''}
                      onChange={(e) => setSettingsForm({ ...settingsForm, dancingPrice: e.target.value })}
                      className="w-full px-2.5 py-1.5 rounded bg-black/40 border border-white/15 text-white text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-neutral-400 text-[11px] mb-1">Singing Fee</label>
                    <input
                      type="text"
                      value={settingsForm.singingPrice || ''}
                      onChange={(e) => setSettingsForm({ ...settingsForm, singingPrice: e.target.value })}
                      className="w-full px-2.5 py-1.5 rounded bg-black/40 border border-white/15 text-white text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-neutral-400 text-[11px] mb-1">Music Production Fee</label>
                    <input
                      type="text"
                      value={settingsForm.musicProductionPrice || ''}
                      onChange={(e) => setSettingsForm({ ...settingsForm, musicProductionPrice: e.target.value })}
                      className="w-full px-2.5 py-1.5 rounded bg-black/40 border border-white/15 text-white text-xs"
                    />
                  </div>
                </div>
              )}

              <div className="pt-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowSettingsModal(false)}
                  className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-neutral-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSavingSettings}
                  className="px-5 py-2 rounded-lg bg-purple-600 hover:bg-purple-500 text-white font-semibold cursor-pointer disabled:opacity-50"
                >
                  {isSavingSettings ? 'Saving...' : 'Save Academy Settings'}
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
};
