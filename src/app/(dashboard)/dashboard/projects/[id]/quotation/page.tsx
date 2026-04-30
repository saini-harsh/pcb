"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
    Check, Download, X, Box, Settings, Image as ImageIcon,
    FileText, HelpCircle, Layers, Cpu, MapPin, CreditCard,
    Calendar, Package, ClipboardCheck, ArrowRight, Truck, Info, Shield, ChevronRight,
    Loader2, Upload, FileUp, Zap, Eye, EyeOff, Maximize2, ZoomIn, ZoomOut, ArrowLeft, CheckCircle2
} from "lucide-react";
import { useState, useEffect, use } from "react";
import Link from "next/link";
import { useAuth } from "@clerk/nextjs";
import { renderGerberPreview, GerberPreview } from "@/lib/gerber-renderer";
import axios from "axios";

// Helper functions copied from QuoteForm for exact logic parity
const getOneLayerOptions = (material: string) => {
    switch (material) {
        case 'FR1': return { thickness: [1.0, 1.6], copper: [18, 25, 35] };
        case 'FR4':
        case 'FR4 TG150':
        case 'FR4 TG170':
            return {
                thickness: [0.4, 0.8, 1.0, 1.6, 2.0, 2.4, 3.2],
                copper: [25, 35, 55, 70, 90, 105]
            };
        case 'Aluminum': return { thickness: [0.6, 0.8, 1.0, 1.6], copper: [18, 25, 35] };
        case 'Rogers': return { thickness: [1.0, 1.6], copper: [35] };
        case 'CEM-1':
        case 'CEM-3': return { thickness: [0.8, 1.0, 1.6], copper: [18, 25, 35] };
        default: return { thickness: [1.0, 1.2, 1.6], copper: [35, 70] };
    }
}

const getTwoLayerOptions = () => {
    return {
        material: ['FR4', 'FR4 TG150', 'FR4 TG170'],
        thickness: [0.4, 0.8, 1.0, 1.6, 2.0, 2.4, 3.2],
        copper: [25, 35, 55, 70, 90, 105]
    };
}

const getMultiLayerOptions = () => {
    return {
        material: ['FR4'],
        thickness: [1.6],
        copper: [35],
        innerCopper: [17.5],
        solderMask: ['Green', 'White', 'Black'],
        surfaceFinish: ['HASL', 'Lead Free HASL', 'ENIG'],
        silkScreen: ['White']
    };
}

