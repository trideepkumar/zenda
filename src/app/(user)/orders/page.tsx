"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useAuthStore } from "@/store/authStore";
import { useOrderStore } from "@/store/orderStore";
import { api } from "@/lib/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Package, Clock, Truck, CheckCircle2, XCircle } from "lucide-react";
import { Order } from "@/types";

const getStatusBadge = (status: Order['status']) => {
  switch (status) {
    case 'pending': return <Badge variant="outline" className="bg-yellow-500/10 text-yellow-600 hover:bg-yellow-500/20 border-yellow-500/20"><Clock className="w-3 h-3 mr-1" /> Pending</Badge>;
    case 'processing': return <Badge variant="outline" className="bg-blue-500/10 text-blue-600 hover:bg-blue-500/20 border-blue-500/20"><Package className="w-3 h-3 mr-1" /> Processing</Badge>;
    case 'shipped': return <Badge variant="outline" className="bg-purple-500/10 text-purple-600 hover:bg-purple-500/20 border-purple-500/20"><Truck className="w-3 h-3 mr-1" /> Shipped</Badge>;
    case 'out_for_delivery': return <Badge variant="outline" className="bg-orange-500/10 text-orange-600 hover:bg-orange-500/20 border-orange-500/20"><Truck className="w-3 h-3 mr-1" /> Out for Delivery</Badge>;
    case 'delivered': return <Badge variant="outline" className="bg-green-500/10 text-green-600 hover:bg-green-500/20 border-green-500/20"><CheckCircle2 className="w-3 h-3 mr-1" /> Delivered</Badge>;
    case 'cancelled': return <Badge variant="destructive"><XCircle className="w-3 h-3 mr-1" /> Cancelled</Badge>;
    default: return <Badge variant="outline">{status}</Badge>;
  }
};

export default function OrdersPage() {
  const { user } = useAuthStore();
  const { userOrders, setOrders } = useOrderStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      api.orders.getByUserId(user.id).then(data => {
        // Merge with local orders that aren't from the API to simulate persistence during session
        const apiIds = new Set(data.map(o => o.id));
        const merged = [...data, ...userOrders.filter(o => !apiIds.has(o.id))].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        setOrders(merged);
        setLoading(false);
      });
    }
  }, [user]);

  if (loading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-10 w-48" />
        <div className="space-y-4">
          {[1, 2, 3].map(i => <Skeleton key={i} className="h-48 w-full rounded-xl" />)}
        </div>
      </div>
    );
  }

  if (userOrders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
        <Package className="h-16 w-16 text-muted-foreground mb-4 opacity-50" />
        <h2 className="text-2xl font-bold mb-2">No orders yet</h2>
        <p className="text-muted-foreground mb-8">You haven't placed any orders yet. Start shopping!</p>
        <Button render={<Link href="/products" />}>Browse Products</Button>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-10">
      <h1 className="text-3xl font-bold tracking-tight">My Orders</h1>
      
      <div className="space-y-6">
        {userOrders.map(order => (
          <Card key={order.id} className="overflow-hidden">
            <CardHeader className="bg-muted/50 pb-4">
              <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                <div>
                  <CardTitle className="text-lg">Order {order.id}</CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">Placed on {new Date(order.createdAt).toLocaleDateString()}</p>
                </div>
                <div>{getStatusBadge(order.status)}</div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y">
                {order.items.map((item, index) => (
                  <div key={index} className="flex gap-4 p-6">
                    <div className="w-16 h-16 rounded-md overflow-hidden bg-muted border shrink-0">
                      <img src={item.product.imageUrl} alt={item.product.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold">{item.product.name}</h4>
                      <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                    </div>
                    <div className="font-bold">${(item.product.price * item.quantity).toFixed(2)}</div>
                  </div>
                ))}
              </div>
              <div className="bg-muted/20 p-6 flex justify-between items-center border-t">
                <span className="font-medium text-muted-foreground">Total Amount</span>
                <span className="text-xl font-bold">${order.totalAmount.toFixed(2)}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
