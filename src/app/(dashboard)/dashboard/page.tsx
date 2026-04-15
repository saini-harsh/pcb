import Link from 'next/link'
import { Package, Clock, CircleCheck, CircleAlert, Plus } from 'lucide-react'

export default async function DashboardPage() {
  // Static preview data for the bypass mode
  const user = {
    firstName: 'Guest',
    lastName: 'User'
  }

  // Placeholder for orders fetch from Payload
  const orders = [
    { id: 'ORD-7721', name: 'Smart Watch V2 - Main Board', status: 'production', date: '2024-03-20', total: 145.50 },
    { id: 'ORD-6542', name: 'IoT Sensor Node - Prototype', status: 'shipped', date: '2024-03-15', total: 89.00 },
    { id: 'ORD-5501', name: 'Drone Flight Controller', status: 'delivered', date: '2024-03-01', total: 420.00 },
  ]

  const stats = [
    { label: 'Total Projects', value: '12', icon: <Package className="w-5 h-5 text-primary" /> },
    { label: 'In Production', value: '3', icon: <Clock className="w-5 h-5 text-orange-500" /> },
    { label: 'Delivered', value: '9', icon: <CircleCheck className="w-5 h-5 text-emerald-500" /> },
  ]

  return (
    <div className="pt-20 pb-32">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-bold mb-2">Welcome back, {user.firstName}</h1>
            <p className="text-gray-500">Manage your PCB projects and track production status at PCB GLOBE.</p>
          </div>
          <Link 
            href="/quote"
            className="px-6 py-3 bg-primary hover:bg-orange-600 text-white rounded-xl font-bold flex items-center gap-2 shadow-xl shadow-orange-900/20 transition-all"
          >
            <Plus className="w-5 h-5" /> New Project
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {stats.map((stat, i) => (
            <div key={i} className="glass p-8 rounded-3xl border-gray-800">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-gray-900 rounded-lg">{stat.icon}</div>
                <span className="text-sm font-medium text-gray-500">{stat.label}</span>
              </div>
              <div className="text-3xl font-bold">{stat.value}</div>
            </div>
          ))}
        </div>

        {/* Orders Table */}
        <div className="glass rounded-[2.5rem] border-gray-800 overflow-hidden">
          <div className="px-8 py-6 border-b border-gray-800 flex justify-between items-center">
            <h2 className="text-xl font-bold">Recent Projects</h2>
            <button className="text-sm text-primary font-medium hover:underline">View All</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-gray-500 text-xs uppercase tracking-widest bg-gray-900/50">
                  <th className="px-8 py-4 font-bold">Project ID</th>
                  <th className="px-8 py-4 font-bold">Name</th>
                  <th className="px-8 py-4 font-bold">Status</th>
                  <th className="px-8 py-4 font-bold">Date</th>
                  <th className="px-8 py-4 font-bold">Amount</th>
                  <th className="px-8 py-4 font-bold"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {orders.map((order) => (
                  <tr key={order.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="px-8 py-6 font-mono text-sm text-gray-400">{order.id}</td>
                    <td className="px-8 py-6 font-bold">{order.name}</td>
                    <td className="px-8 py-6">
                      <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                        order.status === 'production' ? 'bg-orange-500/10 text-orange-500' :
                        order.status === 'shipped' ? 'bg-cyan-500/10 text-cyan-500' :
                        'bg-emerald-500/10 text-emerald-500'
                      }`}>
                        <div className={`w-1.5 h-1.5 rounded-full ${
                          order.status === 'production' ? 'bg-orange-500 animate-pulse' :
                          order.status === 'shipped' ? 'bg-cyan-500' :
                          'bg-emerald-500'
                        }`} />
                        {order.status}
                      </div>
                    </td>
                    <td className="px-8 py-6 text-sm text-gray-500">{order.date}</td>
                    <td className="px-8 py-6 font-bold">${order.total.toFixed(2)}</td>
                    <td className="px-8 py-6 text-right">
                      <button className="text-gray-400 hover:text-white transition-colors">
                        <CircleAlert className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
