import { notFound } from 'next/navigation';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { Calendar, ArrowLeft, User, Tag } from 'lucide-react';

type Props = { params: { slug: string } };

export async function generateMetadata({ params }: Props) {
  const { data } = await supabase.from('blog_posts').select('title, meta_title, meta_description, excerpt').eq('slug', params.slug).single();
  if (!data) return { title: 'Post Not Found' };
  return { title: data.meta_title || data.title, description: data.meta_description || data.excerpt };
}

export default async function BlogPostPage({ params }: Props) {
  const { data: post } = await supabase.from('blog_posts').select('*, blog_categories(name, slug)').eq('slug', params.slug).eq('status', 'published').single();
  if (!post) notFound();

  return (
    <>
      <section className="gradient-brand text-white py-16 md:py-20">
        <div className="container-wide px-4 max-w-3xl">
          <Link href="/blog" className="text-brand-200 text-sm flex items-center gap-1 mb-4 hover:text-white transition"><ArrowLeft size={14} /> Back to Blog</Link>
          {post.blog_categories?.name && <span className="badge bg-white/15 text-white text-xs mb-3">{post.blog_categories.name}</span>}
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{post.title}</h1>
          <div className="flex items-center gap-4 text-sm text-brand-200">
            <span className="flex items-center gap-1"><User size={14} /> {post.author_name || 'Anupam Paints'}</span>
            <span className="flex items-center gap-1"><Calendar size={14} /> {new Date(post.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
          </div>
        </div>
      </section>
      <section className="section-padding bg-white">
        <article className="container-wide max-w-3xl prose prose-lg prose-brand">
          <div dangerouslySetInnerHTML={{ __html: (post.content || '').replace(/\n/g, '<br />') }} />
        </article>
      </section>
    </>
  );
}
