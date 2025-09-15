"use client";

import React, { useEffect, useState } from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
};

export function Fade({ children, className = "" }: Props) {
  const [on, setOn] = useState(false);
  useEffect(() => setOn(true), []);
  return (
    <div
      className={`transition-opacity duration-300 ${on ? "opacity-100" : "opacity-0"} ${className}`}
    >
      {children}
    </div>
  );
}

export function LiftHover({ children, className = "" }: Props) {
  return (
    <div className={`transition-transform duration-200 hover:-translate-y-0.5 ${className}`}>
      {children}
    </div>
  );
}
