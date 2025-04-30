"use client";

import { cn } from "@/lib/utils";
import { useState } from "react";
import { Button } from "./button";

export interface Tab {
  id: string;
  label: string;
}

interface CustomTabsProps {
  tabs: Tab[];
  defaultActiveTab?: string;
  onTabChange?: (tabId: string) => void;
  className?: string;
}

export function CustomTabs({
  tabs,
  defaultActiveTab,
  onTabChange,
  className,
}: CustomTabsProps) {
  const [activeTab, setActiveTab] = useState(defaultActiveTab || tabs[0]?.id);

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    if (onTabChange) {
      onTabChange(tabId);
    }
  };

  return (
    <div className={cn("flex space-x-2", className)}>
      {tabs.map((tab) => {
        const isActive = tab.id === activeTab;

        return (
          <Button
            key={tab.id}
            onClick={() => handleTabClick(tab.id)}
            className={cn(
              "px-4 py-2 text-sm font-medium transition-colors rounded-md",
              isActive
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            )}
          >
            {tab.label}
          </Button>
        );
      })}
    </div>
  );
}
