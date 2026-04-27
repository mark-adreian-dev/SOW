import type { StatementOfWorkRequest } from "@/core/domain/schema/statement-of-work.schema";
import { Button } from "@/core/presentation/components/base/ui/button";
import { PlusIcon } from "lucide-react";
import { useFieldArray, type UseFormReturn } from "react-hook-form";
import FormTitle from "@/core/presentation/components/shared/FormTitle";
import FormSwitchInput from "@/core/presentation/components/custom/Form/FormSwitchInput";
import { PlatformItem } from "./PlatformItem";

interface ApplicationPlatformFormProps {
  form: UseFormReturn<StatementOfWorkRequest>;
}

export default function SOWApplicationPlatformForm({ form }: ApplicationPlatformFormProps) {
  const { control } = form;

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

  return (
    <div className="flex flex-col gap-10">
      <FormTitle title="Application Platform" sequenceNo={3} />

      {/* PLATFORM SWITCHES */}
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

      {/* PLATFORM LIST */}
      {platformFields.map((platform, index) => (
        <PlatformItem key={platform.id} control={control} form={form} platformIndex={index} removePlatform={removePlatform} />
      ))}

      {/* ADD PLATFORM BUTTON */}
      <Button type="button" variant="secondary" onClick={handleAddPlatform}>
        Add platform <PlusIcon />
      </Button>
    </div>
  );
}
