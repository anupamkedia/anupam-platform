'use client';
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import { Image, Upload, Trash2, Search, Grid, List, Copy, Check, FolderOpen } from 'lucide-react';

type MediaItem = { id: string; filename: string; original_filename: string; file_type: string; file_size: number; url: string; thumbnail_url: string; folder: string; alt_text: string; created_at: string };

export default function AdminMediaPage() {
  const [items, setItems] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [uploading, setUploading] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    const { data } = await supabase.from('media').select('*').order('created_at', { ascending: false });
    setItems(data || []);
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    setUploading(true);

    for (const file of Array.from(files)) {
      const ext = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
      const { data, error } = await supabase.storage.from('media').upload(`uploads/${fileName}`, file);

      if (!error && data) {
        const { data: urlData } = supabase.storage.from('media').getPublicUrl(data.path);
        await supabase.from('media').insert({
          filename: fileName,
          original_filename: file.name,
          file_type: file.type,
          file_size: file.size,
          url: urlData.publicUrl,
          folder: 'uploads',
        });
      }
    }
    setUploading(false);
    load();
    e.target.value = '';
  };

  const copyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopied(url);
    setTimeout(() => setCopied(null), 2000);
  };

  const handleDelete = async (item: MediaItem) => {
    if (!confirm(`Delete ${item.original_filename}?`)) return;
    await supabase.storage.from('media').remove([`uploads/${item.filename}`]);
    await supabase.from('media').delete().eq('id', item.id);
    load();
  };

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  const filtered = items.filter(i => !search || (i.original_filename || '').toLowerCase().includes(search.toLowerCase()));

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Media Library</h1>
        <label className={`btn-primary text-sm cursor-pointer ${uploading ? 'opacity-50' : ''}`}>
          <Upload size={16} className="mr-2" /> {uploading ? 'Uploading...' : 'Upload Files'}
          <input type="file" multiple accept="image/*,.pdf,.doc,.docx" className="hidden" onChange={handleUpload} disabled={uploading} />
        </label>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-3 mb-4 flex gap-3">
        <div className="flex-1 relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input className="input-field !pl-9 !py-2" placeholder="Search files..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <div className="flex border border-gray-200 rounded-lg overflow-hidden">
          <button onClick={() => setViewMode('grid')} className={`p-2 ${viewMode === 'grid' ? 'bg-brand-50 text-brand-500' : 'text-gray-400'}`}><Grid size={18} /></button>
          <button onClick={() => setViewMode('list')} className={`p-2 ${viewMode === 'list' ? 'bg-brand-50 text-brand-500' : 'text-gray-400'}`}><List size={18} /></button>
        </div>
      </div>

      {loading ? <div className="bg-white rounded-xl p-12 text-center text-gray-400">Loading media...</div>
      : filtered.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
          <FolderOpen className="mx-auto text-gray-300 mb-3" size={48} />
          <p className="text-gray-500 mb-2">{items.length === 0 ? 'No files uploaded yet' : 'No files match your search'}</p>
          <p className="text-sm text-gray-400">Upload images, documents, and PDFs. Create a &quot;media&quot; storage bucket in Supabase first.</p>
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {filtered.map(item => (
            <div key={item.id} className="bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-md transition group">
              <div className="h-32 bg-gray-50 flex items-center justify-center relative">
                {item.file_type?.startsWith('image/') ? (
                  <img src={item.url} alt={item.alt_text || item.original_filename} className="h-full w-full object-cover" />
                ) : (
                  <Image size={32} className="text-gray-300" />
                )}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-2">
                  <button onClick={() => copyUrl(item.url)} className="p-1.5 bg-white rounded-lg text-gray-700 hover:bg-gray-100">
                    {copied === item.url ? <Check size={14} /> : <Copy size={14} />}
                  </button>
                  <button onClick={() => handleDelete(item)} className="p-1.5 bg-white rounded-lg text-red-500 hover:bg-red-50">
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
              <div className="p-2">
                <div className="text-xs font-medium text-gray-700 truncate">{item.original_filename}</div>
                <div className="text-xs text-gray-400">{formatSize(item.file_size || 0)}</div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 divide-y divide-gray-100">
          {filtered.map(item => (
            <div key={item.id} className="p-3 flex items-center gap-3 hover:bg-gray-50">
              <div className="w-10 h-10 rounded bg-gray-100 flex items-center justify-center shrink-0">
                {item.file_type?.startsWith('image/') ? (
                  <img src={item.url} alt="" className="w-full h-full object-cover rounded" />
                ) : <Image size={16} className="text-gray-400" />}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-gray-700 truncate">{item.original_filename}</div>
                <div className="text-xs text-gray-400">{formatSize(item.file_size || 0)} · {new Date(item.created_at).toLocaleDateString('en-IN')}</div>
              </div>
              <button onClick={() => copyUrl(item.url)} className="p-2 text-gray-400 hover:text-brand-500 rounded-lg">
                {copied === item.url ? <Check size={16} /> : <Copy size={16} />}
              </button>
              <button onClick={() => handleDelete(item)} className="p-2 text-gray-400 hover:text-red-500 rounded-lg"><Trash2 size={16} /></button>
            </div>
          ))}
        </div>
      )}

      <div className="mt-4 text-sm text-gray-400 text-center">{filtered.length} file{filtered.length !== 1 ? 's' : ''}</div>
    </div>
  );
}
