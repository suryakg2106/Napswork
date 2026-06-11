import { 
  Phone, 
  Mail, 
  MessageSquare, 
  Briefcase, 
  MoreHorizontal, 
  Search, 
  MapPin, 
  DollarSign,
  ChevronRight,
  Calendar as CalendarIcon,
  Video,
  FileText,
  Clock,
  ArrowUpRight,
  TrendingUp,
  Users,
  ArrowDownRight
} from "lucide-react";
import Image from "next/image";

export default function CustomersPage() {
  const interactions = [
    { id: 1, type: "Video Call", title: "Product Demo Q4", date: "Today, 10:00 AM", desc: "Eva attended the demo for new Q4 features. Highly engaged.", color: "bg-[#2D5BFF] text-white", icon: Video, avatars: ["https://api.dicebear.com/7.x/avataaars/svg?seed=Sam", "https://api.dicebear.com/7.x/avataaars/svg?seed=Eva"] },
    { id: 2, type: "Document", title: "Contract Sent", date: "Yesterday", desc: "Enterprise SLA contract sent for review to legal team.", color: "bg-white text-gray-900", icon: FileText, avatars: ["https://api.dicebear.com/7.x/avataaars/svg?seed=Legal"] },
    { id: 3, type: "Meeting", title: "Follow-up Call", date: "Oct 22, 2026", desc: "Discussed integration timelines and API limits.", color: "bg-[#06B6D4] text-white", icon: Phone, avatars: ["https://api.dicebear.com/7.x/avataaars/svg?seed=Tech"] },
    { id: 4, type: "Status", title: "Negotiation", date: "Oct 20, 2026", desc: "Pricing negotiations ongoing. Requested 10% volume discount.", color: "bg-[#F8E71C] text-gray-900", icon: Clock, avatars: ["https://api.dicebear.com/7.x/avataaars/svg?seed=Sales"] },
  ];

  return (
    <div className="relative min-h-[calc(100vh-100px)] p-2 sm:p-4">
      {/* Soft Background Gradient (Pale Blue to Light Lime Green) */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[#E8F0FE] via-[#F4F7FB] to-[#E5F9E0] rounded-[32px] opacity-80"></div>
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 px-4 pt-4">
        <div>
          <h1 className="text-[32px] font-black text-gray-900 tracking-tight leading-none mb-1">Customer Information</h1>
          <p className="text-gray-500 font-medium text-sm">Manage relationships and track interactions.</p>
        </div>
        
        <div className="flex items-center gap-2 p-1.5 bg-white/60 backdrop-blur-md rounded-full border border-white">
          <button className="px-5 py-2 text-sm font-bold bg-[#0F111A] text-white rounded-full shadow-md">Contacts</button>
          <button className="px-5 py-2 text-sm font-bold text-gray-500 hover:text-gray-900 transition-colors">Organizations</button>
          <button className="px-5 py-2 text-sm font-bold text-gray-500 hover:text-gray-900 transition-colors">Segments</button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        
        {/* LEFT / CENTER PANEL (Spans 8 columns) */}
        <div className="xl:col-span-8 flex flex-col gap-8">
          
          {/* Top Metrics Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Metric 1 */}
            <div className="bg-white/70 backdrop-blur-xl rounded-[24px] p-6 border border-white shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
              <div className="flex justify-between items-start mb-4">
                <div className="w-12 h-12 rounded-[16px] bg-blue-50 text-[#2D5BFF] flex items-center justify-center">
                  <TrendingUp size={24} strokeWidth={2.5} />
                </div>
                <span className="flex items-center gap-1 text-[12px] font-bold px-2.5 py-1 rounded-full text-emerald-700 bg-emerald-100">
                  <ArrowUpRight size={14} strokeWidth={3} /> +11% week
                </span>
              </div>
              <p className="text-gray-500 font-semibold text-sm mb-1">Total Revenue</p>
              <p className="text-3xl font-black text-gray-900 tracking-tight">$842.5k</p>
            </div>

            {/* Metric 2 */}
            <div className="bg-white/70 backdrop-blur-xl rounded-[24px] p-6 border border-white shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
              <div className="flex justify-between items-start mb-4">
                <div className="w-12 h-12 rounded-[16px] bg-teal-50 text-teal-600 flex items-center justify-center">
                  <Users size={24} strokeWidth={2.5} />
                </div>
                <span className="flex items-center gap-1 text-[12px] font-bold px-2.5 py-1 rounded-full text-emerald-700 bg-emerald-100">
                  <ArrowUpRight size={14} strokeWidth={3} /> +4% week
                </span>
              </div>
              <p className="text-gray-500 font-semibold text-sm mb-1">New Customers</p>
              <p className="text-3xl font-black text-gray-900 tracking-tight">1,204</p>
            </div>

            {/* Metric 3 */}
            <div className="bg-white/70 backdrop-blur-xl rounded-[24px] p-6 border border-white shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
              <div className="flex justify-between items-start mb-4">
                <div className="w-12 h-12 rounded-[16px] bg-yellow-50 text-yellow-600 flex items-center justify-center">
                  <FileText size={24} strokeWidth={2.5} />
                </div>
                <span className="flex items-center gap-1 text-[12px] font-bold px-2.5 py-1 rounded-full text-rose-700 bg-rose-100">
                  <ArrowDownRight size={14} strokeWidth={3} /> -2% week
                </span>
              </div>
              <p className="text-gray-500 font-semibold text-sm mb-1">Pending Tasks</p>
              <p className="text-3xl font-black text-gray-900 tracking-tight">42</p>
            </div>
          </div>

          {/* Interaction History */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between px-2">
              <h2 className="text-xl font-black text-gray-900 tracking-tight">Interaction History</h2>
              <button className="text-sm font-bold text-[#2D5BFF] hover:underline">View All</button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {interactions.map((item) => (
                <div key={item.id} className={`${item.color} rounded-[24px] p-6 border ${item.color.includes('bg-white') ? 'border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)]' : 'border-transparent shadow-lg'} hover:-translate-y-1 transition-transform duration-300 relative overflow-hidden group`}>
                  {/* Subtle glare effect for colored cards */}
                  {!item.color.includes('bg-white') && (
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
                  )}
                  
                  <div className="flex items-start justify-between mb-4 relative z-10">
                    <span className={`text-[11px] font-bold uppercase tracking-widest px-3 py-1 rounded-full ${item.color.includes('bg-white') ? 'bg-gray-100 text-gray-500' : 'bg-black/10'}`}>
                      {item.type}
                    </span>
                    <item.icon size={20} className={item.color.includes('bg-white') ? 'text-gray-400' : 'opacity-80'} />
                  </div>
                  
                  <div className="relative z-10">
                    <h3 className="text-xl font-bold mb-2 tracking-tight">{item.title}</h3>
                    <p className={`text-sm font-medium mb-6 ${item.color.includes('bg-white') ? 'text-gray-500' : 'opacity-90'}`}>
                      {item.desc}
                    </p>
                  </div>
                  
                  <div className="flex items-center justify-between mt-auto relative z-10">
                    <div className="flex -space-x-2">
                      {item.avatars.map((avatar, i) => (
                        <div key={i} className="w-8 h-8 rounded-full border-2 border-white/20 bg-gray-200 overflow-hidden relative">
                           <Image src={avatar} alt="Avatar" fill unoptimized className="object-cover" />
                        </div>
                      ))}
                    </div>
                    <span className={`text-xs font-bold ${item.color.includes('bg-white') ? 'text-gray-400' : 'opacity-70'}`}>
                      {item.date}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Row: Calendar & Funnel */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Tasks Schedule (Calendar) */}
            <div className="bg-white/80 backdrop-blur-xl rounded-[24px] border border-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-black text-gray-900 tracking-tight">Tasks Schedule</h2>
                <div className="flex items-center gap-2 bg-gray-100 rounded-full p-1">
                  <button className="p-1.5 bg-white rounded-full shadow-sm"><CalendarIcon size={14} className="text-gray-900" /></button>
                  <button className="p-1.5 rounded-full text-gray-500"><MoreHorizontal size={14} /></button>
                </div>
              </div>
              
              {/* Mock Calendar UI */}
              <div className="space-y-4">
                <div className="flex justify-between text-xs font-bold text-gray-400 uppercase tracking-widest px-2">
                  <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span>
                </div>
                <div className="grid grid-cols-5 gap-2">
                  {[...Array(15)].map((_, i) => {
                    const isTask1 = i === 7;
                    const isTask2 = i === 12;
                    return (
                      <div key={i} className={`aspect-square rounded-2xl flex flex-col items-center justify-center gap-1 font-bold text-sm transition-colors ${
                        isTask1 ? 'bg-[#2D5BFF] text-white shadow-md' : 
                        isTask2 ? 'bg-[#F8E71C] text-gray-900 shadow-md' : 
                        'bg-gray-50/50 text-gray-500 hover:bg-gray-100 cursor-pointer'
                      }`}>
                        {i + 10}
                        {(isTask1 || isTask2) && (
                          <div className="w-1.5 h-1.5 rounded-full bg-white/50"></div>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>

            {/* Stage Funnel */}
            <div className="bg-white/80 backdrop-blur-xl rounded-[24px] border border-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-6 flex flex-col">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-black text-gray-900 tracking-tight">Stage Funnel</h2>
                <div className="bg-gray-100 rounded-full p-1 flex text-[11px] font-bold">
                  <button className="px-3 py-1 bg-white rounded-full shadow-sm text-gray-900">Total</button>
                  <button className="px-3 py-1 text-gray-500">Weighted</button>
                </div>
              </div>
              
              <div className="flex-1 flex flex-col justify-center gap-3">
                <div className="w-full bg-[#2D5BFF] text-white rounded-2xl p-3 flex justify-between items-center shadow-sm">
                  <span className="text-xs font-bold uppercase tracking-wider opacity-90">Prospects</span>
                  <span className="font-black">1,402</span>
                </div>
                <div className="w-[85%] mx-auto bg-[#06B6D4] text-white rounded-2xl p-3 flex justify-between items-center shadow-sm">
                  <span className="text-xs font-bold uppercase tracking-wider opacity-90">Qualified</span>
                  <span className="font-black">945</span>
                </div>
                <div className="w-[70%] mx-auto bg-[#10B981] text-white rounded-2xl p-3 flex justify-between items-center shadow-sm">
                  <span className="text-xs font-bold uppercase tracking-wider opacity-90">Proposal</span>
                  <span className="font-black">412</span>
                </div>
                <div className="w-[55%] mx-auto bg-[#F8E71C] text-gray-900 rounded-2xl p-3 flex justify-between items-center shadow-sm">
                  <span className="text-xs font-bold uppercase tracking-wider opacity-90">Won</span>
                  <span className="font-black">186</span>
                </div>
              </div>
            </div>
            
          </div>
        </div>

        {/* RIGHT PANEL (Sidebar - Spans 4 columns) */}
        <div className="xl:col-span-4">
          <div className="bg-white/60 backdrop-blur-2xl rounded-[32px] border border-white shadow-[0_8px_30px_rgb(0,0,0,0.06)] overflow-hidden h-full flex flex-col">
            
            {/* Cover Profile */}
            <div className="pt-10 pb-6 px-8 flex flex-col items-center text-center relative border-b border-gray-100/50">
              <div className="absolute top-4 right-4 flex gap-2">
                <button className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-gray-400 hover:text-gray-900 shadow-sm border border-gray-100 transition-colors">
                  <Search size={18} />
                </button>
                <button className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-gray-400 hover:text-gray-900 shadow-sm border border-gray-100 transition-colors">
                  <MoreHorizontal size={18} />
                </button>
              </div>

              <div className="relative mb-5">
                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-xl relative z-10">
                  <Image src="https://api.dicebear.com/7.x/avataaars/svg?seed=Eva" alt="Eva Robinson" fill unoptimized className="object-cover bg-blue-50" />
                </div>
                <div className="absolute bottom-1 right-1 w-6 h-6 bg-emerald-400 border-2 border-white rounded-full z-20 shadow-sm"></div>
                {/* Decorative background circle */}
                <div className="absolute inset-0 bg-[#2D5BFF]/10 rounded-full blur-xl scale-150 z-0"></div>
              </div>
              
              <h2 className="text-2xl font-black text-gray-900 tracking-tight">Eva Robinson</h2>
              <p className="text-sm font-semibold text-gray-500 mt-1">Chief Marketing Officer</p>
              <p className="text-sm font-bold text-[#2D5BFF] mt-1 bg-blue-50 px-3 py-1 rounded-lg">TechFlow Inc.</p>

              {/* Social / Connect Row */}
              <div className="flex gap-4 mt-8">
                <button className="w-12 h-12 rounded-2xl bg-[#25D366]/10 text-[#25D366] flex items-center justify-center hover:scale-110 transition-transform">
                  <Phone size={22} fill="currentColor" />
                </button>
                <button className="w-12 h-12 rounded-2xl bg-[#0078D4]/10 text-[#0078D4] flex items-center justify-center hover:scale-110 transition-transform">
                  <Briefcase size={22} fill="currentColor" />
                </button>
                <button className="w-12 h-12 rounded-2xl bg-[#EA4335]/10 text-[#EA4335] flex items-center justify-center hover:scale-110 transition-transform">
                  <Mail size={22} fill="currentColor" />
                </button>
                <button className="w-12 h-12 rounded-2xl bg-gray-100 text-gray-600 flex items-center justify-center hover:scale-110 transition-transform">
                  <MessageSquare size={22} fill="currentColor" />
                </button>
              </div>
            </div>

            {/* Detailed Information List */}
            <div className="p-8 flex-1">
              <h3 className="text-xs font-black uppercase tracking-widest text-gray-400 mb-6">Detailed Information</h3>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400 shrink-0">
                    <Mail size={18} />
                  </div>
                  <div className="pt-0.5">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-0.5">Email</p>
                    <p className="text-[15px] font-bold text-gray-900">eva.robinson@techflow.io</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400 shrink-0">
                    <Phone size={18} />
                  </div>
                  <div className="pt-0.5">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-0.5">Phone</p>
                    <p className="text-[15px] font-bold text-gray-900">+1 (555) 019-2834</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400 shrink-0">
                    <MapPin size={18} />
                  </div>
                  <div className="pt-0.5">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-0.5">Location</p>
                    <p className="text-[15px] font-bold text-gray-900">San Francisco, CA, USA</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-[#2D5BFF] shrink-0">
                    <DollarSign size={18} />
                  </div>
                  <div className="pt-0.5">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-0.5">Deal Value (LTV)</p>
                    <p className="text-[15px] font-black text-[#2D5BFF]">$142,500.00</p>
                    <p className="text-xs font-semibold text-gray-400 mt-1">Won from 76 Deals</p>
                  </div>
                </div>
              </div>

              <div className="mt-10">
                <button className="w-full py-4 rounded-[16px] bg-white border border-gray-200 text-gray-900 font-bold hover:bg-gray-50 transition-colors shadow-sm flex items-center justify-center gap-2">
                  Edit Profile <ChevronRight size={16} className="text-gray-400" />
                </button>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
