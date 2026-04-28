import { Button } from "@/core/presentation/components/base/ui/button";
import { ArrowLeft, DownloadIcon } from "lucide-react";

interface AcknowledgementFormProps {
  navigateToPrevForm: () => void;
}

export default function SOWDownloadForm({ navigateToPrevForm }: AcknowledgementFormProps) {
  return (
    <div className="flex w-full h-full items-center justify-center py-20">
      <div className="max-w-100 text-center flex flex-col gap-5 items-center justify-center">
        <div className="w-100 h-100 bg-primary"></div>
        <h1 className="text-4xl font-bold text-primary">Statement of Work is Ready!</h1>
        <p className="text-lg">Your Statement of Work has been successfully prepared and is now ready for download.</p>

        <div className="flex gap-4 items-center">
          <Button
            type="button"
            variant={"outline"}
            className="w-fit self-end"
            onClick={() => {
              navigateToPrevForm();
            }}
          >
            <ArrowLeft />
            Go back
          </Button>
          <Button type="submit" className="w-fit self-end">
            Download Docx <DownloadIcon />
          </Button>
        </div>
      </div>
    </div>
  );
}
