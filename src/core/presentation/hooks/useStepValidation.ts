import type { FieldValues, UseFormReturn, FieldPath } from "react-hook-form";

// useStepValidation.ts
export function useStepValidation<T extends FieldValues>(form: UseFormReturn<T>, fields: readonly FieldPath<T>[]) {
  const validateAndScroll = async (onSuccess: () => void) => {
    // This triggers validation for every field in the array and its children
    const isValid = await form.trigger(fields);

    if (!isValid) {
      const errors = form.formState.errors;

      // Helper to find the first string path that has an error within our stepFields
      const getFirstErrorPath = (errors: any): string | undefined => {
        // We look for the first key in our errors object that matches our stepFields
        for (const field of fields) {
          const fieldError = errors[field];
          if (!fieldError) continue;

          // If it's a deep error (like an array), RHF nested objects might need flattening
          // This is a simplified way to find the first nested key
          const findDeepKey = (obj: any, path: string): string => {
            const firstKey = Object.keys(obj)[0];
            if (typeof obj[firstKey] === "object" && obj[firstKey] !== null && !obj[firstKey].message) {
              return findDeepKey(obj[firstKey], `${path}.${firstKey}`);
            }
            return `${path}.${firstKey}`;
          };

          return findDeepKey(fieldError, field as string);
        }
      };

      const firstErrorPath = getFirstErrorPath(errors);

      if (firstErrorPath) {
        const el = document.querySelector(`[data-field="${firstErrorPath}"]`);
        el?.scrollIntoView({ behavior: "smooth", block: "center" });
        (el?.querySelector("input, textarea") as HTMLElement)?.focus();
      }
      return;
    }

    onSuccess();
  };

  return { validateAndScroll };
}
