import { Controller } from "react-hook-form";
import type { Control, FieldValues, Path, UseFormReturn } from "react-hook-form";

import { Field, FieldDescription, FieldLabel } from "@/core/presentation/components/base/ui/field";
import { type LucideIcon } from "lucide-react";
import { Switch } from "../../base/ui/switch";
import { cn } from "@/core/presentation/lib/utils";

type FormSwitchInputProps<T extends FieldValues> = {
  form: UseFormReturn<T>;
  name: Path<T>;
  label?: string;
  description?: string;
  FieldIcon?: LucideIcon;
  className?: string;
  disabled?: boolean;
};

export default function FormSwitchInput<T extends FieldValues>({
  className,
  form,
  name,
  label,
  description,
  FieldIcon,
  disabled,
}: FormSwitchInputProps<T>) {
  return (
    <Controller
      name={name}
      control={form.control}
      defaultValue={false as any} // ensures boolean default
      render={({ field, fieldState }) => (
        <Field className={cn("w-full flex items-center justify-between", className)}>
          <div className="flex flex-row-reverse justify-end gap-5  w-full">
            {/* Left side: Label + Description */}
            <div className="flex flex-col gap-1">
              {label && (
                <div className="flex items-center gap-2">
                  {FieldIcon && <FieldIcon className="w-4 h-4 text-muted-foreground" />}
                  <FieldLabel>{label}</FieldLabel>
                </div>
              )}

              {description && <FieldDescription className="text-[11px] leading-tight w-full max-w-80">{description}</FieldDescription>}
            </div>

            {/* Right side: Switch */}
            <Switch
              checked={!!field.value}
              onCheckedChange={(checked) => {
                field.onChange(checked);
                form.trigger(name); // Trigger validation on change
              }}
              disabled={disabled}
            />
          </div>
        </Field>
      )}
    />
  );
}
