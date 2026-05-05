import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router';
import { GraduationCap, Printer, Download, ArrowLeft } from 'lucide-react';
import { projectId, publicAnonKey } from '../../utils/supabase/info';
import { createClient } from '../../utils/supabase/client';

interface PrivilegeCardProps {
  user: any;
}

export default function PrivilegeCard({ user }: PrivilegeCardProps) {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const supabase = createClient();
      const { data: { session } } = await supabase.auth.getSession();

      if (!session) return;

      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-9a414d17/profile`,
        {
          headers: {
            Authorization: `Bearer ${session.access_token}`,
          },
        }
      );

      const data = await response.json();
      setProfile(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching profile:', error);
      setLoading(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50 flex items-center justify-center">
        <div className="text-2xl font-bold text-orange-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50">
      <header className="bg-white/80 backdrop-blur-md border-b border-orange-100 print:hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link to="/dashboard" className="flex items-center gap-2 text-orange-600 font-medium hover:underline">
            <ArrowLeft className="size-5" />
            Back to Dashboard
          </Link>
          <div className="flex gap-3">
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 px-6 py-2 bg-white border-2 border-orange-500 text-orange-600 font-medium rounded-full hover:bg-orange-50 transition"
            >
              <Printer className="size-5" />
              Print Card
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-8 print:hidden">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Your Student Privilege Card</h1>
          <p className="text-gray-600">Enjoy exclusive discounts at partner brands and shops</p>
        </div>

        {/* Digital Card - Front */}
        <div ref={cardRef} className="mb-8">
          <div className="bg-gradient-to-br from-orange-500 via-orange-600 to-yellow-500 rounded-3xl p-8 shadow-2xl text-white aspect-[1.586/1] max-w-2xl mx-auto relative overflow-hidden print:shadow-none">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-10 right-10 size-40 bg-white rounded-full blur-3xl"></div>
              <div className="absolute bottom-10 left-10 size-40 bg-white rounded-full blur-3xl"></div>
            </div>

            <div className="relative z-10">
              {/* Header */}
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="size-12 bg-white rounded-full flex items-center justify-center">
                    <GraduationCap className="size-7 text-orange-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">GMate</div>
                    <div className="text-sm opacity-90">Student Privilege Card</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm opacity-75">Valid Until</div>
                  <div className="font-bold">Dec 2026</div>
                </div>
              </div>

              {/* Student Info */}
              <div className="space-y-3 mb-8">
                <div>
                  <div className="text-sm opacity-75">Student Name</div>
                  <div className="text-2xl font-bold">{profile?.studentName || 'N/A'}</div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm opacity-75">ID Number</div>
                    <div className="font-bold text-lg">{profile?.idNo || 'N/A'}</div>
                  </div>
                  <div>
                    <div className="text-sm opacity-75">Blood Group</div>
                    <div className="font-bold text-lg">{profile?.bloodGroup || 'N/A'}</div>
                  </div>
                </div>
                <div>
                  <div className="text-sm opacity-75">University</div>
                  <div className="font-bold">{profile?.universityName || 'N/A'}</div>
                </div>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between">
                <div className="text-sm opacity-90">
                  Member Since: {new Date(profile?.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                </div>
                <div className="px-4 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium">
                  ✓ Verified Student
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Card Back - Benefits */}
        <div className="bg-white rounded-3xl p-8 shadow-xl max-w-2xl mx-auto print:shadow-none print:mt-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Exclusive Benefits</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 bg-orange-50 rounded-xl">
              <div className="text-3xl mb-2">🍕</div>
              <div className="font-bold text-gray-900 mb-1">Food & Dining</div>
              <div className="text-sm text-gray-600">Up to 25% off at partner restaurants</div>
            </div>
            <div className="p-4 bg-orange-50 rounded-xl">
              <div className="text-3xl mb-2">📚</div>
              <div className="font-bold text-gray-900 mb-1">Books & Stationery</div>
              <div className="text-sm text-gray-600">15% off at all bookstores</div>
            </div>
            <div className="p-4 bg-orange-50 rounded-xl">
              <div className="text-3xl mb-2">🎬</div>
              <div className="font-bold text-gray-900 mb-1">Entertainment</div>
              <div className="text-sm text-gray-600">20% off movie tickets & events</div>
            </div>
            <div className="p-4 bg-orange-50 rounded-xl">
              <div className="text-3xl mb-2">🚌</div>
              <div className="font-bold text-gray-900 mb-1">Transport</div>
              <div className="text-sm text-gray-600">Student fares on all routes</div>
            </div>
            <div className="p-4 bg-orange-50 rounded-xl">
              <div className="text-3xl mb-2">💻</div>
              <div className="font-bold text-gray-900 mb-1">Tech & Gadgets</div>
              <div className="text-sm text-gray-600">Exclusive deals on electronics</div>
            </div>
            <div className="p-4 bg-orange-50 rounded-xl">
              <div className="text-3xl mb-2">🏋️</div>
              <div className="font-bold text-gray-900 mb-1">Fitness & Wellness</div>
              <div className="text-sm text-gray-600">Special rates at gyms & spas</div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-gradient-to-r from-orange-100 to-yellow-100 rounded-xl">
            <div className="font-bold text-gray-900 mb-1">How to Use</div>
            <div className="text-sm text-gray-700">
              Show this card (digital or printed) at any partner location to claim your student discount. Your ID number must match your university records.
            </div>
          </div>
        </div>

        <div className="mt-8 text-center print:hidden">
          <p className="text-gray-600 mb-4">Need a physical copy? Print this card for offline use!</p>
          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-orange-500 to-yellow-500 text-white font-bold rounded-full hover:shadow-lg transition"
          >
            <Printer className="size-5" />
            Print Student Card
          </button>
        </div>
      </div>

      <style>{`
        @media print {
          body {
            background: white !important;
          }
          .print\\:hidden {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
}
