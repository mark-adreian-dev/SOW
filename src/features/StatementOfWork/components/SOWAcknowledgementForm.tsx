import type { StatementOfWorkRequest } from "@/core/domain/schema/statement-of-work.schema";
import { Button } from "@/core/presentation/components/base/ui/button";
import FormTextInput from "@/core/presentation/components/custom/Form/FormTextInput";
import FormTitle from "@/core/presentation/components/shared/FormTitle";
import { useStepValidation } from "@/core/presentation/hooks/useStepValidation";
import { ArrowLeft, DownloadIcon } from "lucide-react";
import type { UseFormReturn } from "react-hook-form";

interface AcknowledgementFormProps {
  form: UseFormReturn<StatementOfWorkRequest>;
  navigateToPrevForm: () => void;
  navigateToNextForm: () => void;
}

export default function SOWAcknowledgementForm({ form, navigateToPrevForm, navigateToNextForm }: AcknowledgementFormProps) {
  const stepFields = ["client_name", "prepared_by", "prepared_by_position", "noted_by", "noted_by_position"] as const;
  const { validateAndScroll } = useStepValidation(form, stepFields);
  return (
    <div className="flex flex-col gap-20">
      <div className="flex items-center justify-between">
        <FormTitle title="Acknowledgement" sequenceNo={4} />
        <div className="flex items-center gap-4 ">
          <Button
            variant={"icon"}
            className="w-10 h-10 border-primary border-2 rounded-full flex items-center justify-center"
            onClick={navigateToPrevForm}
          >
            <ArrowLeft />
          </Button>
        </div>
      </div>
      <div>
        <div className="mb-10">
          <FormTextInput form={form} control={form.control} name="client_name" label="Client name" className="text-xl!" />
        </div>

        <div className="flex gap-4">
          <FormTextInput form={form} control={form.control} name="prepared_by" label="Prepared by" className="text-xl!" />
          <FormTextInput form={form} control={form.control} name="prepared_by_position" label="Position" className="text-xl!" />
        </div>

        <div className="flex gap-4">
          <FormTextInput form={form} control={form.control} name="noted_by" label="Noted By" className="text-xl!" />
          <FormTextInput form={form} control={form.control} name="noted_by_position" label="Position" className="text-xl!" />
        </div>
      </div>
      <div className="self-end flex items-center gap-4">
        <Button type="button" variant={"outline"} className="w-fit self-end mt-10" onClick={navigateToPrevForm}>
          <ArrowLeft />
          Previous
        </Button>
        <Button
          type="button"
          className="w-fit self-end"
          onClick={() =>
            validateAndScroll(() => {
              navigateToNextForm();
            })
          }
        >
          Complete
        </Button>
      </div>
    </div>
  );
}
