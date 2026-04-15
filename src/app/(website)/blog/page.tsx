'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { Search, ChevronRight, Clock, User, Tag } from 'lucide-react'

const blogPosts = [
  {
    slug: 'production-ready-pcb-dfm-checklist',
    title: 'The 2024 DFM Master Checklist: Production-Ready PCBs',
    excerpt: 'Ensure your design is ready for high-volume manufacturing with our comprehensive Design for Manufacturability (DFM) guide.',
    category: 'Manufacturing',
    author: 'Engineering Team',
    date: 'March 20, 2024',
    readTime: '8 min read',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1000',
    featured: true
  },
  {
    slug: 'pcb-substrate-performance-guide',
    title: 'Choosing the Right Substrate for High-Performance Boards',
    excerpt: 'Beyond FR4: Exploring high-frequency and thermal substrates for demanding industrial applications.',
    category: 'Engineering',
    author: 'Technical Director',
    date: 'March 18, 2024',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1591405351990-4726e33df58d?auto=format&fit=crop&q=80&w=1000'
  },
  {
    slug: 'industrial-compliance-india-guide',
    title: 'Navigating Industry Compliance & Quality Standards in India',
    excerpt: 'A deep dive into ISO 9001, RoHS, and UL certifications for PCB manufacturing on the subcontinent.',
    category: 'Compliance',
    author: 'Quality Assurance',
    date: 'March 15, 2024',
    readTime: '10 min read',
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=1000'
  },
  {
    slug: 'understanding-solder-mask-protection',
    title: 'The Role of Solder Mask: Protection, Performance, and Precision',
    excerpt: 'Why your choice of mask color and type matters more than just aesthetics in modern PCB design.',
    category: 'Design',
    author: 'Production Lead',
    date: 'March 12, 2024',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=1000'
  },
  {
    slug: 'rapid-prototyping-engineered-for-speed',
    title: 'Prototyping at Scale: What Makes Rapid Manufacturing Work?',
    excerpt: 'How automated CAM engines and smart logistics are cutting delivery times for engineering teams.',
    category: 'Manufacturing',
    author: 'Operations Head',
    date: 'March 10, 2024',
    readTime: '7 min read',
    image: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&q=80&w=1000'
  },
  {
    slug: 'flying-probe-testing-reliability',
    title: 'Flying Probe Testing: The Gold Standard for PCB Reliability',
    excerpt: 'Ensuring zero-defect production with advanced electrical testing methodologies.',
    category: 'Testing',
    author: 'Engineering Team',
    date: 'March 08, 2024',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?auto=format&fit=crop&q=80&w=1000'
  }
]

