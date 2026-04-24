"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useAuthStore } from "@/store/authStore";
import { api } from "@/lib/api";
import { Order } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Package, MapPin, ChevronRight, Truck } from "lucide-react";

export default function DeliveryDashboardPage() {
  const { user } = useAuthStore();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      api.orders.getAssignedToDelivery(user.id).then(data => {
        setOrders(data);
        setLoading(false);
      });
    }
  }, [user]);

  if (loading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-10 w-64" />
        <div className="grid md:grid-cols-2 gap-4">
          {[1, 2, 3].map(i => <Skeleton key={i} className="h-48 w-full rounded-xl" />)}
        </div>
      </div>
    );
  }

  const activeOrders = orders.filter(o => ['processing', 'shipped', 'out_for_delivery'].includes(o.status));
  const completedOrders = orders.filter(o => o.status === 'delivered');

  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Delivery Dashboard</h1>
          <p className="text-muted-foreground mt-1">Manage your assigned deliveries</p>
        </div>
        <div className="flex gap-4">
          <Card className="bg-primary/10 border-primary/20">
            <CardContent className="p-4 flex flex-col items-center justify-center min-w-[100px]">
              <div className="text-2xl font-bold text-primary">{activeOrders.length}</div>
              <div className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Active</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 flex flex-col items-center justify-center min-w-[100px]">
              <div className="text-2xl font-bold">{completedOrders.length}</div>
              <div className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Delivered</div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <Truck className="h-5 w-5 text-primary" /> Active Assignments
        </h2>
        
        {activeOrders.length === 0 ? (
          <Card className="border-dashed">
            <CardContent className="flex flex-col items-center justify-center py-12 text-center text-muted-foreground">
              <Package className="h-12 w-12 mb-4 opacity-20" />
              <p>No active deliveries assigned to you right now.</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
            {activeOrders.map(order => (
              <Card key={order.id} className="flex flex-col">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-base font-bold">{order.id}</CardTitle>
                    <Badge variant={order.status === 'out_for_delivery' ? 'default' : 'secondary'}>
                      {order.status.replace(/_/g, ' ')}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col">
                  <div className="flex gap-3 mb-4">
                    <MapPin className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                    <div className="text-sm">
                      <p className="font-medium">{order.address?.fullName || "Customer Name"}</p>
                      <p className="text-muted-foreground">{order.address?.street || "123 Delivery St"}</p>
                      <p className="text-muted-foreground">{order.address?.city || "City"}, {order.address?.zipCode || "00000"}</p>
                    </div>
                  </div>
                  <div className="mt-auto pt-4 border-t">
                    <Button className="w-full justify-between" render={<Link href={`/delivery/orders/${order.id}`} />}>
                      View Details <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
