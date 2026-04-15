import Link from 'next/link';
import { ChevronRight, Cpu } from 'lucide-react';

export default function PartsDirectoryPage() {
  // Generate 16 Parts Directory instances based on the reference layout
  const partsDirectories = Array.from({ length: 16 }, (_, i) => `Parts Dir ${i + 1}`);

  return (
    <div className="min-h-screen bg-gray-50/50 pt-28 pb-32 relative overflow-hidden">
      {/* Decorative Orbs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-200/20 rounded-full blur-[100px] opacity-60 translate-x-1/3 -translate-y-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-orange-300/10 rounded-full blur-[100px] opacity-60 -translate-x-1/3 translate-y-1/3 pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 max-w-7xl relative z-10">
        
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-[13px] font-bold text-gray-500 mb-10 max-w-4xl mx-auto">
          <Link href="/" className="hover:text-[#ff6b00] transition-colors">Home</Link>
          <ChevronRight className="w-4 h-4 text-gray-400" />
          <span className="text-gray-900">Parts Directory</span>
        </div>

        <div className="max-w-4xl mx-auto bg-white rounded-[2rem] shadow-[0_8px_40px_rgb(0,0,0,0.06)] border border-gray-100 p-10 md:p-16 animate-in fade-in slide-in-from-bottom-8 duration-700">
          
          <div className="flex items-center gap-5 mb-12 pb-8 border-b border-gray-100">
            <div className="w-16 h-16 rounded-2xl bg-orange-50 flex items-center justify-center shrink-0 border border-orange-100">
              <Cpu className="w-8 h-8 text-[#ff6b00]" />
            </div>
            <div>
              <h1 className="text-5xl md:text-6xl font-normal text-gray-900 tracking-tight" style={{ fontFamily: "Inter, sans-serif" }}>
                Parts Directory
              </h1>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-4 gap-x-8">
            {partsDirectories.map((dir, idx) => (
              <div key={idx} className="flex items-center">
                <Link 
                  href={`#${dir.toLowerCase().replace(/ /g, '-')}`} 
                  className="text-[16px] font-medium text-gray-600 hover:text-[#ff6b00] hover:underline underline-offset-4 decoration-orange-200 transition-all"
                >
                  {dir}
                </Link>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}
