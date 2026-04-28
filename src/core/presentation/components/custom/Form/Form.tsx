import type { UseFormReturn, FieldValues, SubmitHandler } from "react-hook-form";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/core/presentation/components/base/ui/sheet";
import { cn } from "@/core/presentation/lib/utils";
import { ScrollArea } from "../../base/ui/scroll-area";

interface FormProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  onSubmit: SubmitHandler<T>;
  children: React.ReactNode;

  trigger?: React.ReactNode;
  className?: string;

  formTitle?: string;
  formDescription?: string;

  open?: boolean;
  onOpenChange?: (open: boolean) => void;

  formID: string;
}

export default function Form<T extends FieldValues>(props: FormProps<T>) {
  const { form, formTitle, formDescription, onSubmit, children, trigger, className, formID, open, onOpenChange } = props;

  const formElement = (
    <form id={formID} onSubmit={form.handleSubmit(onSubmit)} noValidate className={cn(className)}>
      {children}
    </form>
  );

  if (!trigger) {
    return formElement;
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetTrigger asChild>{trigger}</SheetTrigger>

      <SheetContent className={cn("flex flex-col p-6 max-w-[100vw]!", className)}>
        <SheetHeader className="p-0">
          <SheetTitle className="text-3xl font-bold">{formTitle}</SheetTitle>
          <SheetDescription>{formDescription}</SheetDescription>
        </SheetHeader>

        <ScrollArea>
          <div className="flex flex-col gap-6 pr-4 pl-1 pb-24">{formElement}</div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
