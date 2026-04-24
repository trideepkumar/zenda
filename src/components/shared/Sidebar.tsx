"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  Users, 
  ShoppingBag,
  Truck
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/store/authStore";
import { Role } from "@/types";

interface NavItem {
  title: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

const navItemsByRole: Record<Role, NavItem[]> = {
  admin: [
    { title: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { title: "Products", href: "/admin/products", icon: Package },
    { title: "Orders", href: "/admin/orders", icon: ShoppingCart },
    { title: "Users", href: "/admin/users", icon: Users },
  ],
  delivery: [
    { title: "Dashboard", href: "/delivery", icon: LayoutDashboard },
    { title: "Assigned Orders", href: "/delivery/orders", icon: Truck },
  ],
  user: [
    { title: "Home", href: "/", icon: LayoutDashboard },
    { title: "Products", href: "/products", icon: ShoppingBag },
    { title: "My Orders", href: "/orders", icon: ShoppingCart },
  ],
};

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Sidebar({ className, ...props }: SidebarProps) {
  const pathname = usePathname();
  const { user } = useAuthStore();

  if (!user) return null;

  const items = navItemsByRole[user.role] || [];

  return (
    <div className={cn("pb-12 h-screen border-r bg-muted/40", className)} {...props}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <div className="flex h-14 items-center px-4 mb-4 border-b">
            <Link href="/" className="flex items-center font-bold text-xl tracking-tight">
              ZENDA
            </Link>
          </div>
          <div className="space-y-1">
            {items.map((item) => (
              <Button
                key={item.href}
                variant={pathname === item.href ? "secondary" : "ghost"}
                className={cn(
                  "w-full justify-start",
                  pathname === item.href ? "bg-muted font-medium" : ""
                )}
                render={<Link href={item.href} />}
              >
                <item.icon className="mr-2 h-4 w-4" />
                {item.title}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Inline button component for the sidebar if needed, or import from ui/button
import { Button } from "@/components/ui/button";
