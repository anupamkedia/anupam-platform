'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { createClient } from '@supabase/supabase-js';
import { Calendar, BookOpen } from 'lucide-react';
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);

export default function BlogPage() {
  const [posts, setPosts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  useEffect(() => {
    supabase.from('blog_posts').select('*, blog_categories(name, slug)').eq('status', 'published').order('created_at', { ascending: false }).then(r => setPosts(r.data || []));
    supabase.from('blog_categories').select('*').order('sort_order').then(r => setCategories(r.data || []));
  }, []);
  return (
    <>
      <section className="gradient-brand text-white py-16 md:py-24">
        <div className="container-wide px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Knowledge Centre</h1>
          <p className="text-lg text-brand-200 max-w-2xl">Guides, insights, and technical knowledge from our coating experts.</p>
        </div>
      </section>
      {categories.length > 0 && (
        <section className="bg-white border-b border-gray-100 py-4">
          <div className="container-wide px-4 flex gap-2 overflow-x-auto">
            <span className="badge-blue font-medium">All Posts</span>
            {categories.map((cat: any) => (<span key={cat.id} className="badge bg-gray-100 text-gray-600 whitespace-nowrap">{cat.name}</span>))}
          </div>
        </section>
      )}
      <section className="section-padding bg-white">
        <div className="container-wide">
          {posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post: any) => (
                <Link key={post.id} href={`/blog/${post.slug}`} className="card card-hover group">
                  <div className="h-48 bg-gradient-to-br from-brand-50 to-blue-50 flex items-center justify-center"><BookOpen size={48} className="text-brand-300" /></div>
                  <div className="p-5">
                    {post.blog_categories?.name && <span className="badge-blue text-xs mb-2 inline-block">{post.blog_categories.name}</span>}
                    <h3 className="text-lg font-bold text-gray-800 group-hover:text-brand-500 transition mb-2">{post.title}</h3>
                    <p className="text-sm text-gray-600 line-clamp-2">{post.excerpt}</p>
                    <div className="mt-3 text-xs text-gray-400"><Calendar size={12} className="inline mr-1" />{new Date(post.created_at).toLocaleDateString('en-IN')}</div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-16"><BookOpen className="mx-auto text-brand-300 mb-4" size={48} /><h3 className="text-xl font-bold text-gray-800 mb-2">Blog Coming Soon</h3><p className="text-gray-600">Expert articles on coating technology are being prepared.</p></div>
          )}
        </div>
      </section>
    </>
  );
}