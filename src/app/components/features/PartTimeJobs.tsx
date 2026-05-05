import { Briefcase, MapPin, Clock, DollarSign } from 'lucide-react';

export default function PartTimeJobs() {
  const jobs = [
    {
      title: 'Campus Ambassador',
      company: 'TechStartup Ltd',
      location: 'Remote',
      type: 'Part-time',
      salary: '৳8,000-12,000',
    },
    {
      title: 'Tutor - Mathematics',
      company: 'EduCare Bangladesh',
      location: 'Dhaka University Area',
      type: 'Flexible',
      salary: '৳500/hour',
    },
    {
      title: 'Content Writer',
      company: 'Digital Agency',
      location: 'Remote',
      type: 'Freelance',
      salary: '৳10,000-15,000',
    },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Part-time Jobs</h2>
          <p className="text-gray-600">Find student-friendly job opportunities and internships</p>
        </div>
      </div>

      <div className="space-y-4">
        {jobs.map((job, index) => (
          <div key={index} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{job.title}</h3>
                <p className="text-gray-700 font-medium mb-3">{job.company}</p>
                <div className="flex flex-wrap gap-4 text-sm">
                  <div className="flex items-center gap-2 text-gray-600">
                    <MapPin className="size-4" />
                    {job.location}
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Clock className="size-4" />
                    {job.type}
                  </div>
                  <div className="flex items-center gap-2 text-indigo-600 font-medium">
                    <DollarSign className="size-4" />
                    {job.salary}
                  </div>
                </div>
              </div>
              <button className="px-6 py-3 bg-indigo-500 text-white font-bold rounded-xl hover:bg-indigo-600 transition">
                Apply Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
