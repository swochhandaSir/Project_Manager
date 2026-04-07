import React from "react";
import { Skeleton } from "./ui/skeleton";

const cardShadow = `
  0 1px 3px rgba(0,0,0,0.12),
  0 4px 8px rgba(0,0,0,0.15),
  0 8px 16px rgba(0,0,0,0.1)
`;

function SkeletonCard({ variant = "stat", color = "#FFFFFF", rotation = 0, items = 3 }) {
  const cardStyle = {
    backgroundColor: color,
    transform: `rotate(${rotation}deg)`,
    boxShadow: cardShadow,
  };

  if (variant === "stat") {
    return (
      <div className="p-6 rounded-sm min-h-[140px]" style={cardStyle}>
        <div className="flex items-center justify-between mb-4">
          <Skeleton className="h-6 w-28 bg-white/50" />
          <Skeleton className="h-6 w-6 rounded-full bg-white/50" />
        </div>
        <Skeleton className="h-10 w-20 mb-3 bg-white/50" />
        <Skeleton className="h-5 w-24 bg-white/40" />
      </div>
    );
  }

  if (variant === "list") {
    return (
      <div className="p-6 rounded-sm" style={cardStyle}>
        <Skeleton className="h-8 w-48 mb-6 bg-white/50" />
        <div className="space-y-4">
          {Array.from({ length: items }).map((_, index) => (
            <div key={index} className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <Skeleton className="h-4 w-4 rounded-full bg-white/50" />
                <Skeleton className="h-5 w-28 bg-white/40" />
              </div>
              <Skeleton className="h-7 w-10 bg-white/50" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (variant === "projects") {
    return (
      <div className="p-6 rounded-sm" style={cardStyle}>
        <Skeleton className="h-8 w-44 mb-6 bg-white/50" />
        <div className="space-y-4">
          {Array.from({ length: items }).map((_, index) => (
            <div key={index} className="p-3 rounded-md bg-white/35">
              <div className="flex items-center justify-between mb-2 gap-4">
                <Skeleton className="h-6 flex-1 bg-white/55" />
                <Skeleton className="h-6 w-20 bg-white/50" />
              </div>
              <Skeleton className="h-4 w-3/4 bg-white/45" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (variant === "project-card") {
    return (
      <div
        className="p-5 rounded-sm min-h-[200px]"
        style={cardStyle}
      >
        <div className="space-y-3">
          <div className="flex items-start justify-between gap-3">
            <Skeleton className="h-7 w-2/3 bg-white/55" />
            <Skeleton className="h-6 w-20 bg-white/50" />
          </div>

          <Skeleton className="h-5 w-full bg-white/45" />
          <Skeleton className="h-5 w-4/5 bg-white/40" />

          <div className="flex items-center gap-2 pt-2">
            <Skeleton className="h-4 w-4 rounded-full bg-white/50" />
            <Skeleton className="h-4 w-24 bg-white/45" />
            <Skeleton className="h-4 w-3 bg-white/40" />
            <Skeleton className="h-4 w-24 bg-white/45" />
          </div>

          <Skeleton className="h-4 w-32 bg-white/40" />

          <div className="flex items-center justify-between pt-3 border-t border-black/10">
            <div className="flex -space-x-2">
              {Array.from({ length: 3 }).map((_, index) => (
                <Skeleton key={index} className="h-6 w-6 rounded-full border-2 border-white bg-white/55" />
              ))}
            </div>
            <Skeleton className="h-4 w-20 bg-white/45" />
          </div>
        </div>
      </div>
    );
  }

  if (variant === "task-card") {
    return (
      <div
        className="p-4 rounded-sm min-h-[150px]"
        style={cardStyle}
      >
        <div className="space-y-3">
          <div className="flex items-start justify-between gap-3">
            <Skeleton className="h-6 w-3/5 bg-white/55" />
            <Skeleton className="h-6 w-20 bg-white/50" />
          </div>

          <Skeleton className="h-4 w-full bg-white/45" />
          <Skeleton className="h-4 w-4/5 bg-white/40" />

          <Skeleton className="h-6 w-24 bg-white/50" />

          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-4 rounded-full bg-white/50" />
            <Skeleton className="h-4 w-24 bg-white/45" />
          </div>

          <Skeleton className="h-4 w-32 bg-white/40" />

          <div className="flex items-center gap-2 pt-3 border-t border-black/10">
            <Skeleton className="h-6 w-6 rounded-full bg-white/55" />
            <Skeleton className="h-4 w-24 bg-white/45" />
            <Skeleton className="h-8 w-8 ml-auto bg-white/45" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 rounded-sm" style={cardStyle}>
      <Skeleton className="h-8 w-40 mb-6 bg-white/50" />
      <div className="space-y-4">
        {Array.from({ length: items }).map((_, index) => (
          <div key={index} className="flex items-center gap-4 p-4 rounded-md bg-white/35">
            <Skeleton className="h-10 w-10 rounded-full bg-white/55" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-5 w-1/2 bg-white/50" />
              <Skeleton className="h-4 w-1/3 bg-white/40" />
            </div>
            <div className="flex gap-2">
              <Skeleton className="h-6 w-16 bg-white/50" />
              <Skeleton className="h-6 w-20 bg-white/45" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export { SkeletonCard };
