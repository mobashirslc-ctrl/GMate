import { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GraduationCap, Upload, Camera, CheckCircle2, Loader2 } from 'lucide-react';
import { createClient } from '../../utils/supabase/client';
import { projectId, publicAnonKey } from '../../utils/supabase/info'; 

interface SignupPageProps {
  setUser: (user: any) => void;
}
const UNIVERSITY_FOUNDER_MAP: Record<string, string> = {
  "North South University": "NSU-F001",
  "Dhaka University": "DU-F002",
  "AIUB": "AIUB-F003",
  "BRAC University": "BRAC-F004",
};

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
    if (e.target.files && e.target.files[0]) setIdCard(e.target.files[0]);
  };

  const handleFaceScanUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) setFaceScan(e.target.files[0]);
  };

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result?.toString().split(',')[1] || '');
      reader.onerror = (error) => reject(error);
    });
  };

  const handleSubmit = async () => {
  setLoading(true);
  try {
    const founderReferralId = UNIVERSITY_FOUNDER_MAP[formData.universityName] || 'GENERIC-SYSTEM';
    
    const payload = {
      ...formData,
      referralId: founderReferralId // Backend e ei ID ta auto chole jabe
    };
    // URL define korar somoy nishchit hon jate sheshe ':' na thake
    const baseUrl = `https://${projectId.trim()}.supabase.co/functions/v1/server`;

    // 1. Signup Request
    const response = await fetch(`${baseUrl}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': publicAnonKey,
        'Authorization': `Bearer ${publicAnonKey}`,
      },
      body: JSON.stringify(formData),
    });

    // Response JSON kina seta age check kora bhalo
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Server Error (${response.status}): ${errorText}`);
    }

    const data = await response.json();
    if (data.error) throw new Error(data.error);

    // 2. Auth SignIn
    const supabase = createClient();
    const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
      email: formData.email,
      password: formData.password,
    });

    if (signInError) throw signInError;
    const accessToken = signInData.session.access_token;

    // 3. Uploads
    if (idCard) {
      const idBase64 = await fileToBase64(idCard);
      await fetch(`${baseUrl}/upload-id-card`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json', 
          'apikey': publicAnonKey,
          'Authorization': `Bearer ${accessToken}` 
        },
        body: JSON.stringify({ file: idBase64, fileName: idCard.name }),
      });
    }

    if (faceScan) {
      const faceBase64 = await fileToBase64(faceScan);
      await fetch(`${baseUrl}/upload-face-scan`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json', 
          'apikey': publicAnonKey,
          'Authorization': `Bearer ${accessToken}` 
        },
        body: JSON.stringify({ file: faceBase64, fileName: faceScan.name }),
      });

      setLoading(false);
      setVerifying(true);

      // 4. Verification
      setTimeout(async () => {
        try {
          await fetch(`${baseUrl}/verify-student`, {
            method: 'POST',
            headers: { 
              'Content-Type': 'application/json', 
              'apikey': publicAnonKey,
              'Authorization': `Bearer ${accessToken}` 
            },
          });
        } catch (e) {
          console.error("Verification call failed", e);
        }
        setVerifying(false);
        setUser(signInData.user);
        navigate('/dashboard');
      }, 3000);
    } else {
      setLoading(false);
      setUser(signInData.user);
      navigate('/dashboard');
    }
  } catch (error: any) {
    console.error('Error Details:', error);
    alert(`Signup failed: ${error.message}`);
    setLoading(false);
  }
};
  // UI Code starts here (Step rendering logic remains same)
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
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="size-10 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-full flex items-center justify-center">
              <GraduationCap className="size-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-yellow-600 bg-clip-text text-transparent">GMate</span>
          </Link>
          <Link to="/login" className="text-orange-600 font-medium hover:underline">Already have an account? Log in</Link>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 py-12">
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center gap-4">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center gap-4">
                <div className={`size-10 rounded-full flex items-center justify-center font-bold ${step >= s ? 'bg-gradient-to-br from-orange-500 to-yellow-500 text-white' : 'bg-gray-200 text-gray-500'}`}>
                  {s}
                </div>
                {s < 3 && <div className={`h-1 w-16 ${step > s ? 'bg-orange-500' : 'bg-gray-200'}`} />}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-3xl p-8 shadow-xl">
          {step === 1 && (
            <div className="space-y-4">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Personal Information</h2>
              <input type="text" name="studentName" placeholder="Full Name" onChange={handleInputChange} className="w-full px-4 py-3 border rounded-xl" />
              <input type="email" name="email" placeholder="Email" onChange={handleInputChange} className="w-full px-4 py-3 border rounded-xl" />
              <input type="password" name="password" placeholder="Password" onChange={handleInputChange} className="w-full px-4 py-3 border rounded-xl" />
              <input type="text" name="universityName" placeholder="University" onChange={handleInputChange} className="w-full px-4 py-3 border rounded-xl" />
              <input type="tel" name="contactNo" placeholder="Contact No" onChange={handleInputChange} className="w-full px-4 py-3 border rounded-xl" />
              <button onClick={() => setStep(2)} className="w-full py-3 bg-orange-500 text-white font-bold rounded-xl">Continue</button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Academic Details</h2>
              <input type="text" name="semester" placeholder="Semester" onChange={handleInputChange} className="w-full px-4 py-3 border rounded-xl" />
              <input type="text" name="idNo" placeholder="Student ID" onChange={handleInputChange} className="w-full px-4 py-3 border rounded-xl" />
              <select name="bloodGroup" onChange={handleInputChange} className="w-full px-4 py-3 border rounded-xl">
                <option value="">Select Blood Group</option>
                {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(bg => (
                  <option key={bg} value={bg}>{bg}</option>
                ))}
              </select>
              <input type="text" name="emergencyContact" placeholder="Emergency Contact" onChange={handleInputChange} className="w-full px-4 py-3 border rounded-xl" />
              <button onClick={() => setStep(3)} className="w-full py-3 bg-orange-500 text-white font-bold rounded-xl">Continue</button>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Verification</h2>
              
              <div className="space-y-4">
                <div 
                  onClick={() => idCardInputRef.current?.click()}
                  className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-colors ${idCard ? 'border-green-500 bg-green-50' : 'border-gray-300 hover:border-orange-500'}`}
                >
                  <input type="file" ref={idCardInputRef} onChange={handleIDCardUpload} className="hidden" accept="image/*" />
                  <Upload className={`size-8 mx-auto mb-2 ${idCard ? 'text-green-500' : 'text-gray-400'}`} />
                  <p className="font-medium">{idCard ? idCard.name : 'Upload Student ID Card'}</p>
                </div>

                <div 
                  onClick={() => faceScanInputRef.current?.click()}
                  className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-colors ${faceScan ? 'border-green-500 bg-green-50' : 'border-gray-300 hover:border-orange-500'}`}
                >
                  <input type="file" ref={faceScanInputRef} onChange={handleFaceScanUpload} className="hidden" accept="image/*" />
                  <Camera className={`size-8 mx-auto mb-2 ${faceScan ? 'text-green-500' : 'text-gray-400'}`} />
                  <p className="font-medium">{faceScan ? faceScan.name : 'Take Face Scan'}</p>
                </div>
              </div>

              <button 
                onClick={handleSubmit} 
                disabled={loading || !idCard || !faceScan}
                className="w-full py-4 bg-gradient-to-r from-orange-500 to-yellow-500 text-white font-bold rounded-xl shadow-lg hover:shadow-orange-200 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {loading && <Loader2 className="size-5 animate-spin" />}
                {loading ? 'Processing...' : 'Complete Signup'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}