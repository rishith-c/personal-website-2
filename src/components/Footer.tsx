import Link from "next/link";
import { Coffee, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-4 px-4 py-8 sm:flex-row sm:px-6">
        <p className="text-sm text-muted-foreground">
          © 2026 rishith chennupati · built with next.js + shadcn/ui
        </p>
        <div className="flex items-center gap-1">
          <Button asChild variant="ghost" size="sm">
            <Link href="https://github.com/rishith-c" target="_blank" rel="noopener noreferrer">
              <Github className="size-4" />
              github
            </Link>
          </Button>
          <Separator orientation="vertical" className="h-5" />
          <Button asChild variant="ghost" size="sm">
            <Link href="https://buymeacoffee.com/rishithc" target="_blank" rel="noopener noreferrer">
              <Coffee className="size-4" />
              buy me a coffee
            </Link>
          </Button>
        </div>
      </div>
    </footer>
  );
}
