'use client';
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import { PenLine, Plus, Search, Edit2, Trash2, X, Save, Eye, EyeOff, Calendar } from 'lucide-react';

type Post = {
  id: string; title: string; slug: string; content: string; excerpt: string;
  featured_image: string; category_id: string; tags: string[]; author_name: string;
  status: string; created_at: string;
  blog_categories?: { name: string };
};
type Category = { id: string; name: string; slug: string };

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [editing, setEditing] = useState(false);
  const [isNew, setIsNew] = useState(false);
  const [currentPost, setCurrentPost] = useState<Partial<Post>>({});
  const [saving, setSaving] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    const [postsRes, catsRes] = await Promise.all([
      supabase.from('blog_posts').select('*, blog_categories(name)').order('created_at', { ascending: false }),
      supabase.from('blog_categories').select('*').order('sort_order'),
    ]);
    setPosts(postsRes.data || []);
    setCategories(catsRes.data || []);
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const autoSlug = (t: string) => t.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

  const openEditor = (post?: Post) => {
    setEditing(true);
    if (post) { setIsNew(false); setCurrentPost({ ...post }); }
    else { setIsNew(true); setCurrentPost({ title: '', slug: '', content: '', excerpt: '', category_id: '', author_name: 'Anupam Paints', status: 'draft', tags: [] }); }
  };

  const handleSave = async () => {
    setSaving(true);
    const payload: any = { ...currentPost, slug: currentPost.slug || autoSlug(currentPost.title || '') };
    delete payload.blog_categories; delete payload.id;

    let error;
    if (isNew) error = (await supabase.from('blog_posts').insert(payload)).error;
    else error = (await supabase.from('blog_posts').update(payload).eq('id', currentPost.id)).error;

    setSaving(false);
    if (error) { alert('Error: ' + error.message); return; }
    setEditing(false);
    load();
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this post?')) return;
    await supabase.from('blog_posts').delete().eq('id', id);
    load();
  };

  const filtered = posts.filter(p => !search || p.title.toLowerCase().includes(search.toLowerCase()));

  if (editing) {
    return (
      <div>
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-800">{isNew ? 'New Post' : 'Edit Post'}</h1>
          <button onClick={() => setEditing(false)} className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg"><X size={20} /></button>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
            <input className="input-field" value={currentPost.title || ''} onChange={e => setCurrentPost({ ...currentPost, title: e.target.value, slug: autoSlug(e.target.value) })} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select className="input-field" value={currentPost.category_id || ''} onChange={e => setCurrentPost({ ...currentPost, category_id: e.target.value })}>
                <option value="">Select</option>
                {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Author</label>
              <input className="input-field" value={currentPost.author_name || ''} onChange={e => setCurrentPost({ ...currentPost, author_name: e.target.value })} />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Excerpt</label>
            <textarea className="input-field" rows={2} value={currentPost.excerpt || ''} onChange={e => setCurrentPost({ ...currentPost, excerpt: e.target.value })} placeholder="Brief summary for listing and SEO" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Content (Markdown supported)</label>
            <textarea className="input-field font-mono text-sm" rows={16} value={currentPost.content || ''} onChange={e => setCurrentPost({ ...currentPost, content: e.target.value })} placeholder="Write your article here..." />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Featured Image URL</label>
              <input className="input-field" value={currentPost.featured_image || ''} onChange={e => setCurrentPost({ ...currentPost, featured_image: e.target.value })} placeholder="https://..." />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select className="input-field" value={currentPost.status || 'draft'} onChange={e => setCurrentPost({ ...currentPost, status: e.target.value })}>
                <option value="draft">Draft</option>
                <option value="published">Published</option>
                <option value="scheduled">Scheduled</option>
              </select>
            </div>
          </div>
          <div className="flex gap-3 pt-4 border-t">
            <button onClick={handleSave} disabled={saving || !currentPost.title} className="btn-primary disabled:opacity-50">
              <Save size={16} className="mr-2" /> {saving ? 'Saving...' : isNew ? 'Publish Post' : 'Update Post'}
            </button>
            <button onClick={() => setEditing(false)} className="btn-outline">Cancel</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Blog Posts</h1>
        <button onClick={() => openEditor()} className="btn-primary text-sm"><Plus size={16} className="mr-2" /> New Post</button>
      </div>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-3 mb-4">
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input className="input-field !pl-9 !py-2" placeholder="Search posts..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>
      </div>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {loading ? <div className="p-12 text-center text-gray-400">Loading...</div>
        : filtered.length === 0 ? (
          <div className="p-12 text-center">
            <PenLine className="mx-auto text-gray-300 mb-3" size={40} />
            <p className="text-gray-500">No posts yet. Start writing your first article.</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {filtered.map(post => (
              <div key={post.id} className="p-4 hover:bg-gray-50 flex items-center justify-between">
                <div className="flex-1">
                  <div className="font-medium text-gray-800">{post.title}</div>
                  <div className="flex items-center gap-3 mt-1 text-xs text-gray-400">
                    {post.blog_categories?.name && <span className="badge-blue text-xs">{post.blog_categories.name}</span>}
                    <span className={`badge text-xs ${post.status === 'published' ? 'bg-green-50 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                      {post.status}
                    </span>
                    <span><Calendar size={12} className="inline mr-1" />{new Date(post.created_at).toLocaleDateString('en-IN')}</span>
                  </div>
                </div>
                <div className="flex gap-1">
                  <button onClick={() => openEditor(post)} className="p-2 text-gray-500 hover:text-brand-500 hover:bg-brand-50 rounded-lg"><Edit2 size={16} /></button>
                  <button onClick={() => handleDelete(post.id)} className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg"><Trash2 size={16} /></button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
