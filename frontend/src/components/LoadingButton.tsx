import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";

export function LoadingButton() {
  return (
    <Button disabled>
      <Loader2 className="mr-2 w-4 h-4 animate-spin" />
      Please wait
    </Button>
  );
}
