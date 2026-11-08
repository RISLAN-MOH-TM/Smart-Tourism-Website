'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { SriLankaMap } from '@/components/SriLankaMap';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle2,
  AlertCircle,
  Compass,
  MessageSquare,
  ShieldCheck,
} from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    destination: 'Colombo Tourism Desk / General Inquiry',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setErrorMessage('Please complete all required fields.');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error('Failed to submit message.');
      }

      setSuccess(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        destination: 'Colombo Tourism Desk / General Inquiry',
        message: '',
      });
    } catch (err: unknown) {
      if (err instanceof Error) {
        setErrorMessage(err.message);
      } else {
        setErrorMessage('An unexpected error occurred. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <main className="flex-1 bg-stone-50 pb-20">
        {/* Banner */}
        <section className="bg-stone-900 text-white py-16 sm:py-20 relative overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-30"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1588598198321-9735fd52455b?auto=format&fit=crop&w=1800&q=80')",
            }}
          />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
            <div className="inline-flex items-center gap-1.5 bg-emerald-900/80 text-emerald-200 border border-emerald-700/60 px-3 py-1 rounded text-xs font-semibold uppercase tracking-wider mb-4">
              <Mail className="w-3.5 h-3.5" />
              Get in Touch
            </div>
            <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight mb-4">
              Contact Sri Lanka Tourism Hub
            </h1>
            <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
              Have questions regarding itineraries, private chauffeur bookings, or seasonal weather across the island? Our Colombo travel desk is at your service.
            </p>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 space-y-12">
          {/* Section 1: Interactive Google Map with Sri Lanka Main Places */}
          <section>
            <div className="text-center max-w-2xl mx-auto mb-6">
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 mb-2">
                Explore Main Places in Sri Lanka
              </h2>
              <p className="text-xs sm:text-sm text-stone-600">
                Click any key region or landmark below to explore its geographic location on the live Google Map.
              </p>
            </div>

            <SriLankaMap />
          </section>

          {/* Section 2: Contact Form & Office Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Details (1 Col) */}
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg border border-stone-200 shadow-sm space-y-5">
                <h3 className="font-serif text-lg font-bold text-stone-900 border-b border-stone-200 pb-3">
                  Colombo Central Office
                </h3>

                <div className="space-y-4 text-xs sm:text-sm text-stone-700">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-emerald-800 flex-shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-stone-900">Address:</strong>
                      <span>Level 4, Colombo Tourism Hub, Galle Road, Colombo 03, Sri Lanka</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-emerald-800 flex-shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-stone-900">Telephone / WhatsApp:</strong>
                      <p>+94 11 243 7050</p>
                      <p className="text-xs text-stone-500">+94 77 123 4567 (24/7 Traveler Help)</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Mail className="w-5 h-5 text-emerald-800 flex-shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-stone-900">Official Email:</strong>
                      <a href="mailto:travel@smart-tourism.lk" className="text-emerald-800 underline">
                        travel@smart-tourism.lk
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-emerald-800 flex-shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-stone-900">Operating Hours:</strong>
                      <p>Monday – Saturday: 8:30 AM – 6:00 PM (IST)</p>
                      <p className="text-xs text-stone-500">Emergency support available 24/7</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-emerald-950 text-emerald-100 p-6 rounded-lg border border-emerald-900 shadow-sm space-y-2">
                <div className="flex items-center gap-2 text-emerald-300 font-semibold text-xs uppercase tracking-wider">
                  <ShieldCheck className="w-4 h-4" />
                  Official Visitor Assistance
                </div>
                <p className="text-xs leading-relaxed text-emerald-200">
                  All tour operators affiliated with Smart Tourism Sri Lanka adhere to verified tourist driver licensing, comprehensive insurance, and ethical wildlife safety charters.
                </p>
              </div>
            </div>

            {/* Direct Contact Form (2 Cols) */}
            <div className="lg:col-span-2">
              <div className="bg-white p-6 sm:p-10 rounded-lg border border-stone-200 shadow-sm">
                <div className="mb-6">
                  <h3 className="font-serif text-2xl font-bold text-stone-900 mb-1">
                    Send Us a Message
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-600">
                    Fill out the form below and our team will get back to you within 24 hours.
                  </p>
                </div>

                {success ? (
                  <div className="text-center py-10 space-y-3 bg-emerald-50 rounded-lg p-6 border border-emerald-200">
                    <CheckCircle2 className="w-12 h-12 text-emerald-700 mx-auto" />
                    <h4 className="font-serif text-xl font-bold text-stone-900">
                      Message Successfully Sent!
                    </h4>
                    <p className="text-xs text-stone-600 max-w-md mx-auto">
                      Thank you for contacting Smart Tourism Sri Lanka. A copy of your inquiry has been recorded and an agent will reply shortly.
                    </p>
                    <button
                      type="button"
                      onClick={() => setSuccess(false)}
                      className="mt-3 text-xs font-semibold bg-emerald-800 text-white px-4 py-2 rounded"
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    {errorMessage && (
                      <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 flex-shrink-0" />
                        <span>{errorMessage}</span>
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1">
                          Your Full Name <span className="text-red-600">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="e.g. Liam Smith"
                          className="w-full bg-stone-50 border border-stone-300 rounded px-3 py-2 text-xs sm:text-sm text-stone-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-700"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1">
                          Email Address <span className="text-red-600">*</span>
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="liam@example.com"
                          className="w-full bg-stone-50 border border-stone-300 rounded px-3 py-2 text-xs sm:text-sm text-stone-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-700"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1">
                          Phone / WhatsApp
                        </label>
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="+44 7700 900123"
                          className="w-full bg-stone-50 border border-stone-300 rounded px-3 py-2 text-xs sm:text-sm text-stone-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-700"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1">
                          Subject / Topic
                        </label>
                        <select
                          value={formData.destination}
                          onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                          className="w-full bg-stone-50 border border-stone-300 rounded px-3 py-2 text-xs sm:text-sm text-stone-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-700"
                        >
                          <option value="Colombo Tourism Desk / General Inquiry">
                            Colombo Tourism Desk / General Inquiry
                          </option>
                          <option value="Sigiriya Tour Planning">Sigiriya Tour Planning</option>
                          <option value="Ella Scenic Train Inquiries">Ella Scenic Train Inquiries</option>
                          <option value="Galle Fort & South Coast">Galle Fort & South Coast</option>
                          <option value="Mirissa Whale Watching">Mirissa Whale Watching</option>
                          <option value="Private Chauffeur Booking">Private Chauffeur Booking</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1">
                        Message <span className="text-red-600">*</span>
                      </label>
                      <textarea
                        required
                        rows={4}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="How can our Colombo travel desk assist your upcoming journey?"
                        className="w-full bg-stone-50 border border-stone-300 rounded px-3 py-2 text-xs sm:text-sm text-stone-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-700 resize-y"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="inline-flex items-center gap-2 bg-emerald-800 hover:bg-emerald-900 text-white font-semibold text-xs sm:text-sm py-3 px-6 rounded transition-colors shadow-sm disabled:bg-stone-400 cursor-pointer"
                    >
                      <Send className="w-4 h-4" />
                      {loading ? 'Sending Message...' : 'Send Message'}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}

