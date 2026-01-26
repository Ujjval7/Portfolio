// components/ui/AnimatedTooltip.tsx
import * as React from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const TooltipProvider = TooltipPrimitive.Provider;
const TooltipTrigger = TooltipPrimitive.Trigger;
const TooltipRoot = TooltipPrimitive.Root;

const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, sideOffset = 4, children, ...props }, ref) => (
  <TooltipPrimitive.Content
    ref={ref}
    sideOffset={sideOffset}
    className={cn("z-50", className)}
    asChild
    {...props}
  >
    <motion.div
      initial={{ opacity: 0, x: 10, scale: 0.95 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 10, scale: 0.95 }}
      transition={{
        duration: 0.2,
        ease: [0.4, 0.0, 0.2, 1]
      }}
      className="rounded-md bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground shadow-md"
    >
      {children}
    </motion.div>
  </TooltipPrimitive.Content>
));
TooltipContent.displayName = TooltipPrimitive.Content.displayName;

interface AnimatedTooltipProps {
  children: React.ReactNode;
  content: string;
  side?: "top" | "right" | "bottom" | "left";
  sideOffset?: number;
  delayDuration?: number;
}

export function AnimatedTooltip({ 
  children, 
  content, 
  side = "left", 
  sideOffset = 8,
  delayDuration = 300
}: AnimatedTooltipProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <TooltipProvider delayDuration={delayDuration}>
      <TooltipRoot open={open} onOpenChange={setOpen}>
        <TooltipTrigger asChild>
          {children}
        </TooltipTrigger>
        <AnimatePresence>
          {open && (
            <TooltipContent side={side} sideOffset={sideOffset}>
              {content}
            </TooltipContent>
          )}
        </AnimatePresence>
      </TooltipRoot>
    </TooltipProvider>
  );
}