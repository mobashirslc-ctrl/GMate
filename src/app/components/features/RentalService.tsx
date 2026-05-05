import { Camera, Shirt, Speaker, Plus } from 'lucide-react';

export default function RentalService() {
  const items = [
    {
      title: 'Professional Camera',
      description: 'Canon EOS 2000D with 18-55mm lens',
      price: '500',
      period: 'per day',
      icon: Camera,
      color: 'bg-purple-500',
    },
    {
      title: 'Formal Suit',
      description: 'Black blazer and trousers, size M',
      price: '300',
      period: 'per day',
      icon: Shirt,
      color: 'bg-indigo-500',
    },
    {
      title: 'Portable Speaker',
      description: 'JBL Flip 5, perfect for events',
      price: '200',
      period: 'per day',
      icon: Speaker,
      color: 'bg-pink-500',
    },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Rental Service</h2>
          <p className="text-gray-600">Rent cameras, formal wear, and student essentials peer-to-peer</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-purple-600 text-white font-bold rounded-xl hover:shadow-lg transition">
          <Plus className="size-5" />
          List an Item
        </button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item, index) => {
          const Icon = item.icon;
          return (
            <div key={index} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition">
              <div className={`${item.color} size-14 rounded-xl flex items-center justify-center mb-4`}>
                <Icon className="size-7 text-white" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
              <p className="text-sm text-gray-600 mb-4">{item.description}</p>
              <div className="flex items-end justify-between">
                <div>
                  <span className="text-2xl font-bold text-purple-600">৳{item.price}</span>
                  <span className="text-sm text-gray-500 ml-1">{item.period}</span>
                </div>
                <button className="px-4 py-2 bg-purple-500 text-white font-medium rounded-lg hover:bg-purple-600 transition">
                  Rent Now
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
