"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Upload, ChevronRight, CheckCircle2 } from "lucide-react";
import { useState, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import LoadingOverlay from "./LoadingOverlay";

interface NewProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function NewProjectModal({ isOpen, onClose }: NewProjectModalProps) {
  const [projectName, setProjectName] = useState("");
  const [description, setDescription] = useState("");
  const [layers, setLayers] = useState("2");
  const [file, setFile] = useState<File | null>(null);
  const [loadingState, setLoadingState] = useState<"idle" | "uploading" | "quotation">("idle");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const handleProceed = async () => {
    setLoadingState("uploading");
    
    // Simulate uploading Gerber
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setLoadingState("quotation");
    
    // Simulate getting quotation
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Redirect to quotation page
    router.push("/dashboard/projects/214091/quotation");
    onClose();
    setLoadingState("idle");
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.target) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-gray-900/40 backdrop-blur-md"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative bg-white rounded-[2.5rem] shadow-2xl w-full max-w-[900px] overflow-hidden flex flex-col md:flex-row"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2 rounded-full hover:bg-gray-100 transition-colors text-gray-400 hover:text-gray-900 z-10"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Left Side: Form */}
          <div className="flex-1 p-10 md:p-12">
            <h2 className="text-2xl font-black text-gray-900 mb-8">New Project</h2>
            
            <div className="space-y-6">
              <div className="space-y-2">
                <input
                  type="text"
                  placeholder="Project Name *"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  className="w-full h-12 px-6 bg-white border-2 border-gray-100 rounded-2xl focus:border-orange-200 outline-none transition-colors font-medium text-sm"
                />
              </div>

              <div className="space-y-2">
                <input
                  type="text"
                  placeholder="Description(Optional)"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full h-12 px-6 bg-white border-2 border-gray-100 rounded-2xl focus:border-orange-200 outline-none transition-colors font-medium text-sm"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-[11px] font-black text-gray-400 uppercase tracking-widest ml-2">Layers</label>
                <div className="relative">
                  <select
                    value={layers}
                    onChange={(e) => setLayers(e.target.value)}
                    className="w-full h-12 px-6 bg-white border-2 border-gray-100 rounded-2xl focus:border-orange-200 outline-none transition-colors font-bold text-sm appearance-none cursor-pointer"
                  >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="4">4</option>
                    <option value="6">6</option>
                    <option value="8">8</option>
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                    <ChevronRight className="w-4 h-4 text-gray-400 rotate-90" />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-[11px] font-black text-gray-400 uppercase tracking-widest ml-2">Gerber File Upload *</label>
                <div
                  onDragOver={onDragOver}
                  onDrop={onDrop}
                  className={`relative group border-2 border-dashed rounded-2xl p-8 flex flex-col items-center justify-center gap-3 transition-all ${
                    file ? "border-orange-100 bg-orange-50/10" : "border-gray-200 hover:border-orange-200 hover:bg-orange-50/30 cursor-pointer"
                  }`}
                  onClick={() => !file && fileInputRef.current?.click()}
                >
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    className="hidden"
                    accept=".zip,.rar,.7z"
                  />
                  
                  {file ? (
                    <div className="flex flex-col items-center gap-4 w-full">
                      <div className="flex items-center gap-4 w-full max-w-[280px]">
                        <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400">
                          <Image src="/file-zip.svg" alt="ZIP" width={24} height={24} className="opacity-40" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-bold text-gray-900 truncate">{file.name}</p>
                          <div className="h-1 bg-gray-100 rounded-full mt-2 overflow-hidden">
                            <motion.div 
                              initial={{ width: 0 }}
                              animate={{ width: "100%" }}
                              className="h-full bg-green-500" 
                            />
                          </div>
                        </div>
                        <CheckCircle2 className="w-5 h-5 text-green-500" />
                      </div>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          setFile(null);
                        }}
                        className="text-[11px] font-black uppercase tracking-widest text-orange-500 hover:text-orange-600 transition-colors"
                      >
                        Change File
                      </button>
                    </div>
                  ) : (
                    <>
                      <p className="text-[13px] font-bold text-gray-400 group-hover:text-gray-500 transition-colors">
                        Choose From Files / Drag And Drop
                      </p>
                      <div className="flex items-center gap-2 px-5 py-2 bg-white border-2 border-gray-100 rounded-full text-[11px] font-black uppercase tracking-widest text-gray-600 group-hover:border-orange-100 group-hover:text-orange-500 transition-all shadow-sm">
                        Choose From Files
                        <Upload className="w-3.5 h-3.5" />
                      </div>
                    </>
                  )}
                </div>
              </div>

              <button
                onClick={handleProceed}
                disabled={!projectName || !file || loadingState !== "idle"}
                className={`w-full mt-4 h-12 bg-[#ff6b00] rounded-full text-[11px] font-black uppercase tracking-[0.2em] text-white shadow-xl shadow-orange-500/20 flex items-center justify-center gap-3 transition-all active:scale-95 ${
                  !projectName || !file || loadingState !== "idle" ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-900 hover:scale-[1.02]"
                }`}
              >
                Proceed
                <div className="w-6 h-6 bg-white/10 rounded-full flex items-center justify-center group-hover:translate-x-1 transition-transform">
                  <ChevronRight className="w-4 h-4" />
                </div>
              </button>
            </div>
          </div>

          {/* Right Side: Info */}
          <div className="w-full md:w-[380px] bg-gray-50/50 p-10 md:p-12 border-l border-gray-100 flex flex-col relative overflow-hidden">
            <div className="space-y-8 relative z-10">
              <div>
                <h3 className="text-sm font-black text-gray-900 uppercase tracking-widest mb-4">Gerber File Checklist:</h3>
                <ul className="space-y-2">
                  {[
                    "Board Outline",
                    "Drill",
                    "Inner Copper",
                    "Copper Layer (Top and Bottom)",
                    "Silk Screen (Top and Bottom)",
                    "Solder Mask (Top and Bottom)",
                    "Solder Paste (Top and Bottom)"
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-3 text-[13px] font-bold text-gray-500">
                      <div className="w-1.5 h-1.5 rounded-full bg-gray-300" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-sm font-black text-gray-900 uppercase tracking-widest mb-4">Export Gerber Files From Your Favourite CAD Tool:</h3>
                <ul className="space-y-2">
                  {[
                    "AutoDesk Eagle \u2264 v8.5.2 \u2265 v8.6.0",
                    "KiCad",
                    "Altium",
                    "Allegro/OrCAD",
                    "Proteus",
                    "DipTrace"
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-3 text-[13px] font-bold text-gray-500">
                      <div className="w-1.5 h-1.5 rounded-full bg-gray-300" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Decorative PCB Image */}
            <div className="absolute -bottom-4 -right-4 w-48 h-48 opacity-20 pointer-events-none transform rotate-12">
              <Image
                src="https://images.unsplash.com/photo-1555664424-778a1e5e1b48?q=80&w=2070&auto=format&fit=crop"
                alt="PCB"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {loadingState === "uploading" && (
          <LoadingOverlay message="Uploading Gerber ...." key="uploading" />
        )}
        {loadingState === "quotation" && (
          <LoadingOverlay message="Getting Quotation...." key="quotation" />
        )}
      </AnimatePresence>
    </>
  );
}
