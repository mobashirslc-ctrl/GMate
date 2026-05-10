import { Link } from 'react-router-dom';
import { GraduationCap, ShoppingBag, Utensils, Briefcase, Users, Shield, Heart, Ticket, Home, Gift } from 'lucide-react';

export default function LandingPage() {
  const features = [
    {
      icon: ShoppingBag,
      title: 'Academic Marketplace',
      description: 'Buy and sell lecture notes, assignments, and thesis guides',
      color: 'bg-blue-500',
    },
    {
      icon: Home,
      title: 'Rental Service',
      description: 'Peer-to-peer rental for formal wear, cameras, and essentials',
      color: 'bg-purple-500',
    },
    {
      icon: Utensils,
      title: 'Student Chefs',
      description: 'Order delicious home-cooked meals from fellow students',
      color: 'bg-orange-500',
    },
    {
      icon: ShoppingBag,
      title: 'Used Goods',
      description: 'Buy and sell second-hand books, devices, and furniture',
      color: 'bg-green-500',
    },
    {
      icon: Briefcase,
      title: 'Part-time Jobs',
      description: 'Access student-specific job boards and internships',
      color: 'bg-indigo-500',
    },
    {
      icon: Users,
      title: 'Group Shopping',
      description: 'Split costs and unlock bulk deals together',
      color: 'bg-pink-500',
    },
    {
      icon: Gift,
      title: 'Student Privileges',
      description: 'Exclusive digital discount card for partner brands',
      color: 'bg-yellow-500',
    },
    {
      icon: Ticket,
      title: 'Ticket Exchange',
      description: 'P2P exchange for bus, train, and movie tickets',
      color: 'bg-cyan-500',
    },
    {
      icon: Heart,
      title: 'Mental Health',
      description: 'Anonymous peer support and professional counseling',
      color: 'bg-red-500',
    },
    {
      icon: Shield,
      title: 'SOS Emergency',
      description: 'Instant safety alerts to verified students nearby',
      color: 'bg-rose-600',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-amber-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-orange-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="size-10 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-full flex items-center justify-center">
              <GraduationCap className="size-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-yellow-600 bg-clip-text text-transparent">
              GMate
            </span>
          </div>
          <div className="flex gap-3">
            <Link
              to="/login"
              className="px-6 py-2 text-orange-600 font-medium hover:bg-orange-50 rounded-full transition"
            >
              Log In
            </Link>
            <Link
              to="/signup"
              className="px-6 py-2 bg-gradient-to-r from-orange-500 to-yellow-500 text-white font-medium rounded-full hover:shadow-lg transition"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-block px-4 py-1 bg-orange-100 text-orange-700 rounded-full text-sm font-medium mb-6">
              🎓 Powered by Gorun
            </div>
            <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              <span className="bg-gradient-to-r from-orange-600 to-yellow-600 bg-clip-text text-transparent">
                GMate
              </span>
              <br />
              Your Campus, Your Community, Your Future<br />
              All in One Place.
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              The intelligent ecosystem for university students to earn, share, and live safely on campus
            </p>
            
            {/* HERO BUTTONS UPDATED AND FIXED */}
            <div className="flex flex-wrap gap-4 mb-8">
              <Link
                to="/signup"
                className="px-8 py-4 bg-gradient-to-r from-orange-500 to-yellow-500 text-white font-bold rounded-full hover:shadow-xl transition text-lg"
              >
                Get Started
              </Link>
              <Link
                to="/join-founder"
                className="px-8 py-4 border-2 border-orange-500 text-orange-600 font-bold rounded-full hover:bg-orange-50 transition text-lg text-center"
              >
                Join as Campus Founder
              </Link>
            </div>

            <div className="flex gap-8">
              <div>
                <div className="text-3xl font-bold text-gray-900">200+</div>
                <div className="text-gray-600">Universities</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-gray-900">50+</div>
                <div className="text-gray-600">Features</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-gray-900">4.9★</div>
                <div className="text-gray-600">Rating</div>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1758270705140-4e39219d4bba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bml2ZXJzaXR5JTIwc3R1ZGVudHMlMjBzdHVkeWluZyUyMHRvZ2V0aGVyJTIwY2FtcHVzJTIwbGlmZXN0eWxlfGVufDF8fHx8MTc3Nzk2MTgwMXww&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Students collaborating"
                className="w-full h-[500px] object-cover"
              />
              <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-xl">
                <div className="text-sm text-gray-600">✨ Join 50,000+ students</div>
                <div className="text-lg font-bold text-gray-900">Building the future together</div>
              </div>
            </div>
            <div className="absolute -top-6 -right-6 size-32 bg-gradient-to-br from-orange-400 to-yellow-400 rounded-full opacity-20 blur-3xl"></div>
            <div className="absolute -bottom-6 -left-6 size-32 bg-gradient-to-br from-orange-400 to-yellow-400 rounded-full opacity-20 blur-3xl"></div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">All Features at a Glance</h2>
          <p className="text-xl text-gray-600">Everything you need for campus life, all in one place</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 border border-orange-100"
              >
                <div className={`${feature.color} size-12 rounded-xl flex items-center justify-center mb-4`}>
                  <Icon className="size-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* CAMPUS FOUNDER PROGRAM SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="bg-gradient-to-r from-orange-600 to-amber-600 rounded-3xl p-8 lg:p-12 text-white shadow-2xl relative overflow-hidden">
          <div className="relative z-10 grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <div className="inline-block px-4 py-1 bg-white/20 backdrop-blur-md text-white rounded-full text-sm font-medium mb-4">
                🚀 Entrepreneurs Program
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold mb-6">
                Become a Campus Founder & Lead Your University
              </h2>
              <p className="text-white/90 text-lg mb-8 leading-relaxed">
                We provide you with ready-made technology, expert training from G-Tech, and an exclusive revenue share. Become the official GMate leader of your university.
              </p>
              <Link
                to="/join-founder"
                className="inline-block px-8 py-4 bg-white text-orange-600 font-bold rounded-full hover:bg-orange-50 transition shadow-lg text-lg"
              >
                Apply for 100 Founders Program
              </Link>
            </div>
            <div className="hidden lg:flex justify-end">
               <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                  <ul className="space-y-4 text-lg">
                    <li className="flex gap-3 items-center font-medium">✅ Zero Infrastructure Cost</li>
                    <li className="flex gap-3 items-center font-medium">✅ Exclusive Revenue Share</li>
                    <li className="flex gap-3 items-center font-medium">✅ G-Tech Leadership Training</li>
                    <li className="flex gap-3 items-center font-medium">✅ Official Founder Badge</li>
                  </ul>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">How GMate Works</h2>
          <p className="text-xl text-gray-600">Zero-interference P2P model with verified students</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="size-16 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-white">1</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Sign Up & Verify</h3>
            <p className="text-gray-600">Register with your student ID and get verified instantly</p>
          </div>
          <div className="text-center">
            <div className="size-16 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-white">2</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Explore Features</h3>
            <p className="text-gray-600">Access marketplace, rentals, jobs, and safety tools</p>
          </div>
          <div className="text-center">
            <div className="size-16 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-white">3</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Earn & Save</h3>
            <p className="text-gray-600">Start earning, sharing, and saving with fellow students</p>
          </div>
        </div>
      </section>

      {/* CTA SECTION UPDATED WITH FOUNDER OPTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="bg-gradient-to-r from-orange-500 to-yellow-500 rounded-3xl p-12 text-center shadow-2xl">
          <h2 className="text-4xl font-bold text-white mb-4">Ready to Join GMate?</h2>
          <p className="text-xl text-white/90 mb-10">Join 50,000+ students building a self-sustaining campus ecosystem</p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              to="/signup"
              className="px-10 py-4 bg-white text-orange-600 font-bold rounded-full hover:shadow-xl transition text-lg w-full sm:w-auto"
            >
              Create Your Account
            </Link>
            
            <span className="text-white font-medium">OR</span>

            <Link
              to="/join-founder"
              className="px-10 py-4 bg-orange-700/20 backdrop-blur-sm border-2 border-white text-white font-bold rounded-full hover:bg-white hover:text-orange-600 transition text-lg w-full sm:w-auto"
            >
              Apply as Founder
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-orange-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="size-8 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-full flex items-center justify-center">
                  <GraduationCap className="size-5 text-white" />
                </div>
                <span className="text-xl font-bold text-gray-900">GMate</span>
              </div>
              <p className="text-gray-600">The intelligent ecosystem for university students</p>
            </div>
            <div>
              <h4 className="font-bold text-gray-900 mb-4">Features</h4>
              <ul className="space-y-2 text-gray-600">
                <li>Marketplace</li>
                <li>Student Chefs</li>
                <li>Part-time Jobs</li>
                <li>SOS Emergency</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-gray-900 mb-4">Support</h4>
              <ul className="space-y-2 text-gray-600">
                <li>Help Center</li>
                <li>Contact Us</li>
                <li>Safety Guidelines</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-gray-900 mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-600">
                <li>Privacy Policy</li>
                <li>Terms of Service</li>
                <li>Community Guidelines</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-orange-100 mt-8 pt-8 text-center text-gray-600">
            <p>&copy; 2026 GMate by Gorun. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}