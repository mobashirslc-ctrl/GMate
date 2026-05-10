import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, ArrowLeft, Send, CheckCircle } from 'lucide-react';

export default function CampusFounderForm() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Ekhane backend logic ba Firebase integration hobe
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-orange-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-3xl p-8 text-center shadow-xl border border-orange-100">
          <div className="size-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="size-12" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Application Received!</h2>
          <p className="text-gray-600 mb-8">
            Thank you for applying. Our team will review your profile and contact you within 48 hours for the next steps.
          </p>
          <Link to="/" className="inline-block w-full py-4 bg-orange-600 text-white font-bold rounded-xl hover:bg-orange-700 transition">
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <Link to="/" className="inline-flex items-center gap-2 text-orange-600 font-medium mb-8 hover:gap-3 transition-all">
          <ArrowLeft className="size-5" /> Back to Home
        </Link>

        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-orange-100">
          <div className="bg-gradient-to-r from-orange-600 to-yellow-600 p-8 text-white text-center">
            <div className="size-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mx-auto mb-4">
              <GraduationCap className="size-10 text-white" />
            </div>
            <h1 className="text-3xl font-bold">Campus Founder Application</h1>
            <p className="mt-2 text-orange-50">Lead your campus ecosystem and grow as an entrepreneur</p>
          </div>

          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Full Name</label>
                <input required type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition" placeholder="John Doe" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">University Email</label>
                <input required type="email" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition" placeholder="john@university.edu" />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">University Name</label>
                <input required type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition" placeholder="e.g. NSU, DU, AIUB" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Phone Number (WhatsApp)</label>
                <input required type="tel" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition" placeholder="+880 1XXX-XXXXXX" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Why do you want to be a GMate Founder?</label>
              <textarea required rows={4} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition" placeholder="Tell us about your leadership experience or vision..."></textarea>
            </div>

            <button type="submit" className="w-full py-4 bg-gradient-to-r from-orange-600 to-yellow-600 text-white font-bold rounded-xl hover:shadow-lg transition-all flex items-center justify-center gap-2 text-lg">
              Submit Application <Send className="size-5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}