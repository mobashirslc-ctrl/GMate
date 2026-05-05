import { Users, ShoppingCart, TrendingDown, Plus } from 'lucide-react';

export default function GroupShopping() {
  const deals = [
    {
      title: 'Bulk Rice Purchase',
      description: '25kg premium rice - Need 5 more members',
      normalPrice: '2500',
      groupPrice: '2000',
      members: 7,
      needed: 5,
      progress: 58,
    },
    {
      title: 'Stationery Bundle',
      description: 'Complete semester stationery pack',
      normalPrice: '1200',
      groupPrice: '900',
      members: 12,
      needed: 3,
      progress: 80,
    },
    {
      title: 'Printer Paper Bulk',
      description: '10 reams A4 paper',
      normalPrice: '3000',
      groupPrice: '2400',
      members: 5,
      needed: 10,
      progress: 33,
    },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Group Shopping</h2>
          <p className="text-gray-600">Split costs and unlock bulk discounts together</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-pink-500 to-pink-600 text-white font-bold rounded-xl hover:shadow-lg transition">
          <Plus className="size-5" />
          Start New Deal
        </button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {deals.map((deal, index) => (
          <div key={index} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center gap-2 mb-4">
              <div className="size-12 bg-pink-100 rounded-xl flex items-center justify-center">
                <ShoppingCart className="size-6 text-pink-600" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <Users className="size-4 text-gray-500" />
                  <span className="text-sm text-gray-600">{deal.members} joined • {deal.needed} needed</span>
                </div>
              </div>
            </div>
            <h3 className="font-bold text-gray-900 mb-2">{deal.title}</h3>
            <p className="text-sm text-gray-600 mb-4">{deal.description}</p>
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-gray-500 line-through text-sm">৳{deal.normalPrice}</span>
                <span className="text-2xl font-bold text-pink-600">৳{deal.groupPrice}</span>
                <div className="flex items-center gap-1 text-green-600 text-sm font-medium">
                  <TrendingDown className="size-4" />
                  {Math.round((1 - parseInt(deal.groupPrice) / parseInt(deal.normalPrice)) * 100)}% off
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                <div className="bg-pink-500 h-2 rounded-full" style={{ width: `${deal.progress}%` }}></div>
              </div>
              <p className="text-sm text-gray-600">{deal.progress}% funded</p>
            </div>
            <button className="w-full px-4 py-3 bg-pink-500 text-white font-bold rounded-xl hover:bg-pink-600 transition">
              Join Group
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
