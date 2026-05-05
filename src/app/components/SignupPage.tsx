import { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router';
import { GraduationCap, Upload, Camera, CheckCircle2, Loader2 } from 'lucide-react';
import { createClient } from '../../utils/supabase/client';
import { projectId, publicAnonKey } from '../../utils/supabase/info';

interface SignupPageProps {
  setUser: (user: any) => void;
}

export default function SignupPage({ setUser }: SignupPageProps) {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [formData, setFormData] = useState({
    studentName: '',
    email: '',
    password: '',
    universityName: '',
    contactNo: '',
    semester: '',
    idNo: '',
    bloodGroup: '',
    emergencyContact: '',
  });
  const [idCard, setIdCard] = useState<File | null>(null);
  const [faceScan, setFaceScan] = useState<File | null>(null);
  const idCardInputRef = useRef<HTMLInputElement>(null);
  const faceScanInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleIDCardUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setIdCard(e.target.files[0]);
    }
  };

  const handleFaceScanUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFaceScan(e.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      // Create user account
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-9a414d17/signup`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${publicAnonKey}`,
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (data.error) {
        alert(`Signup error: ${data.error}`);
        setLoading(false);
        return;
      }

      // Sign in to get access token
      const supabase = createClient();
      const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });

      if (signInError) {
        alert(`Sign in error: ${signInError.message}`);
        setLoading(false);
        return;
      }

      const accessToken = signInData.session.access_token;

      // Upload ID card if provided
      if (idCard) {
        const reader = new FileReader();
        reader.onloadend = async () => {
          const base64 = reader.result?.toString().split(',')[1];
          await fetch(
            `https://${projectId}.supabase.co/functions/v1/make-server-9a414d17/upload-id-card`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`,
              },
              body: JSON.stringify({ file: base64, fileName: idCard.name }),
            }
          );
        };
        reader.readAsDataURL(idCard);
      }

      // Upload face scan if provided
      if (faceScan) {
        const reader = new FileReader();
        reader.onloadend = async () => {
          const base64 = reader.result?.toString().split(',')[1];
          await fetch(
            `https://${projectId}.supabase.co/functions/v1/make-server-9a414d17/upload-face-scan`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`,
              },
              body: JSON.stringify({ file: base64, fileName: faceScan.name }),
            }
          );

          // Start verification animation
          setLoading(false);
          setVerifying(true);

          // Simulate verification process (3 seconds)
          setTimeout(async () => {
            await fetch(
              `https://${projectId}.supabase.co/functions/v1/make-server-9a414d17/verify-student`,
              {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${accessToken}`,
                },
              }
            );

            setVerifying(false);
            setUser(signInData.user);
            navigate('/dashboard');
          }, 3000);
        };
        reader.readAsDataURL(faceScan);
      } else {
        setLoading(false);
        setUser(signInData.user);
        navigate('/dashboard');
      }
    } catch (error: any) {
      console.error('Signup error:', error);
      alert(`Signup failed: ${error.message}`);
      setLoading(false);
    }
  };

  if (verifying) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50 flex items-center justify-center">
        <div className="bg-white rounded-3xl p-12 shadow-2xl max-w-md w-full text-center">
          <div className="size-24 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
            <Loader2 className="size-12 text-white animate-spin" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Verifying Your Account</h2>
          <p className="text-gray-600 mb-8">Please wait while we verify your student credentials...</p>
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-left">
              <div className="size-8 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle2 className="size-5 text-green-600" />
              </div>
              <span className="text-gray-700">Checking student ID</span>
            </div>
            <div className="flex items-center gap-3 text-left">
              <div className="size-8 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle2 className="size-5 text-green-600" />
              </div>
              <span className="text-gray-700">Verifying face scan</span>
            </div>
            <div className="flex items-center gap-3 text-left">
              <div className="size-8 bg-orange-100 rounded-full flex items-center justify-center animate-pulse">
                <Loader2 className="size-5 text-orange-600 animate-spin" />
              </div>
              <span className="text-gray-700">Creating your profile...</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50">
      <header className="bg-white/80 backdrop-blur-md border-b border-orange-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="size-10 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-full flex items-center justify-center">
              <GraduationCap className="size-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-yellow-600 bg-clip-text text-transparent">
              GMate
            </span>
          </Link>
          <Link to="/login" className="text-orange-600 font-medium hover:underline">
            Already have an account? Log in
          </Link>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 py-12">
        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center gap-4">
            <div className={`size-10 rounded-full flex items-center justify-center font-bold ${step >= 1 ? 'bg-gradient-to-br from-orange-500 to-yellow-500 text-white' : 'bg-gray-200 text-gray-500'}`}>
              1
            </div>
            <div className={`h-1 w-16 ${step >= 2 ? 'bg-gradient-to-r from-orange-500 to-yellow-500' : 'bg-gray-200'}`}></div>
            <div className={`size-10 rounded-full flex items-center justify-center font-bold ${step >= 2 ? 'bg-gradient-to-br from-orange-500 to-yellow-500 text-white' : 'bg-gray-200 text-gray-500'}`}>
              2
            </div>
            <div className={`h-1 w-16 ${step >= 3 ? 'bg-gradient-to-r from-orange-500 to-yellow-500' : 'bg-gray-200'}`}></div>
            <div className={`size-10 rounded-full flex items-center justify-center font-bold ${step >= 3 ? 'bg-gradient-to-br from-orange-500 to-yellow-500 text-white' : 'bg-gray-200 text-gray-500'}`}>
              3
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-8 shadow-xl">
          {step === 1 && (
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Personal Information</h2>
              <p className="text-gray-600 mb-6">Let's start with your basic details</p>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Student Name</label>
                  <input
                    type="text"
                    name="studentName"
                    value={formData.studentName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="Enter your full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="your.email@university.edu"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="Create a strong password"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">University Name</label>
                  <input
                    type="text"
                    name="universityName"
                    value={formData.universityName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="e.g., University of Dhaka"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Contact Number</label>
                  <input
                    type="tel"
                    name="contactNo"
                    value={formData.contactNo}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="+880 1XXX-XXXXXX"
                  />
                </div>
                <button
                  onClick={() => setStep(2)}
                  className="w-full py-3 bg-gradient-to-r from-orange-500 to-yellow-500 text-white font-bold rounded-xl hover:shadow-lg transition"
                >
                  Continue
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Academic & Emergency Details</h2>
              <p className="text-gray-600 mb-6">Help us complete your student profile</p>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Semester</label>
                  <input
                    type="text"
                    name="semester"
                    value={formData.semester}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="e.g., Fall 2026"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Student ID Number</label>
                  <input
                    type="text"
                    name="idNo"
                    value={formData.idNo}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="Your university ID number"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Blood Group</label>
                  <select
                    name="bloodGroup"
                    value={formData.bloodGroup}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  >
                    <option value="">Select blood group</option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Emergency Contact</label>
                  <input
                    type="tel"
                    name="emergencyContact"
                    value={formData.emergencyContact}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="Parent/Guardian contact number"
                  />
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => setStep(1)}
                    className="w-full py-3 border-2 border-orange-500 text-orange-600 font-bold rounded-xl hover:bg-orange-50 transition"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => setStep(3)}
                    className="w-full py-3 bg-gradient-to-r from-orange-500 to-yellow-500 text-white font-bold rounded-xl hover:shadow-lg transition"
                  >
                    Continue
                  </button>
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Verification Documents</h2>
              <p className="text-gray-600 mb-6">Upload your ID card and face scan for verification</p>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Student ID Card</label>
                  <div
                    onClick={() => idCardInputRef.current?.click()}
                    className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center cursor-pointer hover:border-orange-500 transition"
                  >
                    {idCard ? (
                      <div className="flex items-center justify-center gap-2 text-green-600">
                        <CheckCircle2 className="size-6" />
                        <span>{idCard.name}</span>
                      </div>
                    ) : (
                      <div>
                        <Upload className="size-12 mx-auto text-gray-400 mb-2" />
                        <p className="text-gray-600">Click to upload ID card</p>
                      </div>
                    )}
                  </div>
                  <input
                    ref={idCardInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleIDCardUpload}
                    className="hidden"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Face Scan</label>
                  <div
                    onClick={() => faceScanInputRef.current?.click()}
                    className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center cursor-pointer hover:border-orange-500 transition"
                  >
                    {faceScan ? (
                      <div className="flex items-center justify-center gap-2 text-green-600">
                        <CheckCircle2 className="size-6" />
                        <span>{faceScan.name}</span>
                      </div>
                    ) : (
                      <div>
                        <Camera className="size-12 mx-auto text-gray-400 mb-2" />
                        <p className="text-gray-600">Click to upload face scan</p>
                      </div>
                    )}
                  </div>
                  <input
                    ref={faceScanInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFaceScanUpload}
                    className="hidden"
                  />
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => setStep(2)}
                    className="w-full py-3 border-2 border-orange-500 text-orange-600 font-bold rounded-xl hover:bg-orange-50 transition"
                  >
                    Back
                  </button>
                  <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="w-full py-3 bg-gradient-to-r from-orange-500 to-yellow-500 text-white font-bold rounded-xl hover:shadow-lg transition disabled:opacity-50"
                  >
                    {loading ? (
                      <span className="flex items-center justify-center gap-2">
                        <Loader2 className="size-5 animate-spin" />
                        Creating Account...
                      </span>
                    ) : (
                      'Complete Signup'
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
