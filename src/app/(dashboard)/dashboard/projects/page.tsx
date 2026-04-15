"use client";

import { useUser, useAuth } from "@clerk/nextjs";
import { Search, Filter, Plus, ArrowRight, Cpu, Settings, PackageOpen } from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";
import NewProjectModal from "@/components/dashboard/NewProjectModal";
import { AnimatePresence } from "framer-motion";

export default function ProjectsPage() {
  const { user } = useUser();
  const { isLoaded, userId, getToken } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!isLoaded || !userId) return;
      try {
        const token = await getToken();
        const res = await fetch("/api/orders", {
          headers: token ? { Authorization: `Bearer ${token}` } : undefined,
        });
        const json = await res.json();
        if (json.success) {
          setOrders(json.data || []);
        }
      } catch (e) {
        console.error("Failed to load orders", e);
      }
    };
    fetchOrders();
  }, [isLoaded, userId, getToken]);

  const statusCards = [
    {
      title: "Fabrication",
      icon: <Settings className="w-8 h-8 text-orange-500" />,
      ordered: "0/1",
      inProgress: "0/1",
    },
    {
      title: "Assembly",
      icon: <Cpu className="w-8 h-8 text-orange-500" />,
      ordered: "0/0",
      inProgress: "0/0",
    },
    {
      title: "Procurement",
      icon: <PackageOpen className="w-8 h-8 text-orange-500" />,
      ordered: `0/${orders.length}`,
      inProgress: `${orders.filter(o => o.status !== 'completed' && o.status !== 'cancelled').length}/${orders.length}`,
    }
  ];

  const recentProjects = orders.map((o) => {
    const totalUnits = Array.isArray(o.items) 
      ? o.items.reduce((acc: number, item: any) => acc + (item.quantity || 0), 0) 
      : 0;
    
    return {
      id: o.id,
      name: o.projectName || "Component Order",
      pid: o.id,
      fabStatus: "N/A",
      asmStatus: "N/A",
      procStatus: String(o.status || "Processing").replace('_', ' ').toUpperCase(),
      units: totalUnits,
      date: o.createdAt ? new Date(o.createdAt).toLocaleDateString() : "Pending",
    };
  });

  return (
    <div className="p-8 max-w-7xl mx-auto animate-in fade-in duration-500">
      
      {/* Personalized Greeting */}
      <div className="mb-10">
        <h1 className="text-4xl font-black text-gray-900 tracking-tight mb-2">
          Welcome, {user?.firstName || "User"}
        </h1>
        <p className="text-gray-500 font-medium tracking-wide">We've got it all organised for you!</p>
      </div>

      {/* Status Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {statusCards.map((card, idx) => (
          <div key={idx} className="bg-white rounded-3xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100/50 flex flex-col hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-orange-50 rounded-2xl flex items-center justify-center">
                {card.icon}
              </div>
              <h2 className="text-xl font-bold text-gray-900">{card.title}</h2>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 rounded-xl border border-gray-100 hover:border-gray-200 transition-colors group cursor-pointer">
                <div>
                  <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1">Ordered</p>
                  <p className="text-lg font-black text-gray-800"><span className="text-orange-500">{card.ordered.split('/')[0]}</span>/{card.ordered.split('/')[1]} <span className="text-sm font-semibold text-gray-400">Projects</span></p>
                </div>
                <div className="w-8 h-8 bg-gray-50 rounded-full flex items-center justify-center text-gray-400 group-hover:bg-orange-50 group-hover:text-orange-500 transition-colors">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
              
              <div className="flex items-center justify-between p-3 rounded-xl border border-gray-100 hover:border-gray-200 transition-colors group cursor-pointer">
                <div>
                  <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1">In Progress</p>
                  <p className="text-lg font-black text-gray-800"><span className="text-orange-500">{card.inProgress.split('/')[0]}</span>/{card.inProgress.split('/')[1]} <span className="text-sm font-semibold text-gray-400">Projects</span></p>
                </div>
                <div className="w-8 h-8 bg-gray-50 rounded-full flex items-center justify-center text-gray-400 group-hover:bg-orange-50 group-hover:text-orange-500 transition-colors">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Projects Table Section */}
      <div className="bg-white rounded-[2rem] shadow-xl shadow-gray-200/40 p-1">
        
        {/* Tab Selection */}
        <div className="flex p-4 pb-0 border-b border-gray-100">
          <div className="px-6 py-3 bg-orange-50/50 border-t-2 border-l-2 border-r-2 border-[#ff6b00]/20 rounded-t-2xl">
            <span className="text-sm font-bold text-gray-900 tracking-tight">All Projects</span>
          </div>
        </div>

        {/* Toolbar */}
        <div className="p-6 pb-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-1 items-center gap-4 w-full">
            <div className="relative flex-1 max-w-sm">
              <input 
                type="text" 
                placeholder='Search by "Name" or "PID"' 
                className="w-full h-11 pl-11 pr-4 bg-white border-2 border-gray-100 rounded-full text-sm font-medium focus:border-orange-200 focus:outline-none transition-colors placeholder:text-gray-400"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>
            <div className="relative">
              <button className="h-11 px-5 bg-white border-2 border-gray-100 rounded-full text-sm font-bold text-gray-600 flex items-center gap-2 hover:bg-gray-50 transition-colors">
                <Filter className="w-4 h-4 text-[#ff6b00]" />
                Filter By
              </button>
            </div>
          </div>

          <div className="flex items-center gap-4 w-full md:w-auto">
            <button className="h-11 px-6 bg-white border-2 border-gray-100 rounded-full text-sm font-bold text-gray-700 hover:bg-gray-50 transition-colors hidden md:block">
              Select Projects
            </button>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="h-11 px-6 bg-[#ff6b00] rounded-full text-[13px] font-black uppercase tracking-widest text-white shadow-lg shadow-orange-500/30 hover:bg-gray-900 transition-all active:scale-95 flex items-center gap-2 group cursor-pointer w-full md:w-auto justify-center"
            >
              <Plus className="w-4 h-4 text-white/70" />
              New Project
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto p-6 pt-0">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="border-b-2 border-gray-100">
                <th className="py-4 px-4 text-[11px] font-black text-gray-400 uppercase tracking-widest bg-gray-50/50 rounded-l-xl">Project Name</th>
                <th className="py-4 px-4 text-[11px] font-black text-gray-400 uppercase tracking-widest bg-gray-50/50">PID</th>
                <th className="py-4 px-4 text-[11px] font-black text-gray-400 uppercase tracking-widest bg-gray-50/50">Fabrication Status</th>
                <th className="py-4 px-4 text-[11px] font-black text-gray-400 uppercase tracking-widest bg-gray-50/50">Assembly Status</th>
                <th className="py-4 px-4 text-[11px] font-black text-gray-400 uppercase tracking-widest bg-gray-50/50">Procurement Status</th>
                <th className="py-4 px-4 text-[11px] font-black text-gray-400 uppercase tracking-widest bg-gray-50/50 text-center">Units</th>
                <th className="py-4 px-4 text-[11px] font-black text-gray-400 uppercase tracking-widest bg-gray-50/50 rounded-r-xl">Date</th>
              </tr>
            </thead>
            <tbody>
              {recentProjects.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center font-bold text-gray-400 uppercase tracking-widest">
                    No orders or projects found
                  </td>
                </tr>
              ) : (
                recentProjects.map((project, idx) => (
                  <tr key={project.id} className="border-b border-gray-50 hover:bg-orange-50/30 transition-colors group">
                    <td className="py-5 px-4">
                      <div className="flex items-center gap-3">
                        <span className="text-gray-400 font-bold text-sm w-4">{idx + 1}</span>
                        <span className="font-bold text-gray-900">{project.name}</span>
                      </div>
                    </td>
                    <td className="py-5 px-4 font-semibold text-gray-600">{project.pid}</td>
                    <td className="py-5 px-4"><span className="px-3 py-1.5 bg-gray-100 text-gray-600 rounded-lg text-xs font-bold">{project.fabStatus}</span></td>
                    <td className="py-5 px-4"><span className="px-3 py-1.5 bg-gray-100 text-gray-600 rounded-lg text-xs font-bold">{project.asmStatus}</span></td>
                    <td className="py-5 px-4"><span className="px-3 py-1.5 bg-green-50 text-green-700 rounded-lg text-xs font-bold">{project.procStatus}</span></td>
                    <td className="py-5 px-4 text-center font-bold text-gray-900">{project.units}</td>
                    <td className="py-5 px-4 font-semibold text-gray-400">{project.date}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
          
          {/* Pagination Footer */}
          <div className="flex justify-end p-4 border-t border-gray-50 mt-4 text-sm font-semibold text-gray-500 gap-6">
            <span className="cursor-pointer hover:text-gray-800 transition-colors">Rows per page: 5 ▼</span>
            <span>1-1 of 1</span>
            <div className="flex gap-4">
              <span className="cursor-not-allowed opacity-50">&lt;</span>
              <span className="cursor-not-allowed opacity-50">&gt;</span>
            </div>
          </div>
        </div>

      </div>

      <AnimatePresence>
        {isModalOpen && (
          <NewProjectModal 
            isOpen={isModalOpen} 
            onClose={() => setIsModalOpen(false)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
}
