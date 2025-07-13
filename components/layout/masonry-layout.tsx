"use client";

import React from "react";
import Masonry from "react-masonry-css";

interface MasonryLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export function MasonryLayout({ children, className = "" }: MasonryLayoutProps) {
  const breakpointColumnsObj = {
    default: 3,
    1100: 3,
    700: 2,
    500: 1
  };

  return (
    <Masonry
      breakpointCols={breakpointColumnsObj}
      className={`masonry-grid ${className}`}
      columnClassName="masonry-grid-column"
    >
      {children}
    </Masonry>
  );
}