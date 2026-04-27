import type { StatementOfWorkRequest } from "@/core/domain/schema/statement-of-work.schema";
import { Button } from "@/core/presentation/components/base/ui/button";
import FormDateSelector from "@/core/presentation/components/custom/Form/FormDateSelector";
import FormTextArea from "@/core/presentation/components/custom/Form/FormTextArea";
import FormTextInput from "@/core/presentation/components/custom/Form/FormTextInput";
import FormTitle from "@/core/presentation/components/shared/FormTitle";
import ListHandlerForm from "@/core/presentation/components/shared/ListHandlerForm";
import { ArrowRight } from "lucide-react";
import type { UseFormReturn } from "react-hook-form";

interface AcknowledgementFormProps {
  form: UseFormReturn<StatementOfWorkRequest>;
  navigateToNextForm: () => void;
}

export default function SOWProjectInformationForm({ form, navigateToNextForm }: AcknowledgementFormProps) {
  const control = form.control;

  return (
    <div className="flex flex-col gap-10">
      <FormTitle title={"Project Information"} sequenceNo={1} />
      <div>
        <FormTextInput control={control} name="project_name" label="Project Name" className="text-lg!" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormDateSelector control={control} name="submission_date" label="Submission Date" className="text-3xl!" allowFutureDates={true} />
          <FormDateSelector control={control} name="start_date" label="Start Date" allowFutureDates={true} />
        </div>
      </div>

      {/* Lists */}
      <div className="flex gap-20 justify-start">
        <h2 className="text-xl font-bold text-primary mb-3 w-[20%]">Countries</h2>
        <div className="pt-1 w-full">
          <ListHandlerForm form={form} title="Add Countries" path="countries" />
        </div>
      </div>

      <div className="flex gap-20 justify-start">
        <h2 className="text-xl font-bold mb-3  text-primary w-[20%]">Objectives</h2>
        <div className="pt-1 w-full">
          <ListHandlerForm form={form} title="Add Objectives" path="objectives" />
        </div>
      </div>
      <div className="flex gap-20 justify-start">
        <h2 className="text-xl font-bold mb-3  text-primary w-[20%]">Specification</h2>
        <FormTextArea control={control} className="min-h-100" label="Specification" name="specifications" />
      </div>

      <Button type="button" className="self-end" onClick={navigateToNextForm}>
        Next <ArrowRight />
      </Button>
    </div>
  );
}
