'use client'

import { useState, useEffect, Suspense, useRef } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { calculatePrice, PCBSpecs, PricingResult } from '@/lib/pricing'
import Image from 'next/image'
import { Upload, ChevronDown, Check, X, Info, HelpCircle, Loader2, FileCheck } from 'lucide-react'
import axios from 'axios'
import { useCart } from '@/context/CartContext'
import { useAuth } from '@clerk/nextjs'
import { renderGerberPreview, GerberPreview } from '@/lib/gerber-renderer'

const QuoteFormContent = () => {
    const searchParams = useSearchParams()
    const router = useRouter()
    const { addItem } = useCart()
    const { getToken } = useAuth()
    const fileInputRef = useRef<HTMLInputElement>(null)
    const [previews, setPreviews] = useState<GerberPreview | null>(null)
    const [renderingPreview, setRenderingPreview] = useState(false)
    const [previewSide, setPreviewSide] = useState<'top' | 'bottom'>('top')
    const [zoomedImage, setZoomedImage] = useState<string | null>(null)

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

    const [specs, setSpecs] = useState<any>({
        pcbName: '',
        dispatchUnit: 'PCB',
        width: Number(searchParams.get('width')) || 100,
        height: Number(searchParams.get('height')) || 100,
        quantity: Number(searchParams.get('quantity')) || 1,
        material: 'FR4',
        layers: Number(searchParams.get('layers')) || 2,
        thickness: 1.6,
        finishCopper: 35,
        solderMask: 'Green',
        surfaceFinish: 'HAL',
        silkScreen: 'White',
        innerCopper: 17.5,
        remarks: '',
        buildTime: '7 WD',
        shippingMethod: 'Standard'
    })

    const [pricing, setPricing] = useState<PricingResult | null>(null)
    const [multiQuotes, setMultiQuotes] = useState<any>(null)
    const [loading, setLoading] = useState(false)
    const [showBulkExport, setShowBulkExport] = useState(false)
    const [uploading, setUploading] = useState(false)
    const [uploadedFile, setUploadedFile] = useState<{ id: string, url: string, filename: string } | null>(null)
    const [error, setError] = useState<string | null>(null)

    const sqmtr = (specs.width * specs.height * specs.quantity) / 1000000

    useEffect(() => {
        if (sqmtr > 0.44) {
            setShowBulkExport(true)
        } else {
            setShowBulkExport(false)
        }
    }, [sqmtr])

    const fetchQuotes = async () => {
        setLoading(true)
        try {
            // Map UI specs to API expected format
            const apiSpecs = {
                width: specs.width,
                height: specs.height,
                layers: typeof specs.layers === 'string' ? parseInt(specs.layers) : specs.layers,
                quantity: specs.quantity,
                finish: specs.surfaceFinish,
                copperThickness: specs.finishCopper === 35 ? '1 oz (35 um)' : specs.finishCopper === 70 ? '2 oz (70 um)' : `${specs.finishCopper} um`,
                shippingMethod: specs.shippingMethod === 'Plus' ? 'DTDC Plus' : 'DTDC Standard'
            }
            const response = await axios.post('/api/calculate-quote', apiSpecs)
            setMultiQuotes(response.data.quotes)

            // If current buildTime is not in new quotes, default to the first available quote
            if (!response.data.quotes[specs.buildTime]) {
                const availableTimes = Object.keys(response.data.quotes).filter(t => response.data.quotes[t] !== null)
                if (availableTimes.length > 0) {
                    updateSpec('buildTime', availableTimes[0])
                }
            }
        } catch (error) {
            console.error('Failed to fetch quotes:', error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchQuotes()
    }, [specs.width, specs.height, specs.layers, specs.quantity, specs.surfaceFinish, specs.finishCopper, specs.shippingMethod])

    useEffect(() => {
        if (multiQuotes && multiQuotes[specs.buildTime]) {
            const basePricing = multiQuotes[specs.buildTime]
            let addon = 0

            // Addons for non-default selections
            if (specs.material !== 'FR4') addon += 500
            if (specs.thickness !== 1.6) addon += 500
            if (specs.finishCopper !== 35 && specs.finishCopper !== 25) addon += 250
            if (specs.solderMask !== 'Green') addon += 500
            if (specs.surfaceFinish !== 'HAL' && specs.surfaceFinish !== 'HASL') addon += 500
            if (specs.silkScreen !== 'White') addon += 500

            const updatedSubTotal = Math.round(basePricing.subTotal + addon)
            const updatedGst = Math.round(updatedSubTotal * 0.18)
            const updatedTotal = updatedSubTotal + updatedGst + basePricing.shippingCost

            setPricing({
                ...basePricing,
                subTotal: updatedSubTotal,
                gst: updatedGst,
                totalCost: updatedTotal,
                unitPrice: Number((updatedSubTotal / specs.quantity).toFixed(2))
            })
        } else {
            // Fallback to local calculation if API fails or lead time not found
            const result = calculatePrice({
                width: specs.width,
                height: specs.height,
                layers: typeof specs.layers === 'string' ? parseInt(specs.layers) : specs.layers,
                quantity: specs.quantity,
                thickness: specs.thickness,
                baseMaterial: specs.material,
                discreteDesign: 1,
                deliveryFormat: specs.dispatchUnit,
                maskColor: specs.solderMask,
                finish: specs.surfaceFinish,
                copperThickness: specs.finishCopper,
                buildTime: specs.buildTime,
                shippingMethod: specs.shippingMethod
            })

            let addon = 0
            if (specs.material !== 'FR4') addon += 500
            if (specs.thickness !== 1.6) addon += 500
            if (specs.finishCopper !== 35) addon += 250
            if (specs.solderMask !== 'Green') addon += 500
            if (specs.surfaceFinish !== 'HAL') addon += 500
            if (specs.silkScreen !== 'White') addon += 500

            setPricing({
                ...result,
                totalCost: Math.round(result.totalCost + addon),
                subTotal: Math.round(result.subTotal + (addon / 1.18)),
                gst: Math.round(result.gst + (addon - (addon / 1.18)))
            })
        }
    }, [specs.buildTime, multiQuotes, specs.material, specs.thickness, specs.finishCopper, specs.solderMask, specs.surfaceFinish, specs.silkScreen, specs.width, specs.height, specs.quantity, specs.layers])

    const updateSpec = (key: string, value: any) => {
        setSpecs((prev: any) => ({ ...prev, [key]: value }))
    }

    const SegmentedControl = ({ label, options, value, onChange }: any) => (
        <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">{label}</label>
            <div className="flex flex-wrap gap-0 border border-gray-200 rounded-md overflow-hidden bg-gray-50/50">
                {options.map((opt: any) => (
                    <button
                        key={opt}
                        onClick={() => onChange(opt)}
                        className={`flex-1 min-w-[80px] py-2 px-3 text-xs md:text-sm font-medium transition-all border-r last:border-r-0 border-gray-200 ${value === opt
                            ? 'bg-[#FF6B35] text-white'
                            : 'bg-transparent text-gray-500 hover:bg-gray-100'
                            }`}
                    >
                        {opt}
                    </button>
                ))}
            </div>
        </div>
    )

    const ColorSelector = ({ label, options, value, onChange }: any) => (
        <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">{label}</label>
            <div className="flex gap-2 items-center flex-wrap">
                {options.map((opt: any) => (
                    <button
                        key={opt.name}
                        onClick={() => onChange(opt.name)}
                        className={`w-10 h-10 rounded-full border-[3px] transition-all flex items-center justify-center ${value === opt.name ? 'border-[#FF6B35] scale-110' : 'border-gray-200'} hover:border-[#FF6B35]/50`}
                        style={{ backgroundColor: opt.color }}
                        title={opt.name}
                    >
                        {value === opt.name && <div className={`w-2.5 h-2.5 rounded-full ${opt.name === 'White' || opt.name === 'Yellow' ? 'bg-gray-800' : 'bg-white'}`} />}
                    </button>
                ))}
            </div>
        </div>
    )

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        // Validate file type
        const ext = file.name.split('.').pop()?.toLowerCase()
        if (ext !== 'zip' && ext !== 'rar') {
            setError('Please upload only .zip or .rar files.')
            return
        }

        setUploading(true)
        setError(null)

        const formData = new FormData()
        formData.append('file', file)

        try {
            const response = await axios.post('/api/media/upload-gerber', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                timeout: 60000,
            })

            if (response.data.success) {
                setUploadedFile({
                    id: response.data.mediaId,
                    url: response.data.url,
                    filename: response.data.filename
                })

                // Trigger Gerber Rendering
                setRenderingPreview(true)
                try {
                    const result = await renderGerberPreview(file, specs.solderMask?.toLowerCase())
                    setPreviews(result)
                } catch (renderErr) {
                    console.error('Gerber rendering failed:', renderErr)
                } finally {
                    setRenderingPreview(false)
                }
            } else {
                setError('Upload failed. Please try again.')
            }
        } catch (err: any) {
            console.error('Upload error:', err)
            setError(err.response?.data?.error || 'Failed to upload Gerber file.')
        } finally {
            setUploading(false)
        }
    }

    const handleAddToCart = async () => {
        if (!pricing) return

        if (!uploadedFile) {
            setError('Please upload your Gerber files before adding to cart.')
            const uploadSection = document.getElementById('gerber-upload')
            uploadSection?.scrollIntoView({ behavior: 'smooth' })
            return
        }

        setLoading(true)
        try {
            const token = await getToken()
            // 1. Save as a Project in DB
            const projectResponse = await axios.post('/api/projects', {
                name: specs.pcbName || 'Custom PCB',
                specs: { ...specs, pricing },
                gerberFileId: uploadedFile.id
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            if (projectResponse.data.success) {
                // No longer adding to cart context
                // addItem(cartItem)
                router.push('/dashboard/projects')
            } else {
                setError('Failed to create project. Please try again.')
            }
        } catch (err: any) {
            console.error('Add to cart error:', err)
            setError('Failed to save project. Are you logged in?')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            {/* Bulk Order Popup */}
            {showBulkExport && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 text-center space-y-6">
                        <div className="w-20 h-20 bg-orange-100 text-[#FF6B35] rounded-full flex items-center justify-center mx-auto">
                            <Info size={40} />
                        </div>
                        <div className="space-y-2">
                            <h3 className="text-2xl font-bold text-gray-900">Bulk Order Inquiry</h3>
                            <p className="text-gray-600">Your order exceeds 0.44 SQ.MTR. For bulk orders, please email your inquiry for a special discounted quote.</p>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 flex items-center justify-center gap-2">
                            <HelpCircle className="text-[#FF6B35]" size={18} />
                            <a href="mailto:info@pcbglobe.com" className="text-[#FF6B35] font-bold hover:underline">info@pcbglobe.com</a>
                        </div>
                        <button
                            onClick={() => setShowBulkExport(false)}
                            className="w-full py-3 bg-gray-900 text-white font-bold rounded-xl hover:bg-gray-800 transition-colors"
                        >
                            Got it, thanks!
                        </button>
                    </div>
                </div>
            )}

            {/* Logo Header */}
            {/* <div className="flex justify-center mb-8">
                <div className="relative w-48 h-12">
                    <Image
                        src="/logo.png"
                        alt="PCB GLOBE Logo"
                        fill
                        className="object-contain"
                    />
                </div>
            </div> */}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Left Column: Form */}
                <div className="lg:col-span-2 space-y-8 bg-white p-6 md:p-10 rounded-xl border border-gray-100 shadow-lg">
                    <h2 className="text-2xl font-bold text-[#FF6B35] mb-8">Configure Your PCB</h2>

                    <div className="space-y-6">
                        {/* PCB Name */}
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-600">PCB Name</label>
                            <input
                                type="text"
                                placeholder="Enter PCB name"
                                value={specs.pcbName}
                                onChange={(e) => updateSpec('pcbName', e.target.value)}
                                className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-[#FF6B35] text-gray-700"
                            />
                        </div>

                        {/* Dispatch Unit */}
                        <SegmentedControl
                            label="Dispatch Unit"
                            options={['PCB', 'Panel']}
                            value={specs.dispatchUnit}
                            onChange={(v: string) => updateSpec('dispatchUnit', v)}
                        />

                        {/* Dimensions */}
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-600">PCB Dimensions (mm)</label>
                            <div className="flex items-center gap-4">
                                <div className="flex-1 relative">
                                    <input
                                        type="number"
                                        placeholder="Length"
                                        value={specs.width}
                                        onChange={(e) => updateSpec('width', Number(e.target.value))}
                                        className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-[#FF6B35] text-gray-700 text-center"
                                    />
                                </div>
                                <span className="text-gray-400">×</span>
                                <div className="flex-1 relative">
                                    <input
                                        type="number"
                                        placeholder="Width"
                                        value={specs.height}
                                        onChange={(e) => updateSpec('height', Number(e.target.value))}
                                        className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-[#FF6B35] text-gray-700 text-center"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Quantity */}
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-600">Quantity</label>
                            <input
                                type="number"
                                value={specs.quantity}
                                onChange={(e) => updateSpec('quantity', Number(e.target.value))}
                                className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-[#FF6B35] text-gray-700"
                            />
                        </div>

                        {/* Layers */}
                        <SegmentedControl
                            label="Layer"
                            options={['1 Layer', '2 Layers', '4 Layers', '6 Layers', '8 Layers']}
                            value={specs.layers + (specs.layers === 1 ? ' Layer' : ' Layers')}
                            onChange={(v: string) => {
                                const val = parseInt(v)
                                updateSpec('layers', val)

                                // Reset other specs to defaults for the new layer count
                                if (val === 1) {
                                    if (!['FR1', 'FR4', 'Aluminum', 'CEM-1', 'CEM-3'].includes(specs.material)) {
                                        updateSpec('material', 'FR1')
                                    }
                                } else if (val === 2) {
                                    if (!['FR4', 'FR4 TG150', 'FR4 TG170'].includes(specs.material)) {
                                        updateSpec('material', 'FR4')
                                    }
                                    if (![0.4, 0.8, 1.0, 1.6, 2.0, 2.4, 3.2].includes(specs.thickness)) {
                                        updateSpec('thickness', 1.6)
                                    }
                                } else if (val >= 4) {
                                    updateSpec('material', 'FR4')
                                    updateSpec('thickness', 1.6)
                                    updateSpec('finishCopper', 35)
                                    updateSpec('surfaceFinish', 'HASL')
                                    updateSpec('silkScreen', 'White')
                                }
                            }}
                        />

                        {/* Material */}
                        <SegmentedControl
                            label="Material"
                            options={specs.layers === 1
                                ? ['FR1', 'FR4', 'FR4 TG150', 'FR4 TG170', 'Aluminum', 'Rogers', 'CEM-1', 'CEM-3']
                                : specs.layers === 2
                                    ? getTwoLayerOptions().material
                                    : getMultiLayerOptions().material
                            }
                            value={specs.material}
                            onChange={(v: string) => {
                                updateSpec('material', v)
                                // Reset thickness/copper if current value is invalid for the new material in 1-layer, 2-layer or multi-layer mode
                                if (specs.layers === 1) {
                                    const options = getOneLayerOptions(v)
                                    if (!options.thickness.includes(specs.thickness)) {
                                        updateSpec('thickness', options.thickness[options.thickness.length - 1])
                                    }
                                    if (!options.copper.includes(specs.finishCopper)) {
                                        updateSpec('finishCopper', options.copper[options.copper.length - 1])
                                    }
                                } else if (specs.layers === 2) {
                                    const options = getTwoLayerOptions()
                                    if (!options.thickness.includes(specs.thickness)) {
                                        updateSpec('thickness', options.thickness[options.thickness.length - 1])
                                    }
                                    if (!options.copper.includes(specs.finishCopper)) {
                                        updateSpec('finishCopper', options.copper[options.copper.length - 1])
                                    }
                                } else if (specs.layers >= 4) {
                                    const options = getMultiLayerOptions()
                                    if (!options.thickness.includes(specs.thickness)) {
                                        updateSpec('thickness', options.thickness[0])
                                    }
                                    if (!options.copper.includes(specs.finishCopper)) {
                                        updateSpec('finishCopper', options.copper[0])
                                    }
                                }
                            }}
                        />

                        {/* Thickness */}
                        <SegmentedControl
                            label="Thickness (mm)"
                            options={specs.layers === 1
                                ? getOneLayerOptions(specs.material).thickness
                                : specs.layers === 2
                                    ? getTwoLayerOptions().thickness
                                    : getMultiLayerOptions().thickness
                            }
                            value={specs.thickness}
                            onChange={(v: number) => updateSpec('thickness', v)}
                        />

                        {/* Copper Thickness */}
                        <div className={`grid ${specs.layers >= 4 ? 'grid-cols-2' : 'grid-cols-1'} gap-4`}>
                            <SegmentedControl
                                label="Finish Copper (Micron)"
                                options={specs.layers === 1
                                    ? getOneLayerOptions(specs.material).copper
                                    : specs.layers === 2
                                        ? getTwoLayerOptions().copper
                                        : getMultiLayerOptions().copper
                                }
                                value={specs.finishCopper}
                                onChange={(v: number) => updateSpec('finishCopper', v)}
                            />

                            {specs.layers >= 4 && (
                                <SegmentedControl
                                    label="Inner Cu Thickness"
                                    options={getMultiLayerOptions().innerCopper}
                                    value={specs.innerCopper}
                                    onChange={(v: number) => updateSpec('innerCopper', v)}
                                />
                            )}
                        </div>

                        {/* Solder Mask Color */}
                        <ColorSelector
                            label="Solder Mask Color"
                            options={specs.layers >= 4
                                ? [
                                    { name: 'Green', color: '#2d8c3c' },
                                    { name: 'White', color: '#ffffff' },
                                    { name: 'Black', color: '#212121' }
                                ]
                                : [
                                    { name: 'Green', color: '#2d8c3c' },
                                    { name: 'Red', color: '#e53935' },
                                    { name: 'Blue', color: '#1e88e5' },
                                    { name: 'Black', color: '#212121' },
                                    { name: 'White', color: '#ffffff' }
                                ]
                            }
                            value={specs.solderMask}
                            onChange={(v: string) => updateSpec('solderMask', v)}
                        />

                        {/* Surface Finish */}
                        <SegmentedControl
                            label="Surface Finish"
                            options={specs.layers === 1 || specs.layers === 2
                                ? ['HAL', 'Lead Free HAL', 'OSP', 'Tin Finish', 'LACQUER', 'Immersion Silver']
                                : getMultiLayerOptions().surfaceFinish
                            }
                            value={specs.surfaceFinish}
                            onChange={(v: string) => updateSpec('surfaceFinish', v)}
                        />

                        {/* Silk Screen */}
                        <SegmentedControl
                            label="Silk Screen"
                            options={specs.layers >= 4 ? ['White'] : ['White', 'Black']}
                            value={specs.silkScreen}
                            onChange={(v: string) => updateSpec('silkScreen', v)}
                        />

                        {/* Remarks */}
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-600">Remarks</label>
                            <textarea
                                rows={3}
                                placeholder="Any special instructions or notes"
                                value={specs.remarks}
                                onChange={(e) => updateSpec('remarks', e.target.value)}
                                className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-[#FF6B35] text-gray-700 resize-none"
                            />
                        </div>

                        {/* Upload Gerber Files */}
                        <div className="space-y-4" id="gerber-upload">
                            <label className="text-sm font-semibold text-gray-600">Upload Gerber Files</label>
                            
                            <input 
                                type="file" 
                                ref={fileInputRef}
                                className="hidden" 
                                accept=".zip,.rar"
                                onChange={handleFileUpload}
                            />

                            <div 
                                onClick={() => !uploading && fileInputRef.current?.click()}
                                className={`border-2 border-dashed rounded-xl p-10 text-center transition-all cursor-pointer group ${
                                    uploadedFile 
                                    ? 'border-green-200 bg-green-50/30' 
                                    : 'border-gray-200 bg-gray-50 hover:bg-gray-100'
                                } ${uploading ? 'opacity-50 cursor-wait' : ''}`}
                            >
                                <div className="flex flex-col items-center">
                                    <div className={`w-16 h-16 rounded-lg shadow-sm flex items-center justify-center mb-4 transition-transform ${
                                        uploadedFile ? 'bg-green-100' : 'bg-white group-hover:scale-110'
                                    }`}>
                                        {uploading ? (
                                            <Loader2 className="w-8 h-8 text-[#FF6B35] animate-spin" />
                                        ) : uploadedFile ? (
                                            <FileCheck className="w-8 h-8 text-green-600" />
                                        ) : (
                                            <Upload className="w-8 h-8 text-[#FF6B35]" />
                                        )}
                                    </div>
                                    
                                    {uploadedFile ? (
                                        <div className="space-y-1">
                                            <h3 className="text-green-700 font-bold">File Uploaded Successfully!</h3>
                                            <p className="text-green-600 text-sm font-medium">{uploadedFile.filename}</p>
                                            <button 
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setUploadedFile(null);
                                                    setPreviews(null);
                                                }}
                                                className="text-xs text-red-500 hover:underline mt-2"
                                            >
                                                Remove and upload different file
                                            </button>
                                        </div>
                                    ) : (
                                        <>
                                            <h3 className="text-gray-700 font-bold mb-1">
                                                {uploading ? 'Uploading...' : 'Drag & drop your Gerber files here or click to browse'}
                                            </h3>
                                            <p className="text-gray-400 text-sm">Supported formats: .zip, .rar</p>
                                        </>
                                    )}
                                </div>
                            </div>

                            {error && (
                                <div className="flex items-center gap-2 text-red-500 text-sm bg-red-50 p-3 rounded-lg border border-red-100">
                                    <Info size={16} />
                                    <span>{error}</span>
                                </div>
                            )}

                            {/* Gerber Preview Section */}
                            <AnimatePresence>
                                {(renderingPreview || previews) && (
                                    <motion.div 
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 10 }}
                                        className="mt-6 p-6 bg-white border border-gray-100 rounded-3xl shadow-sm"
                                    >
                                        <div className="flex items-center justify-between mb-6">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 bg-orange-50 rounded-lg flex items-center justify-center">
                                                    <FileCheck className="w-4 h-4 text-orange-500" />
                                                </div>
                                                <h3 className="text-sm font-black text-gray-900 uppercase tracking-widest">PCB Preview</h3>
                                            </div>
                                        </div>

                                        {renderingPreview ? (
                                            <div className="aspect-[4/3] flex flex-col items-center justify-center gap-4 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-100">
                                                <Loader2 className="w-8 h-8 text-orange-500 animate-spin" />
                                                <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Generating PCB Render...</p>
                                            </div>
                                        ) : previews ? (
                                            <div className="space-y-10">
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                                    {/* Front View */}
                                                    <div className="space-y-6">
                                                        <div className="text-center">
                                                            <h4 className="text-xl font-black text-gray-800 tracking-tight">Front View</h4>
                                                        </div>
                                                        <div 
                                                            onClick={() => setZoomedImage(previews.top)}
                                                            className="aspect-square bg-[#f8fafc] rounded-3xl p-10 flex items-center justify-center overflow-hidden border border-gray-100 shadow-[inset_0_2px_4px_rgba(0,0,0,0.05)] group relative cursor-zoom-in hover:border-orange-300 hover:shadow-2xl hover:shadow-orange-100 transition-all duration-500 [&>svg]:w-full [&>svg]:h-full [&>svg]:drop-shadow-[0_20px_50px_rgba(0,0,0,0.1)]"
                                                        >
                                                            {previews.top ? (
                                                                <div className="w-full h-full" dangerouslySetInnerHTML={{ __html: previews.top }} />
                                                            ) : (
                                                                <div className="flex flex-col items-center gap-2 text-gray-300">
                                                                    <X className="w-8 h-8 opacity-20" />
                                                                    <span className="text-[10px] font-bold uppercase tracking-widest">No Top View Data</span>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                    {/* Back View */}
                                                    <div className="space-y-6">
                                                        <div className="text-center">
                                                            <h4 className="text-xl font-black text-gray-800 tracking-tight">Back View</h4>
                                                        </div>
                                                        <div 
                                                            onClick={() => setZoomedImage(previews.bottom)}
                                                            className="aspect-square bg-[#f8fafc] rounded-3xl p-10 flex items-center justify-center overflow-hidden border border-gray-100 shadow-[inset_0_2px_4px_rgba(0,0,0,0.05)] group relative cursor-zoom-in hover:border-orange-300 hover:shadow-2xl hover:shadow-orange-100 transition-all duration-500 [&>svg]:w-full [&>svg]:h-full [&>svg]:drop-shadow-[0_20px_50px_rgba(0,0,0,0.1)]"
                                                        >
                                                            {previews.bottom ? (
                                                                <div className="w-full h-full" dangerouslySetInnerHTML={{ __html: previews.bottom }} />
                                                            ) : (
                                                                <div className="flex flex-col items-center gap-2 text-gray-300">
                                                                    <X className="w-8 h-8 opacity-20" />
                                                                    <span className="text-[10px] font-bold uppercase tracking-widest">No Bottom View Data</span>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="pt-8 space-y-4 border-t border-gray-50">
                                                    <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                                                        <p className="text-[11px] text-gray-500 font-medium leading-relaxed">
                                                            <span className="font-bold text-gray-700">Noted:</span> The image is for reference only. PCB fabrication will be based on your provided Gerber file.
                                                        </p>
                                                        <p className="text-[11px] text-[#28a745] font-bold mt-2 flex items-center gap-2">
                                                            <span className="w-1.5 h-1.5 rounded-full bg-[#28a745] animate-pulse" />
                                                            Your Gerber file has been uploaded. You may now proceed with the details provided below.
                                                        </p>
                                                    </div>
                                                    <div className="flex flex-wrap gap-2 items-center">
                                                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mr-4">Layers Detected</span>
                                                        {previews.layers.map((l, i) => (
                                                            <span key={i} className="px-3 py-1.5 bg-white text-[10px] font-black text-gray-600 rounded-lg border border-gray-100 shadow-sm uppercase tracking-wider">{l.filename}</span>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        ) : null}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Calculate Price Button */}
                        <button 
                            disabled={uploading}
                            className={`w-full py-4 text-white font-bold rounded-md shadow-md transition-all uppercase tracking-wide ${
                                uploading ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#28a745] hover:bg-[#218838]'
                            }`}
                        >
                            Calculate Price
                        </button>
                    </div>
                </div>

                {/* Right Column: Calculation */}
                <div className="space-y-6">
                    <div className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm sticky top-8">
                        <h2 className="text-xl font-bold text-[#FF6B35] mb-8 text-center">Order Value Calculation</h2>

                        <div className="space-y-6">
                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <label className="text-sm font-semibold text-gray-700">Lead Time</label>
                                    {loading && <div className="animate-spin rounded-full h-4 w-4 border-2 border-[#FF6B35] border-t-transparent" />}
                                </div>
                                <div className="grid grid-cols-5 gap-1 bg-gray-50 p-1 rounded-md border border-gray-200">
                                    {['1 WD', '3 WD', '5 WD', '7 WD', '10 WD'].map((time) => {
                                        const isAvailable = multiQuotes && multiQuotes[time] !== null;
                                        return (
                                            <button
                                                key={time}
                                                disabled={!isAvailable}
                                                onClick={() => isAvailable && updateSpec('buildTime', time)}
                                                className={`py-1.5 px-1 text-[9px] font-bold rounded transition-all ${specs.buildTime === time
                                                    ? 'bg-[#FF6B35] text-white shadow-sm'
                                                    : isAvailable
                                                        ? 'text-gray-500 hover:bg-gray-200'
                                                        : 'text-gray-300 cursor-not-allowed'
                                                    }`}
                                            >
                                                {time}
                                            </button>
                                        )
                                    })}
                                </div>
                            </div>

                            <div className="flex justify-between items-center text-sm font-semibold text-gray-600">
                                <span>Unit Price:</span>
                                <span className="text-gray-900">₹{pricing?.unitPrice || '0.00'}</span>
                            </div>

                            <div className="flex justify-between items-center text-sm font-semibold text-gray-600">
                                <span>Subtotal:</span>
                                <span className="text-gray-900">₹{pricing?.subTotal || '0.00'}</span>
                            </div>

                            <div className="flex justify-between items-center text-sm font-semibold text-gray-600">
                                <span>GST (18%):</span>
                                <span className="text-gray-900">₹{pricing?.gst || '0.00'}</span>
                            </div>

                            <div className="pt-4 border-t border-gray-100 flex justify-between items-center">
                                <span className="text-xl font-bold text-[#FF6B35]">Total Amount:</span>
                                <span className="text-2xl font-bold text-[#FF6B35]">₹{pricing?.totalCost || '0.00'}</span>
                            </div>

                            <button className="w-full py-3 bg-[#FF6B35] hover:bg-[#e85a20] text-white font-bold rounded-md shadow-sm transition-all">
                                Quotation
                            </button>

                            <button 
                                onClick={handleAddToCart}
                                disabled={loading}
                                className={`w-full py-3 bg-[#FF6B35] hover:bg-[#e85a20] text-white font-bold rounded-md shadow-sm transition-all ${loading ? 'opacity-50 cursor-wait' : ''}`}
                            >
                                {loading ? 'Saving...' : 'Save Project'}
                            </button>

                            <div className="space-y-2 pt-4 border-t border-gray-100">
                                <div className="flex justify-between text-xs text-gray-500">
                                    <span>GST:</span>
                                    <span>18% Extra</span>
                                </div>
                                <div className="flex justify-between text-xs text-gray-500">
                                    <span>Setup Cost:</span>
                                    <span>Free</span>
                                </div>
                                <div className="flex justify-between text-xs text-gray-500">
                                    <span>Freight Cost:</span>
                                    <span>Free</span>
                                </div>
                                <div className="flex justify-between text-xs text-gray-500">
                                    <span>FPT Cost:</span>
                                    <span>Free</span>
                                </div>
                            </div>

                            <div className="pt-8 space-y-4">
                                <h3 className="text-sm font-bold text-gray-900 border-b border-gray-100 pb-2 uppercase tracking-wider">Order Summary</h3>
                                <div className="space-y-2">
                                    <div className="flex justify-between text-xs text-gray-600">
                                        <span>PCB Size:</span>
                                        <span>{specs.width} x {specs.height} mm</span>
                                    </div>
                                    <div className="flex justify-between text-xs text-gray-600">
                                        <span>Quantity:</span>
                                        <span>{specs.quantity} PCB</span>
                                    </div>
                                    <div className="flex justify-between text-xs text-gray-600">
                                        <span>Volume in Sq. mtr.:</span>
                                        <span>{((specs.width * specs.height * specs.quantity) / 1000000).toFixed(4)}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Zoom Modal */}
            <AnimatePresence>
                {zoomedImage && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setZoomedImage(null)}
                        className="fixed inset-0 z-[60] bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 md:p-20 cursor-zoom-out"
                    >
                        <motion.div 
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="w-full h-full flex items-center justify-center [&>svg]:w-auto [&>svg]:h-auto [&>svg]:max-w-full [&>svg]:max-h-full"
                            dangerouslySetInnerHTML={{ __html: zoomedImage }}
                        />
                        <button className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors">
                            <X size={32} />
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

const QuoteForm = () => {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center font-bold text-gray-400">Loading Quote Engine...</div>}>
            <QuoteFormContent />
        </Suspense>
    )
}

export default QuoteForm
