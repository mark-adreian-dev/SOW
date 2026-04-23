import type { StatementOfWorkRequest } from "@/core/domain/schema/statement-of-work.schema";
import { Button } from "@/core/presentation/components/base/ui/button";
import FormNumberInput from "@/core/presentation/components/custom/Form/FormNumberInput";
import FormTextArea from "@/core/presentation/components/custom/Form/FormTextArea";
import FormTextInput from "@/core/presentation/components/custom/Form/FormTextInput";
import { GripVertical, PlusCircleIcon, Trash2Icon } from "lucide-react";
import { useFieldArray, type UseFormReturn } from "react-hook-form";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/core/presentation/components/base/ui/accordion";
import ListHandlerForm from "./ListHandlerForm";

interface ApplicationPlatformFormProps {
  form: UseFormReturn<StatementOfWorkRequest>;
  index: number;
  removePlatform: () => void;
}
export default function ApplicationPlatformForm({ form, index, removePlatform }: ApplicationPlatformFormProps) {
  const { control } = form;

  const {
    fields: featureFields,
    append,
    remove,
  } = useFieldArray({
    control,
    name: `applicationPlatformRequirements.${index}.features`,
  });

  const addModule = () => {
    append({
      feature_index: featureFields.length + 1,
      feature_name: "",
      description: "",
      feature_obj: "",
      dev_story_points: 0,
      test_story_points: 0,
      acceptance_criteria: [],
    });
  };

  const removeModule = (index: number) => {
    remove(index);
  };

  const platformName = form.watch(`applicationPlatformRequirements.${index}.name`);
  return (
    <div className="flex justify-start gap-5 border p-4 rounded-lg">
      <div className="w-1/2">
        <div className="flex items-center justify-between">
          <h4 className="text-lg font-bold text-primary mb-5">{platformName ? platformName : `Platform #${index + 1}`}</h4>
          <div className="flex items-center gap-1">
            <Button type="button" variant={"icon"} size={"icon"} onClick={addModule}>
              <PlusCircleIcon />
            </Button>
            <Button type="button" variant={"icon"} size={"icon"} className="hover:bg-destructive hover:border-destructive" onClick={removePlatform}>
              <Trash2Icon />
            </Button>
          </div>
        </div>

        <FormTextInput control={form.control} name={`applicationPlatformRequirements.${index}.name`} label="Platform name" />
      </div>
      <div className="w-full flex flex-col gap-10">
        <Accordion type="multiple" className="w-full flex flex-col gap-4">
          {featureFields.map((fields, featureIndex) => {
            const featureName = form.watch(`applicationPlatformRequirements.${index}.features.${featureIndex}.feature_name`);

            return (
              <AccordionItem key={fields.id} value={`feature-${featureIndex}`} className="border rounded-md px-4">
                {/* HEADER */}
                <AccordionTrigger className="flex items-center justify-between cursor-pointer">
                  <div className="flex items-center gap-3">
                    <GripVertical className="cursor-grab" />
                    <Button
                      type="button"
                      variant="icon"
                      size="icon"
                      className="hover:bg-destructive hover:border-destructive"
                      onClick={() => removeModule(featureIndex)}
                    >
                      <Trash2Icon />
                    </Button>
                    <span className="text-lg font-semibold text-primary">{featureName ? featureName : `Module #${featureIndex + 1}`}</span>

                    {/* Optional: live title preview */}
                    {fields.feature_name && <span className="text-muted-foreground text-sm">- {fields.feature_name}</span>}
                  </div>
                </AccordionTrigger>

                {/* CONTENT */}
                <AccordionContent>
                  <div className="flex justify-end"></div>

                  <div className="w-full flex flex-col gap-4">
                    {/* FEATURE NAME */}
                    <FormTextInput
                      control={form.control}
                      name={`applicationPlatformRequirements.${index}.features.${featureIndex}.feature_name`}
                      label="Feature name"
                    />

                    {/* STORY POINTS */}
                    <div className="flex flex-row-reverse gap-5">
                      <ListHandlerForm
                        form={form}
                        title="Acceptance Criteria"
                        path={`applicationPlatformRequirements.${index}.features.${featureIndex}.acceptance_criteria`}
                      />
                      <div className="w-full">
                        <div className="w-full">
                          <FormNumberInput
                            step={1}
                            control={form.control}
                            name={`applicationPlatformRequirements.${index}.features.${featureIndex}.dev_story_points`}
                            label="Development Story Points"
                            inputControls
                          />

                          <FormNumberInput
                            step={1}
                            control={form.control}
                            name={`applicationPlatformRequirements.${index}.features.${featureIndex}.test_story_points`}
                            label="Testing Story Points"
                            inputControls
                          />
                        </div>
                        <div className="flex flex-col gap-5">
                          <FormTextArea
                            control={form.control}
                            className="min-h-40"
                            name={`applicationPlatformRequirements.${index}.features.${featureIndex}.description`}
                            label="Description"
                          />

                          <FormTextArea
                            control={form.control}
                            className="min-h-40"
                            name={`applicationPlatformRequirements.${index}.features.${featureIndex}.feature_obj`}
                            label="Objectives"
                          />
                        </div>
                      </div>
                    </div>

                    {/* TEXT AREAS */}
                  </div>
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
        {/* {featureFields.length !== 0 && (
          <div className="w-full pl-5">
            <Button type="button" className="w-full" variant={"outline"} onClick={addModule}>
              <Plus /> Add Module
            </Button>
          </div>
        )} */}
      </div>
    </div>
  );
}
