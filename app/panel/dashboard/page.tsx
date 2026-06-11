import { 
  ArrowUpRight, 
  ArrowDownRight, 
  MoreHorizontal, 
  Plus,
  Calendar,
  DollarSign,
  ShoppingCart,
  Users,
  Megaphone,
  Camera,
  Search,
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  const stats = [
    { label: "Total Revenue", value: "$124,563.00", icon: DollarSign, trend: "+14.5%", isPositive: true, color: "text-[#6366F1]", bg: "bg-indigo-50" },
    { label: "Average Order Value", value: "$142.50", icon: ShoppingCart, trend: "+5.2%", isPositive: true, color: "text-[#10B981]", bg: "bg-emerald-50" },
    { label: "New Subscriptions", value: "1,234", icon: Users, trend: "-2.1%", isPositive: false, color: "text-[#F43F5E]", bg: "bg-rose-50" },
    { label: "Total Orders", value: "8,432", icon: ShoppingCart, trend: "+21.4%", isPositive: true, color: "text-[#3B82F6]", bg: "bg-blue-50" },
  ];

  const campaigns = [
    { id: 1, name: "Retargeting Q4", platform: "Social Ads", spend: "$4,200", roi: "2.4x", status: "Active", icon: Megaphone, iconColor: "text-blue-600", iconBg: "bg-blue-50" },
    { id: 2, name: "Search Brand", platform: "Search Ads", spend: "$1,200", roi: "3.1x", status: "Active", icon: Search, iconColor: "text-orange-500", iconBg: "bg-orange-50" },
    { id: 3, name: "Video Lookalike", platform: "Visual Ads", spend: "$800", roi: "1.2x", status: "Paused", icon: Camera, iconColor: "text-pink-600", iconBg: "bg-pink-50" },
    { id: 4, name: "Cold Audience", platform: "Social Ads", spend: "$1,500", roi: "0.8x", status: "Warning", icon: Megaphone, iconColor: "text-blue-600", iconBg: "bg-blue-50" },
  ];

  return (
    <div className="space-y-8 pb-12 max-w-[1600px] mx-auto">
      
      {/* HEADER SECTION */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">Campaigns Dashboard</h1>
          <p className="text-gray-500 font-medium mt-1">Track your revenue and campaign performance.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 text-gray-700 font-bold rounded-2xl shadow-sm hover:bg-gray-50 transition-all text-sm">
            <Calendar size={18} className="text-gray-400" />
            Oct 1 - Oct 31, 2026
          </button>
          <Link href="/panel/product/add" className="flex items-center gap-2 px-5 py-2.5 bg-[#6366F1] text-white font-bold rounded-2xl shadow-[0_4px_14px_rgba(99,102,241,0.3)] hover:bg-indigo-600 hover:-translate-y-0.5 transition-all text-sm">
            <Plus size={18} strokeWidth={3} />
            Create Campaign
          </Link>
        </div>
      </div>

      {/* TOP KPI GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white rounded-[24px] p-7 border border-gray-100 shadow-[0_4px_24px_-8px_rgba(0,0,0,0.05)] relative overflow-hidden group">
            <div className="flex justify-between items-start mb-6">
              <div className={`w-12 h-12 rounded-[18px] ${stat.bg} ${stat.color} flex items-center justify-center`}>
                <stat.icon size={24} strokeWidth={2.5} />
              </div>
              <span className={`flex items-center gap-1 text-[13px] font-bold px-3 py-1 rounded-full ${stat.isPositive ? 'text-emerald-600 bg-emerald-50' : 'text-rose-600 bg-rose-50'}`}>
                {stat.isPositive ? <ArrowUpRight size={16} strokeWidth={3} /> : <ArrowDownRight size={16} strokeWidth={3} />}
                {stat.trend}
              </span>
            </div>
            <div>
              <h3 className="text-gray-500 font-semibold text-sm mb-1">{stat.label}</h3>
              <p className="text-[32px] font-black text-gray-900 tracking-tight leading-none">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* MAIN SPLIT */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* REVENUE CHART (Left 2/3) */}
        <div className="lg:col-span-2 bg-white rounded-[24px] border border-gray-100 shadow-[0_4px_24px_-8px_rgba(0,0,0,0.05)] p-8 flex flex-col">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <h2 className="text-xl font-black text-gray-900 tracking-tight">Revenue Performance</h2>
              <p className="text-sm font-semibold text-gray-400 mt-1">Comparing current vs. previous period</p>
            </div>
            <div className="flex items-center gap-1 p-1 bg-gray-50 rounded-[14px] border border-gray-100">
              <button className="px-5 py-2 text-sm font-bold bg-white text-gray-900 rounded-[10px] shadow-sm border border-gray-200/60">12 Months</button>
              <button className="px-5 py-2 text-sm font-bold text-gray-500 hover:text-gray-900 transition-colors">30 Days</button>
              <button className="px-5 py-2 text-sm font-bold text-gray-500 hover:text-gray-900 transition-colors">7 Days</button>
            </div>
          </div>
          
          <div className="flex-1 relative min-h-[300px] w-full mt-4">
            {/* Custom SVG Gradient Chart */}
            <svg className="absolute inset-0 w-full h-full overflow-visible z-10" preserveAspectRatio="none">
              <defs>
                <linearGradient id="primaryLineGrad" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#6366F1" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#6366F1" stopOpacity="0" />
                </linearGradient>
              </defs>
              {/* Previous Period (Gray dashed line) */}
              <path 
                d="M0,130 C20,110 40,120 60,90 C80,60 100,80 120,50 C140,20 160,60 180,40" 
                fill="none" 
                stroke="#E2E8F0" 
                strokeWidth="3" 
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray="6 6"
                transform="scale(5.55, 2)"
                vectorEffect="non-scaling-stroke"
              />
              {/* Current Period Fill */}
              <path 
                d="M0,100 C20,80 40,90 60,60 C80,30 100,50 120,20 C140,-10 160,30 180,10 L180,150 L0,150 Z" 
                fill="url(#primaryLineGrad)" 
                transform="scale(5.55, 2)"
                vectorEffect="non-scaling-stroke"
              />
              {/* Current Period Stroke */}
              <path 
                d="M0,100 C20,80 40,90 60,60 C80,30 100,50 120,20 C140,-10 160,30 180,10" 
                fill="none" 
                stroke="#6366F1" 
                strokeWidth="4" 
                strokeLinecap="round"
                strokeLinejoin="round"
                transform="scale(5.55, 2)"
                vectorEffect="non-scaling-stroke"
                className="drop-shadow-[0_4px_6px_rgba(99,102,241,0.2)]"
              />
            </svg>
            
            {/* Chart Grid Lines */}
            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none z-0">
              <div className="border-t border-dashed border-gray-100 w-full"></div>
              <div className="border-t border-dashed border-gray-100 w-full"></div>
              <div className="border-t border-dashed border-gray-100 w-full"></div>
              <div className="border-t border-dashed border-gray-100 w-full"></div>
            </div>
            
            {/* Tooltip Mock */}
            <div className="absolute left-[65%] top-[25%] z-20">
              <div className="w-4 h-4 bg-white border-4 border-[#6366F1] rounded-full shadow-[0_0_0_4px_rgba(99,102,241,0.15)] cursor-pointer hover:scale-125 transition-transform"></div>
              <div className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs font-bold py-2 px-3 rounded-xl shadow-xl whitespace-nowrap">
                $24,500.00
                <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
              </div>
            </div>
          </div>
          
          <div className="mt-4 pt-4 flex justify-between text-xs font-bold text-gray-400">
            <span>Jan</span>
            <span>Feb</span>
            <span>Mar</span>
            <span>Apr</span>
            <span>May</span>
            <span>Jun</span>
          </div>

          <div className="grid grid-cols-2 gap-6 mt-8 pt-8 border-t border-gray-100">
            <div>
              <p className="text-sm font-semibold text-gray-500 mb-1">Total Target</p>
              <div className="flex items-end gap-3">
                <p className="text-2xl font-black text-gray-900">$250k</p>
                <span className="text-sm font-bold text-emerald-500 bg-emerald-50 px-2 py-0.5 rounded-md mb-1">49.8%</span>
              </div>
              <div className="w-full h-2 bg-gray-100 rounded-full mt-3 overflow-hidden">
                <div className="h-full bg-[#6366F1] rounded-full" style={{ width: '49.8%' }}></div>
              </div>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-500 mb-1">Total Spend</p>
              <div className="flex items-end gap-3">
                <p className="text-2xl font-black text-gray-900">$18,450</p>
                <span className="text-sm font-bold text-gray-500 bg-gray-100 px-2 py-0.5 rounded-md mb-1">On track</span>
              </div>
            </div>
          </div>
        </div>

        {/* ACTIVE CAMPAIGNS (Right 1/3) */}
        <div className="bg-white rounded-[24px] border border-gray-100 shadow-[0_4px_24px_-8px_rgba(0,0,0,0.05)] p-8 flex flex-col">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-black text-gray-900 tracking-tight">Active Campaigns</h2>
            <button className="text-gray-400 hover:text-gray-600 bg-gray-50 p-2 rounded-xl transition-colors">
              <MoreHorizontal size={20} />
            </button>
          </div>
          
          <div className="space-y-6 flex-1">
            {campaigns.map((campaign) => (
              <div key={campaign.id} className="flex items-center justify-between group cursor-pointer p-2 -m-2 rounded-2xl hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className={`w-[50px] h-[50px] rounded-[16px] ${campaign.iconBg} ${campaign.iconColor} flex items-center justify-center shadow-sm`}>
                    <campaign.icon size={24} strokeWidth={2} />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-[15px] group-hover:text-[#6366F1] transition-colors">{campaign.name}</h4>
                    <p className="text-xs font-semibold text-gray-400 mt-0.5">{campaign.platform}</p>
                  </div>
                </div>
                <div className="text-right flex flex-col items-end">
                  <p className="font-black text-gray-900 text-[15px]">{campaign.spend}</p>
                  {campaign.status === "Active" && (
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md mt-1 uppercase tracking-wider">
                      <CheckCircle2 size={10} strokeWidth={3} /> {campaign.status}
                    </span>
                  )}
                  {campaign.status === "Paused" && (
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-gray-500 bg-gray-100 px-2 py-0.5 rounded-md mt-1 uppercase tracking-wider">
                      {campaign.status}
                    </span>
                  )}
                  {campaign.status === "Warning" && (
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-md mt-1 uppercase tracking-wider">
                      <AlertCircle size={10} strokeWidth={3} /> {campaign.status}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
          
          <button className="w-full mt-8 py-3.5 bg-gray-50 hover:bg-gray-100 text-gray-700 font-bold text-sm rounded-[14px] border border-gray-100 transition-colors">
            View All Campaigns
          </button>
        </div>

      </div>
    </div>
  );
}
