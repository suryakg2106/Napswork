import { 
  Search, 
  Filter, 
  Download, 
  ChevronDown, 
  ArrowUpRight, 
  ArrowDownRight,
  Coffee,
  ShoppingBag,
  Monitor,
  Home,
  Car,
  MoreVertical,
  Calendar
} from "lucide-react";

export default function TransactionPage() {
  const summaryCards = [
    { label: "Total Balance", value: "$124,563.00", trend: "+2.5%", isPositive: true },
    { label: "Total Income", value: "$45,231.89", trend: "+14.5%", isPositive: true },
    { label: "Total Expense", value: "$12,450.00", trend: "-5.2%", isPositive: false },
    { label: "Total Saving", value: "$32,781.89", trend: "+8.4%", isPositive: true },
  ];

  const transactions = [
    { id: 1, name: "Starbucks Coffee", category: "Food & Drink", date: "Oct 24, 2026", time: "09:45 AM", amount: "-$5.50", type: "expense", status: "Completed", icon: Coffee, bg: "bg-orange-50", color: "text-orange-500" },
    { id: 2, name: "Apple Store", category: "Electronics", date: "Oct 23, 2026", time: "14:20 PM", amount: "-$1,299.00", type: "expense", status: "Completed", icon: Monitor, bg: "bg-gray-100", color: "text-gray-700" },
    { id: 3, name: "Upwork Earnings", category: "Income", date: "Oct 22, 2026", time: "11:00 AM", amount: "+$3,450.00", type: "income", status: "Completed", icon: ArrowDownRight, bg: "bg-emerald-50", color: "text-emerald-500" },
    { id: 4, name: "Uber Ride", category: "Transport", date: "Oct 21, 2026", time: "18:30 PM", amount: "-$24.50", type: "expense", status: "Completed", icon: Car, bg: "bg-blue-50", color: "text-blue-500" },
    { id: 5, name: "Amazon Purchases", category: "Shopping", date: "Oct 20, 2026", time: "10:15 AM", amount: "-$145.20", type: "expense", status: "Pending", icon: ShoppingBag, bg: "bg-purple-50", color: "text-purple-500" },
    { id: 6, name: "Monthly Rent", category: "Housing", date: "Oct 19, 2026", time: "00:00 AM", amount: "-$2,400.00", type: "expense", status: "Completed", icon: Home, bg: "bg-rose-50", color: "text-rose-500" },
    { id: 7, name: "Client Payment", category: "Income", date: "Oct 18, 2026", time: "16:45 PM", amount: "+$5,000.00", type: "income", status: "Completed", icon: ArrowDownRight, bg: "bg-emerald-50", color: "text-emerald-500" },
  ];

  return (
    <div className="space-y-8 pb-12 max-w-[1600px] mx-auto animate-in fade-in duration-500">
      
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="text-[32px] font-black text-gray-900 tracking-tight leading-none mb-2">Transactions</h1>
          <p className="text-gray-500 font-medium text-sm">Monitor your daily income and expenses.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 text-gray-700 font-bold rounded-[14px] shadow-sm hover:bg-gray-50 transition-all text-sm">
            <Download size={18} className="text-gray-400" />
            Export
          </button>
          <button className="flex items-center gap-2 px-5 py-2.5 bg-[#0F111A] text-white font-bold rounded-[14px] shadow-[0_4px_14px_rgba(0,0,0,0.1)] hover:bg-gray-800 hover:-translate-y-0.5 transition-all text-sm">
            <Calendar size={18} />
            Select Date Range
          </button>
        </div>
      </div>

      {/* SUMMARY CARDS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {summaryCards.map((card, i) => (
          <div key={i} className="bg-white rounded-[24px] p-5 sm:p-6 border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative overflow-hidden group">
            {/* Subtle Top Border Highlight */}
            <div className={`absolute top-0 left-0 w-full h-1 ${i === 0 ? 'bg-[#0F111A]' : i === 1 ? 'bg-emerald-500' : i === 2 ? 'bg-rose-500' : 'bg-blue-500'}`}></div>
            
            <p className="text-gray-500 font-semibold text-sm mb-3">{card.label}</p>
            <div className="flex items-end justify-between">
              <p className="text-3xl font-black text-gray-900 tracking-tight">{card.value}</p>
              <div className={`flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-[8px] ${card.isPositive ? 'text-emerald-600 bg-emerald-50' : 'text-rose-600 bg-rose-50'}`}>
                {card.isPositive ? <ArrowUpRight size={14} strokeWidth={3} /> : <ArrowDownRight size={14} strokeWidth={3} />}
                {card.trend}
              </div>
            </div>
            
            {/* Minimal Sparkline Background */}
            <div className="absolute bottom-0 right-0 w-32 h-16 opacity-10 pointer-events-none group-hover:opacity-20 transition-opacity">
              <svg viewBox="0 0 100 50" preserveAspectRatio="none" className="w-full h-full">
                 <path d="M0,50 L0,30 C20,20 40,40 60,20 C80,0 100,20 100,20 L100,50 Z" fill={card.isPositive ? "#10B981" : "#F43F5E"} />
              </svg>
            </div>
          </div>
        ))}
      </div>

      {/* MAIN TRANSACTION TABLE SECTION */}
      <div className="bg-white rounded-[24px] border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col overflow-hidden">
        
        {/* Table Toolbar */}
        <div className="p-6 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4 flex-1">
            <h2 className="text-lg font-black text-gray-900 tracking-tight whitespace-nowrap">Recent Transactions</h2>
            
            {/* Search Input inside Toolbar */}
            <div className="relative w-full max-w-sm ml-4 hidden md:block">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="text" 
                placeholder="Search transactions..." 
                className="w-full pl-10 pr-4 py-2 bg-gray-50 border-none rounded-[12px] focus:outline-none focus:ring-2 focus:ring-gray-200 transition-all text-sm font-medium text-gray-900 placeholder:text-gray-400"
              />
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-gray-50 text-gray-700 font-bold rounded-[12px] hover:bg-gray-100 transition-all text-sm">
              <Filter size={16} />
              Filter
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-gray-50 text-gray-700 font-bold rounded-[12px] hover:bg-gray-100 transition-all text-sm">
              Sort by
              <ChevronDown size={16} className="text-gray-400" />
            </button>
          </div>
        </div>

        {/* The Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white border-b border-gray-100">
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider w-[40%]">Transaction</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Date & Time</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider text-right">Amount</th>
                <th className="px-4 py-4 w-10"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {transactions.map((tx) => (
                <tr key={tx.id} className="hover:bg-gray-50/80 transition-colors group cursor-pointer">
                  {/* Transaction Info */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-[14px] ${tx.bg} ${tx.color} flex items-center justify-center shrink-0 shadow-sm border border-white`}>
                        <tx.icon size={20} strokeWidth={2.5} />
                      </div>
                      <div>
                        <p className="font-bold text-gray-900 text-[15px]">{tx.name}</p>
                        <p className="text-xs font-semibold text-gray-400 mt-0.5">{tx.category}</p>
                      </div>
                    </div>
                  </td>
                  
                  {/* Date & Time */}
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="font-semibold text-gray-900 text-[14px]">{tx.date}</span>
                      <span className="text-xs font-medium text-gray-400 mt-0.5">{tx.time}</span>
                    </div>
                  </td>
                  
                  {/* Status */}
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[8px] text-xs font-bold ${
                      tx.status === 'Completed' 
                        ? 'bg-emerald-50 text-emerald-600 border border-emerald-100/50' 
                        : 'bg-orange-50 text-orange-600 border border-orange-100/50'
                    }`}>
                      {tx.status === 'Completed' ? (
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                      ) : (
                        <div className="w-1.5 h-1.5 rounded-full bg-orange-500"></div>
                      )}
                      {tx.status}
                    </span>
                  </td>
                  
                  {/* Amount */}
                  <td className="px-6 py-4 text-right">
                    <span className={`font-black text-[16px] tracking-tight ${tx.type === 'income' ? 'text-emerald-500' : 'text-gray-900'}`}>
                      {tx.amount}
                    </span>
                  </td>
                  
                  {/* Actions */}
                  <td className="px-4 py-4 text-right">
                    <button className="p-2 text-gray-300 hover:text-gray-600 hover:bg-white rounded-lg transition-colors shadow-sm opacity-0 group-hover:opacity-100">
                      <MoreVertical size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination Footer */}
        <div className="p-6 border-t border-gray-100 bg-gray-50/30 flex items-center justify-between">
          <p className="text-sm font-semibold text-gray-500">Showing <span className="text-gray-900 font-bold">1-7</span> of 142 transactions</p>
          <div className="flex items-center gap-2">
            <button className="px-4 py-2 text-sm font-bold text-gray-500 bg-white border border-gray-200 rounded-[10px] hover:bg-gray-50 disabled:opacity-50 shadow-sm" disabled>Previous</button>
            <div className="flex items-center gap-1 px-2">
              <button className="w-8 h-8 flex items-center justify-center text-sm font-bold bg-[#0F111A] text-white rounded-[8px] shadow-md">1</button>
              <button className="w-8 h-8 flex items-center justify-center text-sm font-bold text-gray-600 hover:bg-gray-100 rounded-[8px] transition-colors">2</button>
              <button className="w-8 h-8 flex items-center justify-center text-sm font-bold text-gray-600 hover:bg-gray-100 rounded-[8px] transition-colors">3</button>
              <span className="text-gray-400 font-bold px-1">...</span>
            </div>
            <button className="px-4 py-2 text-sm font-bold text-gray-700 bg-white border border-gray-200 rounded-[10px] hover:bg-gray-50 shadow-sm">Next</button>
          </div>
        </div>

      </div>
    </div>
  );
}
