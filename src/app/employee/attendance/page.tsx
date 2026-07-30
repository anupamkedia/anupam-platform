'use client';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { MapPin, Clock, Camera, CheckCircle, LogIn, LogOut, Navigation } from 'lucide-react';

export default function AttendancePage() {
  const [status, setStatus] = useState<'idle' | 'checked_in' | 'checked_out'>('idle');
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [locationError, setLocationError] = useState('');
  const [checkinTime, setCheckinTime] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [locationType, setLocationType] = useState('field');

  const getLocation = () => {
    return new Promise<GeolocationPosition>((resolve, reject) => {
      if (!navigator.geolocation) { reject(new Error('Geolocation not supported')); return; }
      navigator.geolocation.getCurrentPosition(resolve, reject, { enableHighAccuracy: true, timeout: 10000 });
    });
  };

  const handleCheckin = async () => {
    setLoading(true);
    setLocationError('');
    try {
      const pos = await getLocation();
      const coords = { lat: pos.coords.latitude, lng: pos.coords.longitude };
      setLocation(coords);

      // TODO: Save to Supabase attendance table with auth user
      // For demo, just update UI state
      const now = new Date();
      setCheckinTime(now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }));
      setStatus('checked_in');
    } catch (err: any) {
      setLocationError('Unable to get location. Please enable GPS and try again.');
    }
    setLoading(false);
  };

  const handleCheckout = async () => {
    setLoading(true);
    try {
      const pos = await getLocation();
      // TODO: Update attendance record with checkout time and GPS
      setStatus('checked_out');
    } catch (err) {
      setLocationError('Unable to get location for checkout.');
    }
    setLoading(false);
  };

  const now = new Date();
  const dateStr = now.toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-2">Attendance</h1>
      <p className="text-sm text-gray-500 mb-6">{dateStr}</p>

      {/* Check in/out card */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6 max-w-lg">
        {status === 'idle' && (
          <div className="text-center">
            <div className="w-20 h-20 rounded-full bg-brand-50 mx-auto mb-4 flex items-center justify-center">
              <LogIn size={32} className="text-brand-500" />
            </div>
            <h2 className="text-xl font-bold text-gray-800 mb-1">Mark Attendance</h2>
            <p className="text-sm text-gray-500 mb-4">GPS location will be captured with your check-in.</p>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Location Type</label>
              <div className="flex gap-2 justify-center">
                {['field', 'office', 'factory', 'home'].map(type => (
                  <button key={type} onClick={() => setLocationType(type)}
                    className={`px-3 py-1.5 rounded-lg text-sm capitalize transition ${locationType === type ? 'bg-brand-500 text-white' : 'bg-gray-100 text-gray-600'}`}>
                    {type}
                  </button>
                ))}
              </div>
            </div>

            <button onClick={handleCheckin} disabled={loading}
              className="btn-primary w-full text-lg !py-4 disabled:opacity-50">
              {loading ? (
                <span className="flex items-center justify-center gap-2"><Navigation className="animate-spin" size={20} /> Getting Location...</span>
              ) : (
                <span className="flex items-center justify-center gap-2"><MapPin size={20} /> Check In</span>
              )}
            </button>

            {locationError && <p className="text-red-500 text-sm mt-3">{locationError}</p>}
          </div>
        )}

        {status === 'checked_in' && (
          <div className="text-center">
            <div className="w-20 h-20 rounded-full bg-green-50 mx-auto mb-4 flex items-center justify-center">
              <CheckCircle size={32} className="text-green-500" />
            </div>
            <h2 className="text-xl font-bold text-gray-800 mb-1">Checked In</h2>
            <p className="text-sm text-gray-500 mb-2">at {checkinTime}</p>
            {location && (
              <p className="text-xs text-gray-400 mb-1">
                GPS: {location.lat.toFixed(4)}, {location.lng.toFixed(4)}
              </p>
            )}
            <p className="text-xs text-gray-400 mb-4 capitalize">Location: {locationType}</p>

            <div className="bg-gray-50 rounded-xl p-4 mb-4">
              <div className="text-sm text-gray-600">Working time</div>
              <div className="text-2xl font-bold text-brand-500 mt-1">
                <Clock size={20} className="inline mr-1" /> Active
              </div>
            </div>

            <button onClick={handleCheckout} disabled={loading}
              className="btn-accent w-full text-lg !py-4 disabled:opacity-50">
              {loading ? 'Getting Location...' : <span className="flex items-center justify-center gap-2"><LogOut size={20} /> Check Out</span>}
            </button>
          </div>
        )}

        {status === 'checked_out' && (
          <div className="text-center">
            <div className="w-20 h-20 rounded-full bg-blue-50 mx-auto mb-4 flex items-center justify-center">
              <CheckCircle size={32} className="text-blue-500" />
            </div>
            <h2 className="text-xl font-bold text-gray-800 mb-1">Day Complete</h2>
            <p className="text-sm text-gray-500">You have checked out for today.</p>
            <div className="bg-gray-50 rounded-xl p-4 mt-4">
              <div className="text-sm text-gray-600">Check-in: {checkinTime}</div>
              <div className="text-sm text-gray-600">Check-out: {new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}</div>
            </div>
          </div>
        )}
      </div>

      {/* Recent attendance */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 max-w-lg">
        <h3 className="font-bold text-gray-800 mb-3">Recent Attendance</h3>
        <p className="text-sm text-gray-400">Attendance history will be displayed here once connected to the database.</p>
      </div>
    </div>
  );
}
