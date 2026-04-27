import { Button } from "@/core/presentation/components/base/ui/button";
import FormNumberInput from "@/core/presentation/components/custom/Form/FormNumberInput";
import FormTextArea from "@/core/presentation/components/custom/Form/FormTextArea";
import FormTextInput from "@/core/presentation/components/custom/Form/FormTextInput";
import { GripVertical, PlusCircleIcon, Trash2Icon } from "lucide-react";
import { useFieldArray, type Control, type UseFormReturn } from "react-hook-form";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/core/presentation/components/base/ui/accordion";
import ListHandlerForm from "@/core/presentation/components/shared/ListHandlerForm";
import type { StatementOfWorkRequest } from "@/core/domain/schema/statement-of-work.schema";

interface PlatformItemProps {
  control: Control<StatementOfWorkRequest>;
  form: UseFormReturn<StatementOfWorkRequest>;
  platformIndex: number;
  removePlatform: (index: number) => void;
}

export function PlatformItem({ control, form, platformIndex, removePlatform }: PlatformItemProps) {
  const {
    fields: featureFields,
    prepend: prependModule,
    remove: removeModule,
  } = useFieldArray({
    control,
    name: `applicationPlatformRequirements.${platformIndex}.features`,
  });

  const addModule = () => {
    prependModule({
      feature_index: Date.now(),
      feature_name: "",
      description: "",
      feature_obj: "",
      dev_story_points: 0,
      test_story_points: 0,
      acceptance_criteria: [],
    });
  };

  const platformName = form.watch(`applicationPlatformRequirements.${platformIndex}.name`);

  return (
    <div className="flex flex-col gap-5 border p-4 rounded-lg">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-5">
        <h4 className="text-lg font-bold text-primary">{platformName || `Platform #${platformIndex + 1}`}</h4>

        <div className="flex items-center gap-1">
          <Button type="button" variant="icon" size="icon" onClick={addModule}>
            <PlusCircleIcon />
          </Button>

          <Button type="button" variant="icon" size="icon" onClick={() => removePlatform(platformIndex)}>
            <Trash2Icon />
          </Button>
        </div>
      </div>
      <div>
        {/* PLATFORM NAME */}
        <FormTextInput control={control} name={`applicationPlatformRequirements.${platformIndex}.name`} label="Platform name" className="text-lg!" />

        {/* FEATURES */}
        <Accordion type="multiple" className="flex flex-col gap-4 w-full">
          {featureFields.map((field, featureIndex) => {
            const featureName = form.watch(`applicationPlatformRequirements.${platformIndex}.features.${featureIndex}.feature_name`);

            return (
              <AccordionItem key={field.id} value={`feature-${featureIndex}`} className="border rounded-md px-4">
                <AccordionTrigger className="cursor-pointer">
                  <div className="flex items-center gap-3">
                    <GripVertical />

                    <Button type="button" variant="icon" size="icon" onClick={() => removeModule(featureIndex)}>
                      <Trash2Icon />
                    </Button>

                    <span className="font-semibold text-foreground">{featureName || `Module #${featureIndex + 1}`}</span>
                  </div>
                </AccordionTrigger>

                <AccordionContent>
                  <div className="flex flex-col gap-10">
                    <div>
                      <FormTextInput
                        control={control}
                        name={`applicationPlatformRequirements.${platformIndex}.features.${featureIndex}.feature_name`}
                        label="Feature name"
                        className="text-md!"
                      />
                      <FormTextArea
                        control={control}
                        name={`applicationPlatformRequirements.${platformIndex}.features.${featureIndex}.feature_obj`}
                        label="Objectives"
                      />

                      <FormTextArea
                        control={control}
                        name={`applicationPlatformRequirements.${platformIndex}.features.${featureIndex}.description`}
                        label="Description"
                      />
                    </div>

                    <div className="flex flex-col gap-10">
                      <ListHandlerForm
                        form={form}
                        title="Acceptance Criteria"
                        path={`applicationPlatformRequirements.${platformIndex}.features.${featureIndex}.acceptance_criteria`}
                      />

                      <div className="w-full flex gap-5">
                        <FormNumberInput
                          control={control}
                          name={`applicationPlatformRequirements.${platformIndex}.features.${featureIndex}.dev_story_points`}
                          label="Development Points"
                          inputControls={true}
                        />

                        <FormNumberInput
                          control={control}
                          name={`applicationPlatformRequirements.${platformIndex}.features.${featureIndex}.test_story_points`}
                          label="Test Points"
                          inputControls={true}
                        />
                      </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      </div>
    </div>
  );
}
