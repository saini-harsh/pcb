'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import { Clock, User, ArrowLeft, Share2, Bookmark, MessageSquare, ChevronRight } from 'lucide-react'

// Shared data (in a real app, this would be in a separate file or CMS)
const blogPosts = [
  {
    slug: 'production-ready-pcb-dfm-checklist',
    title: 'The 2024 DFM Master Checklist: Production-Ready PCBs',
    content: `
      <p>Design for Manufacturability (DFM) is the bridge between a brilliant engineering concept and a high-yield production run. At PCB GLOBE, we see thousands of designs monthly, and the difference between a 24-hour turnaround and a multi-day delay often comes down to simple DFM oversights.</p>
      
      <h3>1. Copper-to-Edge Clearances</h3>
      <p>One of the most frequent causes of shorts is insufficient clearance between copper traces and the routed edge of the board. We recommend maintaining at least 0.2mm (8 mils) to account for routing tolerances during the fabrication process.</p>
      
      <h3>2. Annular Ring Integrity</h3>
      <p>As board densities increase, annular rings become smaller. Ensure your design provides at least 0.1mm (4 mils) of annular ring for plated through-holes to prevent breakout during drilling hits.</p>
      
      <h3>3. Solder Mask Bridging</h3>
      <p>To prevent solder shorts during the assembly process, ensure there is a minimum solder mask dam of 0.1mm between adjacent pads. This is especially critical for fine-pitch QFN and BGA components.</p>
      
      <blockquote>
        "A successful PCB design isn't just one that works on your desk—it's one that can be manufactured reliably at scale."
      </blockquote>
      
      <h3>Conclusion</h3>
      <p>By following these baseline DFM rules, you dramatically reduce the risk of CAM holds and production delays. Download our full technical handbook for a deeper dive into multi-layer stackup optimizations.</p>
    `,
    category: 'Manufacturing',
    author: 'Engineering Team',
    date: 'March 20, 2024',
    readTime: '8 min read',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1000'
  },
  {
    slug: 'pcb-substrate-performance-guide',
    title: 'Choosing the Right Substrate for High-Performance Boards',
    content: '<p>Content for choosing substrates...</p>',
    category: 'Engineering',
    author: 'Technical Director',
    date: 'March 18, 2024',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1591405351990-4726e33df58d?auto=format&fit=crop&q=80&w=1000'
  }
  // ... other posts would be here
]

