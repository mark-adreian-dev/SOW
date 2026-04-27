import type { StatementOfWorkRequest } from '@/core/domain/schema/statement-of-work.schema'
import { Button } from '@/core/presentation/components/base/ui/button';
import FormDateSelector from '@/core/presentation/components/custom/Form/FormDateSelector';
import FormTitle from '@/core/presentation/components/shared/FormTitle';
import { ArrowRight } from 'lucide-react';
import type { UseFormReturn } from 'react-hook-form'

interface SOWTimelinesFormProps {
  form: UseFormReturn<StatementOfWorkRequest>;
  navigateToNextForm: () => void
}

export default function SOWTimelinesForm({ form, navigateToNextForm }: SOWTimelinesFormProps) {
  const { control } = form;
  return (
    <div className="my-10 flex flex-col gap-10">
      <FormTitle title="Sprint Timelines" sequenceNo={3} />
      <div>
        <h2 className="text-xl font-bold mb-3 text-primary">Development Timeline</h2>
        <div className="flex gap-5">
          <FormDateSelector control={control} name="development_start_date" label="Development start date:" allowFutureDates={true} />
          <FormDateSelector control={control} name="development_end_date" label="Development end date" allowFutureDates={true} />
        </div>
      </div>

      <div>
        <h2 className="text-xl font-bold mb-3 text-primary">Testing Timeline</h2>
        <div className="flex gap-5">
          <FormDateSelector control={control} name="testing_start_date" label="Testing start date" allowFutureDates={true} />
          <FormDateSelector control={control} name="testing_end_date" label="Testng end date" allowFutureDates={true} />
        </div>
      </div>

      <div>
        <h2 className="text-xl font-bold mb-3 text-primary">Release</h2>
        <div className="flex gap-5">
          <FormDateSelector control={control} name="uat_release_date" label="UAT release date" allowFutureDates={true} />
          <FormDateSelector control={control} name="prod_release_date" label="Production release date" allowFutureDates={true} />
        </div>
      </div>

      <Button type="button" className="self-end" onClick={navigateToNextForm}>
        Next <ArrowRight />
      </Button>
    </div>
  );
}
