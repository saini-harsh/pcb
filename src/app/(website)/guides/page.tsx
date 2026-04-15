'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Search, BookOpen, Settings, Layout, Cpu, FileJson, ArrowRight, Filter } from 'lucide-react'

const categories = [
  { id: 'all', name: 'All Guides' },
  { id: 'process', name: 'Ordering Process' },
  { id: 'cad', name: 'CAD Export Tutorials' },
  { id: 'data', name: 'Data & BOM Prep' },
]

const guides = [
  {
    title: 'PCB Ordering Masterclass',
    description: 'A step-by-step walkthrough of our automated fabrication platform, from file upload to final delivery.',
    category: 'process',
    icon: <BookOpen className="w-6 h-6" />,
    link: '/guides/order-process'
  },
  {
    title: 'Seamless Assembly Workflow',
    description: 'How to coordinate PCBA orders, component sourcing, and quality inspections for your projects.',
    category: 'process',
    icon: <Cpu className="w-6 h-6" />,
    link: '/guides/assembly-process'
  },
  {
    title: 'Altium Designer: Gerber Export',
    description: 'Configure your CAM outputs correctly to ensure high-fidelity manufacturing from Altium environments.',
    category: 'cad',
    icon: <Settings className="w-6 h-6" />,
    link: '/guides/altium-gerber'
  },
  {
    title: 'KiCad Production Files',
    description: 'Expert tips for generating Gerbers and Drill files from KiCad for error-free board production.',
    category: 'cad',
    icon: <Settings className="w-6 h-6" />,
    link: '/guides/kicad-gerber'
  },
  {
    title: 'Autodesk Eagle (v8.6+) Setup',
    description: 'Modern Gerber generation workflows for the latest versions of Eagle CAD.',
    category: 'cad',
    icon: <Settings className="w-6 h-6" />,
    link: '/guides/eagle-modern'
  },
  {
    title: 'Legacy Eagle (v8.5) Export',
    description: 'Stable CAM job configurations for older Eagle installations to maintain design integrity.',
    category: 'cad',
    icon: <Settings className="w-6 h-6" />,
    link: '/guides/eagle-legacy'
  },
  {
    title: 'EasyEDA Pro: Fast Export',
    description: 'Instantly generate fabrication-ready files from the EasyEDA online editor.',
    category: 'cad',
    icon: <Layout className="w-6 h-6" />,
    link: '/guides/easyeda-gerber'
  },
  {
    title: 'Allegro & OrCAD Tutorials',
    description: 'Navigating the complex export settings of Cadence design suites for professional PCB production.',
    category: 'cad',
    icon: <Settings className="w-6 h-6" />,
    link: '/guides/allegro-orcad'
  },
  {
    title: 'BOM Optimization Tool',
    description: 'Prepare your Bill of Materials (BOM) for automated component procurement and assembly.',
    category: 'data',
    icon: <FileJson className="w-6 h-6" />,
    link: '/guides/bom-prep'
  },
  {
    title: 'Pick & Place (Centroid) Files',
    description: 'Formatting coordinate files for high-speed automated SMT assembly machines.',
    category: 'data',
    icon: <Cpu className="w-6 h-6" />,
    link: '/guides/centroid-files'
  },
  {
    title: 'Proteus & DipTrace Export',
    description: 'Standardizing fabrication outputs from Proteus and DipTrace environments.',
    category: 'cad',
    icon: <Settings className="w-6 h-6" />,
    link: '/guides/proteus-diptrace'
  },
  {
    title: 'DesignSpark & CircuitMaker',
    description: 'How to export production files from open-source and free-tier professional CAD tools.',
    category: 'cad',
    icon: <Layout className="w-6 h-6" />,
    link: '/guides/designspark-circuitmaker'
  }
]

export default function GuidesPage() {
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState('all')

  const filteredGuides = guides.filter(guide => {
    const matchesSearch = guide.title.toLowerCase().includes(search.toLowerCase()) ||
      guide.description.toLowerCase().includes(search.toLowerCase())
    const matchesCategory = activeCategory === 'all' || guide.category === activeCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="min-h-screen bg-white">
      <main className="pb-20">
        {/* Hero Section */}
        <section className="container mx-auto px-6 mb-16">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-black text-gray-900 mb-6 tracking-tight">
              Master the Art of <span className="text-primary italic">Precision</span> Engineering
            </h1>
            <p className="text-xl text-gray-500 font-medium mb-10 max-w-2xl mx-auto leading-relaxed">
              From Gerber export tutorials to advanced BOM preparation, our technical guides ensure your ideas reach reality without friction.
            </p>

            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto group">
              <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
                <Search className="w-6 h-6 text-gray-400 group-focus-within:text-primary transition-colors" />
              </div>
              <input
                type="text"
                placeholder="Search tutorials (e.g. 'Altium', 'BOM', 'Gerber')..."
                className="w-full pl-16 pr-6 py-6 bg-gray-50 border-none rounded-3xl text-lg font-medium shadow-sm focus:ring-4 focus:ring-primary/10 transition-all"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
        </section>

        {/* Categories & Grid */}
        <section className="container mx-auto px-6">
          {/* Categories */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-8 py-3 rounded-full text-sm font-bold transition-all ${activeCategory === cat.id
                  ? 'bg-primary text-white shadow-xl shadow-orange-900/20 scale-105'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Grid */}
          {filteredGuides.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredGuides.map((guide, idx) => (
                <div
                  key={idx}
                  className="group bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-2xl hover:border-primary/20 transition-all duration-500 overflow-hidden relative"
                >
                  <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                    {guide.icon}
                  </div>

                  <div className="bg-gray-50 w-16 h-16 rounded-2xl flex items-center justify-center mb-8 border border-gray-100 group-hover:bg-primary/5 group-hover:border-primary/20 transition-colors">
                    <div className="text-gray-400 group-hover:text-primary transition-colors">
                      {guide.icon}
                    </div>
                  </div>

                  <h3 className="text-2xl font-black text-gray-900 mb-4 tracking-tight leading-tight">
                    {guide.title}
                  </h3>
                  <p className="text-gray-500 font-medium mb-8 leading-relaxed">
                    {guide.description}
                  </p>

                  <Link
                    href={guide.link}
                    className="inline-flex items-center gap-2 text-primary font-black text-sm uppercase tracking-widest hover:gap-4 transition-all"
                  >
                    Open Guide <ArrowRight className="w-4 h-4" />
                  </Link>

                  <div className="absolute bottom-0 left-0 h-1.5 bg-primary/20 w-0 group-hover:w-full transition-all duration-500" />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="bg-gray-50 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
                <Filter className="w-10 h-10 text-gray-300" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">No guides found</h3>
              <p className="text-gray-500">Try adjusting your search or category filters.</p>
            </div>
          )}
        </section>

        {/* Help CTA */}
        <section className="container mx-auto px-6 mt-32">
          <div className="bg-gray-900 rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 blur-[100px] animate-pulse" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-orange-900/40 blur-[100px]" />

            <h2 className="text-4xl md:text-5xl font-black text-white mb-8 tracking-tight relative">
              Still Have Technical Questions?
            </h2>
            <p className="text-gray-400 text-lg mb-12 max-w-2xl mx-auto leading-relaxed relative">
              Our engineering team is ready to assist with high-complexity manufacturing requirements.
            </p>
            <Link
              href="/contact"
              className="px-12 py-5 bg-white text-gray-900 rounded-full font-black text-lg hover:bg-primary hover:text-white transition-all inline-block relative shadow-xl shadow-black/20"
            >
              Consult an Engineer
            </Link>
          </div>
        </section>
      </main>

    </div>
  )
}
