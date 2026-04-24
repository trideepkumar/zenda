"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { api } from "@/lib/api";
import { Order } from "@/types";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { MapPin, Phone, User, Package, ChevronLeft, ArrowRight } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export default function DeliveryOrderDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    // We get all orders and find ours, since mock API doesn't have getById for orders yet
    api.orders.getAll().then(orders => {
      const found = orders.find(o => o.id === id);
      setOrder(found || null);
      setLoading(false);
    });
  }, [id]);

  const handleStatusUpdate = async (newStatus: Order['status']) => {
    if (!order) return;
    try {
      setUpdating(true);
      const updated = await api.orders.updateStatus(order.id, newStatus);
      setOrder(updated);
      toast.success(`Order marked as ${newStatus.replace(/_/g, ' ')}`);
      
      if (newStatus === 'delivered') {
        router.push("/delivery");
      }
    } catch (error) {
      toast.error("Failed to update status");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) return <div className="p-8"><Skeleton className="h-64 w-full" /></div>;
  if (!order) return <div className="p-8 text-center text-xl font-bold">Order not found</div>;

  return (
    <div className="space-y-6 max-w-3xl mx-auto pb-10">
      <Button variant="ghost" className="pl-0 hover:bg-transparent" render={<Link href="/delivery" />}>
        <ChevronLeft className="h-4 w-4 mr-2" /> Back to Dashboard
      </Button>

      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{order.id}</h1>
          <p className="text-muted-foreground mt-1">Total items: {order.items.reduce((acc, item) => acc + item.quantity, 0)}</p>
        </div>
        <Badge className="text-sm px-3 py-1 uppercase" variant={order.status === 'delivered' ? 'secondary' : 'default'}>
          {order.status.replace(/_/g, ' ')}
        </Badge>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Delivery Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-3">
              <User className="h-5 w-5 text-muted-foreground shrink-0" />
              <div>
                <p className="font-medium">{order.address?.fullName || "Customer Name"}</p>
                <p className="text-sm text-muted-foreground">Customer</p>
              </div>
            </div>
            <div className="flex gap-3">
              <MapPin className="h-5 w-5 text-muted-foreground shrink-0" />
              <div>
                <p className="font-medium">{order.address?.street || "123 Main St"}</p>
                <p className="text-sm text-muted-foreground">{order.address?.city || "City"}, {order.address?.zipCode || "12345"}</p>
              </div>
            </div>
            <div className="flex gap-3">
              <Phone className="h-5 w-5 text-muted-foreground shrink-0" />
              <div>
                <p className="font-medium">+1 (555) 123-4567</p>
                <p className="text-sm text-muted-foreground">Mock Phone</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Update Status</CardTitle>
            <CardDescription>Update the delivery progress</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button 
              className="w-full justify-between" 
              variant={order.status === 'processing' ? 'default' : 'outline'}
              disabled={updating || order.status !== 'processing'}
              onClick={() => handleStatusUpdate('shipped')}
            >
              Mark as Picked Up <ArrowRight className="h-4 w-4" />
            </Button>
            <Button 
              className="w-full justify-between" 
              variant={order.status === 'shipped' ? 'default' : 'outline'}
              disabled={updating || order.status !== 'shipped'}
              onClick={() => handleStatusUpdate('out_for_delivery')}
            >
              Out for Delivery <ArrowRight className="h-4 w-4" />
            </Button>
            <Button 
              className="w-full justify-between bg-green-600 hover:bg-green-700 text-white" 
              disabled={updating || order.status !== 'out_for_delivery'}
              onClick={() => handleStatusUpdate('delivered')}
            >
              Mark as Delivered <ArrowRight className="h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2"><Package className="h-5 w-5" /> Items to Deliver</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="divide-y">
            {order.items.map((item, idx) => (
              <div key={idx} className="flex gap-4 py-4 first:pt-0 last:pb-0">
                <div className="w-16 h-16 rounded overflow-hidden bg-muted">
                  <img src={item.product.imageUrl} alt={item.product.name} className="object-cover w-full h-full" />
                </div>
                <div>
                  <p className="font-medium">{item.product.name}</p>
                  <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
