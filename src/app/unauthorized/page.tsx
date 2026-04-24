import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function UnauthorizedPage() {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center space-y-4">
      <h1 className="text-4xl font-bold">403 - Unauthorized</h1>
      <p className="text-muted-foreground">You do not have permission to view this page.</p>
      <Button render={<Link href="/login" />}>
        Return to Login
      </Button>
    </div>
  );
}
