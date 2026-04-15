import React from 'react'
import { ShieldCheck } from 'lucide-react'

const Logo = () => {
  return (
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-orange-900/20">
        <ShieldCheck className="w-6 h-6 text-white" />
      </div>
      <span className="text-xl font-black tracking-tight text-white uppercase tracking-[0.1em]">
        PCB <span className="text-primary italic">GLOBE</span> <span className="text-xs font-medium text-gray-500 ml-2 tracking-widest border-l border-gray-800 pl-2">PRO</span>
      </span>
    </div>
  )
}

export default Logo
