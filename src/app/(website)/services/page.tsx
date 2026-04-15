import { Cpu, Layers, Zap, ShieldCheck } from 'lucide-react'

export default function ServicesPage() {
  const services = [
    {
      title: "PCB Manufacturing",
      icon: <Layers className="w-8 h-8 text-primary" />,
      description: "From 1 to 32 layers, we offer a wide range of materials and finishes for mission-critical applications.",
      features: ["FR4, Rogers, Polyimide", "ENIG, HASL, OSP, Silver", "Blind & Buried Vias", "Controlled Impedance"]
    },
    {
      title: "PCB Assembly",
      icon: <Cpu className="w-8 h-8 text-emerald-500" />,
      description: "Turnkey PCBA services including component sourcing, SMT, and through-hole assembly.",
      features: ["01005 Components", "BGA & QFN X-Ray", "Conformal Coating", "Functional Testing"]
    },
    {
      title: "SMD Stencils",
      icon: <Zap className="w-8 h-8 text-purple-500" />,
      description: "Laser-cut stainless steel stencils for precise solder paste application.",
      features: ["Electropolished", "Framed or Frameless", "Nano Coating", "Custom Sizes"]
    },
    {
      title: "Prototype Service",
      icon: <ShieldCheck className="w-8 h-8 text-orange-500" />,
      description: "Dedicated production lines for rapid prototyping and low-volume production.",
      features: ["24-hour Lead Time", "No Minimum Order", "DFM Analysis", "Design Consultation"]
    }
  ]

  return (
    <div className="pt-20 pb-32">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mb-20">
          <h1 className="text-5xl md:text-6xl font-bold mb-8">Our <span className="gradient-text">Capabilities</span></h1>
          <p className="text-gray-400 text-xl leading-relaxed">
            We provide end-to-end hardware manufacturing solutions designed for speed, reliability, and precision.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <div key={index} className="glass p-12 rounded-[2.5rem] border-gray-800 flex flex-col items-start hover:border-primary/20 transition-all">
              <div className="mb-8 p-5 bg-gray-900 rounded-2xl">
                {service.icon}
              </div>
              <h2 className="text-3xl font-bold mb-4">{service.title}</h2>
              <p className="text-gray-500 mb-8 text-lg">
                {service.description}
              </p>
              <ul className="grid grid-cols-2 gap-4 w-full">
                {service.features.map((feature, fIndex) => (
                  <li key={fIndex} className="flex items-center gap-2 text-sm text-gray-400">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
