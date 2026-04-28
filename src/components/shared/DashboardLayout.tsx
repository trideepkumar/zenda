import Footer from "@/app/(user)/_components/footer";
import { Navbar } from "@/components/shared/Navbar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen w-full">
      <Navbar />
      <main className="flex-1 p-4 md:p-6 max-w-screen-xl mx-auto w-full">
        {children}
      </main>
     <Footer/>
    </div>
  );
}