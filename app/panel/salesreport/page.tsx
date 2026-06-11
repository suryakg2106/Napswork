import { 
  Calendar, 
  ChevronDown, 
  Download, 
  TrendingUp, 
  TrendingDown, 
  MoreVertical,
  ArrowUpRight
} from "lucide-react";
import Image from "next/image";

export default function SalesReportPage() {
  const kpis = [
    { label: "Total Revenue", value: "$84,254.00", trend: "+12.5%", isPositive: true },
    { label: "New Customers", value: "1,245", trend: "+8.2%", isPositive: true },
    { label: "Active Subscriptions", value: "8,942", trend: "-1.4%", isPositive: false },
    { label: "MRR", value: "$42,500.00", trend: "+15.3%", isPositive: true },
  ];

  const recentSales = [
    { id: 1, customer: "TechCorp Inc.", plan: "Enterprise", amount: "$1,200.00", date: "Today, 10:42 AM", status: "Completed", logo: "https://api.dicebear.com/7.x/shapes/svg?seed=TechCorp" },
    { id: 2, customer: "Stark Industries", plan: "Pro", amount: "$299.00", date: "Today, 09:15 AM", status: "Completed", logo: "https://api.dicebear.com/7.x/shapes/svg?seed=Stark" },
    { id: 3, customer: "Wayne Enterprises", plan: "Enterprise", amount: "$1,200.00", date: "Yesterday", status: "Pending", logo: "https://api.dicebear.com/7.x/shapes/svg?seed=Wayne" },
    { id: 4, customer: "Acme Corp", plan: "Basic", amount: "$49.00", date: "Yesterday", status: "Completed", logo: "https://api.dicebear.com/7.x/shapes/svg?seed=Acme" },
    { id: 5, customer: "Globex", plan: "Pro", amount: "$299.00", date: "Oct 24, 2026", status: "Completed", logo: "https://api.dicebear.com/7.x/shapes/svg?seed=Globex" },
  ];

  return (
    <div className="space-y-6 pb-12 max-w-[1600px] mx-auto animate-in fade-in duration-500 bg-[#FAFAFA] min-h-screen -m-8 p-8">
      
      {/* HEADER SECTION */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-[28px] font-bold text-[#08080A] tracking-tight leading-tight">Sales Report</h1>
          <p className="text-gray-500 font-medium text-sm mt-1">Overview of your revenue and customer acquisition.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 text-[#08080A] font-semibold rounded-xl shadow-[0_2px_10px_rgba(0,0,0,0.02)] cursor-pointer hover:border-gray-300 transition-all text-sm">
            <Calendar size={16} className="text-gray-400" />
            <span>This Month</span>
            <ChevronDown size={16} className="text-gray-400 ml-2" />
          </div>
          <button className="flex items-center gap-2 px-5 py-2.5 bg-[#E64218] text-white font-semibold rounded-xl shadow-[0_4px_14px_rgba(230,66,24,0.25)] hover:bg-[#c93612] hover:-translate-y-0.5 transition-all text-sm">
            <Download size={16} strokeWidth={2.5} />
            Export Report
          </button>
        </div>
      </div>

      {/* KPI CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {kpis.map((kpi, i) => (
          <div key={i} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] flex flex-col justify-between group hover:border-[#5B8260]/30 transition-colors">
            <div className="flex justify-between items-start mb-4">
              <span className="text-gray-500 font-medium text-sm">{kpi.label}</span>
              <div className={`flex items-center gap-1 text-[11px] font-bold px-2 py-1 rounded-md ${kpi.isPositive ? 'text-[#3C5F3F] bg-[#3C5F3F]/10' : 'text-[#E64218] bg-[#E64218]/10'}`}>
                {kpi.isPositive ? <TrendingUp size={12} strokeWidth={3} /> : <TrendingDown size={12} strokeWidth={3} />}
                {kpi.trend}
              </div>
            </div>
            <p className="text-3xl font-bold text-[#08080A] tracking-tight">{kpi.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* REVENUE TRENDS CHART (Left 2/3) */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] p-6 flex flex-col">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-lg font-bold text-[#08080A]">Revenue Trends</h2>
              <p className="text-sm font-medium text-gray-400 mt-1">Daily revenue over the selected period</p>
            </div>
            <div className="flex items-center gap-4 text-sm font-semibold">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#5B8260]"></div>
                <span className="text-gray-600">Current</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-gray-200"></div>
                <span className="text-gray-400">Previous</span>
              </div>
            </div>
          </div>
          
          <div className="flex-1 relative min-h-[320px] w-full">
            {/* Custom SVG Chart mimicking Paperpillar's smooth areas */}
            <svg className="absolute inset-0 w-full h-full overflow-visible z-10" preserveAspectRatio="none">
              <defs>
                <linearGradient id="revenueGrad" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#5B8260" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#5B8260" stopOpacity="0" />
                </linearGradient>
              </defs>
              
              {/* Previous Period Line */}
              <path 
                d="M0,100 C20,90 40,110 60,80 C80,50 100,70 120,40 C140,10 160,50 180,30" 
                fill="none" 
                stroke="#F3F4F6" 
                strokeWidth="3" 
                strokeLinecap="round"
                strokeLinejoin="round"
                transform="scale(5.55, 2)"
                vectorEffect="non-scaling-stroke"
              />

              {/* Current Period Area */}
              <path 
                d="M0,120 C20,100 40,110 60,60 C80,10 100,40 120,15 C140,-10 160,20 180,5 L180,150 L0,150 Z" 
                fill="url(#revenueGrad)" 
                transform="scale(5.55, 2)"
                vectorEffect="non-scaling-stroke"
              />
              
              {/* Current Period Line */}
              <path 
                d="M0,120 C20,100 40,110 60,60 C80,10 100,40 120,15 C140,-10 160,20 180,5" 
                fill="none" 
                stroke="#3C5F3F" 
                strokeWidth="4" 
                strokeLinecap="round"
                strokeLinejoin="round"
                transform="scale(5.55, 2)"
                vectorEffect="non-scaling-stroke"
              />

              {/* Data Point Marker */}
              <circle cx="60%" cy="13%" r="5" fill="#FAFAFA" stroke="#E64218" strokeWidth="3" className="drop-shadow-md" />
            </svg>
            
            {/* Chart Grid Lines */}
            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none z-0">
              <div className="border-t border-gray-100 w-full"></div>
              <div className="border-t border-gray-100 w-full"></div>
              <div className="border-t border-gray-100 w-full"></div>
              <div className="border-t border-gray-100 w-full"></div>
              <div className="border-t border-gray-100 w-full"></div>
            </div>
            
            {/* Tooltip */}
            <div className="absolute left-[60%] top-[3%] -translate-x-1/2 -translate-y-full z-20 pb-2">
              <div className="bg-[#08080A] text-white text-xs font-bold py-2 px-3 rounded-lg shadow-xl flex flex-col items-center">
                <span>$12,450.00</span>
                <span className="text-gray-400 font-medium text-[10px]">Oct 15, 2026</span>
                <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-[#08080A]"></div>
              </div>
            </div>
          </div>
          
          <div className="mt-4 pt-4 flex justify-between text-[11px] font-bold text-gray-400 uppercase tracking-widest">
            <span>01 Oct</span>
            <span>08 Oct</span>
            <span>15 Oct</span>
            <span>22 Oct</span>
            <span>29 Oct</span>
          </div>
        </div>

        {/* PLAN PERFORMANCE (Right 1/3) */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] p-6 flex flex-col">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-lg font-bold text-[#08080A]">Plan Performance</h2>
            <button className="text-gray-400 hover:text-[#08080A] transition-colors">
              <MoreVertical size={20} />
            </button>
          </div>
          
          <div className="flex-1 flex flex-col items-center justify-center relative min-h-[220px]">
            {/* Mock Donut Chart */}
            <div className="relative w-48 h-48">
              <svg className="w-full h-full transform -rotate-90">
                {/* Basic Circle */}
                <circle cx="50%" cy="50%" r="40%" fill="transparent" stroke="#F3F4F6" strokeWidth="16" />
                {/* Enterprise Segment */}
                <circle cx="50%" cy="50%" r="40%" fill="transparent" stroke="#3C5F3F" strokeWidth="16" strokeDasharray="251.2" strokeDashoffset="62.8" strokeLinecap="round" className="drop-shadow-sm" />
                {/* Pro Segment */}
                <circle cx="50%" cy="50%" r="40%" fill="transparent" stroke="#5B8260" strokeWidth="16" strokeDasharray="251.2" strokeDashoffset="175.84" strokeLinecap="round" className="origin-center rotate-[90deg] drop-shadow-sm" />
                {/* Basic Segment */}
                <circle cx="50%" cy="50%" r="40%" fill="transparent" stroke="#E64218" strokeWidth="16" strokeDasharray="251.2" strokeDashoffset="226.08" strokeLinecap="round" className="origin-center rotate-[216deg] drop-shadow-sm" />
              </svg>
              {/* Center Content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-black text-[#08080A]">75%</span>
                <span className="text-xs font-semibold text-gray-500">Enterprise</span>
              </div>
            </div>
          </div>

          {/* Legend */}
          <div className="mt-8 space-y-4">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2 font-semibold text-[#08080A]">
                <div className="w-3 h-3 rounded-full bg-[#3C5F3F]"></div>
                Enterprise
              </div>
              <span className="font-bold">75%</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2 font-semibold text-[#08080A]">
                <div className="w-3 h-3 rounded-full bg-[#5B8260]"></div>
                Pro
              </div>
              <span className="font-bold">15%</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2 font-semibold text-[#08080A]">
                <div className="w-3 h-3 rounded-full bg-[#E64218]"></div>
                Basic
              </div>
              <span className="font-bold">10%</span>
            </div>
          </div>
        </div>

      </div>

      {/* RECENT SALES TABLE */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-lg font-bold text-[#08080A]">Recent Sales</h2>
          <button className="text-sm font-semibold text-[#3C5F3F] hover:text-[#2b442d] transition-colors flex items-center gap-1">
            View All <ArrowUpRight size={16} />
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-[#FAFAFA] border-b border-gray-100">
                <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-widest">Customer</th>
                <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-widest">Plan</th>
                <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-widest">Date</th>
                <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-widest">Status</th>
                <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-widest text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {recentSales.map((sale) => (
                <tr key={sale.id} className="hover:bg-gray-50/50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-[10px] bg-gray-50 border border-gray-100 p-2 shrink-0">
                         <Image src={sale.logo} alt={sale.customer} width={24} height={24} unoptimized />
                      </div>
                      <span className="font-bold text-[#08080A]">{sale.customer}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex font-semibold text-xs px-2.5 py-1 rounded-md ${
                      sale.plan === 'Enterprise' ? 'bg-[#3C5F3F]/10 text-[#3C5F3F]' :
                      sale.plan === 'Pro' ? 'bg-[#5B8260]/10 text-[#5B8260]' :
                      'bg-gray-100 text-gray-600'
                    }`}>
                      {sale.plan}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-500">
                    {sale.date}
                  </td>
                  <td className="px-6 py-4">
                    <span className="flex items-center gap-1.5 text-sm font-medium text-gray-600">
                      {sale.status === 'Completed' ? (
                        <div className="w-2 h-2 rounded-full bg-[#5B8260]"></div>
                      ) : (
                        <div className="w-2 h-2 rounded-full bg-[#E64218]"></div>
                      )}
                      {sale.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span className="font-bold text-[#08080A]">{sale.amount}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