export default function BlogDetailPage() {
  const { slug } = useParams()
  const post = blogPosts.find(p => p.slug === slug) || blogPosts[0] // Fallback for demo
  
  const relatedPosts = blogPosts.filter(p => p.slug !== slug).slice(0, 2)

  return (
    <div className="min-h-screen bg-white">
      <main className="pb-20">
        {/* Article Header */}
        <section className="container mx-auto px-6 max-w-4xl mb-12">
          <Link href="/blog" className="inline-flex items-center gap-2 text-gray-500 font-bold hover:text-primary transition-colors mb-12 group">
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" /> Back to Articles
          </Link>
          
          <div className="flex items-center gap-4 mb-6">
            <span className="px-4 py-1.5 bg-primary/10 text-primary rounded-full text-xs font-black uppercase tracking-widest">{post.category}</span>
            <span className="text-sm font-bold text-gray-400 flex items-center gap-1.5"><Clock className="w-4 h-4" /> {post.readTime}</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-black text-gray-900 mb-8 leading-tight tracking-tight">
            {post.title}
          </h1>
          
          <div className="flex items-center justify-between py-8 border-y border-gray-50">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 font-bold">
                <User className="w-6 h-6" />
              </div>
              <div>
                <p className="font-black text-gray-900">{post.author}</p>
                <p className="text-sm font-bold text-gray-400">{post.date}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
               <button className="p-3 bg-gray-50 rounded-full hover:bg-gray-100 transition-colors text-gray-500"><Share2 className="w-5 h-5" /></button>
               <button className="p-3 bg-gray-50 rounded-full hover:bg-gray-100 transition-colors text-gray-500"><Bookmark className="w-5 h-5" /></button>
            </div>
          </div>
        </section>

        {/* Hero Image */}
        <section className="container mx-auto px-6 max-w-6xl mb-16">
          <div className="relative aspect-[21/9] rounded-[3rem] overflow-hidden shadow-2xl">
            <Image 
              src={post.image} 
              alt={post.title}
              fill
              className="object-cover"
            />
          </div>
        </section>

        {/* Content Area */}
        <section className="container mx-auto px-6 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            {/* Main Content */}
            <div className="lg:col-span-8">
              <article 
                className="prose prose-xl prose-slate max-w-none"
                dangerouslySetInnerHTML={{ __html: post.content || '' }}
              />
              
              <div className="mt-16 pt-12 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center gap-6">
                 <p className="font-bold text-gray-900">Share this insight:</p>
                 <div className="flex flex-wrap gap-4">
                    <button 
                      onClick={() => {
                        if (navigator.share) {
                          navigator.share({
                            title: post.title,
                            text: 'Check out this industrial insight from PCB GLOBE',
                            url: window.location.href,
                          }).catch(console.error);
                        } else {
                          // Fallback: Copy to clipboard
                          navigator.clipboard.writeText(window.location.href);
                          alert('Article link copied to clipboard!');
                        }
                      }}
                      className="px-8 py-3 bg-primary text-white hover:bg-orange-600 rounded-full text-sm font-black transition-all shadow-lg shadow-orange-900/20 active:scale-95 flex items-center gap-2"
                    >
                      <Share2 className="w-4 h-4" /> Share Now
                    </button>
                    {['Twitter', 'LinkedIn'].map(platform => (
                      <button 
                        key={platform} 
                        onClick={() => {
                          const url = encodeURIComponent(window.location.href);
                          const text = encodeURIComponent(post.title);
                          const shareUrl = platform === 'Twitter' 
                            ? `https://twitter.com/intent/tweet?url=${url}&text=${text}`
                            : `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
                          window.open(shareUrl, '_blank');
                        }}
                        className="px-6 py-3 bg-gray-50 hover:bg-gray-100 rounded-full text-sm font-bold transition-colors"
                      >
                        {platform}
                      </button>
                    ))}
                 </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-4">
              <div className="sticky top-40 space-y-12">
                {/* Related Posts */}
                <div className="bg-gray-50 rounded-[2.5rem] p-10">
                  <h4 className="text-xl font-black text-gray-900 mb-8 border-b border-gray-200 pb-4">Read Next</h4>
                  <div className="space-y-8">
                    {relatedPosts.map(rp => (
                      <Link key={rp.slug} href={`/blog/${rp.slug}`} className="group block">
                        <p className="text-xs font-black text-primary uppercase tracking-widest mb-2">{rp.category}</p>
                        <h5 className="font-black text-gray-900 group-hover:text-primary transition-colors leading-tight mb-2">{rp.title}</h5>
                        <p className="text-sm font-bold text-gray-400 flex items-center gap-1.5 underline decoration-primary/30 group-hover:decoration-primary transition-all">
                          Read Case Study <ChevronRight className="w-4 h-4" />
                        </p>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Newsletter Box */}
                <div className="bg-primary text-white rounded-[2.5rem] p-10 overflow-hidden relative shadow-xl shadow-orange-900/20">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 blur-[50px] rounded-full" />
                  <h4 className="text-2xl font-black mb-4 relative">Get Expert Tips</h4>
                  <p className="text-white/80 font-medium mb-8 text-sm relative">Join 50k+ engineers receiving our weekly manufacturing insights.</p>
                  <input type="email" placeholder="email@company.com" className="w-full px-6 py-4 bg-white/10 border border-white/20 rounded-2xl mb-4 text-white placeholder:text-white/60 font-bold focus:bg-white/20 transition-all outline-none" />
                  <button className="w-full py-4 bg-white text-primary rounded-2xl font-black shadow-lg hover:scale-[1.02] transition-all">Subscribe Now</button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
