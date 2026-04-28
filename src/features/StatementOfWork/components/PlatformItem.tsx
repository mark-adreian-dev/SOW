import { Button } from "@/core/presentation/components/base/ui/button";
import FormNumberInput from "@/core/presentation/components/custom/Form/FormNumberInput";
import FormTextArea from "@/core/presentation/components/custom/Form/FormTextArea";
import FormTextInput from "@/core/presentation/components/custom/Form/FormTextInput";
import { FileCheck, GripVertical, PlusCircleIcon, PlusIcon, Trash2Icon } from "lucide-react";
import { useFieldArray, type Control, type UseFormReturn } from "react-hook-form";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/core/presentation/components/base/ui/accordion";
import ListHandlerForm from "@/core/presentation/components/shared/ListHandlerForm";
import type { StatementOfWorkRequest } from "@/core/domain/schema/statement-of-work.schema";
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/core/presentation/components/base/ui/empty";
import { useEffect, useState } from "react";

interface PlatformItemProps {
  control: Control<StatementOfWorkRequest>;
  form: UseFormReturn<StatementOfWorkRequest>;
  platformIndex: number;
  removePlatform: (index: number) => void;
}

export function PlatformItem({ control, form, platformIndex, removePlatform }: PlatformItemProps) {
  const [openItems, setOpenItems] = useState<string[]>([]);
  const { errors } = form.formState;
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

  useEffect(() => {
    const platformErrors = form.formState.errors.applicationPlatformRequirements?.[platformIndex];
    const featureErrors = Array.isArray(platformErrors?.features) ? platformErrors.features : [];
    const nextOpen: string[] = [];
    featureErrors.forEach((featureError, featureIndex) => {
      if (featureError) {
        nextOpen.push(`feature-${platformIndex}-${featureIndex}`);
      }
    });

    if (nextOpen.length > 0) {
      setOpenItems((prev) => Array.from(new Set([...prev, ...nextOpen])));
    }
  }, [form.formState.errors.applicationPlatformRequirements, platformIndex]);

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
        <div data-field={`applicationPlatformRequirements.${platformIndex}.name`}>
          <FormTextInput
            control={form.control}
            form={form}
            name={`applicationPlatformRequirements.${platformIndex}.name`}
            label="Platform name"
            className="text-lg! border-input"
          />
        </div>

        {/* FEATURES */}
        <Accordion type="multiple" value={openItems} onValueChange={setOpenItems} className="flex flex-col gap-4 w-full">
          {featureFields.length === 0 && (
            <div>
              <Empty
                className={`border ${form.getFieldState(`applicationPlatformRequirements.${platformIndex}.features`).error && "border-destructive"}`}
              >
                <EmptyHeader>
                  <EmptyMedia variant="icon">
                    <FileCheck />
                  </EmptyMedia>
                  <EmptyTitle className="text-primary">No Features</EmptyTitle>
                  <EmptyDescription>
                    You haven&apos;t added any features yet. Get started by adding your first feature to this platform.
                  </EmptyDescription>
                </EmptyHeader>
                <EmptyContent className="flex-row justify-center gap-2">
                  <Button type="button" onClick={addModule}>
                    Add Feature <PlusIcon />
                  </Button>
                </EmptyContent>
              </Empty>
              {errors.applicationPlatformRequirements?.[platformIndex]?.features && (
                <p className="mt-2 text-[11px] leading-tight font-medium text-destructive">
                  {errors.applicationPlatformRequirements[platformIndex].features?.message || "Please add at least one feature"}
                </p>
              )}
            </div>
          )}
          {featureFields.map((field, featureIndex) => {
            const featureName = form.watch(`applicationPlatformRequirements.${platformIndex}.features.${featureIndex}.feature_name`);
            const accordionId = `feature-${platformIndex}-${featureIndex}`;

            const featureError = errors.applicationPlatformRequirements?.[platformIndex]?.features?.[featureIndex];
            const acceptanceError = featureError?.acceptance_criteria?.message || featureError?.message;
            return (
              <AccordionItem
                key={field.id}
                value={accordionId}
                className="border rounded-md px-4"
                data-field={`applicationPlatformRequirements.${platformIndex}.features.${featureIndex}`}
              >
                <AccordionTrigger className="cursor-pointer">
                  <div className="flex items-center gap-3">
                    <GripVertical />

                    <Button type="button" variant="icon" size="icon" onClick={() => removeModule(featureIndex)}>
                      <Trash2Icon />
                    </Button>

                    <span className="font-semibold text-foreground">{featureName || `Module #${featureFields.length - featureIndex}`}</span>
                  </div>
                </AccordionTrigger>

                <AccordionContent data-field={`platform-${platformIndex}-feature-${featureIndex}`}>
                  <div className="flex flex-col gap-10">
                    <div>
                      <div data-field={`applicationPlatformRequirements.${platformIndex}.features.${featureIndex}.feature_name`}>
                        <FormTextInput
                          control={form.control}
                          form={form}
                          name={`applicationPlatformRequirements.${platformIndex}.features.${featureIndex}.feature_name`}
                          label="Feature name"
                          className="text-md!"
                        />
                      </div>
                      <div data-field={`applicationPlatformRequirements.${platformIndex}.features.${featureIndex}.feature_obj`}>
                        <FormTextArea
                          form={form}
                          control={control}
                          name={`applicationPlatformRequirements.${platformIndex}.features.${featureIndex}.feature_obj`}
                          label="Objectives"
                        />
                      </div>
                      <div data-field={`applicationPlatformRequirements.${platformIndex}.features.${featureIndex}.description`}>
                        <FormTextArea
                          form={form}
                          control={control}
                          name={`applicationPlatformRequirements.${platformIndex}.features.${featureIndex}.description`}
                          label="Description"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col gap-10">
                      <div data-field={`applicationPlatformRequirements.${platformIndex}.features.${featureIndex}.acceptance_criteria`}>
                        <ListHandlerForm
                          form={form}
                          title="Acceptance Criteria"
                          path={`applicationPlatformRequirements.${platformIndex}.features.${featureIndex}.acceptance_criteria`}
                        />

                        {acceptanceError && <p className="mt-2 text-[11px] leading-tight font-medium text-destructive">{acceptanceError}</p>}
                      </div>

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
