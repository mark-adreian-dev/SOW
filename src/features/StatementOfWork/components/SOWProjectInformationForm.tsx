import type { StatementOfWorkRequest } from "@/core/domain/schema/statement-of-work.schema";
import { Button } from "@/core/presentation/components/base/ui/button";
import FormDateSelector from "@/core/presentation/components/custom/Form/FormDateSelector";
import FormTextArea from "@/core/presentation/components/custom/Form/FormTextArea";
import FormTextInput from "@/core/presentation/components/custom/Form/FormTextInput";
import FormTitle from "@/core/presentation/components/shared/FormTitle";
import ListHandlerForm from "@/core/presentation/components/shared/ListHandlerForm";
import { useStepValidation } from "@/core/presentation/hooks/useStepValidation";
import { ArrowRight } from "lucide-react";
import type { UseFormReturn } from "react-hook-form";

interface AcknowledgementFormProps {
  form: UseFormReturn<StatementOfWorkRequest>;
  navigateToNextForm: () => void;
}

const stepFields = ["project_name", "submission_date", "start_date", "countries", "objectives", "specifications"] as const;

export default function SOWProjectInformationForm({ form, navigateToNextForm }: AcknowledgementFormProps) {
  const { validateAndScroll } = useStepValidation(form, stepFields);
  const { control } = form;
  const { errors } = form.formState;

  return (
    <div className="flex flex-col gap-10">
      <div className="flex items-center justify-between">
        <FormTitle title={"Project Information"} sequenceNo={1} />
        <div className="flex items-center gap-4 ">
          <Button
            variant={"icon"}
            className="w-10 h-10 border-primary border-2 rounded-full flex items-center justify-center"
            onClick={() =>
              validateAndScroll(() => {
                navigateToNextForm();
              })
            }
          >
            <ArrowRight />
          </Button>
        </div>
      </div>
      <div data-field="project_name" className="flex flex-col gap-10">
        <FormTextInput control={control} form={form} name="project_name" label="Project Name" placeholder="Project name" />

        <div className="flex justify-start gap-20">
          <h2 className="text-xl font-bold text-primary mb-5 w-[30%]">Presentation date:</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
            <div data-field="submission_date">
              <FormDateSelector form={form} name="submission_date" label="Submission Date" className="text-3xl!" allowFutureDates={true} />
            </div>
            <div data-field="start_date">
              <FormDateSelector form={form} name="start_date" label="Start Date" allowFutureDates={true} />
            </div>
          </div>
        </div>
      </div>

      {/* Lists */}
      <div data-field="countries" className="flex gap-20 justify-start">
        <h2 className="text-xl font-bold text-primary mb-3 w-[30%]">Countries</h2>
        <div className="pt-1 w-full">
          <ListHandlerForm form={form} title="Add Countries" path="countries" />
          {errors.countries && (
            <p className="mt-2 text-[11px] leading-tight font-medium text-destructive">
              {errors.countries.message || "Please add at least one country"}
            </p>
          )}
        </div>
      </div>

      <div data-field="objectives" className="flex gap-20 justify-start">
        <h2 className="text-xl font-bold mb-3  text-primary w-[30%]">Objectives</h2>
        <div className="pt-1 w-full">
          <ListHandlerForm form={form} title="Add Objectives" path="objectives" />
          {errors.objectives && (
            <p className="mt-2 text-[11px] leading-tight font-medium text-destructive">
              {errors.objectives.message || "Must have at least 1 objective"}
            </p>
          )}
        </div>
      </div>
      <div data-field="specifications" className="flex gap-20 justify-start">
        <h2 className="text-xl font-bold mb-3  text-primary w-[30%]">Specification</h2>
        <FormTextArea form={form} control={control} className="min-h-100" label="Specification" name="specifications" />
      </div>

      <Button
        type="button"
        className="self-end"
        onClick={() =>
          validateAndScroll(() => {
            navigateToNextForm();
          })
        }
      >
        Next <ArrowRight />
      </Button>
    </div>
  );
}
