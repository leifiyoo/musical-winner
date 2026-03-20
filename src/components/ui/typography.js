import * as React from "react";

import { cn } from "../../lib/utils";

const Text = React.forwardRef(({ className, ...props }, ref) => (
  <p ref={ref} className={cn("text-sm text-foreground", className)} {...props} />
));
Text.displayName = "Text";

const Muted = React.forwardRef(({ className, ...props }, ref) => (
  <p ref={ref} className={cn("text-sm text-muted-foreground", className)} {...props} />
));
Muted.displayName = "Muted";

export { Text, Muted };
