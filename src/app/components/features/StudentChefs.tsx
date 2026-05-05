import { ChefHat, Star, Clock, Plus } from 'lucide-react';

export default function StudentChefs() {
  const meals = [
    {
      name: 'Homemade Biryani',
      chef: 'Ayesha Rahman',
      rating: 4.8,
      price: '180',
      time: '30-40 min',
      image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=400',
    },
    {
      name: 'Chicken Curry & Rice',
      chef: 'Imran Khan',
      rating: 4.6,
      price: '150',
      time: '25-35 min',
      image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400',
    },
    {
      name: 'Bengali Thali',
      chef: 'Nusrat Jahan',
      rating: 4.9,
      price: '200',
      time: '35-45 min',
      image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400',
    },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Student Chefs</h2>
          <p className="text-gray-600">Order delicious home-cooked meals from fellow students</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold rounded-xl hover:shadow-lg transition">
          <ChefHat className="size-5" />
          Become a Chef
        </button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {meals.map((meal, index) => (
          <div key={index} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-200 hover:shadow-md transition">
            <img src={meal.image} alt={meal.name} className="w-full h-48 object-cover" />
            <div className="p-6">
              <h3 className="font-bold text-gray-900 mb-1">{meal.name}</h3>
              <p className="text-sm text-gray-600 mb-3">by {meal.chef}</p>
              <div className="flex items-center gap-4 mb-4 text-sm">
                <div className="flex items-center gap-1 text-yellow-500">
                  <Star className="size-4 fill-current" />
                  <span className="font-medium text-gray-900">{meal.rating}</span>
                </div>
                <div className="flex items-center gap-1 text-gray-600">
                  <Clock className="size-4" />
                  <span>{meal.time}</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-orange-600">৳{meal.price}</span>
                <button className="px-4 py-2 bg-orange-500 text-white font-medium rounded-lg hover:bg-orange-600 transition">
                  Order Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
