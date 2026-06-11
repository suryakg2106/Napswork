import { Sidebar } from "@/components/Sidebar";
import { Navbar } from "@/components/Navbar";

export default function PanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Sidebar />
      <Navbar />
      <main className="pl-[240px] pt-[70px]">
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
