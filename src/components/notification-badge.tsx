import { cn } from "@/lib/utils";
import React from "react";

export default function notificationBadge({
    value,
    size=24,
    className=''
}:NotificationBadgeProps) {
  return (
    <div style={{
        height: size,
        width: size
    }} 
    className={cn(`absolute inline-flex items-center justify-center text-xs font-bold text-white bg-primary order-2 border-white rounded-full -top-2 -end-2 dark:border-gray-900`,className)}>
      {value}
    </div>
  );
}
