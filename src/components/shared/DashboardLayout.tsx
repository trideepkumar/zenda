import Footer from "@/app/(user)/_components/footer";
import { Navbar } from "@/components/shared/Navbar";
import { SmoothScroll } from "@/components/providers/smooth-scroll";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <SmoothScroll>
      <div className="flex flex-col min-h-screen w-full bg-background selection:bg-primary/10">
        <Navbar />
        {/* Added 'transition-all' to handle layout shifts smoothly */}
        <main className="flex-1 p-4 md:p-8 max-w-screen-xl mx-auto w-full transition-all duration-500 ease-in-out">
          {children}
        </main>
        <Footer />
      </div>
    </SmoothScroll>
  );
}