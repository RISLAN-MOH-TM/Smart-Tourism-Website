'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Enquiry, EnquiryStatus } from '@/lib/types';
import {
  Shield,
  Lock,
  Mail,
  User,
  Search,
  Filter,
  CheckCircle,
  Clock,
  Archive,
  RefreshCw,
  LogOut,
  Compass,
  FileJson,
  Database,
  Calendar,
  Phone,
  Users,
  AlertCircle,
  ExternalLink,
  ChevronDown,
} from 'lucide-react';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [adminUser, setAdminUser] = useState<{ email: string } | null>(null);

  // Login form state
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);

  // Enquiries state
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loadingEnquiries, setLoadingEnquiries] = useState(false);
  const [statusFilter, setStatusFilter] = useState<'All' | EnquiryStatus>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEnquiry, setSelectedEnquiry] = useState<Enquiry | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [showSqlGuide, setShowSqlGuide] = useState(false);

  // Check auth status on mount
  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const res = await fetch('/api/auth/me');
      if (res.ok) {
        const data = await res.json();
        setIsAuthenticated(true);
        setAdminUser(data.user);
        fetchEnquiries();
      } else {
        setIsAuthenticated(false);
      }
    } catch {
      setIsAuthenticated(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    setLoginLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: emailInput, password: passwordInput }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Authentication failed');
      }

      setIsAuthenticated(true);
      setAdminUser(data.user);
      fetchEnquiries();
    } catch (err: unknown) {
      if (err instanceof Error) {
        setLoginError(err.message);
      } else {
        setLoginError('Login failed. Please check credentials.');
      }
    } finally {
      setLoginLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
    } finally {
      setIsAuthenticated(false);
      setAdminUser(null);
    }
  };

  const fetchEnquiries = async () => {
    setLoadingEnquiries(true);
    try {
      const res = await fetch('/api/enquiries');
      if (res.ok) {
        const data = await res.json();
        setEnquiries(data.enquiries || []);
      }
    } catch (err) {
      console.error('Failed to load enquiries:', err);
    } finally {
      setLoadingEnquiries(false);
    }
  };

  const handleStatusUpdate = async (id: string, newStatus: EnquiryStatus) => {
    setUpdatingId(id);
    try {
      const res = await fetch(`/api/enquiries/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      if (res.ok) {
        setEnquiries((prev) =>
          prev.map((e) => (e.id === id ? { ...e, status: newStatus } : e))
        );
        if (selectedEnquiry && selectedEnquiry.id === id) {
          setSelectedEnquiry({ ...selectedEnquiry, status: newStatus });
        }
      }
    } catch (err) {
      console.error('Failed to update enquiry status:', err);
    } finally {
      setUpdatingId(null);
    }
  };

  // Filtered list
  const filteredEnquiries = enquiries.filter((item) => {
    const matchesStatus =
      statusFilter === 'All' ? true : item.status === statusFilter;
    const query = searchQuery.toLowerCase().trim();
    const matchesQuery =
      !query ||
      item.name.toLowerCase().includes(query) ||
      item.email.toLowerCase().includes(query) ||
      item.destination.toLowerCase().includes(query) ||
      item.message.toLowerCase().includes(query);

    return matchesStatus && matchesQuery;
  });

  const countNew = enquiries.filter((e) => e.status === 'New').length;
  const countContacted = enquiries.filter((e) => e.status === 'Contacted').length;
  const countClosed = enquiries.filter((e) => e.status === 'Closed').length;

  // Format date helper
  const formatDate = (isoString: string) => {
    try {
      const d = new Date(isoString);
      return d.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return isoString;
    }
  };

  // Export JSON helper
  const handleExportJson = () => {
    const dataStr =
      'data:text/json;charset=utf-8,' +
      encodeURIComponent(JSON.stringify(enquiries, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute(
      'download',
      `tourism-enquiries-${new Date().toISOString().split('T')[0]}.json`
    );
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // Loading screen
  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-stone-100 flex items-center justify-center p-4">
        <div className="flex items-center gap-3 text-stone-600">
          <RefreshCw className="w-5 h-5 animate-spin text-emerald-800" />
          <span className="text-sm font-medium">Verifying session...</span>
        </div>
      </div>
    );
  }

  // LOGIN PAGE
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-stone-100 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="text-center">
            <Link
              href="/"
              className="inline-flex items-center gap-2 mb-4 text-emerald-900 hover:text-emerald-700 transition-colors"
            >
              <div className="relative w-12 h-12 rounded-full overflow-hidden border border-stone-300 shadow-sm mx-auto bg-white">
                <Image
                  src="/logo.jpg"
                  alt="Smart Tourism Logo"
                  fill
                  sizes="48px"
                  className="object-cover"
                />
              </div>
            </Link>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
              Admin Portal Login
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-stone-600">
              Supabase Authentication & Enquiry Management
            </p>
          </div>

          <div className="mt-8 bg-white py-8 px-6 sm:px-10 border border-stone-300 rounded-lg shadow-sm">
            <form onSubmit={handleLogin} className="space-y-5">
              {loginError && (
                <div className="p-3 bg-red-50 border border-red-200 rounded text-red-800 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{loginError}</span>
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1 flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-stone-400" />
                  Admin Email
                </label>
                <input
                  type="email"
                  required
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="admin@smart-tourism.lk"
                  className="w-full bg-stone-50 border border-stone-300 rounded px-3 py-2 text-sm text-stone-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-700"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1 flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-stone-400" />
                  Password
                </label>
                <input
                  type="password"
                  required
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full bg-stone-50 border border-stone-300 rounded px-3 py-2 text-sm text-stone-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-700"
                />
              </div>

              <button
                type="submit"
                disabled={loginLoading}
                className="w-full inline-flex items-center justify-center gap-2 bg-emerald-800 hover:bg-emerald-900 text-white font-semibold py-2.5 px-4 rounded text-sm transition-colors shadow-sm cursor-pointer disabled:bg-stone-400"
              >
                {loginLoading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  <>
                    <Lock className="w-4 h-4" />
                    Sign In to Dashboard
                  </>
                )}
              </button>
            </form>

            {/* Quick Demo Credentials Box */}
            <div className="mt-6 pt-5 border-t border-stone-200 text-xs text-stone-600 bg-stone-50 p-3 rounded border">
              <p className="font-semibold text-stone-800 mb-1">
                Demo Administrator Credentials:
              </p>
              <div className="space-y-0.5 font-mono text-[11px] text-stone-700">
                <p>
                  <strong>Email:</strong> admin@smart-tourism.lk
                </p>
                <p>
                  <strong>Password:</strong> CeylonTravel2026!
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setEmailInput('admin@smart-tourism.lk');
                  setPasswordInput('CeylonTravel2026!');
                }}
                className="mt-2 text-[11px] text-emerald-800 hover:underline font-semibold"
              >
                Auto-fill Demo Credentials
              </button>
            </div>
          </div>

          <div className="text-center mt-6">
            <Link
              href="/"
              className="text-xs text-stone-500 hover:text-emerald-800 transition-colors"
            >
              ← Return to Public Tourism Portal
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // DASHBOARD PAGE
  return (
    <div className="min-h-screen bg-stone-100 flex flex-col">
      {/* Top Admin Header */}
      <header className="bg-white border-b border-stone-200 sticky top-0 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded bg-emerald-900 text-white flex items-center justify-center">
                <Shield className="w-5 h-5 text-emerald-200" />
              </div>
              <div>
                <h1 className="font-serif text-lg font-bold text-stone-900 leading-tight">
                  Tourism Enquiry Management
                </h1>
                <p className="text-xs text-stone-500">
                  Supabase DB & JSON Store • Protected Staff Access
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setShowSqlGuide(!showSqlGuide)}
                className="hidden md:inline-flex items-center gap-1.5 text-xs text-stone-600 hover:text-emerald-800 bg-stone-100 hover:bg-stone-200 px-3 py-1.5 rounded border border-stone-300 font-medium transition-colors"
              >
                <Database className="w-3.5 h-3.5 text-emerald-700" />
                Supabase Policies
              </button>

              <button
                type="button"
                onClick={handleExportJson}
                className="hidden sm:inline-flex items-center gap-1.5 text-xs text-stone-600 hover:text-emerald-800 bg-stone-100 hover:bg-stone-200 px-3 py-1.5 rounded border border-stone-300 font-medium transition-colors"
              >
                <FileJson className="w-3.5 h-3.5 text-emerald-700" />
                Export JSON
              </button>

              <div className="h-6 w-px bg-stone-300 mx-1 hidden sm:block" />

              <div className="flex items-center gap-2 text-xs text-stone-700">
                <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-900 font-semibold flex items-center justify-center">
                  A
                </div>
                <span className="hidden md:inline font-medium">
                  {adminUser?.email}
                </span>
              </div>

              <button
                type="button"
                onClick={handleLogout}
                className="inline-flex items-center gap-1 text-xs text-red-700 hover:text-red-900 font-medium px-2.5 py-1.5 rounded hover:bg-red-50 transition-colors"
                title="Log out"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Admin Workspace */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full">
        {/* Supabase Security Policy Notice / Guide Drawer */}
        {showSqlGuide && (
          <div className="mb-6 p-5 bg-white border border-stone-300 rounded-lg shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Database className="w-5 h-5 text-emerald-800" />
                <h3 className="font-serif font-bold text-stone-900 text-base">
                  Supabase Database & Security Policies Guide
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowSqlGuide(false)}
                className="text-stone-400 hover:text-stone-600 text-sm"
              >
                ✕
              </button>
            </div>
            <p className="text-xs text-stone-600 leading-relaxed mb-3">
              This system implements dual-layer storage: inquiries are always written to{' '}
              <code className="bg-stone-100 px-1 py-0.5 rounded text-stone-800">
                data/enquiries.json
              </code>{' '}
              and synchronized with Supabase when configured. Row Level Security (RLS) ensures that public users can only INSERT enquiries, while only authenticated staff can SELECT, UPDATE, or DELETE records.
            </p>
            <div className="bg-stone-900 text-stone-200 p-3 rounded font-mono text-[11px] overflow-x-auto">
              <p className="text-emerald-400">-- Schema and Security Policy SQL located at /supabase/schema.sql</p>
              <p>ALTER TABLE public.enquiries ENABLE ROW LEVEL SECURITY;</p>
              <p>CREATE POLICY &quot;Allow public to insert enquiries&quot; ON public.enquiries FOR INSERT TO anon, authenticated WITH CHECK (true);</p>
              <p>CREATE POLICY &quot;Allow authenticated admins to read enquiries&quot; ON public.enquiries FOR SELECT TO authenticated USING (true);</p>
              <p>CREATE POLICY &quot;Allow authenticated admins to update enquiry status&quot; ON public.enquiries FOR UPDATE TO authenticated USING (true);</p>
            </div>
          </div>
        )}

        {/* Metric Summary Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-4 rounded-lg border border-stone-200 shadow-sm">
            <div className="text-xs font-semibold uppercase tracking-wider text-stone-500 mb-1">
              Total Enquiries
            </div>
            <div className="text-2xl sm:text-3xl font-bold font-serif text-stone-900">
              {enquiries.length}
            </div>
            <div className="text-[11px] text-stone-400 mt-1">All captured leads</div>
          </div>

          <div className="bg-white p-4 rounded-lg border border-emerald-200 shadow-sm">
            <div className="text-xs font-semibold uppercase tracking-wider text-emerald-800 mb-1 flex items-center justify-between">
              <span>New</span>
              <Clock className="w-3.5 h-3.5 text-emerald-700" />
            </div>
            <div className="text-2xl sm:text-3xl font-bold font-serif text-emerald-800">
              {countNew}
            </div>
            <div className="text-[11px] text-stone-400 mt-1">Awaiting response</div>
          </div>

          <div className="bg-white p-4 rounded-lg border border-amber-200 shadow-sm">
            <div className="text-xs font-semibold uppercase tracking-wider text-amber-800 mb-1 flex items-center justify-between">
              <span>Contacted</span>
              <RefreshCw className="w-3.5 h-3.5 text-amber-700" />
            </div>
            <div className="text-2xl sm:text-3xl font-bold font-serif text-amber-800">
              {countContacted}
            </div>
            <div className="text-[11px] text-stone-400 mt-1">In communication</div>
          </div>

          <div className="bg-white p-4 rounded-lg border border-stone-200 shadow-sm">
            <div className="text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1 flex items-center justify-between">
              <span>Closed</span>
              <Archive className="w-3.5 h-3.5 text-stone-500" />
            </div>
            <div className="text-2xl sm:text-3xl font-bold font-serif text-stone-700">
              {countClosed}
            </div>
            <div className="text-[11px] text-stone-400 mt-1">Resolved or booked</div>
          </div>
        </div>

        {/* Toolbar: Search, Filters & Refresh */}
        <div className="bg-white p-4 rounded-lg border border-stone-200 shadow-sm mb-6 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          <div className="flex-1 flex items-center gap-3">
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name, email, destination, keyword..."
                className="w-full bg-stone-50 border border-stone-300 rounded pl-9 pr-3 py-2 text-xs sm:text-sm text-stone-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-700"
              />
            </div>

            <button
              type="button"
              onClick={fetchEnquiries}
              disabled={loadingEnquiries}
              className="inline-flex items-center gap-1 text-xs text-stone-700 bg-stone-100 hover:bg-stone-200 border border-stone-300 px-3 py-2 rounded transition-colors"
              title="Refresh enquiries"
            >
              <RefreshCw
                className={`w-3.5 h-3.5 ${loadingEnquiries ? 'animate-spin' : ''}`}
              />
              <span className="hidden sm:inline">Refresh</span>
            </button>
          </div>

          {/* Status Filter Tabs */}
          <div className="flex items-center gap-1.5 border-t md:border-t-0 pt-3 md:pt-0 border-stone-200 overflow-x-auto">
            <span className="text-xs text-stone-500 uppercase font-semibold mr-1 flex items-center gap-1">
              <Filter className="w-3 h-3" /> Status:
            </span>
            {(['All', 'New', 'Contacted', 'Closed'] as const).map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setStatusFilter(tab)}
                className={`text-xs px-2.5 py-1.5 rounded font-medium transition-colors ${
                  statusFilter === tab
                    ? 'bg-emerald-800 text-white shadow-sm'
                    : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Enquiries Table */}
        <div className="bg-white rounded-lg border border-stone-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="bg-stone-50 border-b border-stone-200 text-stone-600 text-xs uppercase font-semibold">
                  <th className="py-3 px-4">Date Submitted</th>
                  <th className="py-3 px-4">Customer</th>
                  <th className="py-3 px-4">Destination</th>
                  <th className="py-3 px-4">Message Preview</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200">
                {filteredEnquiries.length === 0 ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="py-12 text-center text-stone-500 text-sm"
                    >
                      No tourism enquiries found matching your search or filter.
                    </td>
                  </tr>
                ) : (
                  filteredEnquiries.map((enq) => {
                    const isUpdating = updatingId === enq.id;
                    return (
                      <tr
                        key={enq.id}
                        className="hover:bg-stone-50/80 transition-colors"
                      >
                        {/* Submission Date */}
                        <td className="py-3.5 px-4 text-xs text-stone-600 whitespace-nowrap">
                          <div className="flex items-center gap-1.5 font-medium">
                            <Calendar className="w-3.5 h-3.5 text-stone-400" />
                            {formatDate(enq.created_at)}
                          </div>
                          <span className="text-[10px] text-stone-400 font-mono">
                            ID: {enq.id}
                          </span>
                        </td>

                        {/* Customer Info */}
                        <td className="py-3.5 px-4">
                          <div className="font-semibold text-stone-900">
                            {enq.name}
                          </div>
                          <div className="text-xs text-stone-500 flex items-center gap-1">
                            <Mail className="w-3 h-3 text-stone-400" />
                            <a
                              href={`mailto:${enq.email}`}
                              className="hover:text-emerald-700 underline"
                            >
                              {enq.email}
                            </a>
                          </div>
                          {enq.phone && (
                            <div className="text-[11px] text-stone-500 flex items-center gap-1 mt-0.5">
                              <Phone className="w-3 h-3 text-stone-400" />
                              <span>{enq.phone}</span>
                            </div>
                          )}
                        </td>

                        {/* Destination */}
                        <td className="py-3.5 px-4 whitespace-nowrap">
                          <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded bg-stone-100 text-stone-800 border border-stone-200">
                            <Compass className="w-3 h-3 text-emerald-800" />
                            {enq.destination}
                          </span>
                          {enq.guests && (
                            <div className="text-[11px] text-stone-500 mt-1 flex items-center gap-1">
                              <Users className="w-3 h-3 text-stone-400" />
                              <span>{enq.guests} Guest(s)</span>
                            </div>
                          )}
                        </td>

                        {/* Message Preview */}
                        <td className="py-3.5 px-4 max-w-xs">
                          <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
                            {enq.message}
                          </p>
                        </td>

                        {/* Status Dropdown */}
                        <td className="py-3.5 px-4 whitespace-nowrap">
                          <div className="relative inline-block">
                            <select
                              disabled={isUpdating}
                              value={enq.status}
                              onChange={(e) =>
                                handleStatusUpdate(
                                  enq.id,
                                  e.target.value as EnquiryStatus
                                )
                              }
                              className={`text-xs font-semibold rounded px-2.5 py-1.5 pr-6 appearance-none border cursor-pointer focus:outline-none focus:ring-1 ${
                                enq.status === 'New'
                                  ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                                  : enq.status === 'Contacted'
                                  ? 'bg-amber-50 text-amber-800 border-amber-300'
                                  : 'bg-stone-100 text-stone-700 border-stone-300'
                              }`}
                            >
                              <option value="New">New</option>
                              <option value="Contacted">Contacted</option>
                              <option value="Closed">Closed</option>
                            </select>
                            <ChevronDown className="w-3 h-3 text-stone-500 absolute right-1.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                          </div>
                        </td>

                        {/* Actions */}
                        <td className="py-3.5 px-4 text-right whitespace-nowrap">
                          <button
                            type="button"
                            onClick={() => setSelectedEnquiry(enq)}
                            className="text-xs font-semibold text-emerald-800 hover:text-emerald-950 bg-emerald-50 hover:bg-emerald-100 px-3 py-1.5 rounded transition-colors"
                          >
                            View Details
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Detail Modal / Drawer */}
      {selectedEnquiry && (
        <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-lg border border-stone-300 shadow-xl max-w-2xl w-full p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-stone-200 pb-4">
              <div>
                <span className="text-xs text-stone-400 font-mono">
                  Enquiry ID: {selectedEnquiry.id}
                </span>
                <h3 className="font-serif text-xl font-bold text-stone-900">
                  {selectedEnquiry.name}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedEnquiry(null)}
                className="text-stone-400 hover:text-stone-700 p-1"
              >
                ✕
              </button>
            </div>

            {/* Quick Details Grid */}
            <div className="grid grid-cols-2 gap-4 text-xs bg-stone-50 p-4 rounded border border-stone-200">
              <div>
                <span className="text-stone-500 block uppercase font-semibold">
                  Email
                </span>
                <a
                  href={`mailto:${selectedEnquiry.email}`}
                  className="text-emerald-800 font-medium hover:underline flex items-center gap-1 mt-0.5"
                >
                  <Mail className="w-3 h-3" />
                  {selectedEnquiry.email}
                </a>
              </div>

              <div>
                <span className="text-stone-500 block uppercase font-semibold">
                  Phone / WhatsApp
                </span>
                <span className="font-medium text-stone-800">
                  {selectedEnquiry.phone || 'Not provided'}
                </span>
              </div>

              <div>
                <span className="text-stone-500 block uppercase font-semibold">
                  Destination
                </span>
                <span className="font-medium text-stone-800">
                  {selectedEnquiry.destination}
                </span>
              </div>

              <div>
                <span className="text-stone-500 block uppercase font-semibold">
                  Date Submitted
                </span>
                <span className="font-medium text-stone-800">
                  {formatDate(selectedEnquiry.created_at)}
                </span>
              </div>

              {selectedEnquiry.travel_date && (
                <div>
                  <span className="text-stone-500 block uppercase font-semibold">
                    Expected Travel Date
                  </span>
                  <span className="font-medium text-stone-800">
                    {selectedEnquiry.travel_date}
                  </span>
                </div>
              )}

              {selectedEnquiry.guests && (
                <div>
                  <span className="text-stone-500 block uppercase font-semibold">
                    Travelers Count
                  </span>
                  <span className="font-medium text-stone-800">
                    {selectedEnquiry.guests} person(s)
                  </span>
                </div>
              )}
            </div>

            {/* Message Body */}
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-stone-500 block mb-2">
                Customer Message
              </span>
              <div className="p-4 bg-stone-50 rounded border border-stone-200 text-sm text-stone-800 whitespace-pre-line leading-relaxed">
                {selectedEnquiry.message}
              </div>
            </div>

            {/* Status Change & Action */}
            <div className="pt-4 border-t border-stone-200 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-stone-600">
                  Update Status:
                </span>
                <select
                  value={selectedEnquiry.status}
                  onChange={(e) =>
                    handleStatusUpdate(
                      selectedEnquiry.id,
                      e.target.value as EnquiryStatus
                    )
                  }
                  className="text-xs font-semibold rounded px-3 py-1.5 border border-stone-300 bg-white"
                >
                  <option value="New">New</option>
                  <option value="Contacted">Contacted</option>
                  <option value="Closed">Closed</option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={`mailto:${selectedEnquiry.email}?subject=Regarding your enquiry for ${encodeURIComponent(selectedEnquiry.destination)}`}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold bg-emerald-800 hover:bg-emerald-900 text-white px-4 py-2 rounded transition-colors shadow-sm"
                >
                  <Mail className="w-3.5 h-3.5" />
                  Reply via Email
                </a>
                <button
                  type="button"
                  onClick={() => setSelectedEnquiry(null)}
                  className="text-xs font-medium text-stone-600 hover:text-stone-800 px-3 py-2 rounded border border-stone-300"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

