import React from "react";

export function StatCard({ title, value, subtitle, icon: Icon, color, rotation }) {
  return (
    <div
      className="p-6 rounded-sm min-h-[140px]"
      style={{
        backgroundColor: color.bg,
        color: color.text,
        transform: `rotate(${rotation}deg)`,
        boxShadow: `
          0 1px 3px rgba(0,0,0,0.12),
          0 4px 8px rgba(0,0,0,0.15),
          0 8px 16px rgba(0,0,0,0.1)
        `,
      }}
    >
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-bold" style={{ fontFamily: "Indie Flower, cursive" }}>
          {title}
        </h3>
        <Icon className="w-5 h-5" />
      </div>
      <div className="text-4xl font-bold mb-1" style={{ fontFamily: "Indie Flower, cursive" }}>
        {value}
      </div>
      <p className="text-base" style={{ fontFamily: "Indie Flower, cursive" }}>
        {subtitle}
      </p>
    </div>
  );
}
