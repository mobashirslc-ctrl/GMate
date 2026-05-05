import { Book, Laptop, Armchair, Plus } from 'lucide-react';

export default function UsedGoods() {
  const items = [
    {
      title: 'Calculus Textbook (9th Ed)',
      description: 'Like new condition, minimal highlighting',
      price: '600',
      icon: Book,
      color: 'bg-green-500',
    },
    {
      title: 'HP Laptop - Core i5',
      description: '8GB RAM, 256GB SSD, good condition',
      price: '25000',
      icon: Laptop,
      color: 'bg-blue-500',
    },
    {
      title: 'Study Table & Chair',
      description: 'Wooden desk with comfortable chair',
      price: '3500',
      icon: Armchair,
      color: 'bg-amber-500',
    },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Used Goods Marketplace</h2>
          <p className="text-gray-600">Buy and sell second-hand books, devices, and furniture</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white font-bold rounded-xl hover:shadow-lg transition">
          <Plus className="size-5" />
          Sell an Item
        </button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item, index) => {
          const Icon = item.icon;
          return (
            <div key={index} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
              <div className={`${item.color} size-14 rounded-xl flex items-center justify-center mb-4`}>
                <Icon className="size-7 text-white" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
              <p className="text-sm text-gray-600 mb-4">{item.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-green-600">৳{item.price}</span>
                <button className="px-4 py-2 bg-green-500 text-white font-medium rounded-lg hover:bg-green-600 transition">
                  Contact Seller
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
