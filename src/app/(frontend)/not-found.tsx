import type { Metadata } from "next";
import Button from "@/components/ui/Button";
import { IconArrowRight } from "@/components/ui/icons";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <div className="v2-scope">
      <div className="grid min-h-[70vh] place-items-center px-6 text-center">
        <div>
          <p className="v2-display text-[clamp(6rem,18vw,12rem)]">404</p>
          <h1 className="mt-6 text-lg text-muted">
            This page doesn’t exist.
          </h1>
          <div className="mt-10 flex justify-center">
            <Button href="/">
              Back to home
              <IconArrowRight size={16} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
