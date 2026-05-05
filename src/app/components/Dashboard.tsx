import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router';
import {
  GraduationCap,
  ShoppingBag,
  Utensils,
  Briefcase,
  Users,
  Shield,
  Heart,
  Ticket,
  Home,
  Gift,
  LogOut,
  Plus,
  Search,
  Bell,
  User,
  CreditCard,
  AlertTriangle
} from 'lucide-react';
import { createClient } from '../../utils/supabase/client';
import { projectId, publicAnonKey } from '../../utils/supabase/info';
import AcademicMarketplace from './features/AcademicMarketplace';
import RentalService from './features/RentalService';
import StudentChefs from './features/StudentChefs';
import UsedGoods from './features/UsedGoods';
import PartTimeJobs from './features/PartTimeJobs';
import GroupShopping from './features/GroupShopping';
import TicketExchange from './features/TicketExchange';
import MentalHealth from './features/MentalHealth';
import SOSEmergency from './features/SOSEmergency';
import MessBooking from './features/MessBooking';

interface DashboardProps {
  user: any;
  setUser: (user: any) => void;
}

export default function Dashboard({ user, setUser }: DashboardProps) {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<any>(null);
  const [activeFeature, setActiveFeature] = useState<string>('home');
  const [loading, setLoading] = useState(true);

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

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    setUser(null);
    navigate('/');
  };

  const features = [
    { id: 'marketplace', name: 'Academic Marketplace', icon: ShoppingBag, color: 'bg-blue-500' },
    { id: 'rental', name: 'Rental Service', icon: Home, color: 'bg-purple-500' },
    { id: 'chefs', name: 'Student Chefs', icon: Utensils, color: 'bg-orange-500' },
    { id: 'used-goods', name: 'Used Goods', icon: ShoppingBag, color: 'bg-green-500' },
    { id: 'jobs', name: 'Part-time Jobs', icon: Briefcase, color: 'bg-indigo-500' },
    { id: 'group-shopping', name: 'Group Shopping', icon: Users, color: 'bg-pink-500' },
    { id: 'tickets', name: 'Ticket Exchange', icon: Ticket, color: 'bg-cyan-500' },
    { id: 'mental-health', name: 'Mental Health', icon: Heart, color: 'bg-red-500' },
    { id: 'sos', name: 'SOS Emergency', icon: Shield, color: 'bg-rose-600' },
    { id: 'mess', name: 'Mess Booking', icon: Utensils, color: 'bg-amber-500' },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50 flex items-center justify-center">
        <div className="text-2xl font-bold text-orange-600">Loading your dashboard...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="size-10 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-full flex items-center justify-center">
                  <GraduationCap className="size-6 text-white" />
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-yellow-600 bg-clip-text text-transparent">
                  GMate
                </span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button className="p-2 hover:bg-gray-100 rounded-full relative">
                <Bell className="size-6 text-gray-600" />
                <span className="absolute top-1 right-1 size-2 bg-red-500 rounded-full"></span>
              </button>
              <Link
                to="/privilege-card"
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-500 to-yellow-500 text-white font-medium rounded-full hover:shadow-lg transition"
              >
                <CreditCard className="size-5" />
                My Card
              </Link>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <div className="font-bold text-gray-900">{profile?.studentName}</div>
                  <div className="text-sm text-gray-600">{profile?.universityName}</div>
                </div>
                <div className="size-10 bg-gradient-to-br from-orange-200 to-yellow-200 rounded-full flex items-center justify-center">
                  <User className="size-6 text-orange-600" />
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="p-2 hover:bg-gray-100 rounded-full text-gray-600"
                title="Logout"
              >
                <LogOut className="size-6" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-72 bg-white border-r border-gray-200 min-h-[calc(100vh-73px)] sticky top-[73px]">
          <div className="p-4">
            <button
              onClick={() => setActiveFeature('home')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition ${
                activeFeature === 'home'
                  ? 'bg-gradient-to-r from-orange-500 to-yellow-500 text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Home className="size-5" />
              Dashboard Home
            </button>
          </div>

          <div className="px-4 pb-4">
            <div className="text-xs font-bold text-gray-500 uppercase mb-2 px-4">Features</div>
            <div className="space-y-1">
              {features.map((feature) => {
                const Icon = feature.icon;
                return (
                  <button
                    key={feature.id}
                    onClick={() => setActiveFeature(feature.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition ${
                      activeFeature === feature.id
                        ? 'bg-orange-50 text-orange-600 border-l-4 border-orange-600'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <div className={`${feature.color} size-8 rounded-lg flex items-center justify-center`}>
                      <Icon className="size-4 text-white" />
                    </div>
                    <span className="text-sm">{feature.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          {activeFeature === 'home' && (
            <div>
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, {profile?.studentName}! 👋</h1>
                <p className="text-gray-600">Here's what's happening in your GMate ecosystem today</p>
              </div>

              {/* Quick Stats */}
              <div className="grid md:grid-cols-4 gap-6 mb-8">
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="size-10 bg-blue-100 rounded-xl flex items-center justify-center">
                      <ShoppingBag className="size-5 text-blue-600" />
                    </div>
                    <div className="text-2xl font-bold text-gray-900">12</div>
                  </div>
                  <div className="text-sm text-gray-600">Active Listings</div>
                </div>
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="size-10 bg-orange-100 rounded-xl flex items-center justify-center">
                      <Utensils className="size-5 text-orange-600" />
                    </div>
                    <div className="text-2xl font-bold text-gray-900">8</div>
                  </div>
                  <div className="text-sm text-gray-600">Chef Orders</div>
                </div>
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="size-10 bg-green-100 rounded-xl flex items-center justify-center">
                      <Gift className="size-5 text-green-600" />
                    </div>
                    <div className="text-2xl font-bold text-gray-900">৳2,500</div>
                  </div>
                  <div className="text-sm text-gray-600">Earned This Month</div>
                </div>
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="size-10 bg-purple-100 rounded-xl flex items-center justify-center">
                      <Users className="size-5 text-purple-600" />
                    </div>
                    <div className="text-2xl font-bold text-gray-900">156</div>
                  </div>
                  <div className="text-sm text-gray-600">Connections</div>
                </div>
              </div>

              {/* Quick Access Features */}
              <div className="mb-8">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Access</h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {features.slice(0, 6).map((feature) => {
                    const Icon = feature.icon;
                    return (
                      <button
                        key={feature.id}
                        onClick={() => setActiveFeature(feature.id)}
                        className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition text-left"
                      >
                        <div className={`${feature.color} size-12 rounded-xl flex items-center justify-center mb-3`}>
                          <Icon className="size-6 text-white" />
                        </div>
                        <h3 className="font-bold text-gray-900 mb-1">{feature.name}</h3>
                        <p className="text-sm text-gray-600">Access {feature.name.toLowerCase()}</p>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Student Info Card */}
              <div className="bg-gradient-to-r from-orange-500 to-yellow-500 rounded-2xl p-6 text-white">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xl font-bold mb-4">Your Student Profile</h3>
                    <div className="grid md:grid-cols-3 gap-6">
                      <div>
                        <div className="text-sm opacity-80">Student ID</div>
                        <div className="font-bold text-lg">{profile?.idNo}</div>
                      </div>
                      <div>
                        <div className="text-sm opacity-80">Semester</div>
                        <div className="font-bold text-lg">{profile?.semester}</div>
                      </div>
                      <div>
                        <div className="text-sm opacity-80">Blood Group</div>
                        <div className="font-bold text-lg">{profile?.bloodGroup}</div>
                      </div>
                      <div>
                        <div className="text-sm opacity-80">Contact</div>
                        <div className="font-bold">{profile?.contactNo}</div>
                      </div>
                      <div>
                        <div className="text-sm opacity-80">Emergency Contact</div>
                        <div className="font-bold">{profile?.emergencyContact}</div>
                      </div>
                      <div>
                        <div className="text-sm opacity-80">Status</div>
                        <div className="flex items-center gap-2">
                          <div className="size-2 bg-green-300 rounded-full"></div>
                          <span className="font-bold">Verified</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <Link
                    to="/privilege-card"
                    className="px-6 py-3 bg-white text-orange-600 font-bold rounded-full hover:shadow-lg transition"
                  >
                    View Privilege Card
                  </Link>
                </div>
              </div>
            </div>
          )}

          {activeFeature === 'marketplace' && <AcademicMarketplace />}
          {activeFeature === 'rental' && <RentalService />}
          {activeFeature === 'chefs' && <StudentChefs />}
          {activeFeature === 'used-goods' && <UsedGoods />}
          {activeFeature === 'jobs' && <PartTimeJobs />}
          {activeFeature === 'group-shopping' && <GroupShopping />}
          {activeFeature === 'tickets' && <TicketExchange />}
          {activeFeature === 'mental-health' && <MentalHealth />}
          {activeFeature === 'sos' && <SOSEmergency profile={profile} />}
          {activeFeature === 'mess' && <MessBooking />}
        </main>
      </div>
    </div>
  );
}
