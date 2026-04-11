import React, { PropsWithChildren } from "react";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface Props {
  label: string;
  asChild: boolean;
  side: "top" | "bottom" | "left" | "right";
  aling?: "start" | "center" | "end";
}

export default function Hitnt({
  children,
  label,
  asChild,
  aling,
  side,
}: PropsWithChildren<Props>) {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={0}>
        <TooltipTrigger asChild={asChild}>{children}</TooltipTrigger>
        <TooltipContent className="bg-secondary" side={side} align={aling}>
          <p className="font-semibold">{label}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
