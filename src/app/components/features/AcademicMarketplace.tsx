import { useState, useEffect } from 'react';
import { Plus, Search, BookOpen, FileText, GraduationCap } from 'lucide-react';
import { createClient } from '../../../utils/supabase/client';
import { projectId } from '../../../utils/supabase/info';

export default function AcademicMarketplace() {
  const [listings, setListings] = useState<any[]>([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newListing, setNewListing] = useState({
    title: '',
    description: '',
    price: '',
    category: 'notes',
  });

  useEffect(() => {
    fetchListings();
  }, []);

  const fetchListings = async () => {
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-9a414d17/marketplace/listings?category=academic`
      );
      const data = await response.json();
      setListings(data.listings || []);
    } catch (error) {
      console.error('Error fetching listings:', error);
    }
  };

  const handleCreateListing = async () => {
    try {
      const supabase = createClient();
      const { data: { session } } = await supabase.auth.getSession();

      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-9a414d17/marketplace/create`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${session?.access_token}`,
          },
          body: JSON.stringify({
            ...newListing,
            category: 'academic',
          }),
        }
      );

      if (response.ok) {
        setShowCreateModal(false);
        setNewListing({ title: '', description: '', price: '', category: 'notes' });
        fetchListings();
      }
    } catch (error) {
      console.error('Error creating listing:', error);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Academic Marketplace</h2>
          <p className="text-gray-600">Buy and sell lecture notes, assignments, and study materials</p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold rounded-xl hover:shadow-lg transition"
        >
          <Plus className="size-5" />
          Create Listing
        </button>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search for notes, assignments, thesis guides..."
            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Categories */}
      <div className="flex gap-3 mb-6 overflow-x-auto pb-2">
        {['All', 'Lecture Notes', 'Assignments', 'Thesis Guides', 'Past Papers'].map((category) => (
          <button
            key={category}
            className="px-6 py-2 bg-white border-2 border-blue-500 text-blue-600 font-medium rounded-full hover:bg-blue-50 transition whitespace-nowrap"
          >
            {category}
          </button>
        ))}
      </div>

      {/* Listings Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {listings.length === 0 && (
          <>
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
              <div className="size-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                <BookOpen className="size-6 text-blue-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Data Structures - Complete Notes</h3>
              <p className="text-sm text-gray-600 mb-4">Comprehensive lecture notes covering all topics from CSE 201</p>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-blue-600">৳150</span>
                <button className="px-4 py-2 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition">
                  View Details
                </button>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
              <div className="size-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
                <FileText className="size-6 text-green-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Database Assignment Framework</h3>
              <p className="text-sm text-gray-600 mb-4">SQL queries and ER diagram templates for final project</p>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-green-600">৳200</span>
                <button className="px-4 py-2 bg-green-500 text-white font-medium rounded-lg hover:bg-green-600 transition">
                  View Details
                </button>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
              <div className="size-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
                <GraduationCap className="size-6 text-purple-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Thesis Writing Guide</h3>
              <p className="text-sm text-gray-600 mb-4">Complete guide with LaTeX templates and formatting tips</p>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-purple-600">৳350</span>
                <button className="px-4 py-2 bg-purple-500 text-white font-medium rounded-lg hover:bg-purple-600 transition">
                  View Details
                </button>
              </div>
            </div>
          </>
        )}
        {listings.map((listing: any) => (
          <div key={listing.id} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
            <h3 className="font-bold text-gray-900 mb-2">{listing.title}</h3>
            <p className="text-sm text-gray-600 mb-4">{listing.description}</p>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold text-blue-600">৳{listing.price}</span>
              <button className="px-4 py-2 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Create Listing Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Create New Listing</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                <input
                  type="text"
                  value={newListing.title}
                  onChange={(e) => setNewListing({ ...newListing, title: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., Data Structures Notes"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  value={newListing.description}
                  onChange={(e) => setNewListing({ ...newListing, description: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
                  rows={3}
                  placeholder="Describe your material..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Price (৳)</label>
                <input
                  type="number"
                  value={newListing.price}
                  onChange={(e) => setNewListing({ ...newListing, price: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
                  placeholder="150"
                />
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 px-6 py-3 border-2 border-blue-500 text-blue-600 font-bold rounded-xl hover:bg-blue-50 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateListing}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold rounded-xl hover:shadow-lg transition"
                >
                  Create
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
