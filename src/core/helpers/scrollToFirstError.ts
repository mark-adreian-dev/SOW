import type { FieldErrors, FieldValues, FieldPath } from "react-hook-form";

type ScrollToErrorOptions<T extends FieldValues> = {
  errors: FieldErrors<T>;
  fields: readonly FieldPath<T>[];
  selectorPrefix?: string; // default: data-field
};

export function scrollToFirstError<T extends FieldValues>({ errors, fields, selectorPrefix = "data-field" }: ScrollToErrorOptions<T>) {
  const firstError = fields.find((key) => errors[key]);

  if (!firstError) return;

  const el = document.querySelector(`[${selectorPrefix}="${firstError}"]`);

  if (!el) return;

  el.scrollIntoView({
    behavior: "smooth",
    block: "center",
  });

  // optional focus
  const input = el.querySelector("input, textarea, select") as HTMLElement | null;

  input?.focus?.();
}
