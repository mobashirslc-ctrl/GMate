import { useState, useEffect } from 'react';
import { Shield, MapPin, AlertTriangle, Users, Phone } from 'lucide-react';
import { createClient } from '../../../utils/supabase/client';
import { projectId } from '../../../utils/supabase/info';

interface SOSEmergencyProps {
  profile: any;
}

export default function SOSEmergency({ profile }: SOSEmergencyProps) {
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [activeAlerts, setActiveAlerts] = useState<any[]>([]);
  const [location, setLocation] = useState<string>('');

  useEffect(() => {
    fetchActiveAlerts();
    const interval = setInterval(fetchActiveAlerts, 10000); // Refresh every 10 seconds
    return () => clearInterval(interval);
  }, []);

  const fetchActiveAlerts = async () => {
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-9a414d17/sos/active`
      );
      const data = await response.json();
      setActiveAlerts(data.alerts || []);
    } catch (error) {
      console.error('Error fetching SOS alerts:', error);
    }
  };

  const sendSOSAlert = async () => {
    setSending(true);

    try {
      // Get user's location
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {
          const userLocation = `${position.coords.latitude}, ${position.coords.longitude}`;

          const supabase = createClient();
          const { data: { session } } = await supabase.auth.getSession();

          const response = await fetch(
            `https://${projectId}.supabase.co/functions/v1/make-server-9a414d17/sos/create`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${session?.access_token}`,
              },
              body: JSON.stringify({
                location: location || userLocation,
                message: 'Emergency! Need immediate assistance.',
              }),
            }
          );

          if (response.ok) {
            setSent(true);
            setTimeout(() => setSent(false), 5000);
            fetchActiveAlerts();
          }
          setSending(false);
        });
      } else {
        // Fallback if geolocation is not available
        const supabase = createClient();
        const { data: { session } } = await supabase.auth.getSession();

        const response = await fetch(
          `https://${projectId}.supabase.co/functions/v1/make-server-9a414d17/sos/create`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${session?.access_token}`,
            },
            body: JSON.stringify({
              location: location || 'Location not available',
              message: 'Emergency! Need immediate assistance.',
            }),
          }
        );

        if (response.ok) {
          setSent(true);
          setTimeout(() => setSent(false), 5000);
          fetchActiveAlerts();
        }
        setSending(false);
      }
    } catch (error) {
      console.error('Error sending SOS alert:', error);
      setSending(false);
    }
  };

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">SOS Emergency Alert</h2>
        <p className="text-gray-600">Instant safety alerts to verified students nearby</p>
      </div>

      {/* Emergency Button */}
      <div className="bg-gradient-to-br from-rose-500 to-red-600 rounded-3xl p-8 text-white mb-6 shadow-2xl">
        <div className="text-center">
          <div className="size-32 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
            <Shield className="size-16" />
          </div>
          <h3 className="text-3xl font-bold mb-4">Emergency SOS</h3>
          <p className="text-lg mb-6 opacity-90">
            Press the button below to send an emergency alert to all verified students within 2km radius
          </p>
          <div className="mb-6">
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Enter your location (or we'll use GPS)"
              className="w-full max-w-md px-4 py-3 rounded-xl text-gray-900 font-medium"
            />
          </div>
          <button
            onClick={sendSOSAlert}
            disabled={sending || sent}
            className="px-12 py-5 bg-white text-red-600 font-bold text-xl rounded-full hover:shadow-2xl transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {sending ? 'Sending Alert...' : sent ? '✓ Alert Sent!' : '🚨 SEND SOS ALERT'}
          </button>
          {sent && (
            <p className="mt-4 text-lg font-medium">
              Alert sent to nearby students! Emergency contact notified.
            </p>
          )}
        </div>
      </div>

      {/* Safety Tips */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 mb-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <AlertTriangle className="size-6 text-yellow-600" />
          Safety Guidelines
        </h3>
        <ul className="space-y-2 text-gray-700">
          <li className="flex items-start gap-2">
            <span className="text-red-600 font-bold">1.</span>
            <span>Only use SOS for genuine emergencies</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-red-600 font-bold">2.</span>
            <span>Your location and emergency contact will be notified automatically</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-red-600 font-bold">3.</span>
            <span>Nearby verified students will receive instant notification</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-red-600 font-bold">4.</span>
            <span>For medical emergencies, also call 999 or campus security</span>
          </li>
        </ul>
      </div>

      {/* Active Alerts Nearby */}
      <div>
        <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <MapPin className="size-6 text-red-600" />
          Active Alerts Nearby
        </h3>
        {activeAlerts.length === 0 ? (
          <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center">
            <div className="size-16 bg-green-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="size-8 text-green-700" />
            </div>
            <p className="text-green-800 font-medium text-lg">No active alerts in your area</p>
            <p className="text-green-700 mt-2">Your campus is safe</p>
          </div>
        ) : (
          <div className="space-y-4">
            {activeAlerts.map((alert) => (
              <div key={alert.id} className="bg-red-50 border-2 border-red-400 rounded-2xl p-6">
                <div className="flex items-start gap-4">
                  <div className="size-12 bg-red-500 rounded-full flex items-center justify-center animate-pulse">
                    <AlertTriangle className="size-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="font-bold text-red-900 mb-1">Emergency Alert</div>
                    <p className="text-red-800 mb-2">{alert.message}</p>
                    <div className="flex items-center gap-4 text-sm text-red-700">
                      <span className="flex items-center gap-1">
                        <MapPin className="size-4" />
                        {alert.location}
                      </span>
                      <span>{new Date(alert.createdAt).toLocaleString()}</span>
                    </div>
                  </div>
                  <button className="px-4 py-2 bg-red-600 text-white font-bold rounded-xl hover:bg-red-700 transition">
                    Respond
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Emergency Contacts */}
      <div className="mt-6 bg-blue-50 border border-blue-200 rounded-2xl p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Emergency Contacts</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="flex items-center gap-3">
            <div className="size-10 bg-blue-500 rounded-full flex items-center justify-center">
              <Phone className="size-5 text-white" />
            </div>
            <div>
              <div className="font-bold text-gray-900">National Emergency</div>
              <a href="tel:999" className="text-blue-600 font-bold hover:underline">999</a>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="size-10 bg-green-500 rounded-full flex items-center justify-center">
              <Phone className="size-5 text-white" />
            </div>
            <div>
              <div className="font-bold text-gray-900">Your Emergency Contact</div>
              <a href={`tel:${profile?.emergencyContact}`} className="text-green-600 font-bold hover:underline">
                {profile?.emergencyContact}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
