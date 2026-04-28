import { Controller } from "react-hook-form";
import type { Control, FieldValues, Path, UseFormReturn } from "react-hook-form"; // Added UseFormReturn
import { type TextareaHTMLAttributes } from "react";
import { Field, FieldDescription, FieldError, FieldLabel } from "@/core/presentation/components/base/ui/field";
import { Textarea } from "@/core/presentation/components/base/ui/textarea";
import { cn } from "@/core/presentation/lib/utils";
import { type LucideIcon } from "lucide-react";

export type FormTextAreaProps<T extends FieldValues> = {
  form: UseFormReturn<T>; // Added form prop
  control: Control<T>;
  name: Path<T>;
  label?: string;
  description?: string;
  FieldIcon?: LucideIcon;
} & Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "name" | "form">; // Omit "form" to prevent "& string" error

export default function FormTextArea<T extends FieldValues>({
  form, // Destructure form
  control,
  name,
  label,
  description,
  FieldIcon,
  className,
  required,
  ...props
}: FormTextAreaProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field className="w-full flex flex-col gap-1" data-invalid={fieldState.invalid}>
          {/* Label Section */}
          {label && (
            <div className="flex items-center gap-2 h-6">
              {FieldIcon && <FieldIcon className="w-4 h-4 text-muted-foreground" />}
              <FieldLabel htmlFor={field.name} className="flex items-center gap-1 text-muted-foreground">
                {label}
                {required && <span className="text-destructive">*</span>}
              </FieldLabel>
            </div>
          )}

          {/* Textarea Container */}
          <Textarea
            {...field}
            {...props}
            id={field.name}
            value={field.value ?? ""}
            aria-invalid={fieldState.invalid}
            placeholder={props.placeholder ?? label}
            // Integrated your requested onChange logic
            onChange={async (e) => {
              field.onChange(e);
              await form.trigger(name);
            }}
            onKeyDown={(e) => {
              e.stopPropagation();
              props.onKeyDown?.(e);
            }}
            className={cn(
              "min-h-20 focus-visible:ring-2 focus-visible:ring-input outline-0 shadow-none bg-background resize-none border-input",
              fieldState.invalid && "border-destructive", // Added visual error state
              className
            )}
          />

          {/* Reserved Error Space */}
          <div className="min-h-5 mt-0.5">
            {fieldState.invalid ? (
              <FieldError className="text-[11px] leading-tight font-medium text-destructive transition-all">{fieldState.error?.message}</FieldError>
            ) : (
              description && <FieldDescription className="text-[11px] leading-tight text-muted-foreground">{description}</FieldDescription>
            )}
          </div>
        </Field>
      )}
    />
  );
}
