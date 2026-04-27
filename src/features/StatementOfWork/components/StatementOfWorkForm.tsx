import { type StatementOfWorkRequest } from "@/core/domain/schema/statement-of-work.schema";
import { Button } from "@/core/presentation/components/base/ui/button";
import Form from "@/core/presentation/components/custom/Form/Form";
import FormDateSelector from "@/core/presentation/components/custom/Form/FormDateSelector";
import FormTextInput from "@/core/presentation/components/custom/Form/FormTextInput";
import FormTextArea from "@/core/presentation/components/custom/Form/FormTextArea";
import FormSwitchInput from "@/core/presentation/components/custom/Form/FormSwitchInput";
import ListHandlerForm from "../../../core/presentation/components/shared/ListHandlerForm";
import ApplicationPlatformForm from "./SOWApplicationPlatformForm";
import { generateStatementOfWork } from "@/core/lib/generateStatementOfWork";
import { PlusCircle } from "lucide-react";

import { useFieldArray, type UseFormReturn } from "react-hook-form";

import SOWAcknowledgementForm from "./SOWAcknowledgementForm";
import { Progress } from "@/core/presentation/components/base/ui/progress";
import SOWProjectInformationForm from "./SOWProjectInformationForm";
import SOWApplicationPlatformForm from "./SOWApplicationPlatformForm";

interface StatementOfWorkFormProps {
  form: UseFormReturn<StatementOfWorkRequest>;
}

export default function StatementOfWorkForm({ form }: StatementOfWorkFormProps) {
  const handleSubmit = async (values: StatementOfWorkRequest) => {
    console.log(values);
    await generateStatementOfWork(values);
  };

  return (
    <div className="px-12">
      {/* <h1 className="text-4xl font-bold">Statement of Work</h1> */}
      <Progress value={50} className="mb-5 h-2" />

      <Form form={form} onSubmit={handleSubmit} formID="contract-form">
        {/* ACKNOWLEDGEMENT */}
        {/* <SOWAcknowledgementForm form={form} /> */}
        {/* <SOWProjectInformationForm form={form} /> */}
        <SOWApplicationPlatformForm form={form} />

        {/* DEVICE PLATFORMS */}
        {/* <div className="my-10">
          <h2 className="text-xl font-bold mb-5 text-primary">Device Platforms</h2>

          <div className="flex gap-6">
            <FormSwitchInput
              control={control}
              name="isPlatformDesktop"
              label="Desktop"
              description="Available on Windows, macOS, and Linux browsers."
            />

            <FormSwitchInput control={control} name="isPlatformMobile" label="Mobile" description="Available on Android and iOS devices." />
          </div>
        </div> */}

        {/* APPLICATION PLATFORMS */}
        {/* <div className="my-10">
          <h2 className="text-xl font-bold mb-5 text-primary">Application Platforms</h2>

          <Button
            type="button"
            onClick={() =>
              append({
                application_platform_index: fields.length + 1,
                name: "",
                features: [],
              })
            }
            className="flex items-center gap-2 border border-dashed p-4"
          >
            <PlusCircle />
            Add Application Platform
          </Button>

          <div className="mt-6 space-y-4">
            {fields.map((field, index) => (
              <ApplicationPlatformForm key={field.id} form={form} index={index} removePlatform={() => remove(index)} />
            ))}
          </div>
        </div>

        <div className="my-10">
          <h2 className="text-xl font-bold mb-5 text-primary">Sprint Timelines</h2>
          <FormDateSelector control={control} name="development_start_date" label="Development start date:" />
          <FormDateSelector control={control} name="development_end_date" label="Development end date" />
          <FormDateSelector control={control} name="testing_start_date" label="Testing start date" />
          <FormDateSelector control={control} name="testing_end_date" label="Testng end date" />
          <FormDateSelector control={control} name="uat_release_date" label="UAT release date" />
          <FormDateSelector control={control} name="prod_release_date" label="Production release date" />
        </div> */}
        {/* <Button type="submit">Submit</Button> */}
      </Form>
    </div>
  );
}
