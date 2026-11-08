'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import { trackLeadGenerated } from '@/lib/analytics';
import { DESTINATIONS } from '@/lib/destinations';
import { Send, CheckCircle2, AlertCircle, Calendar, Users, Phone, Mail, User, Compass } from 'lucide-react';

function EnquiryFormInner() {
  const { messages } = useLanguage();
  const searchParams = useSearchParams();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    destination: '',
    travel_date: '',
    guests: 2,
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Handle auto-selection of destination from URL query e.g. ?destination=sigiriya
  useEffect(() => {
    const destParam = searchParams.get('destination');
    if (destParam) {
      const match = DESTINATIONS.find(
        (d) => d.slug.toLowerCase() === destParam.toLowerCase()
      );
      if (match) {
        setFormData((prev) => ({ ...prev, destination: match.name }));
      }
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    // Basic Validation
    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.destination ||
      !formData.message.trim()
    ) {
      setErrorMessage(messages.enquiry.errorMsg || 'Please complete all required fields.');
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(formData.email.trim())) {
      setErrorMessage('Please provide a valid email address.');
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
        const data = await res.json();
        throw new Error(data.error || 'Failed to submit enquiry.');
      }

      // Success
      setSuccess(true);
      trackLeadGenerated(formData.destination);

      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        destination: '',
        travel_date: '',
        guests: 2,
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
    <section id="enquiry" className="py-20 bg-stone-50 border-b border-stone-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-1.5 bg-emerald-100 text-emerald-900 border border-emerald-200 px-3 py-1 rounded text-xs font-semibold uppercase tracking-wider mb-3">
            <Compass className="w-3.5 h-3.5" />
            {messages.enquiry.badge}
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight mb-3">
            {messages.enquiry.title}
          </h2>
          <p className="text-stone-600 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            {messages.enquiry.subtitle}
          </p>
        </div>

        <div className="bg-white rounded-lg border border-stone-300 shadow-sm p-6 sm:p-10">
          {success ? (
            <div className="text-center py-10 space-y-4">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-stone-900">
                {messages.enquiry.successTitle}
              </h3>
              <p className="text-stone-600 max-w-md mx-auto text-sm leading-relaxed">
                {messages.enquiry.successDesc}
              </p>
              <button
                type="button"
                onClick={() => setSuccess(false)}
                className="mt-4 inline-flex items-center gap-2 bg-emerald-800 hover:bg-emerald-900 text-white px-5 py-2.5 rounded font-medium text-sm transition-colors"
              >
                Submit Another Enquiry
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {errorMessage && (
                <div className="p-3.5 bg-red-50 border border-red-200 rounded text-red-800 text-sm flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Row 1: Name and Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1.5 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-stone-400" />
                    {messages.enquiry.fullName} <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="e.g. Eleanor Vance"
                    className="w-full bg-stone-50 border border-stone-300 rounded px-3.5 py-2.5 text-sm text-stone-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-700 focus:border-emerald-700 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1.5 flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-stone-400" />
                    {messages.enquiry.email} <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    placeholder="eleanor@example.com"
                    className="w-full bg-stone-50 border border-stone-300 rounded px-3.5 py-2.5 text-sm text-stone-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-700 focus:border-emerald-700 transition-colors"
                  />
                </div>
              </div>

              {/* Row 2: Phone and Destination */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1.5 flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-stone-400" />
                    {messages.enquiry.phone}
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    placeholder="+94 77 123 4567"
                    className="w-full bg-stone-50 border border-stone-300 rounded px-3.5 py-2.5 text-sm text-stone-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-700 focus:border-emerald-700 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1.5 flex items-center gap-1.5">
                    <Compass className="w-3.5 h-3.5 text-stone-400" />
                    {messages.enquiry.destination} <span className="text-red-600">*</span>
                  </label>
                  <select
                    required
                    value={formData.destination}
                    onChange={(e) =>
                      setFormData({ ...formData, destination: e.target.value })
                    }
                    className="w-full bg-stone-50 border border-stone-300 rounded px-3.5 py-2.5 text-sm text-stone-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-700 focus:border-emerald-700 transition-colors"
                  >
                    <option value="">-- {messages.enquiry.selectDestination} --</option>
                    {DESTINATIONS.map((dest) => (
                      <option key={dest.slug} value={dest.name}>
                        {dest.name} ({dest.category})
                      </option>
                    ))}
                    <option value="Island Tour / Custom Itinerary">
                      {messages.enquiry.allDestinations}
                    </option>
                  </select>
                </div>
              </div>

              {/* Row 3: Travel Date and Guests */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1.5 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-stone-400" />
                    {messages.enquiry.travelDate}
                  </label>
                  <input
                    type="date"
                    value={formData.travel_date}
                    onChange={(e) =>
                      setFormData({ ...formData, travel_date: e.target.value })
                    }
                    className="w-full bg-stone-50 border border-stone-300 rounded px-3.5 py-2.5 text-sm text-stone-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-700 focus:border-emerald-700 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1.5 flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-stone-400" />
                    {messages.enquiry.guests}
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="50"
                    value={formData.guests}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        guests: parseInt(e.target.value) || 1,
                      })
                    }
                    className="w-full bg-stone-50 border border-stone-300 rounded px-3.5 py-2.5 text-sm text-stone-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-700 focus:border-emerald-700 transition-colors"
                  />
                </div>
              </div>

              {/* Row 4: Message */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1.5">
                  {messages.enquiry.message} <span className="text-red-600">*</span>
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  placeholder={messages.enquiry.messagePlaceholder}
                  className="w-full bg-stone-50 border border-stone-300 rounded px-3.5 py-2.5 text-sm text-stone-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-700 focus:border-emerald-700 transition-colors resize-y"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-emerald-800 hover:bg-emerald-900 disabled:bg-stone-400 text-white font-semibold px-8 py-3.5 rounded text-sm transition-colors shadow-sm cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  {loading ? messages.enquiry.submitting : messages.enquiry.submit}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

export const EnquiryForm: React.FC = () => {
  return (
    <Suspense
      fallback={
        <div className="py-20 text-center text-stone-500 text-sm">
          Loading Enquiry Section...
        </div>
      }
    >
      <EnquiryFormInner />
    </Suspense>
  );
};
