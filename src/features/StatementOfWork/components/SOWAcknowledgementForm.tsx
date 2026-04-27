import type { StatementOfWorkRequest } from "@/core/domain/schema/statement-of-work.schema";
import { Button } from "@/core/presentation/components/base/ui/button";
import FormTextInput from "@/core/presentation/components/custom/Form/FormTextInput";
import FormTitle from "@/core/presentation/components/shared/FormTitle";
import { DownloadIcon } from "lucide-react";
import type { UseFormReturn } from "react-hook-form";

interface AcknowledgementFormProps {
  form: UseFormReturn<StatementOfWorkRequest>;
}

export default function SOWAcknowledgementForm({ form }: AcknowledgementFormProps) {
  const control = form.control;
  return (
    <div className="flex flex-col gap-20">
      <FormTitle title="Acknowledgement" sequenceNo={4} />
      <div>
        <div className="mb-10 w-fit">
          <FormTextInput control={control} name="client_name" label="Client name" className="text-xl!" />
        </div>

        <div className="flex gap-4">
          <FormTextInput control={control} name="prepared_by" label="Prepared by" className="text-xl!" />
          <FormTextInput control={control} name="prepared_by_position" label="Position" className="text-xl!" />
        </div>

        <div className="flex gap-4">
          <FormTextInput control={control} name="noted_by" label="Noted By" className="text-xl!" />
          <FormTextInput control={control} name="noted_by_position" label="Position" className="text-xl!" />
        </div>
      </div>

      <Button type="submit" className="w-fit self-end">
        Generate docx <DownloadIcon />
      </Button>
    </div>
  );
}
