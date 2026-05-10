import { Wallet, Users, ArrowUpRight, BarChart3, Share2, Award } from 'lucide-react';

export default function FounderDashboard() {
  const stats = [
    { label: 'Total Campus Users', value: '1,240', icon: Users, color: 'text-blue-600' },
    { label: 'Pending Commission', value: '৳ 4,500', icon: Wallet, color: 'text-orange-600' },
    { label: 'Conversion Rate', value: '12%', icon: BarChart3, color: 'text-green-600' },
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Founder Control Center 🚀</h1>
          <p className="text-gray-600">Official Leader: North South University</p>
        </div>
        <div className="bg-orange-100 px-4 py-2 rounded-full border border-orange-200 flex items-center gap-2">
          <Award className="size-5 text-orange-600" />
          <span className="font-bold text-orange-700">Verified Founder</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        {stats.map((item, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-500 text-sm font-medium">{item.label}</p>
                <h3 className="text-2xl font-bold mt-1">{item.value}</h3>
              </div>
              <div className={`p-3 bg-gray-50 rounded-xl ${item.color}`}>
                <item.icon className="size-6" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Revenue Section */}
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="font-bold mb-4 text-lg">Live Revenue Stream (Auto-Mapped)</h3>
          <div className="space-y-4">
            {[1, 2, 3].map((_, i) => (
              <div key={i} className="flex items-center justify-between p-3 hover:bg-orange-50 rounded-xl transition">
                <div className="flex items-center gap-3">
                  <div className="size-10 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 font-bold">S</div>
                  <div>
                    <p className="font-medium text-gray-900">Student Marketplace Purchase</p>
                    <p className="text-xs text-gray-500">2 mins ago • Transaction: ৳500</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-green-600 font-bold">+ ৳10.00</p>
                  <p className="text-[10px] text-gray-400">2% Comm.</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Growth Tools */}
        <div className="bg-gradient-to-br from-orange-500 to-amber-600 p-8 rounded-2xl text-white">
          <h3 className="text-xl font-bold mb-2">Grow Your Network</h3>
          <p className="text-white/80 mb-6">Joto beshi student apnar university theke register korbe, apnar revenue stream toto boro hobe.</p>
          <button className="w-full bg-white text-orange-600 font-bold py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-orange-50 transition">
            <Share2 className="size-5" /> Share Campus Invite Link
          </button>
        </div>
      </div>
    </div>
  );
}