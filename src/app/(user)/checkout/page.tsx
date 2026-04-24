"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/store/cartStore";
import { useOrderStore } from "@/store/orderStore";
import { useAuthStore } from "@/store/authStore";
import { api } from "@/lib/api";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { CheckCircle2, ChevronRight, MapPin, Clock, CreditCard } from "lucide-react";

const STEPS = ["Address", "Slot", "Payment"];

export default function CheckoutPage() {
  const router = useRouter();
  const { user } = useAuthStore();
  const { items, getTotalPrice, clearCart } = useCartStore();
  const { addOrder } = useOrderStore();
  
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState({ fullName: user?.name || "", street: "", city: "", zipCode: "" });
  const [slot, setSlot] = useState("Today, 4 PM - 6 PM");

  if (items.length === 0 && step !== 3) {
    router.push("/cart");
    return null;
  }

  const handleNext = () => setStep((s) => Math.min(STEPS.length - 1, s + 1));
  const handlePrev = () => setStep((s) => Math.max(0, s - 1));

  const handlePlaceOrder = async () => {
    try {
      setLoading(true);
      const newOrder = await api.orders.create({
        userId: user?.id || "guest",
        totalAmount: getTotalPrice() * 1.08,
        items: items,
        address,
      });
      addOrder(newOrder);
      clearCart();
      setStep(3); // Success step
      toast.success("Order placed successfully!");
    } catch (error) {
      toast.error("Failed to place order.");
    } finally {
      setLoading(false);
    }
  };

  if (step === 3) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
        <CheckCircle2 className="h-24 w-24 text-green-500 mb-6" />
        <h2 className="text-3xl font-bold mb-2">Order Confirmed!</h2>
        <p className="text-muted-foreground mb-8 max-w-md">Thank you for your purchase. Your order is being processed and will be delivered shortly.</p>
        <Button onClick={() => router.push("/orders")} size="lg">View Orders</Button>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-10">
      <h1 className="text-3xl font-bold tracking-tight">Checkout</h1>
      
      {/* Stepper */}
      <div className="flex items-center justify-between mb-8 relative">
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-muted -z-10"></div>
        {STEPS.map((s, i) => (
          <div key={s} className="flex flex-col items-center gap-2 bg-background px-2">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold border-2 transition-colors ${i < step ? 'bg-primary text-primary-foreground border-primary' : i === step ? 'border-primary text-primary' : 'border-muted text-muted-foreground'}`}>
              {i < step ? <CheckCircle2 className="h-6 w-6" /> : i + 1}
            </div>
            <span className={`text-sm font-medium ${i <= step ? 'text-foreground' : 'text-muted-foreground'}`}>{s}</span>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {step === 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><MapPin className="h-5 w-5 text-primary" /> Delivery Address</CardTitle>
                <CardDescription>Where should we deliver your order?</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-2">
                  <Label>Full Name</Label>
                  <Input value={address.fullName} onChange={e => setAddress({...address, fullName: e.target.value})} placeholder="John Doe" />
                </div>
                <div className="grid gap-2">
                  <Label>Street Address</Label>
                  <Input value={address.street} onChange={e => setAddress({...address, street: e.target.value})} placeholder="123 Main St" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label>City</Label>
                    <Input value={address.city} onChange={e => setAddress({...address, city: e.target.value})} placeholder="New York" />
                  </div>
                  <div className="grid gap-2">
                    <Label>Zip Code</Label>
                    <Input value={address.zipCode} onChange={e => setAddress({...address, zipCode: e.target.value})} placeholder="10001" />
                  </div>
                </div>
                <div className="flex justify-end pt-4">
                  <Button onClick={handleNext} disabled={!address.fullName || !address.street || !address.city || !address.zipCode}>
                    Next Step <ChevronRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {step === 1 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Clock className="h-5 w-5 text-primary" /> Delivery Slot</CardTitle>
                <CardDescription>Choose a convenient time for delivery</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {["Today, 4 PM - 6 PM", "Today, 6 PM - 8 PM", "Tomorrow, 10 AM - 12 PM", "Tomorrow, 2 PM - 4 PM"].map(s => (
                  <div 
                    key={s} 
                    onClick={() => setSlot(s)}
                    className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${slot === s ? 'border-primary bg-primary/5' : 'border-muted hover:border-primary/50'}`}
                  >
                    <div className="font-medium">{s}</div>
                  </div>
                ))}
                <div className="flex justify-between pt-4">
                  <Button variant="outline" onClick={handlePrev}>Back</Button>
                  <Button onClick={handleNext}>Next Step <ChevronRight className="h-4 w-4 ml-2" /></Button>
                </div>
              </CardContent>
            </Card>
          )}

          {step === 2 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><CreditCard className="h-5 w-5 text-primary" /> Payment Method</CardTitle>
                <CardDescription>This is a mock checkout. No real payment required.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 rounded-xl border bg-muted/50 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-8 bg-card rounded flex items-center justify-center font-bold text-xs border">CASH</div>
                    <div>
                      <div className="font-medium">Cash on Delivery</div>
                      <div className="text-xs text-muted-foreground">Pay when you receive the order</div>
                    </div>
                  </div>
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                </div>
                <div className="flex justify-between pt-4">
                  <Button variant="outline" onClick={handlePrev} disabled={loading}>Back</Button>
                  <Button onClick={handlePlaceOrder} disabled={loading}>
                    {loading ? "Processing..." : `Place Order ($${(getTotalPrice() * 1.08).toFixed(2)})`}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Order Summary Sidebar */}
        <div className="lg:col-span-1">
          <Card className="sticky top-20">
            <CardHeader className="pb-4">
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2 mb-4">
                {items.map(item => (
                  <div key={item.product.id} className="flex justify-between text-sm">
                    <div className="flex gap-2">
                      <span className="font-medium">{item.quantity}x</span>
                      <span className="line-clamp-1">{item.product.name}</span>
                    </div>
                    <span className="font-medium">${(item.product.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <Separator className="mb-4" />
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-medium">${getTotalPrice().toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="font-medium text-green-600">Free</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tax</span>
                  <span className="font-medium">${(getTotalPrice() * 0.08).toFixed(2)}</span>
                </div>
                <Separator className="my-2" />
                <div className="flex justify-between text-base font-bold">
                  <span>Total</span>
                  <span className="text-primary">${(getTotalPrice() * 1.08).toFixed(2)}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
