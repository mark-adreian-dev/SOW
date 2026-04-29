import type { StatementOfWorkRequest } from "@/core/domain/schema/statement-of-work.schema";
import { Button } from "@/core/presentation/components/base/ui/button";
import { ArrowLeft, ArrowRight, FileCheck, PlusIcon } from "lucide-react";
import { useFieldArray, type UseFormReturn } from "react-hook-form";
import FormTitle from "@/core/presentation/components/shared/FormTitle";
import FormSwitchInput from "@/core/presentation/components/custom/Form/FormSwitchInput";
import { PlatformItem } from "./PlatformItem";
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/core/presentation/components/base/ui/empty";
import { useStepValidation } from "@/core/presentation/hooks/useStepValidation";

interface ApplicationPlatformFormProps {
  form: UseFormReturn<StatementOfWorkRequest>;
  navigateToNextForm: () => void;
  navigateToPrevForm: () => void;
}
const stepFields = ["isPlatformDesktop", "isPlatformMobile", "applicationPlatformRequirements"] as const;

export default function SOWApplicationPlatformForm({ form, navigateToNextForm, navigateToPrevForm }: ApplicationPlatformFormProps) {
  const { validateAndScroll } = useStepValidation(form, stepFields);
  const { control } = form;
  const { errors } = form.formState;

  const {
    fields: platformFields,
    append: appendPlatform,
    remove: removePlatform,
  } = useFieldArray({
    control,
    name: "applicationPlatformRequirements",
  });

  const handleAddPlatform = () => {
    appendPlatform({
      application_platform_index: Date.now(), // ✅ safer than length
      name: "",
      features: [],
    });
  };

  const handleNext = () => {
    const isDesktop = form.getValues("isPlatformDesktop");
    const isMobile = form.getValues("isPlatformMobile");

    if (!isDesktop && !isMobile) {
      form.setError("isPlatformDesktop", {
        type: "manual",
        message: "At least one platform must be selected",
      });
      return;
      // Trigger scroll manually or let validateAndScroll catch the new error
    } else {
      validateAndScroll(() => {
        navigateToNextForm();
      });
    }
  };

  return (
    <div className="flex flex-col gap-10">
      <div className="flex items-center justify-between">
        <FormTitle title="Application Platform" sequenceNo={2} />
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
            onClick={() =>
              validateAndScroll(() => {
                navigateToNextForm();
              })
            }
            disabled={platformFields.length === 0}
          >
            <ArrowRight />
          </Button>
        </div>
      </div>

      {/* PLATFORM SWITCHES */}
      <div className="my-10">
        <h2 className="text-xl font-bold mb-5 text-primary">Device Platforms</h2>

        <div>
          <div data-field="isPlatformDesktop" className="flex gap-10">
            <div data-field="isPlatformDesktop">
              <FormSwitchInput form={form} name="isPlatformDesktop" label="Desktop" description="Available on Windows, macOS, and Linux browsers." />
            </div>
            <div data-field="isPlatformMobile">
              <FormSwitchInput form={form} name="isPlatformMobile" label="Mobile" description="Available on Android and iOS devices." />
            </div>
          </div>
          {errors.isPlatformDesktop && (
            <p className="mt-5 text-[11px] leading-tight font-medium text-destructive">
              {errors.isPlatformDesktop.message || "At least one platform must be selected"}
            </p>
          )}
        </div>
      </div>

      {platformFields.length === 0 && (
        <Empty className="border">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <FileCheck />
            </EmptyMedia>
            <EmptyTitle className="text-primary">No Platform Yet</EmptyTitle>
            <EmptyDescription>You haven&apos;t specified any platform yet. Get started by adding your first platform.</EmptyDescription>
          </EmptyHeader>
          <EmptyContent className="flex-row justify-center gap-2">
            <Button type="button" onClick={handleAddPlatform}>
              Add platform <PlusIcon />
            </Button>
          </EmptyContent>
        </Empty>
      )}

      <div>
        {platformFields.map((platform, index) => (
          <PlatformItem key={platform.id} control={control} form={form} platformIndex={index} removePlatform={removePlatform} />
        ))}

        {platformFields.length > 0 && (
          <Button type="button" variant={"outline"} className="w-full self-end mt-15 border-primary hover:bg-primary" onClick={handleAddPlatform}>
            <PlusIcon />
            Add Platform
          </Button>
        )}
      </div>
      {/* PLATFORM LIST */}

      {platformFields.length > 0 && (
        <div className="self-end flex gap-4 items-center">
          <Button type="button" variant={"outline"} className="w-fit self-end mt-10" onClick={navigateToPrevForm}>
            <ArrowLeft />
            Previous
          </Button>

          <Button type="button" className="self-end" onClick={() => handleNext()}>
            Next <ArrowRight />
          </Button>
        </div>
      )}
    </div>
  );
}
