
import Footer from "@/app/(user)/_components/footer";
import { NavbarWrapper } from "@/components/shared/navbar-wrapper";
import { SmoothScroll } from "@/components/providers/smooth-scroll";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SmoothScroll>
      <div className="min-h-screen bg-background selection:bg-primary/10">
        
        {/* Fixed Navbar */}
        <NavbarWrapper />

        {/* Page Content */}
        <div className="pt-[140px] md:pt-16">
          <main className="max-w-screen-xl mx-auto w-full p-4 md:p-8">
            {children}
          </main>

          <Footer />
        </div>
      </div>
    </SmoothScroll>
  );
}

// import Footer from "@/app/(user)/_components/footer";
// import { Navbar } from "@/components/shared/Navbar";
// import { SmoothScroll } from "@/components/providers/smooth-scroll";
// import { NavbarWrapper } from "./navbar-wrapper";

// export default function DashboardLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <SmoothScroll>
//       <div className="flex flex-col min-h-screen w-full bg-background selection:bg-primary/10">
        
//         {/* Fixed navbar */}
//         {/* <header className="fixed top-0 left-0 w-full z-50 bg-background border-b h-16">
//           <Navbar />
//         </header> */}
//         <NavbarWrapper />

//         {/* Offset for fixed navbar */}
//         <main className="flex-1 mt-16 p-4 md:p-8 max-w-screen-xl mx-auto w-full transition-all duration-500 ease-in-out">
//           {children}
//         </main>

//         <Footer />
//       </div>
//     </SmoothScroll>
//   );
// }