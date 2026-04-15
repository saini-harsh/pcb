import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import LegalSidebar from '@/components/legal/LegalSidebar';

export default function PcbManufacturingMethodologyPage() {
  const steps = [
    { title: "PCB CAM processing", desc: "The first step is CAM processing of PCB and Generating Gerber files because before the manufacturing starts it is very important to have a design. It acts as a blueprint in the manufacturing process. There are many PCB Designing Tools like EAGLE, KiCAD, etc. All the guides on how to generate Gerber files from various Designing Tools is available in our User-Guides." },
    { title: "PCB bare board preparation", desc: "Once the design is ready we will know the required board area. Bare boards are then cut according to that board area." },
    { title: "Drilling the boards with excellon drill data", desc: "Holes are drilled on the bare board by locating their exact drill spots. This is done using the Gerber files. These holes are drilled to expose the surface and inner panels of the board." },
    { title: "Plating through the hole", desc: "Since the holes are drilled in the board there is no way for the current to pass through all the layers, that's when Plating through the hole comes in the picture. Copper is deposited on the inner surfaces of the holes which helps the current to flow through all the layers." },
    { title: "Applying negative circuit patterns on PCB", desc: "Then using the Gerber files as a blueprint, all the negative circuit patterns are applied on the Printed circuit board using ink." },
    { title: "Copper deposition", desc: "Copper deposition is an electrochemical process by which Copper is deposited onto the surface of the circuit board to build-up the tracks." },
    { title: "Tin-plating", desc: "Tin-plating is the process of coating copper traces with layers of tin, which will help in masking copper traces while the circuit board is being etched." },
    { title: "Applying positive patterns on the PCB", desc: "Then using the Gerber files as a blueprint, all the positive circuit patterns are applied on the Printed circuit board using ink." },
    { title: "Etching", desc: "PCB Etching is the process of removal of copper in the non circuit areas and helps in tracing the circuit design on the copper plate. This process is carried out by the use of chemicals to remove unwanted copper." },
    { title: "Tin-Striping", desc: "During the process of Tin-Stripping, the tin plated on the circuit patterns during the 7th step is removed using the chemicals, so that it does not damage the copper circuit tracks below the tin metal." },
    { title: "Solder mask", desc: "Solder mask or solder resist is a thin layer of polymer that is applied to the copper traces of a printed circuit board for protection against oxidation. They can be in any color, most commonly used color is Green." },
    { title: "HASL/ENIG", desc: "They are a type of finish used on printed circuit board. Lead-free plating is done around the holes and the SMD pads. HASL (hot air solder leveling) is the process of silver plating and ENIG (electroless nickel immersion gold) is the process of Gold plating." },
    { title: "Testing", desc: "Flying probe testing is done on the printed circuit boards for their electrical inspection i.e., a test of analog components, signature analysis, and open circuits." },
    { title: "Silkscreen", desc: "Silkscreen, also known as Legend printing, is the process of labeling the components, test points, PCB part numbers, warning Signals, etc. to identify the layers and components." },
    { title: "CNC routing of PCB", desc: "CNC (computer numerical control) router is a computer-controlled cutting machine which helps to cut the several printed circuit boards from a single panel in the required shape." },
    { title: "De-panelization of the boards and Packing", desc: "After the CNC routing, the boards are de-panelized from the panel and are packed for the shipping." },
    { title: "Shipping preparation and dispatch", desc: "Then the PCB(s) are shipped and the shipping details are also provided to track the order. And finally, the package reaches its destination." },
  ];

  return (
    <div className="min-h-screen bg-gray-50/50 pt-28 pb-32">
      <div className="container mx-auto px-4 sm:px-6 max-w-[1400px]">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-[13px] font-bold text-gray-500 mb-8 max-w-6xl mx-auto">
          <Link href="/" className="hover:text-[#ff6b00] transition-colors">Home</Link>
          <ChevronRight className="w-4 h-4 text-gray-400" />
          <span className="text-gray-900">PCB Manufacturing</span>
        </div>

        <div className="flex flex-col lg:flex-row gap-10 max-w-6xl mx-auto">
          <LegalSidebar />
          <div className="flex-1 bg-white border border-gray-100 rounded-3xl p-8 md:p-14 shadow-[0_8px_30px_rgb(0,0,0,0.04)] animate-in fade-in slide-in-from-bottom-8 duration-500">
            <h1 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight mb-10 pb-6 border-b border-gray-100">
              The Steps involved in PCB Manufacturing
            </h1>
            
            <div className="space-y-10">
              {steps.map((step, idx) => (
                <div key={idx} className="flex gap-6 group">
                  <div className="w-12 h-12 rounded-2xl bg-orange-50/80 border border-orange-100 flex items-center justify-center text-[#ff6b00] font-black text-lg shrink-0 group-hover:bg-[#ff6b00] group-hover:text-white transition-colors duration-300">
                    {idx + 1}
                  </div>
                  <div className="translate-y-1">
                    <h3 className="text-[17px] font-bold text-gray-900 mb-2 leading-tight">{step.title}</h3>
                    <p className="text-[15px] font-medium text-gray-600 leading-[1.8]">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
