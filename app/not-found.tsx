import { Metadata } from "next";

import { NotFound as NotFound404 } from "@/components/shared";

export const metadata: Metadata = {
  title: "Not Found",
};

export default function NotFound() {
  return <NotFound404 />;
}
