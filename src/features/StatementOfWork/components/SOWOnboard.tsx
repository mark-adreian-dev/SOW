import { Button } from "@/core/presentation/components/base/ui/button";
import { PlusIcon } from "lucide-react";

interface SOWOnboardProps {
  navigateToNextForm: () => void;
}

export default function SOWOnboard({ navigateToNextForm }: SOWOnboardProps) {
  return (
    <div className="w-full h-[calc(100vh-10rem)] flex flex-col items-center justify-center px-4 bg-background">
      {/* Title */}
      <h1 className="text-4xl md:text-5xl font-semibold text-center text-foreground text-primary">Create your Statement of Work</h1>

      {/* Subtitle */}
      <p className="mt-4 text-muted-foreground text-center max-w-xl">
        Generate a professional Statement of Work by answering a few guided steps. We’ll help you structure everything clearly and efficiently.
      </p>

      {/* CTA */}
      <div className="mt-10">
        <Button size="lg" className="rounded-full px-6 py-5 text-base flex items-center gap-2" onClick={navigateToNextForm}>
          Start Creating <PlusIcon className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
