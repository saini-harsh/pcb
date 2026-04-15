'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { calculatePrice, PCBSpecs, PricingResult } from '@/lib/pricing'
import { Upload, HelpCircle, FileText, Shield, Zap, ChevronRight } from 'lucide-react'

const QuoteForm = () => {
  const [specs, setSpecs] = useState<PCBSpecs>({
    width: 50,
    height: 40,
    layers: 2,
    quantity: 5,
    thickness: 1.6,
    baseMaterial: 'FR4',
    discreteDesign: 1,
    deliveryFormat: 'Single PCB',
    maskColor: 'Green',
    finish: 'HASL Finish',
    copperThickness: '1 oz (35 um)',
    buildTime: '5-6 Days',
    shippingMethod: 'DTDC Standard'
  })

  const [pricing, setPricing] = useState<PricingResult | null>(null)

  useEffect(() => {
    setPricing(calculatePrice(specs))
  }, [specs])

  const updateSpec = (key: keyof PCBSpecs, value: any) => {
    setSpecs(prev => ({ ...prev, [key]: value }))
  }

  const OptionGroup = ({ label, options, value, onChange, gridCols = "grid-cols-4" }: any) => (
    <div className="space-y-3">
      <label className="text-sm font-semibold text-gray-500 uppercase tracking-wider">{label}</label>
      <div className={`grid ${gridCols} gap-2`}>
        {options.map((opt: any) => (
          <button
            key={opt}
            onClick={() => onChange(opt)}
            className={`py-2.5 px-3 text-sm font-bold border-2 rounded-lg transition-all ${value === opt
                ? 'border-primary bg-primary/5 text-primary shadow-sm'
                : 'border-gray-100 bg-white text-gray-400 hover:border-gray-200 hover:text-gray-600'
              }`}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  )

  return (
    <div className="max-w-[1400px] mx-auto px-6 pb-20">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-black text-gray-900 mb-4">Your Instant Quotation Process Made Easy!</h1>
        <p className="text-gray-500 font-medium">Our Streamlined Process Ensures Instant, Accurate Quotations For Your Project.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

        {/* Left Column: Parameters */}
        <div className="lg:col-span-4 space-y-10 bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between">
            <label className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Base Material</label>
            <button className="px-4 py-1.5 bg-orange-50 text-primary border border-primary/20 rounded-md text-xs font-bold transition-colors">FR4</button>
          </div>

          <OptionGroup
            label="Layers"
            options={[2, 4, 6, 8, 10, 12, 14, 18, 20, 22]}
            value={specs.layers}
            onChange={(v: number) => updateSpec('layers', v)}
            gridCols="grid-cols-5"
          />

          <div className="space-y-3">
            <label className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Dimensions (mm)</label>
            <div className="flex items-center gap-4 bg-gray-50/50 p-2 rounded-xl border border-gray-100">
              <input
                type="number"
                value={specs.width}
                onChange={(e) => updateSpec('width', Number(e.target.value))}
                className="w-full bg-white border border-gray-100 rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary outline-none font-bold text-gray-700 transition-all"
              />
              <span className="text-gray-300 font-bold">×</span>
              <input
                type="number"
                value={specs.height}
                onChange={(e) => updateSpec('height', Number(e.target.value))}
                className="w-full bg-white border border-gray-100 rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary outline-none font-bold text-gray-700 transition-all"
              />
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Quantity</label>
            <input
              type="number"
              value={specs.quantity}
              onChange={(e) => updateSpec('quantity', Number(e.target.value))}
              className="w-full bg-white border border-gray-100 rounded-xl px-4 py-3.5 focus:ring-2 focus:ring-primary outline-none font-bold text-gray-700 transition-all shadow-sm"
            />
          </div>

          <OptionGroup
            label="Discrete Design"
            options={[1, 2, 3, 4, 5]}
            value={specs.discreteDesign}
            onChange={(v: number) => updateSpec('discreteDesign', v)}
            gridCols="grid-cols-5"
          />

          <OptionGroup
            label="Delivery Format"
            options={['Single PCB', 'Panel By Customer', 'Panel By PCBCircuits']}
            value={specs.deliveryFormat}
            onChange={(v: string) => updateSpec('deliveryFormat', v)}
            gridCols="grid-cols-1"
          />

          <OptionGroup
            label="PCB Thickness (mm)"
            options={[0.4, 0.8, 1.2, 1.6, 2.0, 2.4]}
            value={specs.thickness}
            onChange={(v: number) => updateSpec('thickness', v)}
            gridCols="grid-cols-6"
          />

          <OptionGroup
            label="Mask Color"
            options={['Green', 'White', 'Red', 'Blue', 'Black']}
            value={specs.maskColor}
            onChange={(v: string) => updateSpec('maskColor', v)}
            gridCols="grid-cols-5"
          />

          <OptionGroup
            label="PCB Finish"
            options={['HASL Finish', 'Lead Free HASL', 'ENIG']}
            value={specs.finish}
            onChange={(v: string) => updateSpec('finish', v)}
            gridCols="grid-cols-1 md:grid-cols-3"
          />

          <OptionGroup
            label="Copper Thickness"
            options={['1 oz (35 um)', '2 oz (70 um)', '3 oz (105 um)']}
            value={specs.copperThickness}
            onChange={(v: string) => updateSpec('copperThickness', v)}
            gridCols="grid-cols-1 md:grid-cols-3"
          />
        </div>

        {/* Center Column: Upload */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm">
            <div className="mb-8 p-4 bg-orange-50/50 rounded-2xl border border-primary/10">
              <div className="flex items-start gap-4">
                <FileText className="w-5 h-5 text-primary mt-1" />
                <div className="space-y-1">
                  <p className="text-sm font-bold text-gray-800">File Format : Zip</p>
                  <p className="text-sm text-gray-500">Size Limit : 50MB or less</p>
                  <button className="text-blue-600 text-sm font-bold hover:underline">Sample File Download</button>
                </div>
              </div>
            </div>

            <div className="border-2 border-dashed border-gray-100 rounded-3xl p-12 text-center hover:border-primary/50 transition-all group cursor-pointer bg-gray-50/30">
              <div className="mb-6 mx-auto">
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-20 h-20 bg-white rounded-2xl shadow-lg border border-gray-100 flex items-center justify-center mx-auto"
                >
                  <Upload className="w-10 h-10 text-primary" />
                </motion.div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Gerber File Upload</h3>
              <p className="text-gray-400 text-sm mb-6">Choose from files | Drag and drop the file</p>
            </div>

            <div className="mt-8 flex items-center gap-4 p-4 bg-gray-50/80 rounded-2xl border border-gray-100">
              <Shield className="w-8 h-8 text-primary/40" />
              <p className="text-xs font-bold text-gray-400 leading-relaxed">
                Your File Is Secure And Confidential.
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Charges */}
        <div className="lg:col-span-3 space-y-6">
          <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm sticky top-32">
            <h3 className="text-xl font-bold mb-6 text-gray-900">Charge Details</h3>

            <div className="space-y-6">
              <div className="p-3 bg-blue-50/50 text-blue-800 text-xs font-black rounded-lg border border-blue-100">
                MAKE IN INDIA
              </div>

              <div className="space-y-4">
                <h4 className="text-sm font-bold text-gray-900 border-b border-gray-50 pb-2">Price Estimate</h4>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500 font-medium">Per Unit Cost</span>
                    <span className="text-gray-900 font-bold">₹{pricing?.unitPrice} × {specs.quantity}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500 font-medium">NRE Cost</span>
                    <span className="text-gray-900 font-bold">₹{pricing?.nreCost}</span>
                  </div>
                  <div className="flex justify-between border-t border-gray-50 pt-2 font-bold text-gray-900">
                    <span>Sub Total</span>
                    <span>₹{pricing?.subTotal}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-sm font-bold text-gray-900 border-b border-gray-50 pb-2">Build Time</h4>
                <div className="grid grid-cols-2 gap-3">
                  {['5-6 Days', '4-5 Days', '2-3 Days', '1-2 Days'].map((time) => (
                    <label key={time} className={`flex items-center gap-2 p-3 rounded-xl border-2 cursor-pointer transition-all ${specs.buildTime === time ? 'border-primary bg-primary/5 text-primary' : 'border-gray-50 bg-white text-gray-400'
                      }`}>
                      <input
                        type="radio"
                        name="buildTime"
                        className="hidden"
                        checked={specs.buildTime === time}
                        onChange={() => updateSpec('buildTime', time)}
                      />
                      <div className={`w-3.5 h-3.5 rounded-full border-2 flex items-center justify-center ${specs.buildTime === time ? 'border-primary' : 'border-gray-200'}`}>
                        {specs.buildTime === time && <div className="w-1.5 h-1.5 bg-primary rounded-full" />}
                      </div>
                      <span className="text-[10px] font-bold">{time}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-sm font-bold text-gray-900 border-b border-gray-50 pb-2">Shipping Method</h4>
                <div className="grid grid-cols-2 gap-3">
                  {['DTDC Standard', 'DTDC Plus'].map((method) => (
                    <label key={method} className={`flex flex-col p-3 rounded-xl border-2 cursor-pointer transition-all ${specs.shippingMethod === method ? 'border-primary bg-primary/5 text-primary' : 'border-gray-50 bg-white text-gray-400'
                      }`}>
                      <input
                        type="radio"
                        name="shippingMethod"
                        className="hidden"
                        checked={specs.shippingMethod === method}
                        onChange={() => updateSpec('shippingMethod', method)}
                      />
                      <div className="flex items-center gap-2 mb-1">
                        <div className={`w-3.5 h-3.5 rounded-full border-2 flex items-center justify-center ${specs.shippingMethod === method ? 'border-primary' : 'border-gray-200'}`}>
                          {specs.shippingMethod === method && <div className="w-1.5 h-1.5 bg-primary rounded-full" />}
                        </div>
                        <span className="text-[10px] font-bold">{method.split(' ')[1]}</span>
                      </div>
                      <span className="text-[8px] font-medium opacity-60">
                        {method === 'DTDC Plus' ? '1-2 Working Days' : '2-3 Working Days'}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="space-y-4 pt-6 border-t border-gray-100">
                <div className="flex justify-between text-sm text-gray-500 font-bold">
                  <span>New Sub Total</span>
                  <span>₹{pricing?.subTotal}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-500 font-bold">
                  <span>GST (18%)</span>
                  <span>₹{pricing?.gst}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-500 font-bold">
                  <span>Shipping Cost</span>
                  <span>₹{pricing?.shippingCost}</span>
                </div>
                <div className="flex justify-between text-2xl font-black text-gray-900 pt-2 border-t border-gray-100">
                  <span>Total Cost</span>
                  <span>₹{pricing?.totalCost}</span>
                </div>
              </div>

              <button className="w-full py-5 bg-gradient-to-r from-gray-400 to-gray-500 text-white rounded-full font-bold text-xl transition-all shadow-xl shadow-gray-200 flex items-center justify-center gap-3 group relative overflow-hidden">
                <span className="relative z-10">Save to Cart</span>
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center relative z-10">
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </div>
              </button>
              <p className="text-center text-primary text-[10px] font-bold">Upload a Gerber file above to proceed</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default QuoteForm
