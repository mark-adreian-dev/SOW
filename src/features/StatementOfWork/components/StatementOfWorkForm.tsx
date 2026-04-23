import { type StatementOfWorkRequest } from "@/core/domain/schema/statement-of-work.schema";
import { Button } from "@/core/presentation/components/base/ui/button";
import Form from "@/core/presentation/components/custom/Form/Form";
import FormDateSelector from "@/core/presentation/components/custom/Form/FormDateSelector";
import FormTextInput from "@/core/presentation/components/custom/Form/FormTextInput";
import FormTextArea from "@/core/presentation/components/custom/Form/FormTextArea";
import FormSwitchInput from "@/core/presentation/components/custom/Form/FormSwitchInput";
import ListHandlerForm from "./ListHandlerForm";
import ApplicationPlatformForm from "./ApplicationPlatformForm";
import { generateStatementOfWork } from "@/core/lib/generateStatementOfWork";
import { PlusCircle } from "lucide-react";

import { useFieldArray, type UseFormReturn } from "react-hook-form";

interface StatementOfWorkFormProps {
  form: UseFormReturn<StatementOfWorkRequest>;
}

export default function StatementOfWorkForm({ form }: StatementOfWorkFormProps) {
  const { control } = form;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "applicationPlatformRequirements",
  });

  const handleSubmit = async (values: StatementOfWorkRequest) => {
    console.log(values);
    await generateStatementOfWork(values);
  };

  return (
    <div>
      <h1 className="text-4xl font-bold">Statement of Work</h1>

      <Form form={form} onSubmit={handleSubmit} formID="contract-form">
        {/* ACKNOWLEDGEMENT */}
        <div className="my-10">
          <h2 className="text-xl font-bold mb-5 text-primary">Acknowledgement</h2>

          <FormTextInput control={control} name="client_name" label="Client name" />

          <div className="flex gap-4">
            <FormTextInput control={control} name="prepared_by" label="Prepared by" />
            <FormTextInput control={control} name="prepared_by_position" label="Position" />
          </div>

          <div className="flex gap-4">
            <FormTextInput control={control} name="noted_by" label="Noted By" />
            <FormTextInput control={control} name="noted_by_position" label="Position" />
          </div>
        </div>

        {/* PROJECT INFO */}
        <div className="my-10">
          <h2 className="text-xl font-bold mb-5 text-primary">Project Information</h2>

          <FormTextInput control={control} name="project_name" label="Project Name" />

          <div className="flex gap-4">
            <FormDateSelector control={control} name="submission_date" label="Submission Date" />
            <FormDateSelector control={control} name="start_date" label="Start Date" />
          </div>
        </div>

        {/* OBJECTIVES / COUNTRIES */}
        <div className="flex gap-4 my-10">
          <ListHandlerForm form={form} title="Add Objectives" path="objectives" />
          <ListHandlerForm form={form} title="Add Countries" path="countries" />
        </div>

        {/* SPECIFICATION */}
        <FormTextArea control={control} className="min-h-100" label="Specification" name="specifications" />

        {/* DEVICE PLATFORMS */}
        <div className="my-10">
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
        </div>

        {/* APPLICATION PLATFORMS */}
        <div className="my-10">
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

        <Button type="submit">Submit</Button>
      </Form>
    </div>
  );
}
