'use client';
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import { Settings, Save, Globe, Phone, Mail, MapPin, Share2 } from 'lucide-react';

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    const { data } = await supabase.from('site_settings').select('*');
    const map: Record<string, any> = {};
    (data || []).forEach(row => { map[row.key] = row.value; });
    setSettings(map);
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const updateSetting = (key: string, field: string, value: string) => {
    setSettings(prev => ({ ...prev, [key]: { ...prev[key], [field]: value } }));
  };

  const handleSave = async () => {
    setSaving(true);
    for (const [key, value] of Object.entries(settings)) {
      await supabase.from('site_settings').update({ value, updated_at: new Date().toISOString() }).eq('key', key);
    }
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  if (loading) return <div className="p-12 text-center text-gray-400">Loading settings...</div>;

  const company = settings.company || {};
  const contact = settings.contact || {};
  const social = settings.social || {};
  const seo = settings.seo || {};

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Site Settings</h1>
        <button onClick={handleSave} disabled={saving} className="btn-primary text-sm">
          <Save size={16} className="mr-2" /> {saving ? 'Saving...' : saved ? '✓ Saved' : 'Save All'}
        </button>
      </div>

      <div className="space-y-6">
        {/* Company */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="font-bold text-gray-800 mb-4 flex items-center gap-2"><Globe size={18} className="text-brand-500" /> Company Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
              <input className="input-field" value={company.name || ''} onChange={e => updateSetting('company', 'name', e.target.value)} /></div>
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Tagline</label>
              <input className="input-field" value={company.tagline || ''} onChange={e => updateSetting('company', 'tagline', e.target.value)} /></div>
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Established Year</label>
              <input className="input-field" value={company.established || ''} onChange={e => updateSetting('company', 'established', e.target.value)} /></div>
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Production Capacity</label>
              <input className="input-field" value={company.capacity || ''} onChange={e => updateSetting('company', 'capacity', e.target.value)} /></div>
          </div>
        </div>

        {/* Contact */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="font-bold text-gray-800 mb-4 flex items-center gap-2"><Phone size={18} className="text-brand-500" /> Contact Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Head Office Address</label>
              <input className="input-field" value={contact.head_office || ''} onChange={e => updateSetting('contact', 'head_office', e.target.value)} /></div>
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Factory Address</label>
              <input className="input-field" value={contact.factory || ''} onChange={e => updateSetting('contact', 'factory', e.target.value)} /></div>
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
              <input className="input-field" value={contact.phone || ''} onChange={e => updateSetting('contact', 'phone', e.target.value)} /></div>
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input className="input-field" value={contact.email || ''} onChange={e => updateSetting('contact', 'email', e.target.value)} /></div>
            <div><label className="block text-sm font-medium text-gray-700 mb-1">WhatsApp Number</label>
              <input className="input-field" value={contact.whatsapp || ''} onChange={e => updateSetting('contact', 'whatsapp', e.target.value)} /></div>
          </div>
        </div>

        {/* Social */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="font-bold text-gray-800 mb-4 flex items-center gap-2"><Share2 size={18} className="text-brand-500" /> Social Media Links</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {['linkedin', 'facebook', 'instagram', 'youtube', 'twitter'].map(platform => (
              <div key={platform}>
                <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">{platform}</label>
                <input className="input-field" value={social[platform] || ''} onChange={e => updateSetting('social', platform, e.target.value)} placeholder={`https://${platform}.com/...`} />
              </div>
            ))}
          </div>
        </div>

        {/* SEO */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="font-bold text-gray-800 mb-4 flex items-center gap-2"><Settings size={18} className="text-brand-500" /> SEO Defaults</h2>
          <div className="space-y-4">
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Default Meta Title</label>
              <input className="input-field" value={seo.default_title || ''} onChange={e => updateSetting('seo', 'default_title', e.target.value)} /></div>
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Default Meta Description</label>
              <textarea className="input-field" rows={3} value={seo.default_description || ''} onChange={e => updateSetting('seo', 'default_description', e.target.value)} /></div>
          </div>
        </div>
      </div>
    </div>
  );
}
