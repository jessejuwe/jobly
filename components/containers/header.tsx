import React from "react";
import Image from "next/image";

import { ColorModeButton } from "@/components/ui/color-mode";
import logo from "@/public/assets/logo.png";

export default function Header() {
  return (
    <header className="border-b">
      <div className="mx-auto px-4 py-4 flex justify-between items-center">
        <div className="size-8 flex items-center justify-start gap-2">
          <Image src={logo} alt="Logo" priority />
          <h1 className="text-2xl font-bold">
            Job<span className="text-primary">ly</span>
          </h1>
        </div>

        <ColorModeButton />
      </div>
    </header>
  );
}
