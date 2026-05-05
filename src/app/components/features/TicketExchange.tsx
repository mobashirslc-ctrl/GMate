import { Ticket, Bus, Train, Film } from 'lucide-react';

export default function TicketExchange() {
  const tickets = [
    {
      type: 'Bus Ticket',
      route: 'Dhaka → Chittagong',
      date: 'May 10, 2026',
      price: '600',
      icon: Bus,
      color: 'bg-cyan-500',
    },
    {
      type: 'Train Ticket',
      route: 'Dhaka → Sylhet',
      date: 'May 12, 2026',
      price: '450',
      icon: Train,
      color: 'bg-blue-500',
    },
    {
      type: 'Movie Ticket',
      route: 'Star Cineplex - 2 Tickets',
      date: 'May 8, 2026',
      price: '800',
      icon: Film,
      color: 'bg-purple-500',
    },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Ticket Exchange</h2>
          <p className="text-gray-600">Buy and sell bus, train, and movie tickets peer-to-peer</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tickets.map((ticket, index) => {
          const Icon = ticket.icon;
          return (
            <div key={index} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
              <div className={`${ticket.color} size-14 rounded-xl flex items-center justify-center mb-4`}>
                <Icon className="size-7 text-white" />
              </div>
              <h3 className="font-bold text-gray-900 mb-1">{ticket.type}</h3>
              <p className="text-gray-700 mb-1">{ticket.route}</p>
              <p className="text-sm text-gray-500 mb-4">{ticket.date}</p>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-cyan-600">৳{ticket.price}</span>
                <button className="px-4 py-2 bg-cyan-500 text-white font-medium rounded-lg hover:bg-cyan-600 transition">
                  Buy Ticket
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
