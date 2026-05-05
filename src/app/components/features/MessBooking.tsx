import { Home, MapPin, Star, Users, DollarSign } from 'lucide-react';

export default function MessBooking() {
  const messOptions = [
    {
      name: 'Green Valley Mess',
      location: 'Azimpur, near Dhaka University',
      distance: '0.5 km',
      price: '4500',
      rating: 4.7,
      seats: 8,
      amenities: ['WiFi', '3 Meals', 'AC Rooms'],
    },
    {
      name: 'Student Paradise',
      location: 'Nilkhet, opposite to campus',
      distance: '0.8 km',
      price: '4000',
      rating: 4.5,
      seats: 5,
      amenities: ['WiFi', '2 Meals', 'Study Room'],
    },
    {
      name: 'Comfort Hostel & Mess',
      location: 'Shahbag, walking distance',
      distance: '1.2 km',
      price: '5000',
      rating: 4.8,
      seats: 3,
      amenities: ['WiFi', '3 Meals', 'Gym', 'AC Rooms'],
    },
  ];

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Mess Booking</h2>
        <p className="text-gray-600">Find and book mess seats or hostel rooms near campus</p>
      </div>

      <div className="space-y-4">
        {messOptions.map((mess, index) => (
          <div key={index} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition">
            <div className="flex items-start justify-between mb-4">
              <div className="flex gap-4">
                <div className="size-16 bg-gradient-to-br from-amber-200 to-orange-200 rounded-xl flex items-center justify-center">
                  <Home className="size-8 text-amber-700" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{mess.name}</h3>
                  <div className="flex items-center gap-2 text-gray-600 mb-2">
                    <MapPin className="size-4" />
                    <span className="text-sm">{mess.location}</span>
                    <span className="text-sm text-amber-600 font-medium">• {mess.distance}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1 text-yellow-500">
                      <Star className="size-4 fill-current" />
                      <span className="font-medium text-gray-900">{mess.rating}</span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-600">
                      <Users className="size-4" />
                      <span className="text-sm">{mess.seats} seats available</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-1 text-gray-500 text-sm mb-1">
                  <DollarSign className="size-4" />
                  <span>per month</span>
                </div>
                <div className="text-3xl font-bold text-amber-600">৳{mess.price}</div>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
              {mess.amenities.map((amenity, i) => (
                <span key={i} className="px-3 py-1 bg-amber-50 text-amber-700 rounded-full text-sm font-medium">
                  {amenity}
                </span>
              ))}
            </div>

            <div className="flex gap-3">
              <button className="flex-1 px-6 py-3 border-2 border-amber-500 text-amber-600 font-bold rounded-xl hover:bg-amber-50 transition">
                View Details
              </button>
              <button className="flex-1 px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold rounded-xl hover:shadow-lg transition">
                Book Now
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Tips */}
      <div className="mt-6 bg-amber-50 border border-amber-200 rounded-2xl p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-3">Booking Tips</h3>
        <ul className="space-y-2 text-gray-700">
          <li className="flex items-start gap-2">
            <span className="text-amber-600 font-bold">•</span>
            <span>Visit the mess in person before booking</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-amber-600 font-bold">•</span>
            <span>Check food quality and hygiene standards</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-amber-600 font-bold">•</span>
            <span>Read reviews from current students</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-amber-600 font-bold">•</span>
            <span>Confirm all amenities and rules before payment</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
