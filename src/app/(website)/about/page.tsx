import { Target, Users, ShieldCheck, Globe } from 'lucide-react'

export default function AboutPage() {
  const values = [
    {
      icon: <Target className="w-6 h-6" />,
      title: "Precision First",
      description: "We believe in zero-defect manufacturing and absolute accuracy in every micron."
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Customer Centric",
      description: "Our platform is built around the engineer's workflow, making procurement effortless."
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Global Reach",
      description: "Connecting global design talent with world-class manufacturing infrastructure."
    },
    {
      icon: <ShieldCheck className="w-6 h-6" />,
      title: "Uncompromising Quality",
      description: "Rigorous testing and ISO-certified processes ensure mission-critical reliability."
    }
  ]

  return (
    <div className="pt-20 pb-32">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-32">
          <div>
            <h1 className="text-5xl md:text-6xl font-bold mb-8">Revolutionizing <span className="gradient-text">Hardware Production.</span></h1>
            <p className="text-gray-400 text-xl leading-relaxed mb-8">
              PCB GLOBE was founded with a single mission: to simplify the complex world of electronics manufacturing. 
              We've bridged the gap between design and physical product through a cloud-native, automated platform.
            </p>
            <p className="text-gray-500 text-lg leading-relaxed">
              Our state-of-the-art facilities and automated CAM analysis tools empower engineers to bring their designs to life 
              faster than ever before, without sacrificing the precision that high-end electronics demand.
            </p>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-primary/10 blur-[100px] rounded-full" />
            <img 
              src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=800" 
              alt="Our Facility" 
              className="rounded-[3rem] shadow-2xl relative z-10 border border-gray-800"
            />
          </div>
        </div>

        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Core Values</h2>
          <div className="w-20 h-1.5 bg-primary mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <div key={index} className="glass p-8 rounded-[2rem] border-gray-800 hover:border-primary/20 transition-all text-center">
              <div className="mb-6 p-4 bg-gray-900 w-fit mx-auto rounded-xl text-primary">
                {value.icon}
              </div>
              <h3 className="text-xl font-bold mb-4">{value.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