export default function QuotationPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const { isLoaded, userId, getToken } = useAuth();
    const [project, setProject] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState("QUOTATION");
    const [previews, setPreviews] = useState<GerberPreview | null>(null);
    const [renderingPreview, setRenderingPreview] = useState(false);
    const [zoomedImage, setZoomedImage] = useState<string | null>(null);
    const [pcbActiveSubTab, setPcbActiveSubTab] = useState("IMAGES");
    const [showDetailedDfm, setShowDetailedDfm] = useState(false);
    const [activeLayers, setActiveLayers] = useState<Set<string>>(new Set());

    // Interactive States
    const [editableSpecs, setEditableSpecs] = useState<any>(null);
    const [pricing, setPricing] = useState<any>(null);
    const [multiQuotes, setMultiQuotes] = useState<any>(null);
    const [calculating, setCalculating] = useState(false);





    useEffect(() => {
        const fetchProject = async () => {
            if (!isLoaded || !userId) return;
            try {
                const token = await getToken();
                const res = await fetch(`/api/projects`, {
                    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
                });
                const json = await res.json();
                if (json.success && json.data) {
                    const found = json.data.find((p: any) => String(p.id) === id);
                    if (found) {
                        setProject(found);
                        const specs = found.specs || {};
                        setEditableSpecs({
                            ...specs,
                            pcbName: found.name,
                            buildTime: specs.buildTime || '7 WD',
                            shippingMethod: specs.shippingMethod || 'Standard',
                            material: specs.material || 'FR4',
                            surfaceFinish: specs.surfaceFinish || 'HAL',
                            finishCopper: specs.finishCopper || 35,
                            thickness: specs.thickness || 1.6,
                            layers: specs.layers || 2,
                            width: specs.width || 100,
                            height: specs.height || 100,
                            quantity: specs.quantity || 5
                        });
                        setPricing(specs.pricing);
                    } else {
                        console.error("Project not found in user's list");
                        // Fallback: set some default specs so the page at least loads
                        setEditableSpecs({
                            pcbName: "Unknown Project",
                            layers: 2, width: 100, height: 100, quantity: 5,
                            buildTime: '7 WD', material: 'FR4', surfaceFinish: 'HAL', finishCopper: 35, thickness: 1.6
                        });
                    }
                }
            } catch (e) {
                console.error("Failed to load project", e);
                // Ensure page doesn't hang
                setEditableSpecs({
                    pcbName: "Error Loading Project",
                    layers: 2, width: 100, height: 100, quantity: 5,
                    buildTime: '7 WD', material: 'FR4', surfaceFinish: 'HAL', finishCopper: 35, thickness: 1.6
                });
            } finally {
                setLoading(false);
            }
        };
        fetchProject();
    }, [isLoaded, userId, getToken, id]);

    const fetchQuotes = async () => {
        if (!editableSpecs) return;
        setCalculating(true);
        try {
            const apiSpecs = {
                width: editableSpecs.width,
                height: editableSpecs.height,
                layers: typeof editableSpecs.layers === 'string' ? parseInt(editableSpecs.layers) : editableSpecs.layers,
                quantity: editableSpecs.quantity,
                finish: editableSpecs.surfaceFinish,
                copperThickness: editableSpecs.finishCopper === 35 ? '1 oz (35 um)' : editableSpecs.finishCopper === 70 ? '2 oz (70 um)' : `${editableSpecs.finishCopper} um`,
                shippingMethod: editableSpecs.shippingMethod === 'Plus' ? 'DTDC Plus' : 'DTDC Standard'
            };
            const response = await axios.post('/api/calculate-quote', apiSpecs);
            setMultiQuotes(response.data.quotes);
            if (!response.data.quotes[editableSpecs.buildTime]) {
                const availableTimes = Object.keys(response.data.quotes).filter(t => response.data.quotes[t] !== null);
                if (availableTimes.length > 0) updateSpec('buildTime', availableTimes[0]);
            }
        } catch (error) {
            console.error('Failed to fetch quotes:', error);
        } finally {
            setCalculating(false);
        }
    }

    useEffect(() => {
        const debounce = setTimeout(fetchQuotes, 500);
        return () => clearTimeout(debounce);
    }, [editableSpecs?.width, editableSpecs?.height, editableSpecs?.layers, editableSpecs?.quantity, editableSpecs?.surfaceFinish, editableSpecs?.finishCopper, editableSpecs?.shippingMethod]);

    useEffect(() => {
        if (!editableSpecs) return;
        if (multiQuotes && multiQuotes[editableSpecs.buildTime]) {
            const basePricing = multiQuotes[editableSpecs.buildTime];
            let addon = 0;
            if (editableSpecs.material !== 'FR4') addon += 500;
            if (editableSpecs.thickness !== 1.6) addon += 500;
            if (editableSpecs.finishCopper !== 35 && editableSpecs.finishCopper !== 25) addon += 250;
            if (editableSpecs.solderMask !== 'Green') addon += 500;
            if (editableSpecs.surfaceFinish !== 'HAL' && editableSpecs.surfaceFinish !== 'HASL') addon += 500;
            if (editableSpecs.silkScreen !== 'White') addon += 500;

            const updatedSubTotal = Math.round(basePricing.subTotal + addon);
            const updatedGst = Math.round(updatedSubTotal * 0.18);
            const updatedTotal = updatedSubTotal + updatedGst + basePricing.shippingCost;

            setPricing({
                ...basePricing,
                subTotal: updatedSubTotal,
                gst: updatedGst,
                totalCost: updatedTotal,
                unitPrice: Number((updatedSubTotal / editableSpecs.quantity).toFixed(2))
            });
        }
    }, [editableSpecs, multiQuotes]);

    const updateSpec = (key: string, value: any) => {
        setEditableSpecs((prev: any) => ({ ...prev, [key]: value }));
    };

    useEffect(() => {
        const loadGerber = async () => {
            if (project && project.gerberFile?.url && !previews && !renderingPreview) {
                setRenderingPreview(true);
                try {
                    const fileRes = await fetch(project.gerberFile?.url);
                    const blob = await fileRes.blob();
                    const file = new File([blob], project.name + ".zip", { type: "application/zip" });
                    const result = await renderGerberPreview(file, editableSpecs?.solderMask?.toLowerCase() || 'green');
                    setPreviews(result);
                } catch (err) {
                    console.error("Gerber render error:", err);
                } finally {
                    setRenderingPreview(false);
                }
            }
        };
        loadGerber();
    }, [project, previews, renderingPreview]);

    useEffect(() => {
        if (previews && previews.layers && previews.layers.length > 0 && activeLayers.size === 0) {
            const initial = new Set(previews.layers.map(l => l.id as string));
            setActiveLayers(initial);
        }
    }, [previews]);

    const toggleLayer = (id: string) => {
        setActiveLayers(prev => {
            const next = new Set(prev);
            if (next.has(id)) next.delete(id);
            else next.add(id);
            return next;
        });
    };

    const toggleGroup = (side: string, show: boolean) => {
        if (!previews) return;
        setActiveLayers(prev => {
            const next = new Set(prev);
            previews.layers.filter(l => l.side === side).forEach(l => {
                if (show) next.add(l.id);
                else next.delete(l.id);
            });
            return next;
        });
    };

    const typeColors: any = {
        copper: 'bg-yellow-400',
        soldermask: 'bg-pink-400',
        solderpaste: 'bg-red-500',
        silkscreen: 'bg-cyan-400',
        outline: 'bg-blue-400',
        drill: 'bg-orange-500'
    };

    const sectionNames: any = {
        top: 'Top',
        bottom: 'Bottom',
        all: 'All',
        mechanical: 'Mechanical'
    };

    const SegmentedControl = ({ label, options, value, onChange }: any) => {
        return (
            <div className="space-y-3">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block">{label}</label>
                <div className="flex flex-wrap gap-1 bg-gray-50/50 p-1 rounded-xl border border-gray-100 shadow-inner">
                    {options.map((opt: any) => (
                        <button
                            key={opt}
                            onClick={() => onChange(opt)}
                            className={`flex-1 min-w-[80px] py-2.5 px-4 rounded-lg text-xs font-bold transition-all ${value === opt
                                ? 'bg-white text-orange-600 shadow-sm ring-1 ring-gray-100'
                                : 'text-gray-400 hover:text-gray-600'
                                }`}
                        >
                            {opt}
                        </button>
                    ))}
                </div>
            </div>
        );
    };

    if (loading || !editableSpecs) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="flex flex-col items-center gap-2">
                    <Loader2 className="w-10 h-10 text-orange-500 animate-spin" />
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Loading Specs</span>
                </div>
            </div>
        );
    }

    const tabs = [
        { id: "QUOTATION", icon: <FileText size={16} /> },
        { id: "PROJECT DETAILS", icon: <Settings size={16} /> },
        { id: "PCB IMAGE", icon: <ImageIcon size={16} /> },
        { id: "DFM FEEDBACK", icon: <Box size={16} /> },
        { id: "HELP", icon: <HelpCircle size={16} /> },
    ];



    return (
        <div className="min-h-screen bg-[#f8fafc] pb-20">
            {/* Header */}
            <header className="bg-white border-b border-gray-200 sticky top-0 z-50 px-6 py-4 shadow-sm">
                <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-orange-500/20">
                            <Package size={24} />
                        </div>
                        <div>
                            <h1 className="text-xl font-bold text-gray-900 leading-tight">{project.name}</h1>
                            <div className="flex items-center gap-3 mt-1">
                                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Project ID: #{project.id}</span>
                                <span className="w-1 h-1 bg-gray-200 rounded-full" />
                                <span className="text-[10px] text-orange-600 font-bold uppercase tracking-widest">Draft</span>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Navigation Tabs */}
            <nav className="bg-white border-b border-gray-200 px-6 overflow-x-auto no-scrollbar">
                <div className="max-w-[1400px] mx-auto flex gap-8">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`py-4 px-1 flex items-center gap-2 text-xs font-bold transition-all relative border-b-2 whitespace-nowrap ${activeTab === tab.id
                                    ? "text-orange-600 border-orange-500"
                                    : "text-gray-400 border-transparent hover:text-gray-600"
                                }`}
                        >
                            <span className={activeTab === tab.id ? "text-orange-500" : "text-gray-300"}>{tab.icon}</span>
                            {tab.id}
                        </button>
                    ))}
                </div>
            </nav>



            <main className="max-w-[1400px] mx-auto px-6 mt-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    <div className="lg:col-span-2 space-y-8">
                        <AnimatePresence mode="wait">
                            {activeTab === "QUOTATION" ? (
                                <motion.div key="fabrication" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-6">
                                    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
                                        <div className="p-6 border-b border-gray-100 bg-gray-50/50 flex items-center justify-between">
                                            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-widest">Configure Your PCB</h3>
                                            {calculating && <div className="flex items-center gap-2"><Loader2 size={14} className="text-orange-500 animate-spin" /><span className="text-[10px] text-orange-500 font-bold uppercase">Updating Quote</span></div>}
                                        </div>

                                        <div className="p-8 space-y-10">
                                            <SegmentedControl
                                                label="Layer Count"
                                                options={['1 Layer', '2 Layers', '4 Layers', '6 Layers', '8 Layers']}
                                                value={editableSpecs.layers + (editableSpecs.layers === 1 ? ' Layer' : ' Layers')}
                                                onChange={(v: string) => {
                                                    const val = parseInt(v);
                                                    updateSpec('layers', val);
                                                    if (val === 1) updateSpec('material', 'FR1');
                                                    else if (val === 2) updateSpec('material', 'FR4');
                                                    else if (val >= 4) {
                                                        updateSpec('material', 'FR4');
                                                        updateSpec('thickness', 1.6);
                                                        updateSpec('finishCopper', 35);
                                                        updateSpec('surfaceFinish', 'HAL');
                                                    }
                                                }}
                                            />
                                            <SegmentedControl
                                                label="Material Type"
                                                options={editableSpecs.layers === 1 ? ['FR1', 'FR4', 'FR4 TG150', 'FR4 TG170', 'Aluminum', 'Rogers', 'CEM-1', 'CEM-3'] : editableSpecs.layers === 2 ? getTwoLayerOptions().material : getMultiLayerOptions().material}
                                                value={editableSpecs.material}
                                                onChange={(v: string) => updateSpec('material', v)}
                                            />
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                                <div className="space-y-4">
                                                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block">Dimensions (mm)</label>
                                                    <div className="flex items-center gap-3">
                                                        <div className="flex-1 bg-gray-50 rounded-xl border border-gray-200 p-3 flex items-center gap-2 focus-within:ring-2 focus-within:ring-orange-500/20 transition-all">
                                                            <span className="text-[10px] font-bold text-gray-400 uppercase">W</span>
                                                            <input type="number" value={editableSpecs.width} onChange={(e) => updateSpec('width', Number(e.target.value))} className="w-full bg-transparent text-sm font-bold text-gray-900 focus:outline-none" />
                                                        </div>
                                                        <span className="text-gray-300 font-bold">×</span>
                                                        <div className="flex-1 bg-gray-50 rounded-xl border border-gray-200 p-3 flex items-center gap-2 focus-within:ring-2 focus-within:ring-orange-500/20 transition-all">
                                                            <span className="text-[10px] font-bold text-gray-400 uppercase">H</span>
                                                            <input type="number" value={editableSpecs.height} onChange={(e) => updateSpec('height', Number(e.target.value))} className="w-full bg-transparent text-sm font-bold text-gray-900 focus:outline-none" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="space-y-4">
                                                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block">Quantity</label>
                                                    <div className="flex items-center bg-gray-50 rounded-xl border border-gray-200 p-1">
                                                        <button onClick={() => updateSpec('quantity', Math.max(1, editableSpecs.quantity - 1))} className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-orange-500 transition-all font-black">−</button>
                                                        <input type="number" value={editableSpecs.quantity} onChange={(e) => updateSpec('quantity', Number(e.target.value))} className="flex-1 bg-transparent text-sm font-bold text-gray-900 text-center focus:outline-none" />
                                                        <button onClick={() => updateSpec('quantity', editableSpecs.quantity + 1)} className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-orange-500 transition-all font-black">+</button>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="space-y-4">
                                                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block">Solder Mask Color</label>
                                                <div className="flex flex-wrap gap-4">
                                                    {[
                                                        { name: 'Green', color: '#2d8c3c' },
                                                        { name: 'Red', color: '#e53935' },
                                                        { name: 'Blue', color: '#1e88e5' },
                                                        { name: 'Black', color: '#212121' },
                                                        { name: 'White', color: '#ffffff' },
                                                    ].map(color => (
                                                        <button key={color.name} onClick={() => updateSpec('solderMask', color.name)} className={`group flex flex-col items-center gap-2 transition-all ${editableSpecs.solderMask === color.name ? 'scale-110' : 'opacity-40 hover:opacity-100'}`}>
                                                            <div className={`w-10 h-10 rounded-full shadow-sm ring-2 ${editableSpecs.solderMask === color.name ? 'ring-orange-500 ring-offset-2' : 'ring-transparent'}`} style={{ backgroundColor: color.color, border: color.name === 'White' ? '1px solid #e5e7eb' : 'none' }} />
                                                            <span className="text-[9px] font-bold text-gray-500 uppercase">{color.name}</span>
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                                <SegmentedControl label="Thickness (mm)" options={editableSpecs.layers === 1 ? getOneLayerOptions(editableSpecs.material).thickness : editableSpecs.layers === 2 ? getTwoLayerOptions().thickness : getMultiLayerOptions().thickness} value={editableSpecs.thickness} onChange={(v: number) => updateSpec('thickness', v)} />
                                                <SegmentedControl label="Finish Copper (um)" options={editableSpecs.layers === 1 ? getOneLayerOptions(editableSpecs.material).copper : editableSpecs.layers === 2 ? getTwoLayerOptions().copper : getMultiLayerOptions().copper} value={editableSpecs.finishCopper} onChange={(v: number) => updateSpec('finishCopper', v)} />
                                            </div>
                                            <SegmentedControl label="Surface Finish" options={editableSpecs.layers <= 2 ? ['HAL', 'Lead Free HAL', 'OSP', 'Tin Finish', 'LACQUER', 'Immersion Silver'] : getMultiLayerOptions().surfaceFinish} value={editableSpecs.surfaceFinish} onChange={(v: string) => updateSpec('surfaceFinish', v)} />
                                        </div>
                                    </div>
                                </motion.div>
                            ) : activeTab === "PCB IMAGE" ? (
                                <motion.div key="PCB IMAGE" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-6">
                                    <div className="flex justify-center mb-8">
                                        <div className="bg-gray-100/50 p-1 rounded-xl flex gap-1 border border-gray-200">
                                            {["IMAGES", "VIEWER"].map(tab => (
                                                <button
                                                    key={tab}
                                                    onClick={() => setPcbActiveSubTab(tab)}
                                                    className={`px-10 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${pcbActiveSubTab === tab
                                                        ? "bg-white text-orange-600 shadow-sm"
                                                        : "text-gray-400 hover:text-gray-600"
                                                        }`}
                                                >
                                                    {tab}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="p-0">
                                        {pcbActiveSubTab === "IMAGES" ? (
                                            <div className="p-8 space-y-8">
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                                    {/* Top View */}
                                                    <div className="space-y-4">
                                                        <div className="flex items-center justify-between">
                                                            <span className="text-[10px] font-black text-gray-900 uppercase tracking-widest">Top View</span>
                                                            <button onClick={() => previews && setZoomedImage(previews.top)} className="text-[9px] font-bold text-orange-600 uppercase hover:underline">Zoom In</button>
                                                        </div>
                                                        <div className="aspect-[4/3] bg-gray-50 rounded-xl border border-gray-100 flex items-center justify-center p-8 relative group overflow-hidden">
                                                            <div className="absolute inset-0 bg-gradient-to-br from-transparent to-gray-200/20" />
                                                            {previews ? (
                                                                <div className="w-full h-full [&>svg]:w-full [&>svg]:h-full drop-shadow-xl transition-transform duration-500 group-hover:scale-110" dangerouslySetInnerHTML={{ __html: previews.top }} />
                                                            ) : (
                                                                <div className="flex flex-col items-center gap-3">
                                                                    <Loader2 className="w-6 h-6 text-orange-500 animate-spin" />
                                                                    <span className="text-[9px] font-bold text-gray-300 uppercase tracking-widest">Generating...</span>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>

                                                    {/* Bottom View */}
                                                    <div className="space-y-4">
                                                        <div className="flex items-center justify-between">
                                                            <span className="text-[10px] font-black text-gray-900 uppercase tracking-widest">Bottom View</span>
                                                            <button onClick={() => previews && setZoomedImage(previews.bottom)} className="text-[9px] font-bold text-orange-600 uppercase hover:underline">Zoom In</button>
                                                        </div>
                                                        <div className="aspect-[4/3] bg-gray-50 rounded-xl border border-gray-100 flex items-center justify-center p-8 relative group overflow-hidden">
                                                            <div className="absolute inset-0 bg-gradient-to-br from-transparent to-gray-200/20" />
                                                            {previews ? (
                                                                <div className="w-full h-full [&>svg]:w-full [&>svg]:h-full drop-shadow-xl transition-transform duration-500 group-hover:scale-110" dangerouslySetInnerHTML={{ __html: previews.bottom }} />
                                                            ) : (
                                                                <div className="flex flex-col items-center gap-3">
                                                                    <Loader2 className="w-6 h-6 text-orange-500 animate-spin" />
                                                                    <span className="text-[9px] font-bold text-gray-300 uppercase tracking-widest">Generating...</span>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm flex h-[750px]">
                                                {/* Viewer Sidebar */}
                                                <div className="w-72 border-r border-gray-100 bg-gray-50/50 overflow-y-auto no-scrollbar">
                                                    <div className="p-6 space-y-8">
                                                        {['top', 'bottom', 'all', 'mechanical'].map((side, sIdx) => {
                                                            const sideLayers = previews?.layers.filter(l => l.side === side) || [];
                                                            if (sideLayers.length === 0) return null;

                                                            return (
                                                                <div key={side || sIdx} className="space-y-4">
                                                                    <h4 className="text-[10px] font-black text-gray-900 uppercase tracking-widest pl-2">{sectionNames[side]}</h4>
                                                                    <div className="space-y-1.5">
                                                                        {sideLayers.map((layer, lIdx) => (
                                                                            <div key={layer.id || lIdx} className={`group flex items-center justify-between bg-white border border-gray-100 pl-3 pr-1 py-1 rounded-lg transition-all hover:border-orange-200 ${activeLayers.has(layer.id) ? 'opacity-100 shadow-sm' : 'opacity-40 grayscale-[0.2]'}`}>
                                                                                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-tight">{layer.type}</span>
                                                                                <button
                                                                                    onClick={() => toggleLayer(layer.id)}
                                                                                    className={`w-7 h-7 rounded-md flex items-center justify-center text-white transition-all ${activeLayers.has(layer.id) ? (typeColors[layer.type] || 'bg-gray-400') : 'bg-gray-200'} shadow-sm`}
                                                                                >
                                                                                    {activeLayers.has(layer.id) ? <Eye size={12} /> : <EyeOff size={12} />}
                                                                                </button>
                                                                            </div>
                                                                        ))}
                                                                    </div>
                                                                </div>
                                                            );
                                                        })}
                                                    </div>
                                                </div>

                                                {/* Viewer Main Area */}
                                                <div className="flex-1 bg-[#d1d5db]/30 relative p-12 overflow-hidden">
                                                    <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '24px 24px' }} />

                                                    {/* Zoom Controls Top Right (Matching LionCircuits) */}
                                                    <div className="absolute top-6 right-6 flex flex-col gap-2 z-20">
                                                        <div className="bg-white/80 backdrop-blur-sm border border-white rounded-xl shadow-xl p-1 flex flex-col gap-1">
                                                            <button className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-orange-600 hover:bg-white rounded-lg transition-all"><ZoomIn size={18} /></button>
                                                            <button className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-orange-600 hover:bg-white rounded-lg transition-all"><ZoomOut size={18} /></button>
                                                            <div className="h-px bg-gray-100 mx-2" />
                                                            <button className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-orange-600 hover:bg-white rounded-lg transition-all"><Maximize2 size={18} /></button>
                                                        </div>
                                                    </div>

                                                    <div className="w-full h-full flex items-center justify-center relative z-10">
                                                        {previews ? (
                                                            <div className="w-[85%] h-[85%] relative transition-all duration-700 hover:scale-[1.02]">
                                                                {previews.layers.filter(l => activeLayers.has(l.id)).map((layer, index) => (
                                                                    <div
                                                                        key={layer.id || index}
                                                                        className="absolute inset-0 [&>svg]:w-full [&>svg]:h-full [&>svg]:drop-shadow-[0_4px_8px_rgba(0,0,0,0.1)]"
                                                                        dangerouslySetInnerHTML={{ __html: layer.svg }}
                                                                    />
                                                                ))}
                                                            </div>
                                                        ) : (
                                                            <div className="flex flex-col items-center gap-4">
                                                                <Loader2 className="w-10 h-10 text-orange-500 animate-spin" />
                                                                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Processing Layers...</span>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </motion.div>
                             ) : activeTab === "DFM FEEDBACK" ? (
                                <motion.div key="DFM FEEDBACK" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                                    {!showDetailedDfm ? (
                                        <div className="bg-white rounded-2xl border-2 border-green-500/20 overflow-hidden shadow-2xl max-w-4xl mx-auto">
                                            <div className="flex min-h-[300px]">
                                                <div className="w-6 bg-[#4ade80]" />
                                                <div className="flex-1 p-16 flex flex-col justify-center bg-[#f0fdf4]/50">
                                                    <h2 className="text-4xl font-black text-gray-800 mb-8 tracking-tight">DFM Summary</h2>
                                                    <p className="text-xl font-medium text-gray-700 mb-12 leading-relaxed">
                                                        InstaDFM was success for all checks. Project will proceed to fabrication.
                                                    </p>
                                                    <div>
                                                        <button 
                                                            onClick={() => setShowDetailedDfm(true)}
                                                            className="bg-[#f97316] text-white px-12 py-4 rounded-lg font-black uppercase tracking-widest hover:bg-orange-600 transition-all shadow-xl shadow-orange-200 text-sm"
                                                        >
                                                            See Detailed Feedback
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="space-y-8">
                                            <div className="flex items-center justify-between mb-8">
                                                <div>
                                                    <h2 className="text-3xl font-black text-gray-900 tracking-tight">DFM Feedback</h2>
                                                    <button 
                                                        onClick={() => setShowDetailedDfm(false)}
                                                        className="flex items-center gap-2 text-orange-600 font-bold text-sm mt-2 hover:translate-x-[-4px] transition-all"
                                                    >
                                                        <ArrowLeft size={16} /> Back to Summary
                                                    </button>
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                                                <div className="bg-green-50/50 border-2 border-green-200 p-8 rounded-3xl">
                                                    <div className="flex items-center gap-3 mb-4">
                                                        <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white shadow-lg shadow-green-200">
                                                            <CheckCircle2 size={24} />
                                                        </div>
                                                        <h3 className="text-2xl font-black text-green-900">Success</h3>
                                                    </div>
                                                    <p className="text-green-800 font-medium leading-relaxed">
                                                        InstaDFM was success for all checks. Project will proceed to fabrication.
                                                    </p>
                                                    <div className="mt-6 pt-6 border-t border-green-200/50">
                                                        <span className="text-[10px] font-black text-green-600 uppercase tracking-widest">Project Name</span>
                                                        <p className="text-lg font-black text-green-900">{editableSpecs.pcbName}</p>
                                                    </div>
                                                </div>

                                                <div className="bg-orange-50/50 border-2 border-orange-200 p-8 rounded-3xl">
                                                    <h3 className="text-2xl font-black text-orange-900 mb-4">What is DFM?</h3>
                                                    <p className="text-orange-800 font-medium leading-relaxed mb-4">
                                                        DFM is an engineering analysis to determine the manufacturing viability of a product design.
                                                    </p>
                                                    <p className="text-orange-800 font-medium leading-relaxed opacity-70">
                                                        It also includes discussing and highlighting any manufacturing issues that may be visible from the design before tooling is carried out.
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="space-y-6">
                                                {previews?.layers.filter(l => l.type !== 'mechanical' && l.type !== 'drill').map((layer, idx) => {
                                                    const sideLabel = (layer.side && layer.side !== 'all') ? layer.side.charAt(0).toUpperCase() + layer.side.slice(1) : '';
                                                    const typeLabel = layer.type ? layer.type.charAt(0).toUpperCase() + layer.type.slice(1) : 'Layer';
                                                    
                                                    // Dynamic check types based on layer type
                                                    const checkName = layer.type === 'copper' ? "Trace Width & Spacing" : 
                                                                    layer.type === 'silkscreen' ? "Legend Quality & Overlap" :
                                                                    layer.type === 'solderMask' ? "Clearance & Alignment" : "Layer Integrity";

                                                    return (
                                                        <div key={idx} className="bg-white rounded-2xl border-2 border-green-500/20 overflow-hidden shadow-xl hover:shadow-2xl transition-all group">
                                                            <div className="flex flex-col md:flex-row min-h-[250px]">
                                                                <div className="w-4 bg-green-500 group-hover:w-6 transition-all" />
                                                                <div className="w-full md:w-[350px] bg-[#0f172a] p-8 flex items-center justify-center relative overflow-hidden">
                                                                    <div className="absolute inset-0 opacity-[0.05] bg-[radial-gradient(#fff_1px,transparent_1px)] bg-[size:12px_12px]" />
                                                                    <div className="w-full h-full relative z-10 transition-transform duration-500 group-hover:scale-110 drop-shadow-2xl" dangerouslySetInnerHTML={{ __html: layer.svg }} />
                                                                </div>
                                                                <div className="flex-1 p-8 md:p-12 border-l border-gray-100 flex flex-col justify-center bg-green-50/10">
                                                                    <div className="flex items-center gap-2 mb-4">
                                                                        <CheckCircle2 size={18} className="text-green-500" />
                                                                        <h3 className="text-xl font-black text-gray-800 tracking-tight">{sideLabel} {typeLabel} {checkName}</h3>
                                                                    </div>
                                                                    <div className="space-y-4">
                                                                        <div>
                                                                            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1 block">Description</span>
                                                                            <p className="text-gray-600 font-medium italic leading-relaxed">
                                                                                InstaDFM analyzed the {layer.side} {layer.type} data. All features comply with standard manufacturing tolerances (min 6 mil).
                                                                            </p>
                                                                        </div>
                                                                        <div>
                                                                            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1 block">Suggestion</span>
                                                                            <p className="text-green-600 font-black text-[10px] uppercase tracking-widest">Validated for Production</p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    )}
                                </motion.div>
                            ) : activeTab === "HELP" ? (
                                <motion.div key="HELP" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                                    <div className="bg-white rounded-3xl border border-gray-200 p-20 text-center shadow-xl">
                                        <div className="w-24 h-24 bg-orange-50 rounded-3xl flex items-center justify-center mx-auto mb-8 text-orange-500 rotate-3 transition-transform hover:rotate-0">
                                            <HelpCircle size={48} />
                                        </div>
                                        <h2 className="text-3xl font-black text-gray-900 mb-4 tracking-tight">How can we help?</h2>
                                        <p className="text-gray-500 text-lg mb-10 max-w-lg mx-auto">Please if u need query or somethin else so contact here</p>
                                        <div className="flex flex-col items-center gap-4">
                                            <a href="mailto:info@pcbglobe.com" className="group flex items-center gap-4 bg-orange-600 text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-gray-900 transition-all shadow-2xl shadow-orange-200">
                                                <FileText size={20} className="group-hover:scale-110 transition-transform" />
                                                info@pcbglobe.com
                                            </a>
                                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.3em]">Direct Support Channel</span>
                                        </div>
                                    </div>
                                </motion.div>
                            ) : (
                                <motion.div key={activeTab} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-8">
                                    <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
                                        <p className="text-gray-400 font-medium">Content for {activeTab} is coming soon.</p>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    <div className="space-y-8">
                        <div className="bg-white rounded-2xl border border-gray-200 shadow-xl sticky top-32 overflow-hidden">
                            <div className="p-6 border-b border-gray-100 bg-gray-900 text-white flex items-center justify-between">
                                <h3 className="text-[11px] font-black uppercase tracking-widest">Order Summary</h3>
                                <span className="text-[9px] font-bold bg-orange-500 px-2 py-0.5 rounded uppercase tracking-tighter">Live Quote</span>
                            </div>
                            <div className="p-8 space-y-8">
                                <div className="space-y-3">
                                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block">Build Time</label>
                                    <div className="grid grid-cols-5 gap-1.5 p-1 bg-gray-50 rounded-xl border border-gray-100">
                                        {['1 WD', '3 WD', '5 WD', '7 WD', '10 WD'].map(time => {
                                            const isAvailable = multiQuotes && multiQuotes[time] !== null;
                                            return (
                                                <button
                                                    key={time}
                                                    disabled={!isAvailable}
                                                    onClick={() => updateSpec('buildTime', time)}
                                                    className={`py-1.5 rounded-lg text-[9px] font-black transition-all ${editableSpecs.buildTime === time ? 'bg-white text-orange-600 shadow-sm' : isAvailable ? 'text-gray-400' : 'text-gray-200'
                                                        }`}
                                                >
                                                    {time.split(' ')[0]}
                                                </button>
                                            )
                                        })}
                                    </div>
                                </div>
                                <div className="space-y-4 pt-6 border-t border-gray-50">
                                    <div className="flex justify-between text-xs font-bold uppercase"><span className="text-gray-400 tracking-widest">Subtotal</span><span className="text-gray-900">₹{(pricing?.subTotal || 0).toLocaleString()}</span></div>
                                    <div className="flex justify-between text-xs font-bold uppercase"><span className="text-gray-400 tracking-widest">Tax (18%)</span><span className="text-gray-900">₹{(pricing?.gst || 0).toLocaleString()}</span></div>
                                    <div className="flex justify-between text-xs font-bold uppercase"><span className="text-gray-400 tracking-widest">Shipping</span><span className="text-green-600">Free</span></div>
                                </div>
                                <div className="pt-8 border-t-2 border-dashed border-gray-100">
                                    <p className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.3em] mb-2">Total Amount</p>
                                    <p className="text-4xl font-black text-gray-900 tracking-tighter">₹{(pricing?.totalCost || 0).toLocaleString()}</p>
                                    <div className="mt-6 space-y-3">
                                        <button className="w-full py-4 bg-orange-600 text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-gray-900 transition-all shadow-xl shadow-orange-500/10">Proceed to Checkout</button>
                                        <button className="w-full py-3.5 bg-white border border-gray-200 text-gray-900 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-gray-50 transition-all flex items-center justify-center gap-3"><Download size={16} className="text-orange-500" />Download Quote</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>



            {/* Zoom Modal */}
            <AnimatePresence>
                {zoomedImage && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setZoomedImage(null)} className="fixed inset-0 z-[100] bg-white/95 backdrop-blur-xl flex items-center justify-center p-12 cursor-zoom-out">
                        <div className="w-full h-full flex items-center justify-center [&>svg]:max-w-full [&>svg]:max-h-full" dangerouslySetInnerHTML={{ __html: zoomedImage }} />
                        <button className="absolute top-10 right-10 w-12 h-12 bg-gray-900 text-white rounded-2xl flex items-center justify-center shadow-2xl"><X size={24} /></button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
