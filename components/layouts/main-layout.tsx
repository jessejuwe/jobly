"use client";

import React from "react";

import Header from "../containers/header";

type MainLayoutProps = { children: React.ReactNode };

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="min-h-screen bg-background bg-pattern bg-center">
      <Header />
      <main className="mx-auto px-4 py-8">{children}</main>
    </div>
  );
}
