import type { StatementOfWorkRequest } from "@/core/domain/schema/statement-of-work.schema";
import { Button } from "@/core/presentation/components/base/ui/button";
import FormDateSelector from "@/core/presentation/components/custom/Form/FormDateSelector";
import FormTitle from "@/core/presentation/components/shared/FormTitle";
import { useStepValidation } from "@/core/presentation/hooks/useStepValidation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { UseFormReturn } from "react-hook-form";

interface SOWTimelinesFormProps {
  form: UseFormReturn<StatementOfWorkRequest>;
  navigateToNextForm: () => void;
  navigateToPrevForm: () => void;
}

export default function SOWTimelinesForm({ form, navigateToNextForm, navigateToPrevForm }: SOWTimelinesFormProps) {
  const stepFields = [
    "development_start_date",
    "development_end_date",
    "testing_start_date",
    "testing_end_date",
    "uat_release_date",
    "prod_release_date",
  ] as const;
  const { validateAndScroll } = useStepValidation(form, stepFields);
  return (
    <div className="flex flex-col gap-10">
      <div className="flex justify-between items-center">
        <FormTitle title="Sprint Timelines" sequenceNo={3} />
        <div className="flex items-center gap-4 ">
          <Button
            variant={"icon"}
            className="w-10 h-10 border-primary border-2 rounded-full flex items-center justify-center"
            onClick={navigateToPrevForm}
          >
            <ArrowLeft />
          </Button>
          <Button
            variant={"icon"}
            className="w-10 h-10 border-primary border-2 rounded-full flex items-center justify-center"
            onClick={() => validateAndScroll(() => navigateToNextForm())}
          >
            <ArrowRight />
          </Button>
        </div>
      </div>
      <div>
        <h2 className="text-xl font-bold mb-3 text-primary">Development Timeline</h2>
        <div className="flex gap-5">
          <FormDateSelector form={form} name="development_start_date" label="Development start date:" allowFutureDates={true} />
          <FormDateSelector form={form} name="development_end_date" label="Development end date" allowFutureDates={true} />
        </div>
      </div>

      <div>
        <h2 className="text-xl font-bold mb-3 text-primary">Testing Timeline</h2>
        <div className="flex gap-5">
          <FormDateSelector form={form} name="testing_start_date" label="Testing start date" allowFutureDates={true} />
          <FormDateSelector form={form} name="testing_end_date" label="Testing end date" allowFutureDates={true} />
        </div>
      </div>

      <div>
        <h2 className="text-xl font-bold mb-3 text-primary">Release</h2>
        <div className="flex gap-5">
          <FormDateSelector form={form} name="uat_release_date" label="UAT release date" allowFutureDates={true} />
          <FormDateSelector form={form} name="prod_release_date" label="Production release date" allowFutureDates={true} />
        </div>
      </div>
      <div className="self-end flex gap-4 items-center">
        <Button type="button" variant={"outline"} className="w-fit self-end mt-10" onClick={navigateToPrevForm}>
          <ArrowLeft />
          Previous
        </Button>

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
    </div>
  );
}
