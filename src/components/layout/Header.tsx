'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import { useState, useEffect, useRef, type ReactNode } from 'react'
import { Menu, X, Search, ChevronDown, LogIn, UserPlus, Box, Cpu, Package, HardDrive, Layout, ShieldCheck, Zap, Globe, Ruler, Settings, Layers, LayoutGrid, ArrowRight, ShoppingCart, User, Building2, FolderGit2, Mail } from 'lucide-react'
import { useAuth, UserButton } from "@clerk/nextjs"
import AuthModal from '../auth/AuthModal'
import { useCart } from '@/context/CartContext'
import { ClientOnly } from '@/components/ClientOnly'

type NavDropdownItem = {
  title: string
  href: string
  sub?: string
  icon?: ReactNode
}

const Header = () => {
  const pathname = usePathname()
  const isDashboardRoute = pathname?.startsWith('/dashboard')
  const { userId, isLoaded, getToken } = useAuth()
  const isSignedIn = !!userId
  const { cartCount } = useCart()

  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchModalOpen, setSearchModalOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [authModalOpen, setAuthModalOpen] = useState(false)
  const [authMode, setAuthMode] = useState<"sign-in" | "sign-up">("sign-in")
  const dropdownRef = useRef<HTMLDivElement>(null)
  const hasSyncedClerkUserRef = useRef(false)
  const syncInFlightRef = useRef(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close search/dropdown on escape
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSearchModalOpen(false)
        setActiveDropdown(null)
      }
    }
    window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [])

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setActiveDropdown(null)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Ensure Clerk user gets persisted into Payload `users` after sign-in/sign-up.
  useEffect(() => {
    if (!isLoaded || !userId) return
    let intervalId: ReturnType<typeof setInterval> | null = null

    const attemptSync = () => {
      if (hasSyncedClerkUserRef.current) {
        if (intervalId) clearInterval(intervalId)
        return
      }
      if (syncInFlightRef.current) return

      syncInFlightRef.current = true

      Promise.resolve(getToken?.())
        .then((token) => {
          if (!token) return null
          return fetch('/api/sync-clerk-user', {
            method: 'POST',
            credentials: 'include',
            headers: { Authorization: `Bearer ${token}` },
          })
        })
        .then(async (res) => {
          if (!res) return
          const data = await res.json().catch(() => null)
          if (!res.ok) {
            console.log('[sync-clerk-user] failed:', data)
            return
          }
          hasSyncedClerkUserRef.current = true
          if (intervalId) clearInterval(intervalId)
        })
        .catch((e) => {
          console.log('[sync-clerk-user] error:', e)
        })
        .finally(() => {
          syncInFlightRef.current = false
        })
    }

    attemptSync()
    intervalId = setInterval(attemptSync, 5000)

    return () => {
      if (intervalId) clearInterval(intervalId)
    }
  }, [isLoaded, userId, getToken])

  const services = [
    { title: 'PCB Fabrication', sub: 'FR4, Aluminum, Rogers, and HDI manufacturing.', icon: <Box className="w-5 h-5" />, href: '/services/pcb-fabrication' },
    { title: 'Assembly', sub: 'Quality Assured Assembly', icon: <Cpu className="w-5 h-5" />, href: '/services/pcb-assembly' },
    { title: 'Components', sub: 'Easy Access To Components', icon: <HardDrive className="w-5 h-5" />, href: '/components' },
    { title: 'Made in India Products', sub: 'Cheap Pricing, Faster Delivery', icon: <Globe className="w-5 h-5" />, href: '/services/made-in-india' },
    { title: 'Enclosures', sub: 'Explore And Shop Premium Enclosures', icon: <Box className="w-5 h-5 text-blue-500" />, href: '/services/pcb-enclosures' },
    { title: 'PCB Design', sub: 'Expert engineering for your creative ideas.', icon: <Layout className="w-5 h-5" />, href: '/services/pcb-design' },
    { title: 'PCB Box Build Services', sub: 'Assembled, Tested, Packaged', icon: <Zap className="w-5 h-5" />, href: '/services/box-build' },
    { title: 'PCBA Contract Manufacturing', sub: 'Manufacturability Experts', icon: <ShieldCheck className="w-5 h-5" />, href: '/services/pcba-contract' },
    { title: 'Shop Products', sub: 'Explore Our Product Inventory', icon: <Package className="w-5 h-5 text-orange-500" />, href: '/components' },
    { title: 'BOM Upload made easy', sub: 'Instantly upload your BOM and procure components', icon: <Cpu className="w-5 h-5" />, href: '/bom-tool' },
  ]

  const capabilities = [
    { title: 'Manufacturing Limits', sub: 'Explore Production Constraints', icon: <Ruler className="w-5 h-5 text-indigo-500" />, href: '/capabilities' },
    { title: 'Technical Specs', sub: 'Deep Dive Into Tolerances', icon: <Settings className="w-5 h-5 text-orange-500" />, href: '/capabilities' },
    { title: 'Material Science', sub: 'Substrates & Finishes', icon: <Layers className="w-5 h-5 text-green-500" />, href: '/capabilities' },
    { title: 'Tier Comparison', sub: 'Standard vs Advanced', icon: <LayoutGrid className="w-5 h-5 text-blue-500" />, href: '/capabilities' },
  ]

  const resources = [
    { title: 'User Guides', sub: 'Guiding Your Way', href: '/guides' },
    { title: 'Blogs', sub: 'Industrial Insights & Updates', href: '/blog' },
    { title: 'FAQs', sub: 'Your Answers in a Snap', href: '/faq' },
    { title: 'BOM Tool', sub: 'Bill of Materials Utility', href: '/bom-tool' },
  ]

  const navLinks = [
    { name: 'Services', isDropdown: true, items: services },
    { name: 'Capabilities', isDropdown: true, items: capabilities },
    { name: 'Resources', isDropdown: true, items: resources },
    { name: 'Instant Quote', href: '/quote', highlight: true },
    { name: 'Shop Products', href: '/components', highlight: true },
  ]

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${isScrolled ? 'glass py-3 shadow-sm border-gray-100' : 'bg-white py-5 border-transparent'
          }`}
      >
        <div className="container mx-auto px-6 flex items-center justify-between" ref={dropdownRef}>
          {/* Logo */}
          <Link href="/" className="flex-shrink-0 z-10">
            <div className="relative w-40 h-10 overflow-hidden hover:opacity-90 transition-opacity">
              <Image
                src="/logo.png"
                alt="PCB GLOBE Logo"
                fill
                priority
                sizes="160px"
                className="object-contain"
              />
            </div>
          </Link>

          {/* Desktop Nav - Centered */}
          {!isDashboardRoute && (
            <nav className="hidden xl:flex items-center gap-8">
              {navLinks.map((link) => (
                <div
                  key={link.name}
                  className="relative group lg:static xl:relative"
                  onMouseEnter={() => link.isDropdown && setActiveDropdown(link.name)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  {link.isDropdown ? (
                    <button
                      className={`text-[13px] font-bold tracking-tight transition-colors flex items-center gap-1 ${activeDropdown === link.name ? 'text-primary' : 'text-gray-800'
                        }`}
                    >
                      {link.name}
                      <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${activeDropdown === link.name ? 'rotate-180' : ''}`} />
                    </button>
                  ) : (
                    <Link
                      href={link.href || '#'}
                      className={`text-[13px] font-bold tracking-tight transition-colors flex items-center gap-1 ${link.highlight ? 'text-primary hover:text-orange-600' : 'text-gray-800 hover:text-primary'
                        }`}
                    >
                      {link.name}
                      {!link.highlight && <ChevronDown className="w-3 h-3 opacity-50" />}
                    </Link>
                  )}

                  {/* Dropdown Menu - Bridge with padding to prevent closing */}
                  {link.isDropdown && activeDropdown === link.name && (
                    <div className={`absolute top-full left-1/2 -translate-x-1/2 pt-2 z-[60] animate-in fade-in zoom-in-95 slide-in-from-top-2 duration-200 ${link.name === 'Services' ? 'w-[400px]' : 'w-[280px]'
                      }`}>
                      <div className="bg-white shadow-2xl rounded-3xl border border-gray-100 overflow-hidden">
                        <div className="p-3">
                          {link.items?.map((item: NavDropdownItem) => (
                            <Link
                              key={item.title}
                              href={item.href}
                              className="flex items-start gap-4 p-3 rounded-2xl hover:bg-gray-50 group/item transition-colors"
                              onClick={() => setActiveDropdown(null)}
                            >
                              {item.icon && (
                                <div className="p-2 bg-gray-50 rounded-xl group-hover/item:bg-white group-hover/item:shadow-sm transition-all text-gray-400 group-hover/item:text-primary">
                                  {item.icon}
                                </div>
                              )}
                              <div>
                                <p className="text-[13px] font-bold text-gray-900 leading-tight mb-1">{item.title}</p>
                                <p className="text-[11px] font-medium text-gray-400 leading-tight">{item.sub}</p>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </nav>
          )}

          {/* Right Actions - Icons */}
          <div className="flex items-center gap-4">
            {/* Search Trigger */}
            <button
              onClick={() => setSearchModalOpen(true)}
              className="p-2.5 rounded-full hover:bg-gray-100 transition-colors text-gray-700 hover:text-primary z-50"
              aria-label="Search"
            >
              <Search className="w-5 h-5 font-bold" />
            </button>

            <div className="h-6 w-[1px] bg-gray-200 block mx-1 z-50" />

            {isDashboardRoute ? (
              <div className="flex items-center gap-5 pl-2">
                <Link
                  href="/cart"
                  className="relative p-2 text-gray-500 hover:text-primary transition-colors cursor-pointer"
                >
                  <ShoppingCart className="w-6 h-6" />
                  <ClientOnly>
                    <span className="absolute top-0 right-0 w-4 h-4 bg-primary text-white text-[9px] font-black rounded-full flex items-center justify-center border-2 border-white translate-x-1 -translate-y-1">{cartCount}</span>
                  </ClientOnly>
                </Link>
                <div className="w-px h-6 bg-gray-100 mx-1" />
                {isLoaded ? (
                  <UserButton
                    appearance={{
                      elements: {
                        userButtonAvatarBox: "w-9 h-9 border-2 border-gray-100 hover:border-primary transition-colors ring-4 ring-gray-50",
                        userButtonTrigger: "focus:shadow-none focus:outline-none",
                      }
                    }}
                  />
                ) : (
                  <div className="w-10 h-10 bg-gray-50 border border-gray-100 animate-pulse rounded-full" />
                )}
              </div>
            ) : (
              /* Auth Actions */
              <div className="flex items-center gap-3">
                <Link
                  href="/cart"
                  className="relative p-2 text-gray-500 hover:text-primary transition-colors cursor-pointer mr-2"
                >
                  <ShoppingCart className="w-6 h-6" />
                  <ClientOnly>
                    <span className="absolute top-0 right-0 w-4 h-4 bg-primary text-white text-[9px] font-black rounded-full flex items-center justify-center border-2 border-white translate-x-1 -translate-y-1">{cartCount}</span>
                  </ClientOnly>
                </Link>

                {!isLoaded ? (
                  <div className="w-24 h-10 bg-gray-50 border border-gray-100 animate-pulse rounded-full flex items-center justify-center">
                    <div className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce" />
                  </div>
                ) : !isSignedIn ? (
                  <div className="flex items-center gap-6">
                    <button
                      onClick={() => { setAuthMode("sign-in"); setAuthModalOpen(true); }}
                      className="text-[13px] font-black uppercase tracking-widest text-gray-800 hover:text-primary transition-colors cursor-pointer"
                    >
                      Login
                    </button>
                    <button
                      onClick={() => { setAuthMode("sign-up"); setAuthModalOpen(true); }}
                      className="h-11 px-8 bg-primary rounded-full text-[11px] font-black uppercase tracking-[0.2em] text-white shadow-lg shadow-primary/20 hover:bg-gray-900 transition-all active:scale-95 flex items-center gap-3 group cursor-pointer"
                    >
                      Sign Up
                      <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center text-primary group-hover:translate-x-1 transition-transform">
                        <ArrowRight className="w-3 h-3" />
                      </div>
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center gap-5 pl-2">
                    <Link
                      href="/dashboard/projects"
                      className="h-10 px-6 bg-primary rounded-full text-[11px] font-black uppercase tracking-widest text-white shadow-lg shadow-primary/20 hover:bg-gray-900 transition-all active:scale-95 flex items-center gap-2 group cursor-pointer"
                    >
                      My Projects
                    </Link>
                    <div className="w-px h-6 bg-gray-100 mx-1" />
                    <UserButton
                      appearance={{
                        elements: {
                          userButtonAvatarBox: "w-9 h-9 border-2 border-gray-100 hover:border-primary transition-colors ring-4 ring-gray-50",
                          userButtonTrigger: "focus:shadow-none focus:outline-none",
                        }
                      }}
                    />
                  </div>
                )}
              </div>
            )}

            {/* Mobile Toggle */}
            {!isDashboardRoute && (
              <button
                className="xl:hidden p-2 text-gray-600 hover:text-primary"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        {!isDashboardRoute && mobileMenuOpen && (
          <div className="absolute top-full left-0 right-0 glass border-t border-gray-100 xl:hidden p-6 flex flex-col gap-6 animate-in slide-in-from-top duration-300 shadow-xl max-h-[90vh] overflow-y-auto">
            <div className="grid grid-cols-1 gap-4">
              {!isDashboardRoute && navLinks.map((link) => (
                <div key={link.name} className="flex flex-col">
                  {link.isDropdown ? (
                    <div className="flex flex-col">
                      <p className="text-[11px] font-black text-gray-400 uppercase tracking-widest mb-2 mt-4 px-2">{link.name}</p>
                      <div className="grid grid-cols-1 gap-2">
                        {link.items?.map((item: NavDropdownItem) => (
                          <Link
                            key={item.title}
                            href={item.href}
                            className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 border border-transparent hover:border-gray-100"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            {item.icon && <span className="text-gray-400">{item.icon}</span>}
                            <span className="text-sm font-bold text-gray-800">{item.title}</span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <Link
                      href={link.href || '#'}
                      className={`text-lg font-bold py-4 border-b border-gray-100 ${link.highlight ? 'text-primary' : 'text-gray-900'
                        }`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {link.name}
                    </Link>
                  )}
                </div>
              ))}
              {isDashboardRoute && (
                <div className="flex flex-col gap-2 mt-4">
                  <p className="text-[11px] font-black text-gray-400 uppercase tracking-widest mb-4 px-2">Dashboard</p>

                  <Link href="/dashboard/account" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-4 p-4 rounded-2xl hover:bg-orange-50 bg-gray-50/50 border border-gray-100 mb-2 transition-colors">
                    <span className="p-2 bg-orange-100 rounded-xl text-[#ff6b00]"><User className="w-5 h-5" /></span>
                    <span className="text-sm font-bold text-gray-800">My Account</span>
                  </Link>

                  <Link href="/dashboard/business" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-4 p-4 rounded-2xl hover:bg-orange-50 bg-gray-50/50 border border-gray-100 mb-2 transition-colors">
                    <span className="p-2 bg-orange-100 rounded-xl text-[#ff6b00]"><Building2 className="w-5 h-5" /></span>
                    <span className="text-sm font-bold text-gray-800">Business Account</span>
                  </Link>

                  <Link href="/dashboard/projects" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-4 p-4 rounded-2xl hover:bg-orange-50 bg-gray-50/50 border border-gray-100 mb-2 transition-colors">
                    <span className="p-2 bg-orange-100 rounded-xl text-[#ff6b00]"><FolderGit2 className="w-5 h-5" /></span>
                    <span className="text-sm font-bold text-gray-800">Your Orders</span>
                  </Link>

                  <Link href="/contact-us" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-4 p-4 rounded-2xl hover:bg-gray-100 bg-gray-50/50 border border-gray-100 transition-colors mt-4">
                    <span className="p-2 bg-gray-200 rounded-xl text-gray-600"><Mail className="w-5 h-5" /></span>
                    <span className="text-sm font-bold text-gray-800">Support / Contact Us</span>
                  </Link>
                </div>
              )}
              <div className="pt-8 border-t border-gray-100 flex items-center justify-around mt-4">
                {!isLoaded ? (
                  <div className="w-full h-12 bg-gray-50 animate-pulse rounded-2xl flex items-center justify-center">
                    <div className="w-2 h-2 bg-gray-200 rounded-full animate-bounce" />
                  </div>
                ) : !isSignedIn ? (
                  <>
                    <button
                      onClick={() => { setAuthMode("sign-in"); setAuthModalOpen(true); setMobileMenuOpen(false); }}
                      className="flex flex-col items-center gap-2"
                    >
                      <div className="p-4 bg-gray-50 rounded-2xl"><LogIn className="w-6 h-6 text-gray-900" /></div>
                      <span className="text-xs font-bold text-gray-600">Login</span>
                    </button>
                    <button
                      onClick={() => { setAuthMode("sign-up"); setAuthModalOpen(true); setMobileMenuOpen(false); }}
                      className="flex flex-col items-center gap-2"
                    >
                      <div className="p-4 bg-primary/10 text-primary rounded-2xl"><UserPlus className="w-6 h-6" /></div>
                      <span className="text-xs font-bold text-primary">Sign Up</span>
                    </button>
                  </>
                ) : (
                  <div className="flex flex-col items-center gap-4 py-4 w-full">
                    <div className="flex items-center gap-6">
                      <Link
                        href="/cart"
                        className="relative p-3 bg-gray-50 rounded-2xl text-gray-900"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <ShoppingCart className="w-6 h-6" />
                        <ClientOnly>
                          <span className="absolute top-2 right-2 w-5 h-5 bg-primary text-white text-[10px] font-black rounded-full flex items-center justify-center border-2 border-white translate-x-1 -translate-y-1">{cartCount}</span>
                        </ClientOnly>
                      </Link>
                      <UserButton
                        appearance={{
                          elements: {
                            userButtonAvatarBox: "w-12 h-12 border-2 border-gray-100 ring-4 ring-gray-50",
                          }
                        }}
                      />
                    </div>
                    <Link
                      href="/dashboard/projects"
                      onClick={() => setMobileMenuOpen(false)}
                      className="w-full h-14 bg-primary rounded-2xl text-[12px] font-black uppercase tracking-[0.2em] text-white shadow-xl shadow-primary/20 flex items-center justify-center gap-3"
                    >
                      My Projects
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Search Modal */}
      {searchModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[10vh] px-6">
          <div
            className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm animate-in fade-in duration-300"
            onClick={() => setSearchModalOpen(false)}
          />
          <div className="relative w-full max-w-2xl bg-white rounded-[2rem] shadow-2xl border border-gray-100 p-8 animate-in zoom-in-95 slide-in-from-top-10 duration-300">
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-primary p-2 rounded-xl">
                <Search className="w-6 h-6 text-white" />
              </div>
              <input
                autoFocus
                type="text"
                placeholder="Search MPN # or by Keyword"
                className="w-full text-2xl font-bold text-gray-900 placeholder:text-gray-300 outline-none"
              />
              <button
                onClick={() => setSearchModalOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-6 h-6 text-gray-400" />
              </button>
            </div>
            <div className="pt-4 border-t border-gray-50">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Quick Links</p>
              <div className="flex flex-wrap gap-2">
                {['FR4 High TG', 'ENIG Finish', 'Assembly', 'MCU Samples', 'IoT Boards'].map((tag) => (
                  <button key={tag} className="px-4 py-2 bg-gray-50 hover:bg-gray-100 rounded-lg text-sm font-medium text-gray-600 transition-colors">
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Auth Modal Popup */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        initialMode={authMode}
      />
    </>
  )
}

export default Header