export default function BlogPage() {
  const [search, setSearch] = useState('')
  const featuredPost = blogPosts.find(post => post.featured)
  const regularPosts = blogPosts.filter(post => !post.featured && 
    (post.title.toLowerCase().includes(search.toLowerCase()) || 
     post.category.toLowerCase().includes(search.toLowerCase()))
  )

  return (
    <div className="min-h-screen bg-white">
      <main className="pb-20">
        <section className="container mx-auto px-6 mb-16 text-center">
            <h1 className="text-5xl md:text-7xl font-black text-gray-900 mb-6 tracking-tight">
              Industrial <span className="text-primary italic">Perspectives</span>
            </h1>
            <p className="text-xl text-gray-500 font-medium max-w-2xl mx-auto">
              Cutting-edge insights into the world of electronic manufacturing, design, and engineering excellence.
            </p>
        </section>

        {/* Search & Hero */}
        <section className="container mx-auto px-6 mb-20">
          {featuredPost && (
            <Link href={`/blog/${featuredPost.slug}`} className="group relative block rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-2xl transition-all hover:scale-[1.01]">
              <div className="relative aspect-[4/5] sm:aspect-[16/9] lg:aspect-[21/9] w-full">
                <Image 
                  src={featuredPost.image} 
                  alt={featuredPost.title}
                  fill
                  priority
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent" />
              </div>
              
              <div className="absolute bottom-0 left-0 p-6 md:p-12 lg:p-16 text-white max-w-4xl">
                <div className="flex items-center gap-3 mb-4 md:mb-6">
                  <span className="px-3 py-1 bg-primary rounded-full text-[10px] md:text-xs font-black uppercase tracking-widest">{featuredPost.category}</span>
                  <span className="text-[11px] md:text-sm font-bold text-gray-300 flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 md:w-4 h-4" /> {featuredPost.readTime}</span>
                </div>
                <h2 className="text-2xl md:text-4xl lg:text-6xl font-black mb-4 md:mb-6 leading-tight group-hover:text-primary transition-colors">
                  {featuredPost.title}
                </h2>
                <p className="text-sm md:text-lg lg:text-xl text-gray-300 font-medium mb-6 md:mb-8 line-clamp-2 md:line-clamp-none">
                  {featuredPost.excerpt}
                </p>
                <div className="flex items-center gap-3">
                   <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/10 flex items-center justify-center border border-white/20"><User className="w-4 h-4 md:w-5 h-5" /></div>
                   <span className="text-sm md:text-lg font-bold">{featuredPost.author}</span>
                </div>
              </div>
            </Link>
          )}
        </section>

        {/* Regular Posts Grid */}
        <section className="container mx-auto px-6">
          <div className="flex items-center justify-between mb-12 border-b border-gray-100 pb-8">
            <h3 className="text-3xl font-black text-gray-900 tracking-tight">Latest Articles</h3>
            <div className="relative w-80 group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-primary transition-colors" />
              <input 
                type="text"
                placeholder="Find articles..."
                className="w-full pl-12 pr-4 py-3 bg-gray-50 border-none rounded-xl font-medium focus:ring-2 focus:ring-primary/20 transition-all"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {regularPosts.map((post) => (
              <Link 
                key={post.slug} 
                href={`/blog/${post.slug}`}
                className="group flex flex-col bg-white rounded-[2.5rem] overflow-hidden border border-transparent hover:border-gray-100 hover:shadow-2xl transition-all duration-500"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image 
                    src={post.image} 
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-6 left-6">
                    <span className="px-4 py-1.5 bg-white/90 backdrop-blur-md rounded-full text-[10px] font-black uppercase tracking-widest text-gray-900">{post.category}</span>
                  </div>
                </div>

                <div className="p-10 flex-1 flex flex-col">
                  <div className="flex items-center gap-4 text-xs font-bold text-gray-400 mb-6 uppercase tracking-widest">
                    <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> {post.readTime}</span>
                    <span>•</span>
                    <span>{post.date}</span>
                  </div>
                  
                  <h4 className="text-2xl font-black text-gray-900 mb-4 tracking-tight leading-tight group-hover:text-primary transition-colors">
                    {post.title}
                  </h4>
                  <p className="text-gray-500 font-medium mb-8 line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>
                  
                  <div className="mt-auto pt-6 border-t border-gray-50 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-400"><User className="w-4 h-4" /></div>
                      <span className="text-sm font-bold text-gray-700">{post.author}</span>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-primary group-hover:text-white transition-all">
                      <ChevronRight className="w-5 h-5" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Newsletter CTA */}
        <section className="container mx-auto px-6 mt-32">
          <div className="bg-primary rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 blur-[100px] rounded-full" />
            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl font-black text-white mb-6">Stay Ahead of the Industry</h2>
              <p className="text-white/80 text-lg mb-12 max-w-xl mx-auto font-medium">Get the latest technical insights and manufacturing trends delivered directly to your inbox.</p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input 
                  type="email" 
                  placeholder="name@company.com" 
                  className="flex-1 px-8 py-5 rounded-2xl bg-white/10 border border-white/20 text-white placeholder:text-white/60 outline-none focus:bg-white/20 transition-all font-bold"
                />
                <button className="px-10 py-5 bg-white text-primary rounded-2xl font-black hover:scale-105 active:scale-95 transition-all shadow-xl">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
