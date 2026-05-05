import { Heart, MessageCircle, Phone, Video, User } from 'lucide-react';

export default function MentalHealth() {
  const counselors = [
    {
      name: 'Dr. Sarah Ahmed',
      specialty: 'Clinical Psychologist',
      experience: '8 years',
      rating: 4.9,
      available: true,
    },
    {
      name: 'Counselor Rahim Khan',
      specialty: 'Stress & Anxiety',
      experience: '5 years',
      rating: 4.7,
      available: true,
    },
    {
      name: 'Dr. Nadia Islam',
      specialty: 'Academic Counseling',
      experience: '10 years',
      rating: 4.8,
      available: false,
    },
  ];

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Mental Health Support</h2>
        <p className="text-gray-600">Anonymous peer support and professional counseling services</p>
      </div>

      {/* Anonymous Chat */}
      <div className="bg-gradient-to-r from-red-500 to-pink-500 rounded-2xl p-8 text-white mb-6">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="size-14 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                <MessageCircle className="size-7" />
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-1">Anonymous Peer Support</h3>
                <p className="opacity-90">Connect with fellow students who understand</p>
              </div>
            </div>
            <p className="mb-6 opacity-90">
              Sometimes you just need someone to talk to. Our anonymous peer support connects you with verified students who are here to listen.
            </p>
            <button className="px-8 py-3 bg-white text-red-600 font-bold rounded-xl hover:shadow-lg transition">
              Start Anonymous Chat
            </button>
          </div>
        </div>
      </div>

      {/* Professional Counselors */}
      <div className="mb-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Professional Counselors</h3>
        <div className="space-y-4">
          {counselors.map((counselor, index) => (
            <div key={index} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-start justify-between">
                <div className="flex gap-4">
                  <div className="size-16 bg-gradient-to-br from-red-200 to-pink-200 rounded-full flex items-center justify-center">
                    <User className="size-8 text-red-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">{counselor.name}</h4>
                    <p className="text-gray-700 mb-1">{counselor.specialty}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span>{counselor.experience} experience</span>
                      <span className="flex items-center gap-1">
                        ⭐ {counselor.rating}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${counselor.available ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                        {counselor.available ? 'Available Now' : 'Busy'}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="p-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition" title="Voice Call">
                    <Phone className="size-5" />
                  </button>
                  <button className="p-3 bg-purple-500 text-white rounded-xl hover:bg-purple-600 transition" title="Video Call">
                    <Video className="size-5" />
                  </button>
                  <button className="p-3 bg-green-500 text-white rounded-xl hover:bg-green-600 transition" title="Chat">
                    <MessageCircle className="size-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Resources */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Self-Help Resources</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 bg-red-50 rounded-xl">
            <div className="font-bold text-gray-900 mb-1">Stress Management</div>
            <p className="text-sm text-gray-600">Techniques to handle academic pressure</p>
          </div>
          <div className="p-4 bg-pink-50 rounded-xl">
            <div className="font-bold text-gray-900 mb-1">Sleep Better</div>
            <p className="text-sm text-gray-600">Tips for healthy sleep patterns</p>
          </div>
          <div className="p-4 bg-purple-50 rounded-xl">
            <div className="font-bold text-gray-900 mb-1">Mindfulness Exercises</div>
            <p className="text-sm text-gray-600">Daily meditation and breathing techniques</p>
          </div>
          <div className="p-4 bg-orange-50 rounded-xl">
            <div className="font-bold text-gray-900 mb-1">Building Resilience</div>
            <p className="text-sm text-gray-600">Develop mental strength and coping skills</p>
          </div>
        </div>
      </div>

      {/* Emergency Hotline */}
      <div className="mt-6 bg-yellow-50 border-2 border-yellow-400 rounded-2xl p-6">
        <div className="flex items-start gap-4">
          <div className="size-12 bg-yellow-400 rounded-full flex items-center justify-center">
            <Phone className="size-6 text-white" />
          </div>
          <div>
            <h4 className="font-bold text-gray-900 mb-1">Crisis Helpline</h4>
            <p className="text-gray-700 mb-2">If you're in crisis, please call our 24/7 helpline immediately</p>
            <a href="tel:09678-100100" className="text-xl font-bold text-yellow-700 hover:underline">
              09678-100100
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
