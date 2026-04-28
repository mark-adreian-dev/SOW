import { Controller } from "react-hook-form";
import type { Control, FieldValues, Path, UseFormReturn } from "react-hook-form";
import { useState, type InputHTMLAttributes } from "react";
import { Field, FieldDescription, FieldError, FieldLabel } from "@/core/presentation/components/base/ui/field";
import { Input } from "@/core/presentation/components/base/ui/input";
import { Eye, EyeOff, type LucideIcon } from "lucide-react";
import { cn } from "@/core/presentation/lib/utils";

export type FormTextInputProps<T extends FieldValues> = {
  form: UseFormReturn<T>;
  control: Control<T>;
  FieldIcon?: LucideIcon;
  name: Path<T>;
  label?: string;
  description?: string;
  className?: string;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "name" | "form">;

export default function FormTextInput<T extends FieldValues>({
  control,
  name,
  label,
  description,
  FieldIcon,
  form,
  className,
  ...inputProps
}: FormTextInputProps<T>) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const isPasswordField = inputProps.type === "password";

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field className={cn("w-full flex flex-col gap-1", className)} data-invalid={fieldState.invalid}>
          {/* Label */}
          {label && (
            <div className="flex items-center gap-2 h-6">
              {FieldIcon && <FieldIcon className="w-4 h-4 text-muted-foreground" />}
              <FieldLabel htmlFor={field.name} className="flex items-center gap-1 text-muted-foreground">
                <span className={fieldState.error ? "text-destructive" : ""}>{label}</span>
                {inputProps.required && <span className="text-destructive">*</span>}
              </FieldLabel>
            </div>
          )}

          {/* Input */}
          <div
            className={cn(
              "relative border rounded-md overflow-hidden items-center border-input",
              fieldState.error && "border-destructive!",
              className
            )}
          >
            <Input
              {...field}
              {...inputProps}
              id={field.name}
              aria-invalid={fieldState.invalid}
              value={field.value ?? ""}
              onChange={async (e) => {
                field.onChange(e);
                await form.trigger(name);
              }}
              className={cn("w-full pr-10 border-none text-foreground/90 focus:ring-0 focus:outline-none", fieldState.error && "border-destructive")}
              type={isPasswordField ? (isPasswordVisible ? "text" : "password") : inputProps.type}
            />

            {isPasswordField && (
              <button type="button" onClick={togglePasswordVisibility} className="absolute right-3 text-muted-foreground hover:text-foreground">
                {isPasswordVisible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            )}
          </div>

          {/* Error / Description */}
          <div className="min-h-5 mt-0.5">
            {fieldState.error ? (
              <FieldError className="text-[11px] text-destructive">{fieldState.error.message}</FieldError>
            ) : (
              description && <FieldDescription className="text-[11px] text-muted-foreground">{description}</FieldDescription>
            )}
          </div>
        </Field>
      )}
    />
  );
}
